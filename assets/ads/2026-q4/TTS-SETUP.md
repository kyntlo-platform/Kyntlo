# Turning on the real voiceover

The build picks its speech engine automatically. With no key it uses offline
espeak, which produces a guide track. With a Google Cloud TTS key it produces
publishable narration and muxes it straight into the ads.

## Why Google and not the others

Probed from this environment, 22 Sep 2026:

| Service | Reachable |
| --- | --- |
| Google Cloud TTS (`texttospeech.googleapis.com`) | **yes** |
| MiniMax (`api.minimax.io`, `api.minimaxi.chat`) | no |
| ElevenLabs | no |
| OpenAI | no |
| Cartesia · Deepgram · PlayHT | no |

The blocked ones fail at the network layer, before any credential is checked,
so a key for them changes nothing on its own. To use one, add its API host to
the allowed hosts in this Claude Code environment's settings first.

## Setup

1. In Google Cloud, enable **Cloud Text-to-Speech API** on the project and
   create an **API key**. Restrict it to that one API.
2. Add it to this environment's variables as `GOOGLE_TTS_KEY`. Environment
   variables are read at session start, so a session already running will not
   see it — start a new one.
3. Confirm and pick a voice:

   ```
   python3 vo.py --voices        # en-GB, en-US and ar-* voices on the account
   python3 vo.py                 # should print "engine: google"
   NODE_PATH=/opt/node22/lib/node_modules node build.js
   ```

The four motion posts rebuild with narration inside them. The
`*-guide-vo.mp4` files are deleted automatically, because a guide is only
needed while the read is synthetic.

## Knobs

| Variable | Default | Notes |
| --- | --- | --- |
| `GOOGLE_TTS_KEY` | — | Required for the real read. `GOOGLE_API_KEY` also works. |
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
