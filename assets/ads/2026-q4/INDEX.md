# Kyntlo paid social creative — batch 2026-10

Rendered 22 Sep 2026 from `build.js`. Every asset is generated from HTML, so
re-running the build reproduces the set exactly.

## Filling the tokens before upload

Four numbers come from the Day 0 timing run and are **not yet measured**. Any
asset containing one renders it as a visible amber slot (`N_TIMED`) so an
unmeasured figure cannot ship by accident.

1. Run Day 0.
2. Put the results in `tokens.json`.
3. `NODE_PATH=/opt/node22/lib/node_modules node build.js`

Assets with unfilled tokens: `meta-a-tuesday-test`, `linkedin-a-aed-number`,
`youtube-a-infeed`, `tiktok-a-spreadsheet.mp4`, `youtube-a-spreadsheet.mp4`.

**Assets that ship today, no tokens needed:** the whole six-frame carousel,
`meta-b-62-clinics`, `youtube-b-infeed`, both `*-11pm-lead.mp4`, both Snapchat
frames and both Google Business posts. Every number in these is already
measured from the 62-clinic audit.

## The set

| File | Size | Platform / placement | Concept | Register |
| --- | --- | --- | --- | --- |
| `meta-a-tuesday-test.png` | 1080×1350 | IG + FB feed | The Tuesday Test | Personal |
| `meta-b-62-clinics.png` | 1080×1350 | IG + FB feed | 62 Clinics | Evidential |
| `carousel-01..06.png` | 1080×1350 | IG carousel · LinkedIn document ad | The UAE Clinic Booking Audit | Evidential |
| `linkedin-a-aed-number.png` | 1200×627 | LinkedIn single image | The AED Number | Personal |
| `tiktok-a-spreadsheet.mp4` | 1080×1920 · 21s | TikTok in-feed | Scrolling the Spreadsheet | Personal |
| `tiktok-b-11pm-lead.mp4` | 1080×1920 · 22s | TikTok in-feed | The 11pm Lead | Evidential |
| `youtube-a-spreadsheet.mp4` | 1080×1920 · 21s | YouTube Shorts | Scrolling the Spreadsheet | Personal |
| `youtube-b-11pm-lead.mp4` | 1080×1920 · 22s | YouTube Shorts | The 11pm Lead | Evidential |
| `youtube-a-infeed.png` | 1920×1080 | YouTube in-feed / thumbnail | The Tuesday Test | Personal |
| `youtube-b-infeed.png` | 1920×1080 | YouTube in-feed / thumbnail | 62 Clinics | Evidential |
| `snap-a-closed-inbox.png` | 1080×1920 | Snapchat single image | Open Sign, Closed Inbox | Personal |
| `snap-b-arabic-receipt.png` | 1080×1920 | Snapchat single image (RTL) | Arabic Receipt | Evidential |
| `gbp-a-free-report.png` | 1200×1200 | Google Business "What's new" post | Free Lead Response Report | — |
| `gbp-b-leak-test.png` | 1200×1200 | Google Business "Offer" post | 14-Day Leak Test | — |

`scenes/` holds the stills the motion posts are cut from. They are build
intermediates, not deliverables — but they double as the storyboard if the
videos are ever reshot properly.

## Known limits of this batch

- **`snap-b-arabic-receipt.png` carries a burned-in warning strip.** The Arabic
  is a draft and must be rewritten by a native Gulf-dialect speaker. Remove the
  `.warn` element in `build.js` once the copy is approved, then re-render.
- **The motion posts are cut, not shot.** Scene stills with hard cuts, which is
  the native edit rhythm for these surfaces. If TikTok A wins, reshoot it as a
  real screen recording of the real spreadsheet — the artefact being genuine is
  the whole persuasive mechanism.
- **No photography.** Snapchat A is drawn rather than shot. A real photograph of
  a closed Al Quoz shopfront with a lit phone would outperform it; this version
  exists so the concept can be tested before anyone books a shoot.
- **No testimonials, no faces, no press logos, no customer names** anywhere in
  the set — deliberate, per the campaign plan's launch blockers.
- **No plan prices** in any asset, which sidesteps the unresolved
  USD / EUR / AED inconsistency until the landing page settles it.
