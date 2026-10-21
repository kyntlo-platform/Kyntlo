import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CACHE, LEAD, MUSIC_DIR, TAIL, VIDEO, XFADE } from './config.mjs';
import { ffmpeg, run } from './run.mjs';

const { width: W, height: H, fps: FPS } = VIDEO;
const EASE = 0.7; // seconds to ease in/out of a zoom

// Smooth zoom with zoompan, which (unlike scale+crop) re-evaluates position on
// every frame. The frame is upscaled 2x first so the pan moves in half-pixel
// steps instead of visibly jittering.
const UP = 2;
function zoomFilter(zooms) {
  if (!zooms.length) return '';
  const ss = (a) => `(${a})*(${a})*(3-2*(${a}))`; // smoothstep
  const terms = zooms.map(({ t, for: d, scale }) => {
    const up = ss(`clip((it-${t.toFixed(3)})/${EASE},0,1)`);
    const down = ss(`clip((it-${(t + d + EASE).toFixed(3)})/${EASE},0,1)`);
    return `${(scale - 1).toFixed(3)}*${up}*(1-${down})`;
  });
  // Centre of attention switches between targets while zoomed out (z=1), so it never jumps on screen.
  const centre = (axis) => zooms.reduce((acc, { t, rect }, i) => {
    const c = UP * (axis === 'x' ? rect.x + rect.width / 2 : rect.y + rect.height / 2);
    return i === 0 ? `${c.toFixed(1)}` : `if(gte(it,${(t - EASE).toFixed(3)}),${c.toFixed(1)},${acc})`;
  }, '');
  return (
    `scale=${W * UP}:${H * UP}:flags=bicubic,` +
    `zoompan=z='1+${terms.join('+')}':` +
    `x='clip(${centre('x')}-iw/zoom/2,0,iw-iw/zoom)':y='clip(${centre('y')}-ih/zoom/2,0,ih-ih/zoom)':` +
    `d=1:s=${W}x${H}:fps=${FPS},`
  );
}

async function sceneClip(raw, scene, seconds, file) {
  const len = scene.end - scene.start;
  const zooms = scene.zooms.map((z) => ({ ...z, t: z.t / scene.speed, for: z.for / scene.speed }));
  const vf =
    `setpts=(PTS-STARTPTS)/${scene.speed},fps=${FPS},` +
    zoomFilter(zooms) +
    `tpad=stop_mode=clone:stop_duration=30,trim=duration=${seconds.toFixed(3)},setsar=1,format=yuv420p`;
  await ffmpeg(['-ss', scene.start.toFixed(3), '-t', len.toFixed(3), '-i', raw, '-an', '-vf', vf,
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '12', file]);
}

// Sound effects are synthesised once and cached: a soft UI click and a gentle
// airy whoosh under each cross-dissolve.
async function sfx() {
  const dir = path.join(CACHE, 'sfx');
  const click = path.join(dir, 'click.wav');
  const whoosh = path.join(dir, 'whoosh.wav');
  try {
    await fs.access(whoosh);
  } catch {
    await fs.mkdir(dir, { recursive: true });
    await ffmpeg(['-f', 'lavfi', '-i',
      'aevalsrc=0.5*sin(2*PI*1500*t)*exp(-t*120)+0.25*sin(2*PI*3100*t)*exp(-t*200):s=48000:d=0.09',
      '-af', 'highpass=f=600,volume=0.55', '-ac', '2', click]);
    await ffmpeg(['-f', 'lavfi', '-i', 'anoisesrc=color=pink:amplitude=0.6:d=0.9:r=48000:seed=3',
      '-af', 'bandpass=f=900:width_type=o:w=2.2,afade=t=in:d=0.45:curve=qsin,afade=t=out:st=0.45:d=0.45:curve=qsin,volume=0.22',
      '-ac', '2', whoosh]);
  }
  return { click, whoosh };
}

async function sceneAudio(narration, seconds, file, { clicks, whoosh }) {
  const fx = await sfx();
  const ms = (t) => Math.max(0, Math.round(t * 1000));
  const inputs = ['-i', narration.file];
  const parts = [`[0:a]adelay=${ms(LEAD)}|${ms(LEAD)}[n]`];
  const labels = ['[n]'];
  clicks.forEach((t, k) => {
    inputs.push('-i', fx.click);
    parts.push(`[${k + 1}:a]adelay=${ms(t)}|${ms(t)}[c${k}]`);
    labels.push(`[c${k}]`);
  });
  if (whoosh) {
    inputs.push('-i', fx.whoosh);
    parts.push(`[${clicks.length + 1}:a]anull[w]`);
    labels.push('[w]');
  }
  const graph = `${parts.join(';')};${labels.join('')}amix=inputs=${labels.length}:normalize=0:duration=longest,` +
    `apad,atrim=0:${seconds.toFixed(3)}`;
  await ffmpeg([...inputs, '-filter_complex', graph, '-ar', '48000', '-ac', '2', '-c:a', 'pcm_s16le', file]);
}

// A licensed track from assets/music/ if there is one, else Kyntlo's own generated bed.
async function musicTrack(lesson) {
  if (lesson.music === false) return null;
  const files = (await fs.readdir(MUSIC_DIR).catch(() => []))
    .filter((f) => /\.(mp3|wav|m4a|ogg|flac)$/i.test(f)).sort();
  const pick = lesson.music ? files.find((f) => f.startsWith(lesson.music)) : files[0];
  if (pick) return path.join(MUSIC_DIR, pick);
  const own = path.join(CACHE, 'music', 'kyntlo-ambient.wav');
  try {
    await fs.access(own);
  } catch {
    await fs.mkdir(path.dirname(own), { recursive: true });
    await run('python3', ['-I', fileURLToPath(new URL('../music.py', import.meta.url)), own]);
  }
  return own;
}

// Builds the finished lesson: scene clips joined with cross-dissolves, narration,
// ducked music bed, burned-in subtitles, fade in/out.
export async function assemble({ lesson, raw, scenes, narrations, timeline, work, assFile, out }) {
  const { durations, total } = timeline;
  const clips = [];
  const audios = [];
  for (const [i, s] of scenes.entries()) {
    const v = path.join(work, `scene-${String(i).padStart(2, '0')}.mp4`);
    const a = path.join(work, `scene-${String(i).padStart(2, '0')}.wav`);
    await sceneClip(raw, s, durations[i], v);
    await sceneAudio(narrations[i], durations[i], a, {
      clicks: s.clicks.map((t) => t / s.speed),
      whoosh: i > 0 && lesson.whoosh !== false,
    });
    clips.push(v);
    audios.push(a);
    process.stdout.write(`  ✂ edited scene ${i + 1}/${scenes.length}\n`);
  }

  // Join: xfade video and acrossfade audio pairwise along the timeline.
  const inputs = [...clips, ...audios].flatMap((f) => ['-i', f]);
  const n = clips.length;
  let graph = '';
  let v = '[0:v]';
  let a = `[${n}:a]`;
  for (let i = 1; i < n; i++) {
    graph += `${v}[${i}:v]xfade=transition=fade:duration=${XFADE}:offset=${timeline.starts[i].toFixed(3)}[v${i}];`;
    graph += `${a}[${n + i}:a]acrossfade=d=${XFADE}:c1=tri:c2=tri[a${i}];`;
    v = `[v${i}]`;
    a = `[a${i}]`;
  }

  const music = await musicTrack(lesson);
  const fadeOut = Math.max(0, total - 0.8).toFixed(3);
  const subs = assFile.replace(/\\/g, '/').replace(/:/g, '\\:').replace(/'/g, "\\'");
  graph += `${v}subtitles='${subs}',fade=t=in:st=0:d=0.5,fade=t=out:st=${fadeOut}:d=0.8,format=yuv420p[vout];`;
  graph += `${a}loudnorm=I=-16:TP=-1.5:LRA=11,aresample=48000,asplit=2[voice][key];`;
  let extra = [];
  if (music) {
    const m = 2 * n;
    extra = ['-stream_loop', '-1', '-i', music];
    graph += `[${m}:a]aresample=48000,aformat=channel_layouts=stereo,volume=${lesson.musicVolume ?? 0.2},atrim=0:${total.toFixed(3)}[bed];`;
    graph += `[bed][key]sidechaincompress=threshold=0.02:ratio=10:attack=15:release=450[ducked];`;
    graph += `[voice][ducked]amix=inputs=2:normalize=0:duration=first,`;
  } else {
    graph += `[key]anullsink;[voice]`;
  }
  graph += `afade=t=in:st=0:d=0.5,afade=t=out:st=${fadeOut}:d=0.8[aout]`;

  await ffmpeg([...inputs, ...extra, '-filter_complex', graph, '-map', '[vout]', '-map', '[aout]',
    '-t', total.toFixed(3),
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-r', String(FPS),
    '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', '-f', 'mp4', `${out}.part`]);
  // Only a complete file gets the final name, so an interrupted render is never mistaken for a finished one.
  await fs.rename(`${out}.part`, out);

  return { music };
}

// Final length of every scene, where it starts in the finished video, and the total.
export function timeline(scenes, narrations) {
  const durations = scenes.map((s, i) => Math.max((s.end - s.start) / s.speed, LEAD + narrations[i].seconds + TAIL));
  const starts = [];
  let t = 0;
  for (const d of durations) {
    starts.push(t);
    t += d - XFADE;
  }
  return { durations, starts, total: t + XFADE };
}
