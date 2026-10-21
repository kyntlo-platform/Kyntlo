import fs from 'node:fs/promises';
import path from 'node:path';
import { LEAD, MUSIC_DIR, TAIL, VIDEO, XFADE } from './config.mjs';
import { ffmpeg } from './run.mjs';

const { width: W, height: H, fps: FPS } = VIDEO;
const EASE = 0.7; // seconds to ease in/out of a zoom

// Smooth zoom: scale the frame up per-frame, then crop a fixed 1920x1080
// window that follows the target, clamped to the frame edges.
function zoomFilter(zooms) {
  if (!zooms.length) return '';
  const ss = (a) => `(${a})*(${a})*(3-2*(${a}))`; // smoothstep
  const terms = zooms.map(({ t, for: d, scale }) => {
    const up = ss(`clip((t-${t.toFixed(3)})/${EASE},0,1)`);
    const down = ss(`clip((t-${(t + d + EASE).toFixed(3)})/${EASE},0,1)`);
    return `${(scale - 1).toFixed(3)}*${up}*(1-${down})`;
  });
  const z = `(1+${terms.join('+')})`;
  // Centre of attention eases between targets; outside a zoom it doesn't matter (z=1).
  const cx = zooms.reduce((acc, { t, rect }, i) => {
    const c = rect.x + rect.width / 2;
    return i === 0 ? `${c}` : `if(gte(t,${(t - EASE).toFixed(3)}),${c},${acc})`;
  }, '');
  const cy = zooms.reduce((acc, { t, rect }, i) => {
    const c = rect.y + rect.height / 2;
    return i === 0 ? `${c}` : `if(gte(t,${(t - EASE).toFixed(3)}),${c},${acc})`;
  }, '');
  return (
    `scale=w='2*trunc(${W}*${z}/2)':h='2*trunc(${H}*${z}/2)':eval=frame:flags=bicubic,` +
    `crop=${W}:${H}:x='clip(${cx}*iw/${W}-${W / 2},0,iw-${W})':y='clip(${cy}*ih/${H}-${H / 2},0,ih-${H})',`
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

async function sceneAudio(narration, seconds, file) {
  const ms = Math.round(LEAD * 1000);
  await ffmpeg(['-i', narration.file, '-af', `adelay=${ms}|${ms},apad,atrim=0:${seconds.toFixed(3)}`,
    '-ar', '48000', '-ac', '2', '-c:a', 'pcm_s16le', file]);
}

async function musicTrack(lesson) {
  if (lesson.music === false) return null;
  try {
    const files = (await fs.readdir(MUSIC_DIR)).filter((f) => /\.(mp3|wav|m4a|ogg|flac)$/i.test(f)).sort();
    const pick = lesson.music ? files.find((f) => f.startsWith(lesson.music)) : files[0];
    return pick ? path.join(MUSIC_DIR, pick) : null;
  } catch {
    return null;
  }
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
    await sceneAudio(narrations[i], durations[i], a);
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
    graph += `[${m}:a]aresample=48000,aformat=channel_layouts=stereo,volume=${lesson.musicVolume ?? 0.16},atrim=0:${total.toFixed(3)}[bed];`;
    graph += `[bed][key]sidechaincompress=threshold=0.02:ratio=10:attack=15:release=450[ducked];`;
    graph += `[voice][ducked]amix=inputs=2:normalize=0:duration=first,`;
  } else {
    graph += `[key]anullsink;[voice]`;
  }
  graph += `afade=t=in:st=0:d=0.5,afade=t=out:st=${fadeOut}:d=0.8[aout]`;

  await ffmpeg([...inputs, ...extra, '-filter_complex', graph, '-map', '[vout]', '-map', '[aout]',
    '-t', total.toFixed(3),
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-r', String(FPS),
    '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', out]);

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
