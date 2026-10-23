"""Local neural narration with Kokoro (Apache-2.0), used when no Gemini key is set.

Reads a JSON list of {"text", "out"} on stdin and writes one WAV per item.
Model files live in academy/.cache/models (see README for where to get them).
"""
import json
import os
import sys

import soundfile as sf
from kokoro_onnx import Kokoro

models = sys.argv[1]
voice = os.environ.get("KOKORO_VOICE", "af_heart")
speed = float(os.environ.get("KOKORO_SPEED", "0.95"))

kokoro = Kokoro(os.path.join(models, "kokoro-v1.0.onnx"), os.path.join(models, "voices-v1.0.bin"))
for item in json.load(sys.stdin):
    # A line may set its own voice and speed; otherwise the defaults above apply.
    audio, rate = kokoro.create(item["text"], voice=item.get("voice") or voice, speed=float(item.get("speed") or speed), lang="en-us")
    sf.write(item["out"], audio, rate)
