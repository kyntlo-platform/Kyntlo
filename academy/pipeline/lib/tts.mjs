import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { CACHE, ENV, VOICE } from './config.mjs';
import { ffmpeg, duration } from './run.mjs';

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
    '-af', 'silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse',
    '-ar', '48000', '-ac', '2', wav,
  ]);
  await fs.rm(pcm);
}

// Without an API key we render a silent draft timed at a natural speaking pace,
// so recordings, edits and subtitles can be reviewed before the voice exists.
async function draft(text, wav) {
  const words = text.trim().split(/\s+/).length;
  const secs = Math.max(1.2, words / 2.6 + 0.3);
  await ffmpeg(['-f', 'lavfi', '-i', `anullsrc=r=48000:cl=stereo`, '-t', secs.toFixed(2), wav]);
}

export async function narrate(text) {
  const mode = ENV.geminiKey ? `${ENV.ttsModel}:${VOICE.name}` : 'draft';
  const key = crypto.createHash('sha1').update(`${mode}\n${VOICE.style}\n${text}`).digest('hex');
  const dir = path.join(CACHE, 'tts');
  await fs.mkdir(dir, { recursive: true });
  const wav = path.join(dir, `${key.slice(0, 16)}.wav`);
  try {
    await fs.access(wav);
  } catch {
    await (ENV.geminiKey ? gemini(text, wav) : draft(text, wav));
  }
  return { file: wav, seconds: await duration(wav), draft: !ENV.geminiKey };
}
