// Shared settings and helpers for Kyntlo Team Academy lessons (Batch 1: s01-s05).
// Each video has its own theme (themes/sNN.js), scene page (scenes/sNN.html), music preset
// and transitions; this file holds what they share: voice, pacing, formats, watermark,
// on-screen text rules and the demo-workspace helpers lessons call on camera.
import { fileURLToPath } from 'node:url';

const KIT = new URL('./', import.meta.url);

// Subtitle box and portrait title colours per video (ASS colours are &HAABBGGRR).
const LOOK = {
  s01: { box: '#1a0820', title: '&H009B2EFF' },
  s02: { box: '#0b1630', title: '&H00EED322' },
  s03: { box: '#1f2937', title: '&H006B6BFF' },
  s04: { box: '#123a3a', title: '&H00A6B814' },
  s05: { box: '#07140f', title: '&H0042C5F5' },
};

export function team(video) {
  const src = `{site}/academy/lessons/team/scenes/${video}.html`;
  const look = LOOK[video];
  const base = {
    tags: [],
    formats: ['landscape', 'portrait'],
    auth: false,
    init: [new URL(`themes/${video}.js`, KIT), new URL('demo-patch.js', KIT)],
    // Energetic narrator; customers' lines (the hooks) use their own voices.
    voice: { voice: 'af_heart', speed: 1.06 },
    lead: 0.25,
    tail: 0.5,
    xfade: 0.35,
    // Music stays audible under the voice: a gentle duck rather than a hard one.
    musicVolume: 0.27,
    duckRatio: 4,
    musicFilter: 'lowpass=f=11000',
    watermark: {
      file: fileURLToPath(new URL('watermark.png', KIT)),
      landscape: { x: 51, y: 4, w: 178 },
      portrait: { x: 49, y: 49, w: 222 },
    },
    portraitFrame: { src },
    subtitles: {
      landscape: { box: look.box, boxOpacity: 0.86 },
      portrait: { box: look.box, boxOpacity: 0.9, titleFont: 'Inter Display', titleColour: look.title, line: 24 },
    },
    // Checked on every scene in --check runs.
    bannedWords: ['HighLevel', 'GHL', 'LeadConnector', '–', '—'],
  };
  const call = (fn, ...args) => async (page) => page.evaluate(([fn, args]) => window.__team[fn](...args), [fn, args]);
  return {
    base,
    page: (scene, extra = {}) => ({ src, scene, ...extra }),
    chips: (anchor, items, opts) => call('chips', anchor, items, opts),
    clearChips: call('clearChips'),
    message: (thread, msg) => call('message', thread, msg),
    booking: (appt) => call('booking', appt),
    gaps: (opts) => call('gaps', opts),
    clearGaps: call('clearGaps'),
    row: (table, cells, id) => call('row', table, cells, id),
    toast: (msg) => call('toast', msg),
  };
}
