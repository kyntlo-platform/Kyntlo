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

Each of the five is cut twice, on a light ground and a dark one, from the
same code — every colour in the renderer is a token, so the theme is a
switch rather than a second design. Ten files, five ideas, one honest A/B.

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
| 2 | `v3-vo.py` | 37 unique lines, one model per ad against an ~11/day free-tier cap; the outro line is recorded once and shared by all five |
| 2b | `v3-clean-vo.py` | strips the C2PA manifest, trims the head click and the long tail, levels every line |
| 3 | `v3-fit.py` | measures every rendered line and cuts the picture to it — speeds a read to 1.25× at most, widens the scene past that → `v3-final.json` |
| 4 | `v3-scenes.js` | Playwright frame capture, six looks, 720×1200 safe band → `frames/<ad>/` |
| 5 | `music-v3.py` | one arranged 104 BPM bed per ad: six sections, instruments entering and leaving, a filter opening across the build, a break on the beat that ad's argument turns |
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


## Three things that were wrong, and what they were

**The noise after every sentence.** Gemini's TTS response carries a C2PA
provenance manifest appended to the audio payload. `vo.py` decoded the whole
blob and wrote it as raw PCM, so on 22 of the 37 lines the final 126
milliseconds of "speech" were a JUMBF box, which plays as a burst of
full-scale noise the instant the sentence ends. A JUMBF superbox is a
four-byte big-endian length followed by the ASCII tag `jumb`, so the cut is
exact rather than a guess: everything before it is audio and everything
after it is not. `vo.py` now strips it at the point of writing, and
`v3-clean-vo.py` repairs the lines that were already recorded.

The mix also ran `dynaudnorm` across the summed narration. That rides the
gain inside every gap between words, which lifts the noise floor exactly
where a listener notices it. Levels are set once, offline, per line instead.

**The music was a loop, not an arrangement.** The first beds were four bars
at constant density with a volume curve over the top — the gain moved but
nothing else did, so every bar had the same instruments playing the same
figure. The ear stops hearing that as music about ten seconds in. The beds
now have six sections with instruments entering and leaving, a filter that
opens across the build, a break where almost everything drops out, and a
riser into what follows. The break is placed per ad at the beat where that
ad's argument turns, so the music stops arguing exactly where the voice
starts to.

**One CSS class, two owners.** The bars recap rendered as bare labels with
no bars at all, because `.row` was a global rule belonging to the timeline
rail — the bar rows were inheriting `display:flex` and `opacity:.16` from
it. Scoped to `.rail .row`, with the bars on their own class.
