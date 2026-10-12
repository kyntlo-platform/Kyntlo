#!/usr/bin/env python3
"""Assemble the v2 animated ads from rendered frame sequences.

Run: python3 assemble-ads2.py [adId ...]   -> kyntlo-<adId>.mp4

These ship mute-first by design, not by accident: ~85% of feed video is
watched with sound off, and after the hook rewrite the captions carry the
argument on their own. Narration is additive here rather than load-bearing,
so it can be layered in later without recutting the picture.

Music fades over the final 0.8s — a hard cut to silence reads as broken.
"""
import json, pathlib, subprocess, sys, wave

ROOT = pathlib.Path(__file__).parent
FFMPEG = '/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2'
FPS = 30
SPEC = json.loads((ROOT / 'ads2.json').read_text())
BED = {'a': 'music-answered.wav', 'b': 'music-sprawl.wav'}
VO = ROOT / 'vo'
HEAD, TAIL = 0.20, 0.25      # breath in, beat out, inside each scene


def wav_len(p):
    with wave.open(str(p)) as w:
        return w.getnframes() / w.getframerate()


def fit_vo(ad):
    """Fit each narration line inside the scene it belongs to.

    The picture is already cut and approved, so the audio bends to it rather
    than the reverse: a line longer than its scene is sped up with atempo
    (pitch-preserving, capped at 1.4x) instead of the scene being stretched.
    Returns [(wav, start_seconds)] or None if any line is missing.
    """
    out, t = [], 0.0
    for i, sc in enumerate(SPEC[ad]['scenes'], 1):
        w = VO / ('%s-s%02d.wav' % (ad, i))
        if sc.get('vo'):
            if not w.exists():
                return None
            room = sc['sec'] - HEAD - TAIL
            have = wav_len(w)
            if have > room:
                f = min(1.4, have / room)
                sped = w.with_suffix('.fit%d.wav' % round(f * 100))
                if not sped.exists():
                    subprocess.run([FFMPEG, '-y', '-i', str(w), '-filter:a',
                                    'atempo=%.4f' % f, str(sped)],
                                   check=True, capture_output=True)
                w = sped
            out.append((w, t + HEAD))
        t += sc['sec']
    return out


def build(ad):
    src = ROOT / 'frames' / ad
    frames = sorted(src.glob('f*.png'))
    if not frames:
        print('  %s: no frames — run ads2-scenes.js first' % ad)
        return
    total = len(frames) / FPS
    bed = ROOT / BED['b' if '-b-' in ad else 'a']
    out = ROOT / ('kyntlo-%s.mp4' % ad)

    vo = fit_vo(ad)
    args = [FFMPEG, '-y',
            '-framerate', str(FPS), '-i', str(src / 'f%05d.png'),
            '-i', str(bed)]
    for w, _ in (vo or []):
        args += ['-i', str(w)]

    if vo:
        fc = ["[0:v]format=yuv420p[v]"]
        for n, (_, at) in enumerate(vo):
            ms = int(at * 1000)
            fc.append("[%d:a]adelay=%d|%d[n%d]" % (n + 2, ms, ms, n))
        fc.append("%samix=inputs=%d:normalize=0,dynaudnorm=f=200:g=7:p=0.75[voall]"
                  % (''.join('[n%d]' % n for n in range(len(vo))), len(vo)))
        fc.append("[voall]asplit=2[vokey][vomix]")
        fc.append("[1:a]atrim=0:%.3f,asetpts=N/SR/TB,afade=t=in:st=0:d=0.4,"
                  "afade=t=out:st=%.3f:d=0.8,volume=0.62[mus]"
                  % (total, max(0.1, total - 0.8)))
        fc.append("[mus][vokey]sidechaincompress=threshold=0.04:ratio=9:attack=8:"
                  "release=260:makeup=1[duck]")
        fc.append("[duck][vomix]amix=inputs=2:normalize=0,"
                  "loudnorm=I=-14:TP=-1.5:LRA=10[a]")
    else:
        fc = ["[0:v]format=yuv420p[v]",
              "[1:a]atrim=0:%.3f,asetpts=N/SR/TB,afade=t=in:st=0:d=0.4,"
              "afade=t=out:st=%.3f:d=0.8,loudnorm=I=-15:TP=-1.5:LRA=10[a]"
              % (total, max(0.1, total - 0.8))]

    args += ['-filter_complex', ';'.join(fc),
             '-map', '[v]', '-map', '[a]',
            '-c:v', 'libx264', '-preset', 'medium', '-crf', '20',
            '-pix_fmt', 'yuv420p', '-r', str(FPS),
            '-c:a', 'aac', '-b:a', '160k', '-ar', '48000',
            '-movflags', '+faststart', '-t', '%.3f' % total, str(out)]
    r = subprocess.run(args, capture_output=True, text=True)
    if r.returncode:
        print(r.stderr[-2000:]); sys.exit('ffmpeg failed on ' + ad)
    print('  %-10s %4.1fs  %4.1f MB  %-16s %s' %
          (ad, total, out.stat().st_size / 1e6, SPEC[ad]['concept'],
           'narrated' if vo else 'mute-first'))


if __name__ == '__main__':
    for a in (sys.argv[1:] or list(SPEC)):
        build(a)
