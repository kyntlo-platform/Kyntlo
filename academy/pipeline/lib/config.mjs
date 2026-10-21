import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

export const ACADEMY = path.resolve(here, '../..');
export const REPO = path.resolve(ACADEMY, '..');
export const CACHE = path.join(ACADEMY, '.cache');
export const OUTPUT = path.join(ACADEMY, 'output');
export const MUSIC_DIR = path.join(ACADEMY, 'assets', 'music');
export const CARD_HTML = path.join(here, '..', 'cards', 'card.html');
export const AUTH_STATE = path.join(ACADEMY, '.auth', 'state.json');

export const VIDEO = { width: 1920, height: 1080, fps: 30 };

export const BRAND = {
  pink: '#f20089',
  purple: '#6d00c1',
  dark: '#120b1f',
  light: '#f5f3fa',
};

export const ENV = {
  appUrl: (process.env.KYNTLO_APP_URL || 'https://hub.kyntlo.ai').replace(/\/$/, ''),
  locationId: process.env.KYNTLO_LOCATION_ID || '',
  siteUrl: (process.env.KYNTLO_SITE_URL || 'http://127.0.0.1:4173').replace(/\/$/, ''),
  geminiKey: process.env.GEMINI_API_KEY || '',
  ttsModel: process.env.GEMINI_TTS_MODEL || 'gemini-2.5-pro-preview-tts',
};

// Narration voice. "Aoede" is warm and friendly; "Kore" is a firmer alternative.
export const VOICE = {
  name: process.env.GEMINI_TTS_VOICE || 'Aoede',
  style:
    'You are a warm, friendly, encouraging course instructor recording a software tutorial. ' +
    'Speak naturally at a relaxed, clear pace, with a light smile in your voice. Read this:',
};

// Narration starts this long after a scene begins and the scene holds this long after it ends.
export const LEAD = 0.5;
export const TAIL = 0.6;
// Cross-dissolve between scenes, in seconds.
export const XFADE = 0.4;

// Narration spells things the way they should sound; subtitles show them the way they're written.
export const WRITTEN = [
  [/\bhub dot kyntlo dot A I\b/gi, 'hub.kyntlo.ai'],
  [/\bkyntlo dot A I\b/gi, 'kyntlo.ai'],
  [/\bfourteen-day\b/gi, '14-day'],
  [/\bninety seconds\b/gi, '90 seconds'],
  [/\bfifteen modules\b/gi, '15 modules'],
];

export function expand(url) {
  return url
    .replaceAll('{app}', ENV.appUrl)
    .replaceAll('{loc}', ENV.locationId)
    .replaceAll('{site}', ENV.siteUrl);
}
