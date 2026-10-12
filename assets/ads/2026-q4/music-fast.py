#!/usr/bin/env python3
"""Uptempo beds for the four cold-feed ads.

Reuses the synthesis helpers from music.py but at 104 BPM with a 16th-note
arp and a pulse on every beat — the 76 BPM brand-film bed is far too slow to
sit under a 24-second ad that cuts every three seconds.

Two variants, because the concepts want opposite shapes:
  answered  — sparse and ticking, resolving warm on the logo
  sprawl    — busy and cluttered, thinning out the moment the product appears

Run: python3 music-fast.py      ->  music-answered.wav, music-sprawl.wav
"""
import importlib.util, pathlib
import numpy as np

ROOT = pathlib.Path(__file__).parent
_spec = importlib.util.spec_from_file_location('kmusic', ROOT / 'music.py')
M = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(M)          # music.py guards its own main()

SR = M.SR
BPM = 104.0
BEAT = 60.0 / BPM
BAR = 4 * BEAT
DUR = 30.0

# A minor again, so the two ad beds and the brand film sit in one key.
ANSWERED = [([57, 60, 64], 45), ([57, 60, 64], 45), ([53, 57, 60], 41), ([52, 55, 60], 40)]
SPRAWL   = [([57, 60, 64], 45), ([50, 55, 59], 43), ([53, 57, 60], 41), ([52, 55, 60], 40)]


def build(prog, busy, name, gain_pts):
    np.random.seed(11 if busy else 5)
    total = int(DUR * SR)
    pad = np.zeros(total); bass = np.zeros(total)
    arp = np.zeros(total); pulse = np.zeros(total); tick = np.zeros(total)

    chord_len = int(BAR * SR)
    i = ci = 0
    while i < total:
        notes, root = prog[ci % len(prog)]
        n = min(chord_len, total - i)

        for m in notes:
            pad[i:i + n] += M.tone(M.n2f(m), n, (1.0, 0.4, 0.2, 0.09), detune=0.005) * \
                M.env(n, 0.25, 0.4, 0.75, 0.5, 0.26)

        # bass on every downbeat — drives harder than the film's half-note pulse
        for b in range(4):
            s = i + int(b * BEAT * SR)
            ln = min(int(0.9 * BEAT * SR), total - s)
            if ln > 0:
                bass[s:s + ln] += M.tone(M.n2f(root), ln, (1.0, 0.32, 0.1)) * \
                    M.env(ln, 0.008, 0.5, 0.2, 0.2, 0.52)

        # 16ths when busy, 8ths when sparse
        step = 16 if busy else 8
        for k in range(step):
            s = i + int(k * BEAT * 4 / step * SR)
            ln = min(int(BEAT * (0.3 if busy else 0.45) * SR), total - s)
            if ln <= 0:
                break
            m = notes[k % 3] + (12 if (k // 2) % 2 else 0)
            arp[s:s + ln] += M.tone(M.n2f(m + 12), ln, (1.0, 0.3, 0.12)) * \
                M.env(ln, 0.004, 0.18, 0.0, 0.06, 0.15 if busy else 0.11)

        for b in range(4):
            s = i + int(b * BEAT * SR)
            ln = min(int(0.19 * SR), total - s)
            if ln > 0:
                t = np.arange(ln) / SR
                pulse[s:s + ln] += np.sin(2 * np.pi * 62 * t * (1 - 0.4 * t / (ln / SR))) * \
                    M.env(ln, 0.003, 0.16, 0.0, 0.02, 0.46)
            # offbeat tick: the clock the ad is arguing about
            s2 = s + int(BEAT * 0.5 * SR)
            ln2 = min(int(0.05 * SR), total - s2)
            if ln2 > 0:
                tick[s2:s2 + ln2] += M.lowpass_fast(np.random.randn(ln2), 7000) * \
                    M.env(ln2, 0.001, 0.045, 0.0, 0.005, 0.1)
        i += n; ci += 1

    pad = M.reverb(M.lowpass_fast(pad, 2400), 1.5, 0.30)
    arp = M.reverb(M.lowpass_fast(arp, 5200), 1.1, 0.24)
    bass = M.lowpass_fast(bass, 340)

    xs = np.array([p[0] for p in gain_pts]) * SR
    ys = np.array([p[1] for p in gain_pts])
    gain = np.interp(np.arange(total), xs, ys)

    mix = (pad * 0.95 + bass * 0.9 + arp * 0.85 + pulse * 0.75 + tick * 0.6) * gain
    mix = np.tanh(mix * 1.3) * 0.84
    mix /= max(np.abs(mix).max(), 1e-9)
    mix *= 0.70

    st = np.stack([mix, np.roll(mix, 180)], axis=1)
    pcm = (np.clip(st, -1, 1) * 32767).astype('<i2')
    import wave
    with wave.open(str(ROOT / name), 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes(pcm.tobytes())
    print('wrote %s  %.1fs' % (name, DUR))


if __name__ == '__main__':
    # answered: holds back, lifts hard when the product starts acting
    build(ANSWERED, False, 'music-answered.wav',
          [(0, 0.30), (3, 0.38), (6, 0.88), (18, 0.92), (23, 0.70), (27, 0.55), (30, 0.0)])
    # sprawl: starts cluttered and loud, drops out at "one inbox", rebuilds clean
    build(SPRAWL, True, 'music-sprawl.wav',
          [(0, 0.55), (4, 0.95), (8, 0.40), (10, 0.80), (20, 0.86), (25, 0.62), (30, 0.0)])
