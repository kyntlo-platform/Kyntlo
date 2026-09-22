# Turning on the real voiceover

The build picks its speech engine automatically, in this order:

| Order | Engine | Trigger | Output |
| ---: | --- | --- | --- |
| 1 | **Gemini TTS** (AI Studio) | `GEMINI_API_KEY` | Publishable, muxed into the ads |
| 2 | Google Cloud TTS | `GOOGLE_TTS_KEY` | Publishable, muxed into the ads |
| 3 | espeak + MBROLA | nothing set | Guide track, stamped, separate file |

**Prefer Gemini.** It takes a natural-language direction alongside the line,
and the two concepts want opposite reads — a wry founder recounting what he
found, against a flat voice reading out a measurement. Those directions live
in `vo-style.json` and are the main quality lever here; the voice matters less
than the direction given to it.

## Why Google and not the others

Probed from this environment, 22 Sep 2026:

| Service | Reachable |
| --- | --- |
| Gemini / AI Studio API (`generativelanguage.googleapis.com`) | **yes** |
| Google Cloud TTS (`texttospeech.googleapis.com`) | **yes** |
| AI Studio web UI (`aistudio.google.com`) | no — and it is a UI, not an API |
| MiniMax (`api.minimax.io`, `api.minimaxi.chat`) | no |
| ElevenLabs | no |
| OpenAI | no |
| Cartesia · Deepgram · PlayHT | no |

The blocked ones fail at the network layer, before any credential is checked,
so a key for them changes nothing on its own. To use one, add its API host to
the allowed hosts in this Claude Code environment's settings first.

## Setup — Gemini (recommended)

An AI Studio **page URL is not a credential**. The key is a separate thing.

1. Go to <https://aistudio.google.com/apikey> and create an API key on the
   project you want billed. Free tier covers this volume comfortably.
2. Add it to this environment's variables as `GEMINI_API_KEY`. Environment
   variables are read at session start, so a session already running will not
   see it — start a new one.
3. Confirm, then build:

   ```
   python3 vo.py --models    # what this key actually serves
   python3 vo.py             # should print "engine: gemini"
   NODE_PATH=/opt/node22/lib/node_modules node build.js
   ```

`--models` matters because preview model ids move. The default is
`gemini-3.1-flash-tts-preview`; if the key does not serve it, the error says
so and `GEMINI_TTS_MODEL` overrides it.

## Setup — Cloud TTS (alternative)

1. Enable **Cloud Text-to-Speech API** on the project and create an API key.
2. Set it as `GOOGLE_TTS_KEY`.
3. `python3 vo.py --voices` lists en-GB, en-US and ar-* voices, then build as
   above.

The four motion posts rebuild with narration inside them. The
`*-guide-vo.mp4` files are deleted automatically, because a guide is only
needed while the read is synthetic.

## Knobs

| Variable | Default | Notes |
| --- | --- | --- |
| `GEMINI_API_KEY` | — | Preferred. `GOOGLE_AI_STUDIO_KEY` also works. |
| `GEMINI_TTS_MODEL` | `gemini-3.1-flash-tts-preview` | Verify with `--models`; preview ids move. |
| `GEMINI_TTS_VOICE` | `Charon` | A prebuilt Gemini voice. If the name is wrong the API says so. |
| `GOOGLE_TTS_KEY` | — | Cloud TTS instead. `GOOGLE_API_KEY` also works. |
| `GOOGLE_TTS_VOICE` | `en-GB-Neural2-D` | Run `--voices` and pick from what the account actually serves rather than trusting this default. |
| `GOOGLE_TTS_RATE` | `0.96` | Slightly under natural pace; the ad's argument is measurement, so an unhurried read suits it. |

Scene lengths are re-measured from whichever engine ran, so the picture
re-cuts itself to the new read. Nothing needs timing by hand.

## Two things a better voice does not fix

**Concept A speaks in the first person** — "I filled in the contact form on N
Dubai businesses". The campaign's whole argument is that the claim is
literally true and independently checkable. A synthetic voice reading it is a
small dishonesty at the exact point the campaign asks to be trusted, and a
good synthetic voice makes that worse rather than better, because nobody can
tell. Recommend the founder records it: sixty seconds of phone audio.
Concept B makes no first-person claim, so synthetic narration is fine there.

**Arabic still needs a human.** Google serves `ar-XA` voices and will read the
Snapchat copy cleanly, but reading a draft well is not the same as the draft
being right. That copy still needs a native Gulf-dialect writer before it runs.
