# v3 creative build — five formats, one offer

## Why there are five, and why they don't look alike

The v2 set was four ads that shared one device: a phone mockup on a dark
gradient. Two problems with that, one obvious and one not.

The obvious one is monotony — four ads that look identical cannot tell you
which *idea* won, only which caption won.

The other is that the device itself is a weak format. In the Meta format
taxonomy, notes-app and fake-native UI ads sit at the bottom: the familiar
interface makes *everyone* stop, so the ad qualifies nobody and hands the
algorithm a muddy signal. They look native and perform like filler.

So v3 is a portfolio, not a series. Five formats across the tier list, each
with its own visual system, each arguing for the same offer a different way:

| Ad | Format | Tier | Role | Look |
|----|--------|------|------|------|
| `v3-vsl` | VSL | S | cold scaler | light-ground editorial typography |
| `v3-audit` | Amateur investigation | A | cold scaler | dark data grid, 62 cells |
| `v3-stack` | David & Goliath | A | cold-capable | a tower of tools, and its gaps |
| `v3-objections` | Objection handling | B | converter (retargeting) | struck-through quote posters |
| `v3-timeline` | Educational infographic | B | converter (retargeting) | a clock running against one lead |

Ads 1–3 go cold. Ads 4–5 go to retargeting pools, so they never compete with
1–3 for the same impression and the read stays clean.

## The offer

Identical in all five: **we measure your reply gap, free, in 24 hours.** One
ask, no form, no price, no demo. Dubai set lands on Click-to-WhatsApp; the US
set lands on `kyntlo.ai/leak-test` once that page exists.

## Where the numbers come from

Every figure on screen is either from the 62-clinic audit (35 / 18 / 43 / 8 of
62) or arithmetic the viewer can check as it happens (19:41 → 09:12 is 13h
31m, and the ad counts it up on screen rather than asserting it). Nothing is
invented, and no number appears that we cannot show the working for.

## How they are built

| Stage | Script | What it does |
|---|---|---|
| 1 | `v3-spec.py` | the five scripts → `v3.json`; line breaks are a typographic decision, so the copy is written to the break |
| 2 | `v3-vo.py` | 37 unique lines, one model per ad against an ~11/day free-tier cap; the closing line is reused from v2 rather than re-requested |
| 3 | `v3-fit.py` | measures every rendered line and cuts the picture to it — speeds a read to 1.25× at most, widens the scene past that → `v3-final.json` |
| 4 | `v3-scenes.js` | Playwright frame capture, six looks, 720×1200 safe band → `frames/<ad>/` |
| 5 | `music-v3.py` | one 104 BPM bed per ad at that ad's final length, gain shaped to where its argument turns |
| 6 | `assemble-v3.py` | frames + narration + bed, sidechain-ducked, loudnorm −14 LUFS → `kyntlo-<ad>.mp4` |

Stage 3 runs **before** stage 4 on purpose. The v2 build rendered first and
then found fourteen scenes shorter than the line they had to carry. Measuring
first costs nothing and re-renders nothing.

## Constraints the renderer holds

- **720×1200 safe band**, x=180 y=220. Nothing load-bearing outside it.
- **Native caption treatment** (white fill, 9px black stroke, no pill) wherever
  text sits over the field rather than a flat panel — ~85% of feed video is
  watched muted, and a caption that looks like an ad gets treated like one.
- **Deterministic**: no clocks, no randomness. `setT(t)` fully fixes the frame,
  so a re-render is byte-comparable.
- **One type size per block.** Lines set at different sizes read as an accident
  rather than a hierarchy, so `fitGroup` finds the largest size that keeps
  every line of a block unbroken and applies it to all of them.
- **Voice**: Gemini TTS, voice Charon, synthesised undirected. The 3.8 model
  family reads a delivery direction out loud instead of acting on it, so every
  line in this campaign is sent bare.
