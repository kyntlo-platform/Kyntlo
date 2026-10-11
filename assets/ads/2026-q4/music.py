#!/usr/bin/env python3
"""Compose the brand-film music bed.

Written rather than licensed: a generated bed carries no attribution
requirement and cannot be hit by a Content ID claim on a paid ad, which a
stock track can. A minor, 76 BPM, i-VI-III-VII.

The arrangement follows the script's dynamics: sparse under the hook, fuller
through the evidence, pulled back under the insight line so the words carry,
fullest under the offer, resolving on the brand card.

Run: python3 music.py          ->  music.wav
"""
import pathlib, wave
import numpy as np

SR = 48000
BPM = 76.0
BEAT = 60.0 / BPM          # 0.7895 s
BAR = 4 * BEAT             # 3.158 s
OUT = pathlib.Path(__file__).parent / 'music.wav'

def n2f(n):
    """MIDI note -> Hz."""
    return 440.0 * 2 ** ((n - 69) / 12.0)

# i - VI - III - VII in A minor, two bars each
PROG = [
    ([57, 60, 64], 45),   # Am   root A2
    ([53, 57, 60], 41),   # F    root F2
    ([52, 55, 60], 40),   # C    root E2/C
    ([50, 55, 59], 43),   # G    root G2
]

def env(n, attack, decay, sustain=0.0, release=0.0, level=1.0):
    """ADSR over n samples; smooth curves, no square edges."""
    a = int(attack * SR); d = int(decay * SR); r = int(release * SR)
    s = max(0, n - a - d - r)
    segs = []
    if a: segs.append(np.sin(np.linspace(0, np.pi / 2, a)) ** 2)
    if d: segs.append(1 - (1 - sustain) * (np.sin(np.linspace(0, np.pi / 2, d)) ** 2))
    if s: segs.append(np.full(s, sustain if d else 1.0))
    if r: segs.append((sustain if d else 1.0) * np.cos(np.linspace(0, np.pi / 2, r)) ** 2)
    e = np.concatenate(segs) if segs else np.ones(n)
    return (e[:n] if len(e) >= n else np.pad(e, (0, n - len(e)))) * level

def tone(f, n, harmonics=(1.0, 0.5, 0.28, 0.14, 0.07), detune=0.0):
    """Additive voice. Harmonic rolloff and a little detune keep it off
    the thin pure-sine sound that makes generated music read as cheap."""
    t = np.arange(n) / SR
    out = np.zeros(n)
    for i, amp in enumerate(harmonics, start=1):
        ph = np.random.rand() * 2 * np.pi
        out += amp * np.sin(2 * np.pi * f * i * t + ph)
        if detune:
            out += amp * 0.6 * np.sin(2 * np.pi * f * i * (1 + detune) * t + ph)
    return out / max(np.abs(out).max(), 1e-9)

def lowpass(x, cutoff, order=2):
    """One-pole cascade. Takes the edge off the additive harmonics."""
    a = np.exp(-2 * np.pi * cutoff / SR)
    y = x
    for _ in range(order):
        out = np.empty_like(y); acc = 0.0
        for i in range(len(y)):          # vectorised below for speed
            acc = (1 - a) * y[i] + a * acc
            out[i] = acc
        y = out
    return y

def lowpass_fast(x, cutoff, order=2):
    """lfilter-free IIR via cumulative trick is not exact; use FFT instead."""
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    H = 1.0 / (1.0 + (f / cutoff) ** (2 * order)) ** 0.5
    return np.fft.irfft(X * H, n=len(x))

def reverb(x, decay=2.2, mix=0.32):
    """Plate-ish tail: convolve with decaying noise. Gives the pad space so it
    sits behind a voice instead of competing with it."""
    n = int(decay * SR)
    ir = np.random.randn(n) * np.exp(-np.linspace(0, 7, n))
    ir = lowpass_fast(ir, 3800)
    ir[0] = 1.0
    wet = np.convolve(x, ir, mode='full')[:len(x)]
    wet /= max(np.abs(wet).max(), 1e-9)
    return (1 - mix) * x + mix * wet * max(np.abs(x).max(), 1e-9)

def main():
    np.random.seed(7)
    total = int(66.0 * SR)
    pad = np.zeros(total); bass = np.zeros(total)
    arp = np.zeros(total); pulse = np.zeros(total)

    chord_len = int(2 * BAR * SR)
    i = 0; ci = 0
    while i < total:
        notes, root = PROG[ci % len(PROG)]
        n = min(chord_len, total - i)

        # pad: triad, slow swell, detuned
        for m in notes:
            v = tone(n2f(m), n, (1.0, 0.45, 0.22, 0.1, 0.05), detune=0.004)
            pad[i:i + n] += v * env(n, 0.9, 0.5, 0.8, 1.0, 0.33)

        # sub: root, plucked on beats 1 and 3
        for b in (0, 2):
            s = i + int(b * BEAT * SR)
            ln = min(int(1.7 * BEAT * SR), total - s)
            if ln > 0:
                bass[s:s + ln] += tone(n2f(root), ln, (1.0, 0.3, 0.08)) * \
                    env(ln, 0.012, 0.9, 0.18, 0.35, 0.5)

        # arp: eighth notes, enters from the third chord
        if ci >= 2:
            for k in range(16):
                s = i + int(k * BEAT / 2 * SR)
                ln = min(int(BEAT * 0.55 * SR), total - s)
                if ln <= 0:
                    break
                m = notes[k % 3] + (12 if (k // 3) % 2 else 0)
                arp[s:s + ln] += tone(n2f(m + 12), ln, (1.0, 0.25, 0.1)) * \
                    env(ln, 0.006, 0.26, 0.0, 0.1, 0.13)

        # pulse: soft low thump for momentum, not a dance kick
        for b in (0, 2):
            s = i + int(b * BEAT * SR)
            ln = min(int(0.24 * SR), total - s)
            if ln > 0:
                t = np.arange(ln) / SR
                pulse[s:s + ln] += np.sin(2 * np.pi * 58 * t * (1 - 0.35 * t / (ln / SR))) * \
                    env(ln, 0.004, 0.2, 0.0, 0.02, 0.42)
        i += n; ci += 1

    pad = reverb(lowpass_fast(pad, 2100), 2.4, 0.38)
    arp = reverb(lowpass_fast(arp, 4200), 1.6, 0.30)
    bass = lowpass_fast(bass, 320)

    # air: very quiet filtered noise, slow swell
    air = lowpass_fast(np.random.randn(total), 1200)
    air /= max(np.abs(air).max(), 1e-9)
    air *= 0.035 * (0.5 + 0.5 * np.sin(2 * np.pi * np.arange(total) / SR / 11.0))

    # section gains, matched to the script's beats (seconds -> level)
    pts = [(0, 0.22), (6, 0.34), (12, 0.60), (22, 0.66), (30, 0.46),
           (37.5, 0.50), (38.5, 0.92), (46, 0.74), (52, 0.60), (58, 0.52), (66, 0.0)]
    xs = np.array([p[0] for p in pts]) * SR
    ys = np.array([p[1] for p in pts])
    gain = np.interp(np.arange(total), xs, ys)

    # riser into the offer
    rs, re_ = int(34.5 * SR), int(38.5 * SR)
    ln = re_ - rs
    sweep = lowpass_fast(np.random.randn(ln), 900)
    sweep /= max(np.abs(sweep).max(), 1e-9)
    riser = np.zeros(total)
    riser[rs:re_] = sweep * np.linspace(0, 0.17, ln) ** 2

    mix = (pad * 1.0 + bass * 0.85 + arp * 0.8 + pulse * 0.7 + air) * gain + riser
    mix = np.tanh(mix * 1.25) * 0.82                     # gentle saturation
    mix /= max(np.abs(mix).max(), 1e-9)
    mix *= 0.72

    st = np.stack([mix, np.roll(mix, 220)], axis=1)      # slight width
    pcm = (np.clip(st, -1, 1) * 32767).astype('<i2')
    with wave.open(str(OUT), 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes(pcm.tobytes())
    print('wrote %s  %.1fs stereo' % (OUT.name, total / SR))

if __name__ == '__main__':
    main()
