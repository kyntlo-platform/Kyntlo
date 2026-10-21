"""Synthesize a soundtrack (music bed + timed sound effects) for a rendered scene.

usage: python3 audio.py cues.json out.wav
cues.json: {"duration": seconds, "bed": "lofi|night|noir|chip|groove", "sfx": [[t, "name"], ...]}
"""
import json
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
def kick():
    return tone(np.linspace(120, 45, int(0.3 * SR)), 0.3, decay=0.12) * 0.9


def hat():
    return noise(0.05, 0.015, 1) * 0.25


def snare():
    return mx(noise(0.2, 0.06, 2) * 0.35, tone(190, 0.15, decay=0.05) * 0.2)


def place(buf, clip, sec, gain=1.0):
    i = int(sec * SR)
    if i >= len(buf):
        return
    j = min(len(buf), i + len(clip))
    buf[i:j] += clip[: j - i] * gain


def midi(n):
    return 440 * 2 ** ((n - 69) / 12)


BEDS = {
    #       bpm, chord roots (midi), minor?, drums, lead style
    "lofi": (88, [57, 53, 48, 55], True, "lofi", "pad"),
    "night": (70, [50, 46, 53, 48], True, "soft", "pad"),
    "noir": (64, [45, 45, 41, 40], True, "noir", "pad"),
    "chip": (140, [57, 53, 60, 55], True, "four", "arp"),
    "groove": (100, [52, 48, 55, 50], True, "lofi", "pluck"),
}


def bed(kind, dur):
    bpm, roots, minor, drums, lead = BEDS[kind]
    beat = 60 / bpm
    buf = np.zeros(int((dur + 2) * SR))
    bar = beat * 4
    nbars = int(dur / bar) + 2
    third = 3 if minor else 4
    for b in range(nbars):
        root = roots[b % len(roots)]
        t0 = b * bar
        chord = [root, root + third, root + 7, root + 12 if lead != "arp" else root + 10]
        if lead in ("pad", "pluck"):
            for n in chord:
                dec = bar * 0.9 if lead == "pad" else 0.5
                for k in range(1 if lead == "pad" else 4):
                    place(buf, tone(midi(n + 12), bar if lead == "pad" else 0.6, "sine", dec, attack=0.25 if lead == "pad" else 0.005), t0 + k * beat, 0.05)
        if lead == "arp":
            seq = [chord[i % 4] + 12 * (i // 4 % 2) for i in range(16)]
            for i, n in enumerate(seq):
                place(buf, tone(midi(n + 12), beat / 4, "square", 0.06), t0 + i * beat / 4, 0.06)
        place(buf, tone(midi(root - 12), bar * 0.95, "tri", bar * 0.5, attack=0.01), t0, 0.28)
        for q in range(4):
            tq = t0 + q * beat
            if drums == "four":
                place(buf, kick(), tq, 0.5)
                place(buf, hat(), tq + beat / 2, 0.6)
                if q % 2:
                    place(buf, snare(), tq, 0.4)
            elif drums == "lofi":
                if q in (0, 2):
                    place(buf, kick(), tq + (0.04 if q == 2 else 0), 0.45)
                if q in (1, 3):
                    place(buf, snare(), tq, 0.3)
                place(buf, hat(), tq, 0.35)
                place(buf, hat(), tq + beat * 0.55, 0.25)
            elif drums == "noir":
                if q == 0:
                    place(buf, kick(), tq, 0.35)
                place(buf, noise(0.08, 0.03, 1) * 0.1, tq + beat / 2, 0.6)  # brushed
            elif drums == "soft":
                if q == 0:
                    place(buf, kick(), tq, 0.2)
                place(buf, hat(), tq + beat / 2, 0.15)
    buf = buf[: int(dur * SR)]
    fade = int(1.2 * SR)
    buf[-fade:] *= np.linspace(1, 0, fade)
    buf[: int(0.3 * SR)] *= np.linspace(0, 1, int(0.3 * SR))
    return buf


def main():
    cues = json.load(open(sys.argv[1]))
    dur = cues["duration"]
    music = bed(cues.get("bed", "lofi"), dur)
    music /= max(1e-9, np.abs(music).max())
    mix = music * 0.22
    fx = np.zeros_like(mix)
    for t, name in cues["sfx"]:
        place(fx, SFX[name](), t, 1.0)
    mix = mix + fx * 0.9
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
