"""Synthesize a soundtrack (music bed + timed sound effects) for a rendered scene.

usage: python3 audio.py cues.json out.wav
cues.json: {"duration": seconds, "bed": "lofi|night|noir|drive|groove", "sfx": [[t, "name"], ...],
            "vo": [[t, "line"], ...], "voSpeed": 1.0}
Voice-over uses Kokoro TTS (pip install kokoro-onnx); model files go in render/.vo-cache/.
"""
import hashlib
import json
import os
import sys
import wave

import numpy as np

SR = 44100
rng = np.random.default_rng(7)


def t_axis(sec):
    return np.arange(int(sec * SR)) / SR


def env(n, attack=0.005, decay=0.2):
    t = np.arange(n) / SR
    a = np.clip(t / max(attack, 1e-4), 0, 1)
    return a * np.exp(-t / max(decay, 1e-4))


def lowpass(x, k):
    if k <= 1:
        return x
    return np.convolve(x, np.ones(k) / k, mode="same")


def tone(freq, sec, kind="sine", decay=0.3, attack=0.005):
    t = t_axis(sec)
    ph = 2 * np.pi * np.cumsum(np.broadcast_to(freq, t.shape)) / SR
    if kind == "sine":
        w = np.sin(ph)
    elif kind == "square":
        w = np.sign(np.sin(ph)) * 0.5
    elif kind == "tri":
        w = 2 / np.pi * np.arcsin(np.sin(ph))
    else:
        w = np.sin(ph) + 0.3 * np.sin(2 * ph) + 0.15 * np.sin(3 * ph)
    return w * env(len(t), attack, decay)


def mx(*clips):
    """Sum clips of different lengths."""
    out = np.zeros(max(len(c) for c in clips))
    for c in clips:
        out[: len(c)] += c
    return out


def noise(sec, decay=0.1, smooth=1, attack=0.002):
    n = int(sec * SR)
    return lowpass(rng.uniform(-1, 1, n), smooth) * env(n, attack, decay)


# ---------- sound effects ----------
def sfx_pop():
    sweep = np.linspace(700, 1250, int(0.09 * SR))
    return tone(sweep, 0.09, decay=0.05) * 0.55


def sfx_send():
    sweep = np.linspace(500, 1500, int(0.16 * SR))
    return mx(tone(sweep, 0.16, decay=0.06) * 0.3, noise(0.16, 0.05, 6) * 0.15)


def sfx_buzz():
    out = np.zeros(int(0.75 * SR))
    for start in (0.0, 0.4):
        b = tone(165, 0.28, "square", decay=1.0) * np.sin(np.pi * np.linspace(0, 1, int(0.28 * SR)))
        i = int(start * SR)
        out[i:i + len(b)] += lowpass(b, 8) * 0.5
    return out


def sfx_ding():
    return mx(tone(1318.5, 1.2, "bell", 0.45) * 0.3, tone(1975.5, 1.2, "sine", 0.35) * 0.18)


def sfx_chime():
    out = np.zeros(int(1.4 * SR))
    for i, f in enumerate((523.25, 659.25, 783.99, 1046.5)):
        n = tone(f, 1.0, "bell", 0.4) * 0.2
        s = int(i * 0.08 * SR)
        out[s:s + len(n)] += n
    return out


def sfx_boom():
    sweep = np.linspace(110, 38, int(0.9 * SR))
    return mx(tone(sweep, 0.9, decay=0.35) * 0.9, noise(0.3, 0.06, 30) * 0.25)


def sfx_stamp():
    return mx(tone(np.linspace(140, 60, int(0.35 * SR)), 0.35, decay=0.09) * 0.9, noise(0.25, 0.04, 4) * 0.45)


def sfx_whoosh():
    n = int(0.55 * SR)
    x = rng.uniform(-1, 1, n)
    shape = np.sin(np.pi * np.linspace(0, 1, n)) ** 2
    return lowpass(x, 14) * shape * 0.35


def sfx_type():
    return mx(noise(0.03, 0.008, 2) * 0.35, tone(2200, 0.02, decay=0.005) * 0.08)


def sfx_typewriter():
    return mx(noise(0.05, 0.012, 3) * 0.5, tone(120, 0.06, decay=0.02) * 0.3)


def sfx_bell():  # typewriter carriage bell
    return tone(2093, 0.8, "bell", 0.25) * 0.25


def sfx_beep():
    b = tone(880, 0.14, "square", decay=0.5) * 0.22
    b[int(0.12 * SR):] = 0
    return b


def sfx_go():
    return tone(1760, 0.35, "square", decay=0.25) * 0.22


def sfx_split():
    return mx(tone(1567.98, 0.12, "square", decay=0.05) * 0.15, tone(2093, 0.18, "square", decay=0.06) * 0.1)


def sfx_glitch():
    n = int(0.25 * SR)
    x = rng.uniform(-1, 1, n)
    x = np.repeat(x[::40], 40)[:n]
    return x * 0.25 * np.exp(-np.arange(n) / SR / 0.12)


def sfx_rewind():
    sec = 1.1
    t = t_axis(sec)
    f = 900 + 600 * np.sin(2 * np.pi * 9 * t) * np.linspace(1, 0.2, len(t)) + np.linspace(400, -300, len(t))
    w = tone(np.abs(f) + 120, sec, "square", decay=5) * 0.12
    return w * np.sin(np.pi * np.linspace(0, 1, len(t)))


def sfx_print():
    sec = 0.32
    n = int(sec * SR)
    t = np.arange(n) / SR
    grain = (np.sin(2 * np.pi * 38 * t) > 0.2).astype(float)
    x = mx(lowpass(rng.uniform(-1, 1, n), 3) * grain * 0.16, tone(320, sec, "square", decay=5)[:n] * 0.03)
    return x * np.sin(np.pi * np.linspace(0, 1, n)) ** 0.3


def sfx_crumple():
    n = int(0.6 * SR)
    out = np.zeros(n)
    for _ in range(26):
        i = rng.integers(0, n - 2000)
        out[i:i + 2000] += noise(2000 / SR, 0.01, 2) * rng.uniform(0.1, 0.4)
    return out


def sfx_tick():
    return mx(noise(0.02, 0.004, 1) * 0.3, tone(3000, 0.02, decay=0.004) * 0.1)


def sfx_confetti():
    out = np.zeros(int(1.2 * SR))
    for _ in range(30):
        f = rng.uniform(1500, 4200)
        b = tone(f, 0.08, decay=0.03) * 0.05
        i = rng.integers(0, len(out) - len(b))
        out[i:i + len(b)] += b
    return mx(out, sfx_chime()[: len(out)] * 0.8)


def sfx_fail():
    return tone(np.linspace(330, 160, int(0.5 * SR)), 0.5, "square", decay=0.4) * 0.15


SFX = {k[4:]: v for k, v in list(globals().items()) if k.startswith("sfx_")}


# ---------- music beds ----------
# Soft electric-piano chords, sub bass and a light kick. Kept low and ducked under the voice-over.
def keys(freq, sec):
    t = t_axis(sec)
    w = np.sin(2 * np.pi * freq * t) + 0.25 * np.sin(4 * np.pi * freq * t) + 0.08 * np.sin(2 * np.pi * freq * 1.003 * t)
    return w * env(len(t), 0.01, 1.4)


def kick():
    return tone(np.linspace(110, 45, int(0.3 * SR)), 0.3, decay=0.1)


def shaker():
    return noise(0.06, 0.02, 3) * 0.2


def place(buf, clip, sec, gain=1.0):
    i = int(sec * SR)
    if i >= len(buf):
        return
    j = min(len(buf), i + len(clip))
    buf[i:j] += clip[: j - i] * gain


def midi(n):
    return 440 * 2 ** ((n - 69) / 12)


BEDS = {
    # bpm, chords (midi notes), kick pattern (beats), shaker on 8ths
    "lofi": (84, [(53, 57, 60, 64), (52, 55, 59, 62), (50, 53, 57, 60), (48, 52, 55, 59)], (0, 2.5), True),
    "night": (70, [(57, 60, 64, 67), (53, 57, 60, 64), (48, 52, 55, 59), (55, 59, 62, 66)], (0,), False),
    "noir": (66, [(50, 53, 57, 60), (46, 50, 53, 57), (43, 46, 50, 55), (45, 49, 52, 57)], (0,), True),
    "drive": (112, [(48, 52, 55, 60), (43, 47, 50, 55), (45, 48, 52, 57), (41, 45, 48, 53)], (0, 1, 2, 3), True),
    "groove": (96, [(43, 47, 50, 55), (40, 43, 47, 52), (36, 40, 43, 48), (38, 42, 45, 50)], (0, 2.5), True),
}


def bed(kind, dur):
    bpm, chords, kicks, shake = BEDS.get(kind, BEDS["lofi"])
    beat = 60 / bpm
    bar = beat * 4
    buf = np.zeros(int((dur + 3) * SR))
    for b in range(int(dur / bar) + 2):
        chord, t0 = chords[b % len(chords)], b * bar
        for hit in (0, 1.5, 3):
            for n in chord:
                place(buf, keys(midi(n + 12), 1.8), t0 + hit * beat, 0.07)
        place(buf, tone(midi(chord[0] - 12), bar * 0.9, "sine", bar * 0.6, attack=0.02), t0, 0.35)
        for k in kicks:
            place(buf, kick(), t0 + k * beat, 0.3)
        if shake:
            for e in range(8):
                place(buf, shaker(), t0 + e * beat / 2, 0.5 if e % 2 else 0.25)
    buf = buf[: int(dur * SR)]
    fade = int(1.5 * SR)
    buf[-fade:] *= np.linspace(1, 0, fade)
    buf[: int(0.5 * SR)] *= np.linspace(0, 1, int(0.5 * SR))
    return buf


# Sound effects are kept sparse and quiet; anything not listed here is dropped.
FX_GAIN = {"pop": 0.35, "send": 0.3, "whoosh": 0.5, "stamp": 0.6, "chime": 0.45, "boom": 0.45,
           "buzz": 0.5, "rewind": 0.3, "ding": 0.4, "confetti": 0.35, "crumple": 0.45}


# ---------- voice-over ----------
VO_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".vo-cache")
TTS_MODEL = os.environ.get("KOKORO_MODEL", os.path.join(VO_DIR, "kokoro.onnx"))
TTS_VOICES = os.environ.get("KOKORO_VOICES", os.path.join(VO_DIR, "voices.bin"))
VOICE = os.environ.get("VO_VOICE", "af_heart")
_tts = None


def speak(text, speed):
    global _tts
    os.makedirs(VO_DIR, exist_ok=True)
    key = hashlib.sha1(f"{VOICE}|{speed}|{text}".encode()).hexdigest()[:16]
    cached = os.path.join(VO_DIR, key + ".npy")
    if os.path.exists(cached):
        return np.load(cached)
    if _tts is None:
        from kokoro_onnx import Kokoro
        _tts = Kokoro(TTS_MODEL, TTS_VOICES)
    samples, sr = _tts.create(text, voice=VOICE, speed=speed, lang="en-us")
    # resample to the mix rate
    x = np.interp(np.arange(int(len(samples) * SR / sr)) * sr / SR, np.arange(len(samples)), samples)
    nz = np.nonzero(np.abs(x) > 0.01)[0]  # trim leading/trailing silence
    x = x[max(0, nz[0] - 400): nz[-1] + 2000] if len(nz) else x
    np.save(cached, x)
    return x


def voice_track(lines, total, speed):
    buf = np.zeros(total)
    spans = []
    for idx, (t, text) in enumerate(lines):
        clip = speak(text, speed)
        nxt = lines[idx + 1][0] if idx + 1 < len(lines) else total / SR
        end = t + len(clip) / SR
        if end > nxt - 0.1:
            print(f"  VO overlap: '{text[:40]}' ends {end:.2f}s, next line at {nxt:.2f}s", file=sys.stderr)
        clip = clip / max(1e-9, np.abs(clip).max()) * 0.9
        place(buf, clip, t)
        spans.append((t, end))
    return buf, spans


def duck(n, spans, depth=0.3, ramp=0.15):
    g = np.ones(n)
    for a, b in spans:
        i, j = int((a - ramp) * SR), int((b + ramp) * SR)
        g[max(0, i):j] = depth
    k = int(ramp * SR)
    return np.convolve(g, np.ones(k) / k, mode="same")


def main():
    cues = json.load(open(sys.argv[1]))
    dur = cues["duration"]
    n = int(dur * SR)
    music = bed(cues.get("bed", "lofi"), dur)
    music = music / max(1e-9, np.abs(music).max()) * 0.32
    vo, spans = voice_track(sorted(cues.get("vo", [])), n, cues.get("voSpeed", 1.0))
    music *= duck(n, spans)
    fx = np.zeros(n)
    for t, name in cues["sfx"]:
        if name in FX_GAIN:
            place(fx, SFX[name](), t, FX_GAIN[name])
    mix = music + fx + vo
    peak = np.abs(mix).max()
    if peak > 0.95:
        mix *= 0.95 / peak
    pcm = (mix * 32767).astype(np.int16)
    stereo = np.repeat(pcm[:, None], 2, axis=1)
    with wave.open(sys.argv[2], "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(stereo.tobytes())


if __name__ == "__main__":
    main()
