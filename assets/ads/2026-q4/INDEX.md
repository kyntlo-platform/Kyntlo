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

### Guide cuts — never upload these

| File | What it is |
| --- | --- |
| `*-guide-vo.mp4` | The same cut with a synthetic guide read, stamped across the bottom |
| `vo/*-guide.m4a` | That guide read on its own, to record against |
| `VOICEOVER.md` | The script with in/out timecodes per line |

`scenes/` holds the stills the motion posts are cut from. They are build
intermediates, not deliverables — but they double as the storyboard if the
videos are ever reshot properly.

## Voiceover

Every motion post ships twice.

- **`<name>.mp4`** — captions only, no audio. **This is the one that runs.**
  Social video is overwhelmingly watched muted, captions carry it, and a
  silent captioned vertical is standard practice rather than a shortfall.
- **`<name>-guide-vo.mp4`** — the same cut with a synthetic guide read and a
  burned-in `GUIDE TRACK · SYNTHETIC VOICE · NOT FOR UPLOAD` strip.

Neural text-to-speech is unreachable from the build environment — the egress
policy blocks both the Microsoft and Google endpoints — so the guide voice is
espeak-ng with MBROLA diphones. It is 1998-era synthesis: fine for pacing and
for reading along to, not fit to publish.

**Every scene is cut to the length its line actually takes to say**, measured
from the synthesised audio rather than guessed. A natural human read will fit
the picture without re-editing. `VOICEOVER.md` carries the in/out timecode for
every line.

**Concept A should be recorded by the founder, not by anyone else.** It speaks
in the first person — "I filled in the contact form on N Dubai businesses" —
and the whole campaign rests on that claim being literally true. A hired
voice, or a synthetic one, reading a first-person claim is the one shortcut
this particular campaign cannot afford. It is sixty seconds of phone audio.
Concept B makes no first-person claim, so any clear voice suits it.

## Logo

`brand/kyntlo-logo.png` is the full-colour wordmark, copied from
`assets/kyntlo-logo-cropped.png`. `brand/kyntlo-logo-white.png` is a knockout
generated from its alpha channel.

The gradient runs pink into purple, and the purple end falls to roughly 2:1
contrast against the near-black ground — legible at hero scale, muddy at
sign-off scale. So the rule in this batch is: **white knockout on dark
grounds, full-colour wordmark on light ones.** In practice that means every
asset carries the white mark except `meta-a-tuesday-test`, whose white caption
strip takes the full-colour one.

`meta-a-tuesday-test` places the logo in the caption strip rather than on the
image, because that asset's whole premise is that it reads as a phone
screenshot. On Instagram the account name sits above the image anyway, so a
mark in the strip is where a real post would carry it — stamping it on the
screenshot would break the concept the ad is built on.

## Known limits of this batch

- **`snap-b-arabic-receipt.png` carries a burned-in warning strip.** The Arabic
  is a draft and must be rewritten by a native Gulf-dialect speaker. Remove the
  `.warn` element in `build.js` once the copy is approved, then re-render.
- **The motion posts are cut, not shot.** Scene stills with hard cuts, which is
  the native edit rhythm for these surfaces. If TikTok A wins, reshoot it as a
  real screen recording of the real spreadsheet — the artefact being genuine is
  the whole persuasive mechanism.
- **No music bed.** Nothing licensed was available to the build. On TikTok and
  Reels, picking a trending sound in the native editor beats any bed that could
  have been baked in here, so this is close to the right default anyway.
- **No photography.** Snapchat A is drawn rather than shot. A real photograph of
  a closed Al Quoz shopfront with a lit phone would outperform it; this version
  exists so the concept can be tested before anyone books a shoot.
- **No testimonials, no faces, no press logos, no customer names** anywhere in
  the set — deliberate, per the campaign plan's launch blockers.
- **No plan prices** in any asset, which sidesteps the unresolved
  USD / EUR / AED inconsistency until the landing page settles it.
