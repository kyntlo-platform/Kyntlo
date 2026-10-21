#!/usr/bin/env bash
# Render all five videos into ../out (in parallel). Uses Gemini TTS when GEMINI_API_KEY is set, otherwise Kokoro.
set -e
cd "$(dirname "$0")"
mkdir -p ../out
for s in 01-group-chat 02-two-forty-seven 03-case-file 04-speedrun 05-receipt; do
  NODE_PATH=$(npm root -g) node render.cjs ../scenes/$s.html ../out/kyntlo-$s.mp4 > ../out/$s.log 2>&1 &
done
wait
grep -h -E "voice-over|overlap|wrote|Error|failed" ../out/*.log
