import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { CACHE, ENV, VOICE } from './config.mjs';
import { ffmpeg, duration } from './run.mjs';

const MODELS = path.join(CACHE, 'models');
const KOKORO = fileURLToPath(new URL('../kokoro_tts.py', import.meta.url));
const TRIM =
  'silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse';

const ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models';

// Gemini TTS returns raw 16-bit PCM, mono, 24 kHz.
async function gemini(text, wav) {
  const res = await fetch(`${ENDPOINT}/${ENV.ttsModel}:generateContent`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-goog-api-key': ENV.geminiKey },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `${VOICE.style}\n\n${text}` }] }],
      generationConfig: {
        responseModalities: ['AUDIO'],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: VOICE.name } } },
      },
    }),
  });
  if (!res.ok) throw new Error(`Gemini TTS ${res.status}: ${(await res.text()).slice(0, 500)}`);
  const json = await res.json();
  const data = json.candidates?.[0]?.content?.parts?.find((p) => p.inlineData)?.inlineData?.data;
  if (!data) throw new Error(`Gemini TTS returned no audio: ${JSON.stringify(json).slice(0, 500)}`);
  const pcm = wav.replace(/\.wav$/, '.pcm');
  await fs.writeFile(pcm, Buffer.from(data, 'base64'));
  // Trim leading/trailing silence so our own LEAD/TAIL control the pacing.
  await ffmpeg([
    '-f', 's16le', '-ar', '24000', '-ac', '1', '-i', pcm,
    '-af', TRIM, '-ar', '48000', '-ac', '2', wav,
  ]);
  await fs.rm(pcm);
}

// Kokoro loads its model once per process, so a whole lesson is voiced in one batch.
async function kokoro(jobs) {
  const items = jobs.map(({ text, wav }) => ({ text, out: wav.replace(/\.wav$/, '.k.wav'), wav }));
  await new Promise((resolve, reject) => {
    const p = spawn('python3', ['-I', KOKORO, MODELS], { stdio: ['pipe', 'ignore', 'pipe'] });
    let err = '';
    p.stderr.on('data', (d) => (err += d));
    p.on('close', (c) => (c ? reject(new Error(`Kokoro TTS failed: ${err.slice(-1500)}`)) : resolve()));
    p.stdin.end(JSON.stringify(items.map(({ text, out }) => ({ text, out }))));
  });
  for (const { out, wav } of items) {
    await ffmpeg(['-i', out, '-af', TRIM, '-ar', '48000', '-ac', '2', wav]);
    await fs.rm(out);
  }
}

// Each engine voices a batch of { text, wav } jobs.
const oneByOne = (fn) => async (jobs) => { for (const j of jobs) await fn(j.text, j.wav); };

async function engine() {
  if (ENV.geminiKey) return { name: `gemini:${ENV.ttsModel}:${VOICE.name}`, make: oneByOne(gemini) };
  try {
    await fs.access(path.join(MODELS, 'kokoro-v1.0.onnx'));
    return { name: `kokoro:${process.env.KOKORO_VOICE || 'af_heart'}`, make: kokoro };
  } catch {
    return { name: 'draft', make: oneByOne(draft) };
  }
}

// Without any voice engine we render a silent draft timed at a natural speaking pace,
// so recordings, edits and subtitles can be reviewed before the voice exists.
async function draft(text, wav) {
  const words = text.trim().split(/\s+/).length;
  const secs = Math.max(1.2, words / 2.6 + 0.3);
  await ffmpeg(['-f', 'lavfi', '-i', `anullsrc=r=48000:cl=stereo`, '-t', secs.toFixed(2), wav]);
}

// Voices every text (cached by content), returning { file, seconds, draft, engine } per text.
export async function narrateAll(texts) {
  const { name, make } = await engine();
  const dir = path.join(CACHE, 'tts');
  await fs.mkdir(dir, { recursive: true });
  const wavs = texts.map((text) => {
    const key = crypto.createHash('sha1').update(`${name}\n${VOICE.style}\n${text}`).digest('hex');
    return path.join(dir, `${key.slice(0, 16)}.wav`);
  });
  const missing = [];
  for (const [i, wav] of wavs.entries()) {
    if (!(await fs.access(wav).then(() => true, () => false)) && !missing.some((m) => m.wav === wav)) missing.push({ text: texts[i], wav });
  }
  if (missing.length) await make(missing);
  return Promise.all(wavs.map(async (file) => ({ file, seconds: await duration(file), draft: name === 'draft', engine: name })));
}
