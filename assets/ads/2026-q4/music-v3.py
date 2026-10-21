#!/usr/bin/env python3
"""One arranged bed per v3 ad.

The first version of these beds was a four-bar loop at constant density with
a volume curve drawn over the top. That is why they sounded repetitive: the
gain moved but nothing else did, so every bar had the same instruments
playing the same figure, and the ear stops hearing a loop as music about ten
seconds in.

This is an arrangement instead. Six sections, instruments entering and
leaving, a filter that opens across the build, a break where almost
everything drops out, and a riser into the section after it:

    open     pad and a hat, filtered right down
    build    bass enters on the downbeats, eighth-note arp underneath
    lift     sixteenths, a pulse on every beat, filter wide open
    break    everything out but the pad — the beat the argument turns on
    resolve  bass and arp return, warmer, no sixteenths
    out      the pad resolves and the tail rings

The break is placed per ad, at the beat where that ad's argument turns:
where the patient leaves in the VSL, where the tower collapses in the stack
ad, where the thirteen hours land in the timeline. The music stops arguing
exactly where the voice starts to.

The progression is eight chords rather than four, so the harmony does not
come back around until bar nine.

Run after v3-fit.py: python3 music-v3.py   ->  bed-v3-*.wav
"""
import importlib.util, json, pathlib, wave
import numpy as np

ROOT = pathlib.Path(__file__).parent
_spec = importlib.util.spec_from_file_location('kmusic', ROOT / 'music.py')
M = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(M)          # music.py guards its own main()

SR = M.SR
BPM = 104.0
BEAT = 60.0 / BPM
BAR = 4 * BEAT

# A minor, same key as the brand film and the v2 beds. Eight chords: two
# four-bar phrases that do not repeat until bar nine.
PROG = [([57, 60, 64], 45), ([53, 57, 60], 41), ([52, 55, 60], 40), ([50, 55, 59], 43),
        ([57, 60, 64], 45), ([50, 53, 57], 38), ([53, 57, 60], 41), ([52, 56, 59], 40)]

# where each ad's argument turns — the break lands here
TURN = {
    'v3-vsl':        0.60,   # "but the patient isn't waiting"
    'v3-audit':      0.68,   # the four-bar recap, which carries no voice
    'v3-stack':      0.62,   # the tower collapses
    'v3-objections': 0.70,   # between the third objection and the fourth
    'v3-timeline':   0.60,   # the thirteen hours land
}


def curve(dur, pts):
    """Breakpoint automation over the whole bed, in fractions of duration."""
    n = int(dur * SR)
    xs = np.array([p[0] for p in pts]) * n
    ys = np.array([p[1] for p in pts])
    return np.interp(np.arange(n), xs, ys)


def sections(turn):
    """Section boundaries as fractions, derived from where the ad turns."""
    b0 = max(0.10, turn - 0.07)      # break in
    b1 = min(0.88, turn + 0.09)      # break out
    return dict(build=0.08, lift=0.30, brk=b0, res=b1, out=0.92)


def build(ad, dur):
    np.random.seed(7)
    n = int(dur * SR)
    s = sections(TURN[ad])

    pad = np.zeros(n); bass = np.zeros(n); arp = np.zeros(n)
    pulse = np.zeros(n); hat = np.zeros(n); fx = np.zeros(n)

    chord_len = int(BAR * SR)
    i = ci = 0
    while i < n:
        notes, root = PROG[ci % len(PROG)]
        ln = min(chord_len, n - i)
        pos = i / n                     # where this bar sits in the ad

        for m in notes:
            pad[i:i + ln] += M.tone(M.n2f(m), ln, (1.0, 0.4, 0.2, 0.09),
                                    detune=0.005) * \
                M.env(ln, 0.3, 0.45, 0.78, 0.5, 0.26)

        for b in range(4):
            st = i + int(b * BEAT * SR)
            bl = min(int(0.9 * BEAT * SR), n - st)
            if bl > 0:
                bass[st:st + bl] += M.tone(M.n2f(root), bl, (1.0, 0.32, 0.1)) * \
                    M.env(bl, 0.008, 0.5, 0.2, 0.2, 0.52)

            pl = min(int(0.19 * SR), n - st)
            if pl > 0:
                tt = np.arange(pl) / SR
                pulse[st:st + pl] += np.sin(
                    2 * np.pi * 62 * tt * (1 - 0.4 * tt / (pl / SR))) * \
                    M.env(pl, 0.003, 0.16, 0.0, 0.02, 0.46)

            # the hat is the only thing that never leaves: it is the clock
            # these ads are all arguing about
            for sub in (0.5,) if pos < s['lift'] else (0.25, 0.5, 0.75):
                st2 = st + int(BEAT * sub * SR)
                hl = min(int(0.05 * SR), n - st2)
                if hl > 0:
                    hat[st2:st2 + hl] += M.lowpass_fast(
                        np.random.randn(hl), 7000) * \
                        M.env(hl, 0.001, 0.045, 0.0, 0.005, 0.1)

        # sixteenths only in the lift, eighths either side of it
        step = 16 if s['lift'] <= pos < s['brk'] else 8
        for k in range(step):
            st = i + int(k * BAR / step * SR)
            al = min(int(BEAT * (0.3 if step == 16 else 0.45) * SR), n - st)
            if al <= 0:
                break
            m = notes[k % 3] + (12 if (k // 2) % 2 else 0)
            arp[st:st + al] += M.tone(M.n2f(m + 12), al, (1.0, 0.3, 0.12)) * \
                M.env(al, 0.004, 0.18, 0.0, 0.06, 0.15 if step == 16 else 0.11)
        i += ln; ci += 1

    # a swell that lands on the downbeat the break ends — the only thing in
    # the bed that announces a section instead of just being in one
    rise = int(1.6 * SR)
    at = max(0, int(s['res'] * n) - rise)
    rn = min(rise, n - at)
    if rn > 0:
        t = np.arange(rn) / SR
        sweep = np.sin(2 * np.pi * np.cumsum(180 + 900 * (t / (rn / SR)) ** 2) / SR)
        fx[at:at + rn] += (sweep * 0.5 + M.lowpass_fast(np.random.randn(rn), 4200)) * \
            (np.linspace(0, 1, rn) ** 2.4) * 0.5
    hit = int(s['res'] * n)
    hl = min(int(0.9 * SR), n - hit)
    if hl > 0:
        t = np.arange(hl) / SR
        fx[hit:hit + hl] += np.sin(2 * np.pi * 48 * t * (1 - 0.55 * t / (hl / SR))) * \
            M.env(hl, 0.002, 0.5, 0.0, 0.3, 0.7)

    # the filter opens across the build and closes again for the break, which
    # is most of what makes a section sound like a different section
    bright = M.reverb(M.lowpass_fast(arp, 5600), 1.1, 0.24)
    dull = M.reverb(M.lowpass_fast(arp, 1300), 1.4, 0.30)
    openness = curve(dur, [(0, 0.0), (s['build'], 0.15), (s['lift'], 0.85),
                           (s['brk'], 0.9), (s['brk'] + 0.01, 0.1),
                           (s['res'], 0.7), (1, 0.6)])
    arp = dull * (1 - openness) + bright * openness

    pad = M.reverb(M.lowpass_fast(pad, 2400), 1.6, 0.32)
    bass = M.lowpass_fast(bass, 340)

    # per-instrument automation: who is playing, and when
    g_pad = curve(dur, [(0, 0.85), (s['lift'], 0.70), (s['brk'], 1.0),
                        (s['res'], 0.72), (s['out'], 0.85), (1, 0.0)])
    g_bass = curve(dur, [(0, 0.0), (s['build'] - 0.01, 0.0), (s['build'], 0.9),
                         (s['brk'] - 0.01, 1.0), (s['brk'], 0.0),
                         (s['res'] - 0.01, 0.0), (s['res'], 0.95),
                         (s['out'], 0.8), (1, 0.0)])
    g_arp = curve(dur, [(0, 0.0), (s['build'], 0.55), (s['lift'], 0.95),
                        (s['brk'] - 0.01, 0.95), (s['brk'], 0.0),
                        (s['res'], 0.75), (s['out'], 0.5), (1, 0.0)])
    g_pul = curve(dur, [(0, 0.0), (s['lift'] - 0.01, 0.0), (s['lift'], 0.9),
                        (s['brk'] - 0.01, 0.9), (s['brk'], 0.0),
                        (s['res'], 0.85), (s['out'], 0.4), (1, 0.0)])
    g_hat = curve(dur, [(0, 0.5), (s['build'], 0.8), (s['brk'], 0.8),
                        (s['brk'] + 0.01, 0.25), (s['res'], 0.7), (1, 0.0)])

    mix = (pad * 0.95 * g_pad + bass * 0.9 * g_bass + arp * 0.9 * g_arp +
           pulse * 0.8 * g_pul + hat * 0.6 * g_hat + fx * 0.75)
    mix = np.tanh(mix * 1.25) * 0.84
    mix /= max(np.abs(mix).max(), 1e-9)
    mix *= 0.70

    st = np.stack([mix, np.roll(mix, 180)], axis=1)
    out = ROOT / ('bed-%s.wav' % ad)
    with wave.open(str(out), 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((np.clip(st, -1, 1) * 32767).astype('<i2').tobytes())
    print('  %-14s %5.1fs  break at %.0f%%' % (ad, dur, TURN[ad] * 100))


def main():
    final = json.loads((ROOT / 'v3-final.json').read_text())
    for ad in TURN:
        build(ad, sum(s['sec'] for s in final[ad]['scenes']))


if __name__ == '__main__':
    main()
