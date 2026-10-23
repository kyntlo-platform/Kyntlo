import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CACHE, LEAD, MUSIC_DIR, TAIL, VIDEO, XFADE } from './config.mjs';
import { ffmpeg, run } from './run.mjs';

const { width: W, height: H, fps: FPS } = VIDEO;
const EASE = 0.7; // seconds to ease in/out of a zoom
const ss = (a) => `(${a})*(${a})*(3-2*(${a}))`; // smoothstep

// Portrait (1080x1920) layout for app screens: a framed window over a moving crop of the
// landscape recording, with a title band above and a subtitle band below.
export const PORTRAIT = { width: 1080, height: 1920, win: { x: 40, y: 310, w: 1000, h: 1290 }, zoom: 1.3, zoomGain: 0.5 };

// Smooth zoom with zoompan, which (unlike scale+crop) re-evaluates position on
// every frame. The frame is upscaled 2x first so the pan moves in half-pixel
// steps instead of visibly jittering.
const UP = 2;
function zoomFilter(zooms, w = W, h = H) {
  if (!zooms.length) return '';
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
    `scale=${w * UP}:${h * UP}:flags=bicubic,` +
    `zoompan=z='1+${terms.join('+')}':` +
    `x='clip(${centre('x')}-iw/zoom/2,0,iw-iw/zoom)':y='clip(${centre('y')}-ih/zoom/2,0,ih-ih/zoom)':` +
    `d=1:s=${w}x${h}:fps=${FPS},`
  );
}

const sceneZooms = (scene) => scene.zooms.map((z) => ({ ...z, t: z.t / scene.speed, for: z.for / scene.speed }));

async function sceneClip(raw, scene, seconds, file, size = VIDEO) {
  const len = scene.end - scene.start;
  const vf =
    `setpts=(PTS-STARTPTS)/${scene.speed},fps=${FPS},` +
    zoomFilter(sceneZooms(scene), size.width, size.height) +
    `tpad=stop_mode=clone:stop_duration=30,trim=duration=${seconds.toFixed(3)},setsar=1,format=yuv420p`;
  await ffmpeg(['-ss', scene.start.toFixed(3), '-t', len.toFixed(3), '-i', raw, '-an', '-vf', vf,
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '12', file]);
}

// Glides between the points the scene drew attention to (2x pixel space), easing into each
// one just before its action happens. `v` is the time variable of the filter it is used in.
function glide(points, axis, v) {
  let expr = (UP * points[0][axis]).toFixed(1);
  for (let k = 1; k < points.length; k++) {
    const d = UP * (points[k][axis] - points[k - 1][axis]);
    if (Math.abs(d) < 2) continue;
    expr += `+${d.toFixed(1)}*${ss(`clip((${v}-${Math.max(0, points[k].t - 0.35).toFixed(3)})/0.7,0,1)`)}`;
  }
  return expr;
}

// Portrait app scene: crop of the landscape recording that follows the action, inside a frame.
async function framedClip(raw, scene, seconds, file, { frame, start }) {
  const { win, zoom, zoomGain } = PORTRAIT;
  const len = scene.end - scene.start;
  const cw = Math.round((UP * H * win.w) / win.h / 2) * 2; // crop width (2x space) with the window's shape
  const fallback = { t: 0, x: start?.[0] ?? 1100, y: start?.[1] ?? 540 };
  let points = scene.focus.map((f) => ({ t: f.t / scene.speed, x: f.x, y: f.y }));
  if (start || !points.length || points[0].t > 0.6) points = [fallback, ...points];
  // Ignore tiny moves so the frame doesn't twitch.
  points = points.filter((p, i, a) => i === 0 || Math.hypot(p.x - a[i - 1].x, p.y - a[i - 1].y) > 40);
  const cropX = (v) => `clip(${glide(points, 'x', v)}-${cw / 2},0,${UP * W - cw})`;
  const zooms = sceneZooms(scene);
  const terms = zooms.map(({ t, for: d, scale }) =>
    `${(zoomGain * (scale - 1)).toFixed(3)}*${ss(`clip((it-${t.toFixed(3)})/${EASE},0,1)`)}*(1-${ss(`clip((it-${(t + d + EASE).toFixed(3)})/${EASE},0,1)`)})`);
  const z = `${zoom}*(1${terms.map((x) => '+' + x).join('')})`;
  const graph =
    `[0:v]setpts=(PTS-STARTPTS)/${scene.speed},fps=${FPS},scale=${W * UP}:${H * UP}:flags=bicubic,` +
    `crop=w=${cw}:h=${H * UP}:x='${cropX('t')}':y=0,` +
    `zoompan=z='${z}':x='clip(${glide(points, 'x', 'it')}-${cropX('it')}-iw/zoom/2,0,iw-iw/zoom)':` +
    `y='clip(${glide(points, 'y', 'it')}-ih/zoom/2,0,ih-ih/zoom)':d=1:s=${win.w}x${win.h}:fps=${FPS},` +
    `tpad=stop_mode=clone:stop_duration=30,trim=duration=${seconds.toFixed(3)},setsar=1[app];` +
    `color=c=black:s=${PORTRAIT.width}x${PORTRAIT.height}:r=${FPS}:d=${seconds.toFixed(3)}[bg];` +
    `[bg][app]overlay=${win.x}:${win.y}[b];[b][1:v]overlay=0:0,format=yuv420p[v]`;
  await ffmpeg(['-ss', scene.start.toFixed(3), '-t', len.toFixed(3), '-i', raw,
    '-loop', '1', '-t', seconds.toFixed(3), '-i', frame, '-filter_complex', graph, '-map', '[v]', '-an',
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

async function sceneAudio(narration, seconds, file, { clicks, whoosh, lead = LEAD }) {
  const fx = await sfx();
  const ms = (t) => Math.max(0, Math.round(t * 1000));
  const inputs = ['-i', narration.file];
  const parts = [`[0:a]adelay=${ms(lead)}|${ms(lead)}[n]`];
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
// A lesson can also name a track file directly, or a generated team preset ({ preset }).
async function musicTrack(lesson) {
  if (lesson.music === false) return null;
  if (lesson.music?.preset) {
    const file = path.join(CACHE, 'music', `team-${lesson.music.preset}.wav`);
    try {
      await fs.access(file);
    } catch {
      await fs.mkdir(path.dirname(file), { recursive: true });
      await run('python3', ['-I', fileURLToPath(new URL('../team_music.py', import.meta.url)), lesson.music.preset, file, '240']);
    }
    return file;
  }
  if (typeof lesson.music === 'string' && path.isAbsolute(lesson.music)) return lesson.music;
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

// Joins time windows that touch, and turns them into an ffmpeg `enable` expression.
function windows(list) {
  const merged = [];
  for (const [a, b] of list) {
    const last = merged[merged.length - 1];
    if (last && a <= last[1] + 0.05) last[1] = Math.max(last[1], b);
    else merged.push([a, b]);
  }
  return merged.map(([a, b]) => `between(t,${a.toFixed(3)},${b.toFixed(3)})`).join('+') || '0';
}

// Builds the finished lesson: scene clips joined with transitions, narration, ducked music
// bed, burned-in subtitles, optional corner watermark, fade in/out.
// Portrait: designed scenes come from the portrait recording (`portrait.raw/scenes`), app
// scenes are framed crops of the landscape recording; timing always follows the landscape.
export async function assemble({ lesson, raw, scenes, narrations, timeline, work, assFile, out, format = 'landscape', portrait = null }) {
  const { durations, total } = timeline;
  const size = format === 'portrait' ? PORTRAIT : VIDEO;
  const xfade = lesson.xfade ?? XFADE;
  const clips = [];
  const audios = [];
  for (const [i, s] of scenes.entries()) {
    const own = lesson.scenes[i] || {};
    const v = path.join(work, `${format === 'portrait' ? 'p-' : ''}scene-${String(i).padStart(2, '0')}.mp4`);
    const a = path.join(work, `scene-${String(i).padStart(2, '0')}.wav`);
    if (format !== 'portrait') await sceneClip(raw, s, durations[i], v);
    else if (own.card || own.page) await sceneClip(portrait.raw, portrait.scenes[i], durations[i], v, PORTRAIT);
    else await framedClip(raw, s, durations[i], v, { frame: portrait.frame, start: own.pfocus });
    // The audio is the same in both formats, so the portrait pass reuses it.
    if (format !== 'portrait' || !(await fs.access(a).then(() => true, () => false))) {
      await sceneAudio(narrations[i], durations[i], a, {
        clicks: s.clicks.map((t) => t / s.speed),
        whoosh: i > 0 && lesson.whoosh !== false,
        lead: lesson.lead ?? LEAD,
      });
    }
    clips.push(v);
    audios.push(a);
    process.stdout.write(`  ✂ edited ${format === 'portrait' ? 'portrait ' : ''}scene ${i + 1}/${scenes.length}\n`);
  }

  // Join: transition video and crossfade audio pairwise along the timeline.
  const inputs = [...clips, ...audios].flatMap((f) => ['-i', f]);
  const n = clips.length;
  let graph = '';
  let v = '[0:v]';
  let a = `[${n}:a]`;
  for (let i = 1; i < n; i++) {
    const kind = lesson.scenes[i]?.transition || (lesson.transitions ? lesson.transitions[(i - 1) % lesson.transitions.length] : 'fade');
    graph += `${v}[${i}:v]xfade=transition=${kind}:duration=${xfade}:offset=${timeline.starts[i].toFixed(3)}[v${i}];`;
    graph += `${a}[${n + i}:a]acrossfade=d=${xfade}:c1=tri:c2=tri[a${i}];`;
    v = `[v${i}]`;
    a = `[a${i}]`;
  }

  const music = await musicTrack(lesson);
  const fadeOut = Math.max(0, total - 0.8).toFixed(3);
  const subs = assFile.replace(/\\/g, '/').replace(/:/g, '\\:').replace(/'/g, "\\'");
  let extra = [];
  let next = 2 * n;
  const mark = lesson.watermark && lesson.watermark[format];
  if (mark) {
    // The corner wordmark shows on every scene except those that carry the wordmark themselves.
    const shown = timeline.starts.map((st, i) => [st + (i ? xfade : 0), st + durations[i]]).filter((_, i) => lesson.scenes[i]?.watermark !== false);
    extra.push('-loop', '1', '-i', lesson.watermark.file);
    graph += `[${next}:v]scale=${mark.w}:-1,format=rgba,colorchannelmixer=aa=${lesson.watermark.opacity ?? 0.92}[wm];`;
    graph += `${v}[wm]overlay=${mark.x}:${mark.y}:enable='${windows(shown)}':shortest=1[vm];`;
    v = '[vm]';
    next++;
  }
  graph += `${v}subtitles='${subs}',fade=t=in:st=0:d=0.5,fade=t=out:st=${fadeOut}:d=0.8,format=yuv420p[vout];`;
  graph += `${a}loudnorm=I=-16:TP=-1.5:LRA=11,aresample=48000,asplit=2[voice][key];`;
  if (music) {
    extra.push('-stream_loop', '-1', '-i', music);
    graph += `[${next}:a]aresample=48000,aformat=channel_layouts=stereo,${lesson.musicFilter ? lesson.musicFilter + ',' : ''}volume=${lesson.musicVolume ?? 0.2},atrim=0:${total.toFixed(3)}[bed];`;
    graph += `[bed][key]sidechaincompress=threshold=0.02:ratio=${lesson.duckRatio ?? 10}:attack=15:release=450[ducked];`;
    graph += `[voice][ducked]amix=inputs=2:normalize=0:duration=first,`;
  } else {
    graph += `[key]anullsink;[voice]`;
  }
  graph += `afade=t=in:st=0:d=0.5,afade=t=out:st=${fadeOut}:d=0.8[aout]`;

  await ffmpeg([...inputs, ...extra, '-filter_complex', graph, '-map', '[vout]', '-map', '[aout]',
    '-t', total.toFixed(3),
    '-c:v', 'libx264', '-preset', 'medium', '-crf', String(lesson.crf ?? 18), '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-r', String(FPS),
    '-s', `${size.width}x${size.height}`,
    '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', '-f', 'mp4', `${out}.part`]);
  // Only a complete file gets the final name, so an interrupted render is never mistaken for a finished one.
  await fs.rename(`${out}.part`, out);

  return { music };
}

// Final length of every scene, where it starts in the finished video, and the total.
export function timeline(scenes, narrations, lesson = {}) {
  const lead = lesson.lead ?? LEAD;
  const tail = lesson.tail ?? TAIL;
  const xfade = lesson.xfade ?? XFADE;
  const durations = scenes.map((s, i) => Math.max((s.end - s.start) / s.speed, lead + narrations[i].seconds + (lesson.scenes?.[i]?.tail ?? tail), lesson.scenes?.[i]?.duration ?? 0));
  const starts = [];
  let t = 0;
  for (const d of durations) {
    starts.push(t);
    t += d - xfade;
  }
  return { durations, starts, total: t + xfade };
}
