"""Composes upbeat, ad-style background tracks for the Kyntlo Team Academy videos.

Five presets, one per video, each with its own tempo, key, groove and instruments.
Original and generated from code, so they are free to use anywhere.

    python3 team_music.py <preset> out.wav [seconds]

Presets: pitch, leads, followup, calendar, ads
"""
import sys
import wave

import numpy as np

RATE = 48000
rng = np.random.default_rng(11)


def hz(note):
    return 440.0 * 2 ** ((note - 69) / 12)


# ---------------------------------------------------------------- oscillators

def polyblep(p, dt):
    out = np.zeros_like(p)
    a = p < dt
    t = p[a] / dt
    out[a] = t + t - t * t - 1
    b = p > 1 - dt
    t = (p[b] - 1) / dt
    out[b] = t * t + t + t + 1
    return out


def saw(f, n, phase=0.0):
    dt = f / RATE
    p = (phase + dt * np.arange(n)) % 1.0
    return 2 * p - 1 - polyblep(p, dt)


def square(f, n, phase=0.0):
    dt = f / RATE
    p = (phase + dt * np.arange(n)) % 1.0
    q = (p + 0.5) % 1.0
    return (np.where(p < 0.5, 1.0, -1.0) + polyblep(p, dt) - polyblep(q, dt))


def sine(f, n, phase=0.0):
    return np.sin(2 * np.pi * f * np.arange(n) / RATE + phase)


def noise(n):
    return rng.uniform(-1, 1, n)


# ---------------------------------------------------------------- filters (FFT, zero phase)

def fft_filter(x, lo=None, hi=None, slope=1.5):
    """Smooth band filter in the frequency domain. lo/hi in Hz (None = open)."""
    n = len(x)
    if n == 0:
        return x
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(n, 1 / RATE)
    g = np.ones_like(f)
    if hi:
        g *= 1 / np.sqrt(1 + (f / hi) ** (2 * 2 * slope))
    if lo:
        g *= 1 / np.sqrt(1 + (lo / np.maximum(f, 1e-3)) ** (2 * 2 * slope))
    return np.fft.irfft(X * g, n)


def adsr(n, a=0.005, d=0.1, s=0.7, r=0.08):
    e = np.full(n, s, dtype=float)
    A, D, R = int(a * RATE), int(d * RATE), int(r * RATE)
    A = min(A, n)
    e[:A] = np.linspace(0, 1, A) if A else e[:A]
    D2 = min(D, max(0, n - A))
    e[A:A + D2] = np.linspace(1, s, D2) if D2 else e[A:A + D2]
    R = min(R, n)
    if R:
        e[-R:] *= np.linspace(1, 0, R)
    return e


def decay(n, rate):
    return np.exp(-np.arange(n) / RATE * rate)


# ---------------------------------------------------------------- drums

def kick(punch=1.0, tone=50):
    n = int(0.42 * RATE)
    t = np.arange(n) / RATE
    f = tone + (150 * punch) * np.exp(-t * 32)
    ph = 2 * np.pi * np.cumsum(f) / RATE
    body = np.sin(ph) * np.exp(-t * 6.5)
    click = fft_filter(noise(n), lo=2000) * np.exp(-t * 400) * 0.35
    return np.tanh(1.6 * (body + click)) * 0.95


def clap():
    n = int(0.3 * RATE)
    t = np.arange(n) / RATE
    env = np.zeros(n)
    for k, off in enumerate((0, 0.009, 0.018)):
        i = int(off * RATE)
        env[i:] += np.exp(-(t[i:] - off) * (180 if k < 2 else 22))
    return fft_filter(noise(n), lo=900, hi=4500) * env * 0.55


def snare():
    n = int(0.28 * RATE)
    t = np.arange(n) / RATE
    tone = (np.sin(2 * np.pi * 190 * t) + 0.5 * np.sin(2 * np.pi * 330 * t)) * np.exp(-t * 30) * 0.5
    sn = fft_filter(noise(n), lo=1500, hi=9000) * np.exp(-t * 17) * 0.75
    return tone + sn


def hat(open_=False):
    n = int((0.32 if open_ else 0.07) * RATE)
    t = np.arange(n) / RATE
    return fft_filter(noise(n), lo=7000) * np.exp(-t * (11 if open_ else 70)) * (0.32 if open_ else 0.26)


def shaker():
    n = int(0.09 * RATE)
    t = np.arange(n) / RATE
    env = np.minimum(1, t / 0.02) * np.exp(-t * 40)
    return fft_filter(noise(n), lo=4500, hi=11000) * env * 0.22


def rim():
    n = int(0.06 * RATE)
    t = np.arange(n) / RATE
    return (np.sin(2 * np.pi * 1700 * t) + 0.6 * np.sin(2 * np.pi * 2600 * t)) * np.exp(-t * 90) * 0.35


def crash():
    n = int(1.8 * RATE)
    t = np.arange(n) / RATE
    return fft_filter(noise(n), lo=4000) * np.exp(-t * 2.4) * 0.22


def riser(seconds):
    n = int(seconds * RATE)
    t = np.linspace(0, 1, n)
    x = noise(n)
    out = np.zeros(n)
    seg = n // 16
    for k in range(16):  # sweep a band upwards in 16 steps
        a, b = k * seg, (k + 1) * seg if k < 15 else n
        c = 400 * 2 ** (k * 0.35)
        out[a:b] = fft_filter(x[a:b], lo=c * 0.7, hi=c * 2.2)
    return out * t ** 2 * 0.35


# ---------------------------------------------------------------- tonal instruments

def supersaw(note, seconds, cutoff=2600, voices=5, spread=0.12):
    n = int(seconds * RATE)
    out = np.zeros(n)
    for v in range(voices):
        d = (v - (voices - 1) / 2) * spread / ((voices - 1) / 2)
        out += saw(hz(note + d), n, rng.uniform(0, 1))
    out = fft_filter(out / voices, hi=cutoff)
    return out * adsr(n, 0.02, 0.2, 0.85, min(0.25, seconds / 3))


def epiano(note, seconds):
    n = int(seconds * RATE)
    f = hz(note)
    t = np.arange(n) / RATE
    tone = np.sin(2 * np.pi * f * t + 0.8 * np.sin(2 * np.pi * f * t) * np.exp(-t * 6))
    tone += 0.25 * np.sin(2 * np.pi * 2 * f * t) * np.exp(-t * 5)
    trem = 1 + 0.12 * np.sin(2 * np.pi * 5.2 * t)
    return tone * trem * adsr(n, 0.004, 0.4, 0.45, 0.12)


def pluck(note, seconds, bright=3200, kind='saw'):
    n = int(seconds * RATE)
    t = np.arange(n) / RATE
    osc = saw(hz(note), n) if kind == 'saw' else square(hz(note), n) * 0.7
    return fft_filter(osc, hi=bright) * np.exp(-t * 9) * adsr(n, 0.002, 0.05, 1, 0.03)


def marimba(note, seconds):
    n = int(seconds * RATE)
    f = hz(note)
    t = np.arange(n) / RATE
    tone = np.sin(2 * np.pi * f * t) * np.exp(-t * 7) + 0.35 * np.sin(2 * np.pi * 4 * f * t) * np.exp(-t * 22)
    return tone * adsr(n, 0.002, 0.05, 1, 0.02)


def steel(note, seconds):
    n = int(seconds * RATE)
    f = hz(note)
    t = np.arange(n) / RATE
    parts = [(1, 1.0, 4), (2.0, 0.5, 6), (2.76, 0.28, 8), (3.9, 0.15, 11)]
    tone = sum(a * np.sin(2 * np.pi * f * m * t) * np.exp(-t * d) for m, a, d in parts)
    return tone * adsr(n, 0.003, 0.05, 1, 0.03) * 0.6


def bell(note, seconds):
    n = int(seconds * RATE)
    f = hz(note)
    t = np.arange(n) / RATE
    mod = 2.1 * np.exp(-t * 3) * np.sin(2 * np.pi * f * 3.5 * t)
    return np.sin(2 * np.pi * f * t + mod) * np.exp(-t * 3.2) * adsr(n, 0.002, 0.05, 1, 0.04)


def bass(note, seconds, cutoff=900, sub=0.6, kind='saw'):
    n = int(seconds * RATE)
    f = hz(note)
    osc = saw(f, n) if kind == 'saw' else square(f, n) * 0.6
    tone = fft_filter(osc, hi=cutoff) + sub * sine(f, n)
    return np.tanh(1.3 * tone) * adsr(n, 0.004, 0.08, 0.8, 0.04)


def subbass(note, seconds):
    n = int(seconds * RATE)
    f = hz(note)
    tone = sine(f, n) + 0.25 * sine(2 * f, n)
    return tone * adsr(n, 0.006, 0.15, 0.75, 0.05)


# ---------------------------------------------------------------- mixing helpers

class Track:
    def __init__(self, seconds):
        self.n = int(seconds * RATE) + RATE * 3
        self.stems = {}
        self.kicks = []

    def stem(self, name):
        if name not in self.stems:
            self.stems[name] = np.zeros((self.n, 2))
        return self.stems[name]

    def add(self, name, start, x, gain=1.0, pan=0.0):
        s = int(start * RATE)
        if s >= self.n:
            return
        x = x[: self.n - s] * gain
        st = self.stem(name)
        st[s:s + len(x), 0] += x * np.sqrt(0.5 * (1 - pan))
        st[s:s + len(x), 1] += x * np.sqrt(0.5 * (1 + pan))


def pump(n, kicks, depth=0.6, release=0.22):
    """Sidechain-style gain curve that dips on each kick."""
    g = np.ones(n)
    t_rel = int(release * RATE)
    curve = 1 - depth * (1 - np.linspace(0, 1, t_rel) ** 0.6)
    for k in kicks:
        s = int(k * RATE)
        if s >= n:
            continue
        e = min(n, s + t_rel)
        g[s:e] = np.minimum(g[s:e], curve[: e - s])
    return g


def reverb(x, seconds=1.1, mix=0.18):
    n_ir = int(seconds * RATE)
    t = np.arange(n_ir) / RATE
    ir = rng.normal(0, 1, n_ir) * np.exp(-t * 6.5 / seconds)
    ir = fft_filter(ir, hi=6000)
    ir /= np.sqrt((ir ** 2).sum())
    out = np.empty_like(x)
    for ch in range(2):
        L = len(x) + n_ir
        y = np.fft.irfft(np.fft.rfft(x[:, ch], L) * np.fft.rfft(ir, L), L)[: len(x)]
        out[:, ch] = x[:, ch] * (1 - mix) + y * mix * 2.2
    return out


# ---------------------------------------------------------------- song structure

def sections(total_bars):
    """intro, A, B, A, break, B, A ... until long enough. Each entry: (name, bars)."""
    plan = [('intro', 4), ('A', 8), ('B', 8), ('A', 8), ('break', 4), ('B', 8), ('A', 8), ('B', 8), ('break', 4), ('A', 8), ('B', 8)]
    out, bars, i = [], 0, 0
    while bars < total_bars:
        name, b = plan[i % len(plan)] if i < len(plan) else plan[1 + (i - 1) % (len(plan) - 1)]
        out.append((name, b))
        bars += b
        i += 1
    return out


def compose(preset, seconds):
    P = PRESETS[preset]
    bpm, swing = P['bpm'], P.get('swing', 0)
    beat = 60 / bpm
    bar = 4 * beat
    total_bars = int(np.ceil(seconds / bar)) + 1
    tr = Track(total_bars * bar)

    def at(bar_i, step16):
        # 16th-note grid with optional swing on the off 16ths.
        off = swing * beat / 4 if step16 % 2 == 1 else 0
        return bar_i * bar + step16 * beat / 4 + off

    bar_i = 0
    for name, nbars in sections(total_bars):
        for b in range(nbars):
            chord = P['chords'][(bar_i) % len(P['chords'])]
            last_of_section = b == nbars - 1
            P['play'](tr, at, bar_i, b, name, chord, beat, bar, last_of_section)
            bar_i += 1
        if name in ('intro', 'break'):
            tr.add('fx', bar_i * bar - 2 * beat, riser(2 * beat), 0.8)
        tr.add('fx', bar_i * bar, crash(), 0.7)

    n = tr.n
    g = pump(n, tr.kicks, P.get('pump', 0.55))
    mix = np.zeros((n, 2))
    for name, st in tr.stems.items():
        lvl = P['levels'].get(name, 0.5)
        if name in P.get('pumped', ()):
            st = st * g[:, None]
        if name in P.get('wet', ()):
            st = reverb(st, 1.2, 0.28)
        mix += st * lvl
    mix = reverb(mix, 0.7, 0.08)
    mix = mix[: int(seconds * RATE)]
    # Gentle limiter, then normalise.
    mix = np.tanh(mix / (np.max(np.abs(mix)) + 1e-9) * 1.6)
    fade = int(0.02 * RATE)
    mix[:fade] *= np.linspace(0, 1, fade)[:, None]
    return mix / np.max(np.abs(mix)) * 0.89


# ---------------------------------------------------------------- presets

def four_floor(tr, at, i, name, *, clap_=True, hats=True, open_hats=False, k=None):
    if name != 'break':
        for q in (0, 4, 8, 12):
            t = at(i, q)
            tr.add('drums', t, k if k is not None else KICK, 1.0)
            tr.kicks.append(t)
    if clap_ and name != 'intro':
        for q in (4, 12):
            tr.add('drums', at(i, q), CLAP, 0.8, 0.05)
    if hats:
        for q in range(2, 16, 4):
            tr.add('hats', at(i, q), HAT_C, 1.0, 0.25)
    if open_hats and name in ('B',):
        for q in (2, 6, 10, 14):
            tr.add('hats', at(i, q), HAT_O, 0.6, -0.2)


def play_pitch(tr, at, i, b, name, chord, beat, bar, last):
    # Bright synth-pop: four on the floor, pumping supersaw chords, octave bass, plucky arps.
    four_floor(tr, at, i, name, open_hats=True)
    if name in ('A', 'B'):
        for q in range(0, 16, 1):
            if q % 2 == 1:
                tr.add('hats', at(i, q), HAT_C, 0.45, -0.3)
    for note in chord[1:]:
        tr.add('pads', at(i, 0), supersaw(note, bar * 1.02), 0.25, rng.uniform(-0.4, 0.4))
    root = chord[0] - 12
    if name != 'intro':
        for q in range(0, 16, 2):
            tr.add('bass', at(i, q), bass(root + (12 if q % 4 == 2 else 0), beat / 2 * 0.9, 1100), 0.55)
    if name == 'B' or (name == 'A' and b % 2 == 1):
        arp = [chord[1], chord[2], chord[3], chord[2] + 12, chord[3] + 12, chord[2] + 12, chord[3], chord[2]]
        for q in range(0, 16):
            note = arp[q % 8] + 12
            tr.add('lead', at(i, q), pluck(note, beat * 0.6, 3800), 0.22 if q % 4 == 0 else 0.15, 0.35 * np.sin(q))
    if last and name != 'break':
        for q in (12, 13, 14, 15):
            tr.add('drums', at(i, q), SNARE, 0.35 + 0.1 * (q - 12))


def play_leads(tr, at, i, b, name, chord, beat, bar, last):
    # Night-drive funk: syncopated kick, big snare, 16th hats, EP stabs, bell arps.
    if name != 'break':
        for q in (0, 6, 10):
            t = at(i, q)
            tr.add('drums', t, KICK, 1.0)
            tr.kicks.append(t)
    if name != 'intro':
        for q in (4, 12):
            tr.add('snare', at(i, q), SNARE, 0.85)
    for q in range(16):
        tr.add('hats', at(i, q), HAT_C, 0.75 if q % 2 == 0 else 0.4, 0.3)
    if name == 'B':
        tr.add('hats', at(i, 14), HAT_O, 0.7, -0.3)
    for q in (2, 6, 10, 14) if name != 'intro' else (0, 8):
        for note in chord[1:4]:
            tr.add('keys', at(i, q), epiano(note + 12, beat * 0.7), 0.16, rng.uniform(-0.3, 0.3))
    tr.add('pads', at(i, 0), supersaw(chord[1] + 12, bar, 1800, 3, 0.08), 0.12, -0.3)
    root = chord[0] - 12
    if name != 'intro':
        for q, o, d in ((0, 0, 1.5), (3, 12, 0.5), (6, 0, 1), (8, 0, 1.5), (11, 12, 0.5), (14, 7, 1)):
            tr.add('bass', at(i, q), bass(root + o, beat / 4 * d * 1.8, 800, 0.7, 'square'), 0.6)
    if name in ('A', 'B') and b % 2 == 0:
        mel = [chord[3] + 12, chord[2] + 12, chord[1] + 12, chord[2] + 12, chord[3] + 24, chord[2] + 12]
        for k, q in enumerate((0, 3, 6, 8, 11, 14)):
            tr.add('lead', at(i, q), bell(mel[k], beat * 1.2), 0.13, 0.4 * np.cos(k))
    if last and name != 'break':
        tr.add('drums', at(i, 15), SNARE, 0.5)


def play_followup(tr, at, i, b, name, chord, beat, bar, last):
    # Bouncy swung pop/hip-hop: boom-bap kick, snappy snare, marimba hooks, round sub.
    if name != 'break':
        for q in (0, 7, 10):
            t = at(i, q)
            tr.add('drums', t, KICK_SOFT, 1.0)
            tr.kicks.append(t)
    if name != 'intro':
        for q in (4, 12):
            tr.add('snare', at(i, q), SNARE, 0.75)
            tr.add('snare', at(i, q), CLAP, 0.35)
    for q in range(0, 16, 2):
        tr.add('hats', at(i, q), HAT_C, 0.8 if q % 4 == 0 else 0.5, 0.25)
        tr.add('hats', at(i, q + 1), HAT_C, 0.25, 0.25)
    for note in chord[1:]:
        tr.add('pads', at(i, 0), epiano(note, bar * 0.95), 0.1, rng.uniform(-0.3, 0.3))
    root = chord[0] - 12
    if name != 'intro':
        for q, d in ((0, 3), (7, 1), (10, 4)):
            tr.add('bass', at(i, q), subbass(root, beat / 4 * d), 0.8)
    hook = [0, 2, 3, 2, 4, 3, 2, 1]
    tones = chord[1:] + [chord[1] + 12, chord[2] + 12]
    if name in ('A', 'B', 'intro'):
        pattern = (0, 3, 6, 8, 10, 12, 14) if name != 'intro' else (0, 6, 8, 14)
        for k, q in enumerate(pattern):
            note = tones[hook[(k + b) % len(hook)] % len(tones)] + 12
            tr.add('lead', at(i, q), marimba(note, beat * 0.9), 0.32, 0.3 * np.sin(k * 1.7))
    if name == 'B':
        for q in (2, 6, 10, 14):
            tr.add('keys', at(i, q), pluck(chord[3] + 24, beat * 0.3, 2600, 'square'), 0.08, -0.4)
    if last:
        for q in (13, 14, 15):
            tr.add('snare', at(i, q), SNARE, 0.3)


def play_calendar(tr, at, i, b, name, chord, beat, bar, last):
    # Sunny tropical pop: syncopated kick, rim clicks, shaker 16ths, steel-drum melody.
    if name != 'break':
        for q in (0, 6, 8, 14) if name == 'B' else (0, 8):
            t = at(i, q)
            tr.add('drums', t, KICK, 0.9)
            tr.kicks.append(t)
    if name != 'intro':
        for q in (3, 6, 11, 14):
            tr.add('perc', at(i, q), RIM, 0.8, 0.35)
        for q in (4, 12):
            tr.add('drums', at(i, q), CLAP, 0.55)
    for q in range(16):
        tr.add('perc', at(i, q), SHAKER, 0.9 if q % 4 == 2 else 0.5, -0.35)
    for q in (2, 6, 10, 14):
        for note in chord[1:4]:
            tr.add('keys', at(i, q), pluck(note + 12, beat * 0.45, 2400, 'square'), 0.07, rng.uniform(-0.4, 0.4))
    tr.add('pads', at(i, 0), supersaw(chord[2], bar, 1600, 3, 0.1), 0.12)
    root = chord[0] - 12
    if name != 'intro':
        for q, o in ((0, 0), (3, 0), (6, 7), (8, 0), (11, 12), (14, 7)):
            tr.add('bass', at(i, q), subbass(root + o, beat * 0.55), 0.7)
    mel = [chord[2] + 12, chord[3] + 12, chord[1] + 24, chord[3] + 12, chord[2] + 12, chord[1] + 12]
    if name in ('A', 'B') and b % 2 == 0 or name == 'intro':
        for k, q in enumerate((0, 2, 3, 6, 8, 11)):
            tr.add('lead', at(i, q), steel(mel[(k + i) % len(mel)], beat * 0.9), 0.3, 0.3 * np.cos(k))
    if last and name != 'break':
        for q in (12, 14, 15):
            tr.add('perc', at(i, q), RIM, 1.0, 0.1)


def play_ads(tr, at, i, b, name, chord, beat, bar, last):
    # Driving electro-house: four on the floor, rolling offbeat bass, saw stabs, risers.
    four_floor(tr, at, i, name, open_hats=False, k=KICK_HARD)
    for q in range(16):
        tr.add('hats', at(i, q), HAT_C, 0.6 if q % 4 == 2 else 0.3, 0.2)
    if name in ('A', 'B'):
        for q in (2, 6, 10, 14):
            tr.add('hats', at(i, q), HAT_O, 0.45, -0.25)
    root = chord[0] - 12
    if name != 'intro':
        for q in range(16):
            if q % 4 != 0:
                tr.add('bass', at(i, q), bass(root, beat / 4 * 0.85, 1300, 0.5), 0.45)
    stab_qs = (0, 3, 6, 10, 12) if name == 'B' else (0, 6, 12)
    if name != 'intro':
        for q in stab_qs:
            for note in chord[1:]:
                tr.add('keys', at(i, q), pluck(note + 12, beat * 0.5, 4500), 0.12, rng.uniform(-0.5, 0.5))
    tr.add('pads', at(i, 0), supersaw(chord[1] + 12, bar, 2200, 5, 0.15), 0.14)
    if name == 'B' and b % 4 == 3:
        tr.add('fx', at(i, 0), riser(bar), 0.5)


KICK = kick()
KICK_SOFT = kick(0.7, 46)
KICK_HARD = kick(1.25, 52)
CLAP = clap()
SNARE = snare()
HAT_C = hat()
HAT_O = hat(True)
SHAKER = shaker()
RIM = rim()

# Chords as MIDI notes: [root, chord tones...]
PRESETS = {
    'pitch': dict(bpm=120, play=play_pitch, chords=[[50, 62, 66, 69, 74], [45, 61, 64, 69, 73], [47, 62, 66, 71, 74], [43, 62, 67, 71, 74]],
                  levels={'drums': 0.9, 'hats': 0.5, 'pads': 0.55, 'bass': 0.7, 'lead': 0.5, 'fx': 0.4}, pumped=('pads', 'bass', 'lead'), wet=('lead',)),
    'leads': dict(bpm=112, swing=0.12, play=play_leads, chords=[[40, 64, 67, 71, 74], [36, 64, 67, 72, 76], [43, 62, 67, 71, 74], [38, 62, 66, 69, 72]],
                  levels={'drums': 0.9, 'snare': 0.6, 'hats': 0.42, 'keys': 0.7, 'pads': 0.45, 'bass': 0.75, 'lead': 0.5, 'fx': 0.35}, pumped=('pads', 'keys'), wet=('snare', 'lead'), pump=0.35),
    'followup': dict(bpm=96, swing=0.33, play=play_followup, chords=[[41, 65, 69, 72, 76], [38, 62, 65, 69, 72], [46, 62, 65, 70, 74], [48, 64, 67, 70, 72]],
                     levels={'drums': 0.85, 'snare': 0.65, 'hats': 0.45, 'pads': 0.6, 'bass': 0.85, 'lead': 0.6, 'keys': 0.5, 'fx': 0.3}, pumped=('pads',), wet=('lead', 'snare'), pump=0.3),
    'calendar': dict(bpm=104, swing=0.08, play=play_calendar, chords=[[43, 67, 71, 74, 79], [40, 64, 67, 71, 76], [36, 64, 67, 72, 76], [38, 62, 66, 69, 74]],
                     levels={'drums': 0.85, 'perc': 0.6, 'keys': 0.6, 'pads': 0.4, 'bass': 0.8, 'lead': 0.6, 'fx': 0.3}, pumped=('pads', 'keys'), wet=('lead',), pump=0.4),
    'ads': dict(bpm=126, play=play_ads, chords=[[45, 64, 69, 72, 76], [41, 65, 69, 72, 77], [48, 64, 67, 72, 76], [43, 62, 67, 71, 74]],
                levels={'drums': 0.95, 'hats': 0.45, 'bass': 0.65, 'keys': 0.6, 'pads': 0.45, 'fx': 0.45}, pumped=('pads', 'bass', 'keys'), wet=('keys',), pump=0.6),
}


def write(path, audio):
    pcm = (np.clip(audio, -1, 1) * 32767).astype('<i2')
    with wave.open(path, 'wb') as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(RATE)
        w.writeframes(pcm.tobytes())


if __name__ == '__main__':
    preset, out = sys.argv[1], sys.argv[2]
    write(out, compose(preset, float(sys.argv[3]) if len(sys.argv) > 3 else 200))
