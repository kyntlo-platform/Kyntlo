"""Composes Kyntlo Academy's default background music: a calm, warm, loopable bed.

Original and generated from code, so it is free to use anywhere. Used when no
licensed track has been placed in academy/assets/music/.

    python3 music.py out.wav [seconds]
"""
import sys
import wave

import numpy as np

RATE = 48000
BPM = 92
BEAT = 60 / BPM
BAR = 4 * BEAT
rng = np.random.default_rng(7)

# Imaj7 – vi9 – IVmaj7 – V6sus, voiced warm and open (MIDI notes).
CHORDS = [
    [48, 55, 59, 64, 67],  # Cmaj7
    [45, 52, 59, 60, 64],  # Am9
    [41, 48, 57, 60, 64],  # Fmaj7
    [43, 50, 55, 60, 62],  # Gsus/6
]
ARP = [0, 2, 3, 4, 3, 2, 1, 2]  # indexes into the chord, one per 8th note


def hz(note):
    return 440.0 * 2 ** ((note - 69) / 12)


def env(n, attack, release):
    e = np.ones(n)
    a, r = int(attack * RATE), int(release * RATE)
    e[:a] = np.linspace(0, 1, a) ** 2
    e[-r:] *= np.linspace(1, 0, r) ** 2
    return e


def pad(note, seconds):
    n = int(seconds * RATE)
    t = np.arange(n) / RATE
    out = np.zeros(n)
    for detune in (-0.08, 0.0, 0.07):  # three slightly detuned voices for width
        f = hz(note + detune)
        for h, amp in ((1, 1.0), (2, 0.35), (3, 0.12), (4, 0.05)):
            out += amp * np.sin(2 * np.pi * f * h * t + rng.uniform(0, 6.28))
    return out * env(n, seconds * 0.35, seconds * 0.45) / 3


def pluck(note, seconds):
    n = int(seconds * RATE)
    t = np.arange(n) / RATE
    f = hz(note)
    tone = np.sin(2 * np.pi * f * t) + 0.25 * np.sin(2 * np.pi * 2 * f * t)
    return tone * np.exp(-t * 5.5) * env(n, 0.012, 0.05)


def lowpass(x, cutoff):
    """One-pole low-pass to soften the top end."""
    a = np.exp(-2 * np.pi * cutoff / RATE)
    y = np.empty_like(x)
    acc = 0.0
    for i, v in enumerate(x):
        acc = (1 - a) * v + a * acc
        y[i] = acc
    return y


def reverb(x):
    out = x.copy()
    for delay, gain in ((0.031, 0.5), (0.047, 0.42), (0.071, 0.35), (0.113, 0.28), (0.173, 0.2), (0.257, 0.14)):
        d = int(delay * RATE)
        out[d:] += gain * x[:-d]
    return out


def compose(seconds):
    loop_bars = 8
    loop = np.zeros((int(loop_bars * BAR * RATE) + RATE * 2, 2))
    for bar in range(loop_bars):
        chord = CHORDS[bar % len(CHORDS)]
        start = int(bar * BAR * RATE)
        p = sum(pad(note, BAR * 1.25) for note in chord[1:]) * 0.22
        bass = pad(chord[0] - 12, BAR * 1.1) * 0.35
        loop[start:start + len(p), 0] += p
        loop[start:start + len(p), 1] += p
        loop[start:start + len(bass)] += bass[:, None]
        for i, idx in enumerate(ARP):
            s = start + int(i * BEAT / 2 * RATE)
            note = chord[idx] + 12
            pl = pluck(note, BEAT * 1.5) * (0.16 if i % 2 == 0 else 0.11)
            pan = 0.5 + 0.35 * np.sin(i)  # gentle stereo movement
            loop[s:s + len(pl), 0] += pl * (1 - pan)
            loop[s:s + len(pl), 1] += pl * pan
    # Fold the tail back onto the start so the loop is seamless.
    body = int(loop_bars * BAR * RATE)
    tail = loop[body:]
    loop = loop[:body]
    loop[:len(tail)] += tail
    for ch in range(2):
        loop[:, ch] = reverb(lowpass(loop[:, ch], 3200))
    reps = int(np.ceil(seconds * RATE / len(loop)))
    out = np.tile(loop, (reps, 1))[: int(seconds * RATE)]
    return out / np.max(np.abs(out)) * 0.7


def write(path, audio):
    pcm = (np.clip(audio, -1, 1) * 32767).astype("<i2")
    with wave.open(path, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(RATE)
        w.writeframes(pcm.tobytes())


if __name__ == "__main__":
    write(sys.argv[1], compose(float(sys.argv[2]) if len(sys.argv) > 2 else 8 * BAR))
