# Kyntlo Academy — Video Production

Course videos explaining the Kyntlo platform. Each video is 16:9, 1920×1080,
30 fps, with an AI voiceover, subtitles, zooms, highlights and branded cards.
Everything is generated from lesson scripts, so a video can be re-rendered
whenever the interface changes.

- **Course map:** [`curriculum.md`](curriculum.md) (3 tracks, 98 videos)
- **Lesson scripts:** [`lessons/`](lessons) (`customer/`, `prospect/`, `support/`)
- **Pipeline:** [`pipeline/`](pipeline)
- **Output:** `output/` (not committed) — `.mp4`, `.srt`, `.youtube.txt`, `.thumb.png`

## How a video is made

```
lesson script ─► narration (Gemini TTS, voice "Aoede") ─► recording (Chromium, real app)
             ─► edit (trim · speed · zoom · cross-dissolve · subtitles · music ducking · fades)
             ─► lesson.mp4 + lesson.srt + YouTube description with chapters + thumbnail
```

1. **Narration.** Each scene's `say` text is spoken by the first available engine:
   - **Gemini TTS** (voice `Aoede`) when `GEMINI_API_KEY` is set.
   - **Kokoro** (open-source, Apache-2.0, voice `af_heart`), running locally, when its
     model files are in `.cache/models/` (`pip install kokoro-onnx soundfile`, then download
     `kokoro-v1.0.onnx` and `voices-v1.0.bin` from the
     [kokoro-onnx releases](https://github.com/thewh1teagle/kokoro-onnx/releases/tag/model-files-v1.0)).
     `KOKORO_VOICE` / `KOKORO_SPEED` adjust it.
   - Otherwise a silent *draft* (`*.draft.mp4`) timed at natural speaking pace.
2. **Recording.** A real browser plays the lesson. The recorder adds an animated
   cursor, click ripples, spotlight highlights with labels, and lower-third
   titles. Each scene lasts as long as its narration.
3. **Edit.** ffmpeg cuts out loading time between scenes, applies speed changes
   and smooth zoom-ins, joins scenes with cross-dissolves, burns in subtitles,
   adds soft click sounds and transition whooshes, ducks the music under the voice,
   normalises loudness (−16 LUFS) and fades in and out.

## Setup (one time)

Set these in the cloud environment settings. **Never paste them into chat or commit them.**

| Variable | What it is |
|---|---|
| `GEMINI_API_KEY` | Google AI Studio API key (voiceover) |
| `KYNTLO_EMAIL` / `KYNTLO_PASSWORD` | Login of the **demo** Pro sub-account user |
| `KYNTLO_LOCATION_ID` | Demo sub-account id (printed by `npm run login`) |
| `KYNTLO_APP_URL` | Optional, default `https://hub.kyntlo.ai` |
| `GEMINI_TTS_VOICE` / `GEMINI_TTS_MODEL` | Optional, default `Aoede` / `gemini-2.5-pro-preview-tts` |

Network: allow `generativelanguage.googleapis.com` (voice) and the hosts the
app loads: `*.kyntlo.ai`, `*.leadconnectorhq.com`, `*.msgsndr.com`,
`*.gohighlevel.com`, `storage.googleapis.com`, `cdn.jsdelivr.net`. If a
recording shows blank panels, the run prints which hosts were refused.

Music: by default every video uses Kyntlo's own ambient bed, composed by
`pipeline/music.py` (original, free to use anywhere). To use licensed tracks
instead, drop them into `assets/music/` (not committed): the first file
alphabetically is used, or set `music: 'filename-prefix'` in a lesson;
`music: false` turns music off.

```bash
cd academy/pipeline
npm install
npm run login                                     # saves the app session to academy/.auth/
node render.mjs ../lessons/customer/a01-02-interface-tour.mjs
node render.mjs ../lessons/customer               # a whole track
```

The website pilot (`lessons/prospect/b0-website-pilot.mjs`) films the marketing
site and needs it served locally first: `npx http-server -p 4173 -s ..` from `pipeline/`.

## Writing a lesson

A lesson is a JS module. Each scene is one beat of narration with the actions that happen on screen while it plays.

```js
export default {
  id: 'A-3.2',
  title: 'Kyntlo Academy 3.2 — Adding & importing contacts',
  description: 'Shown on YouTube above the chapter list.',
  tags: ['Kyntlo', 'CRM tutorial'],
  plan: 'ALL',                  // ALL | GROWTH+ | PRO | ADD-ON — badge on the intro card
  thumbnail: { kicker: 'Module 3 · Lesson 2', title: 'Import your *contacts*' },
  scenes: [
    { chapter: 'Intro', card: { type: 'intro', kicker: 'Module 3 · Lesson 2', title: 'Adding & *importing* contacts' },
      say: 'In this lesson…' },
    { chapter: 'Import a CSV',
      goto: '{app}/v2/location/{loc}/contacts/smart_list/All',  // off camera; loading is cut
      settle: 1.5,                                              // seconds to let the page calm down
      speed: 1,                                                 // >1 speeds up the scene (e.g. 2 for long typing)
      say: 'Click Import, then choose your file…',
      actions: [
        { at: 0.5, click: ['button:has-text("Import")', 'text=Import'] },  // selector or fallbacks
        { at: 2.0, highlight: '.modal', label: 'Pick your CSV', for: 3 },
        { at: 2.2, zoom: '.modal', scale: 1.6, for: 3 },                  // or zoom: 'cursor'
        { at: 5.5, type: 'Bloom Dental', into: 'input[placeholder*="Search"]' },
        { at: 8.0, title: 'Tip', sub: 'Map every column before importing', for: 3 },
      ] },
    { card: { type: 'outro', kicker: 'Up next', title: '…', cta: 'Kyntlo [Academy]' }, say: '…' },
  ],
};
```

**Before live app access**, a scene can show a real screenshot of the app in a
`hub.kyntlo.ai` browser frame with `screen: { img: 'assets/….png', url: 'hub.kyntlo.ai/…' }`.
Targets are then `{ x, y, w, h }` in screenshot pixels instead of selectors (see
`lessons/customer/a02-01-reading-your-dashboard.mjs`).

Actions: `goto`, `click`, `hover`, `move: [x, y]`, `type` (+`into`), `press`,
`scroll` (+`ms`), `highlight` (+`label`, `for`), `zoom` (+`scale`, `for`),
`title` (+`sub`, `for`), `wait`, `run: async (page) => {}`. `at` is seconds
from the start of the scene. Card types: `intro`, `chapter`, `outro`. In
titles, `*word*` renders in the brand gradient; in a `cta`, `[word]` renders pink.

Writing style for narration: short sentences, second person ("you"), one idea
per scene, numbers spelled the way they should be spoken ("fourteen-day",
"kyntlo dot A I"). Subtitles convert these back to their written form using
`WRITTEN` in `pipeline/lib/config.mjs`; a scene can also set `caption` to override its subtitle text.

## Team Academy videos (`lessons/team/`)

Short, ad-style training videos for the sales and support team (Batch 1: `s01`–`s05`).
They use the same recorder and demo workspace, plus a few lesson options:

| Option | What it does |
|---|---|
| `formats: ['landscape', 'portrait']` | Also renders `name-portrait.mp4` (1080×1920). Designed scenes are recorded again at portrait size; app scenes become a framed crop of the landscape recording that follows the action (clicks, highlights, zooms, or a `focus` action). |
| `page: { src, scene }` | A designed scene from `lessons/team/scenes/sNN.html` (intro, hook, motion graphics, tip, outro). `cursor: true` shows the cursor for scenes the lesson clicks through. |
| `voice: { voice, speed }` | Kokoro voice for the lesson or a single scene (the customer's hook uses its own voice). |
| `init: [...]` | Scripts injected into every page: `kit/themes/sNN.js` (colours and fonts) and `kit/demo-patch.js` (each video's fictional data, plain hyphens only, `example.com` emails, live helpers such as a message arriving or a booking landing). |
| `transitions`, `music: { preset }`, `watermark` | Per-video transitions, an original track from `pipeline/team_music.py`, and the white wordmark in the corner. |
| `lead`, `tail`, `xfade`, scene `tail` / `duration` | Pacing. |

```bash
node render.mjs ../lessons/team/s02-losing-leads.mjs --check   # every action, no video
node render.mjs ../lessons/team                                # all five, landscape + portrait
```

## Publishing checklist

- [ ] Watch the full video once at 1×, with sound
- [ ] Every claim and price matches the current pricing page
- [ ] No real customer data on screen (demo account only)
- [ ] Upload `.srt` as the caption track (YouTube / Udemy / Teachable)
- [ ] Paste `.youtube.txt` into the description (contains chapters)
- [ ] Use `.thumb.png` as the thumbnail
- [ ] Add to the module playlist in order
