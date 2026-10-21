#!/usr/bin/env python3
"""Strip the content-credentials manifest out of every narration line.

Gemini's TTS response carries a C2PA provenance manifest appended to the
audio payload. vo.py decoded the whole blob and wrote it as raw PCM, so on
22 of the 37 lines the last 126 milliseconds of "speech" were actually a
JUMBF box — which plays as a burst of full-scale noise right after the
sentence ends. That is the noise after every line.

Truncating at the manifest is exact rather than heuristic: a JUMBF superbox
is a four-byte big-endian length followed by the ASCII tag 'jumb', and the
manifest Gemini appends always opens with one. Everything before it is audio
and everything after it is not.

The rest is ordinary hygiene the raw files also needed: a head click on the
first sample, an over-long silent tail, and levels that differ line to line
because they came from five different models.

Run: python3 v3-clean-vo.py   ->  vo/clean/*.wav
"""
import numpy as np, pathlib, wave

ROOT = pathlib.Path(__file__).parent
VO = ROOT / 'vo'
OUT = VO / 'clean'
OUT.mkdir(exist_ok=True)

HEAD_TRIM = 0.010     # the first sample is a DC click on several models
TAIL_KEEP = 0.060     # silence left after the last word
FADE = 0.008
FLOOR_DB = -50.0      # below this is silence, not a word
PEAK = 0.72           # -2.9 dBFS, leaving room for the mix


def strip_manifest(raw):
    i = raw.find(b'jumb')
    if i < 4:
        return raw
    cut = i - 4
    return raw[:cut - (cut % 2)]


def clean(path, dest):
    with wave.open(str(path)) as w:
        sr, ch, width = w.getframerate(), w.getnchannels(), w.getsampwidth()
        raw = w.readframes(w.getnframes())
    had = b'jumb' in raw
    a = np.frombuffer(strip_manifest(raw), '<i2').astype(np.float64) / 32768.0

    a = a[int(HEAD_TRIM * sr):]

    # walk back to the last window that is louder than the silence floor
    win = max(1, int(0.010 * sr))
    n = len(a) // win
    lvl = 20 * np.log10(np.sqrt((a[:n * win].reshape(n, win) ** 2).mean(1)) + 1e-12)
    voiced = np.where(lvl > FLOOR_DB)[0]
    if len(voiced):
        end = min(len(a), (voiced[-1] + 1) * win + int(TAIL_KEEP * sr))
        start = max(0, voiced[0] * win - int(0.040 * sr))
        a = a[start:end]

    f = int(FADE * sr)
    if len(a) > 2 * f:
        a[:f] *= np.linspace(0, 1, f)
        a[-f:] *= np.linspace(1, 0, f)

    peak = np.abs(a).max()
    if peak > 1e-6:
        a *= PEAK / peak

    with wave.open(str(dest), 'wb') as w:
        w.setnchannels(ch); w.setsampwidth(width); w.setframerate(sr)
        w.writeframes((np.clip(a, -1, 1) * 32767).astype('<i2').tobytes())
    return had, len(a) / sr


def main():
    n_manifest = 0
    for p in sorted(VO.glob('v3-*-s[0-9][0-9].wav')):
        had, dur = clean(p, OUT / p.name)
        n_manifest += had
        print('  %-24s %5.2fs%s' % (p.name, dur, '   manifest stripped' if had else ''))
    print('\ncleaned %d lines, %d of them carrying a C2PA manifest'
          % (len(list(OUT.glob('v3-*.wav'))), n_manifest))


if __name__ == '__main__':
    main()
