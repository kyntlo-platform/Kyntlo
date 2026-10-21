#!/usr/bin/env python3
"""Assemble the five v3 ads: frames + narration + per-ad bed.

Run: python3 assemble-v3.py <light|dark> [adId ...]  ->  kyntlo-<adId>-<theme>.mp4

The picture was cut to the narration by v3-fit.py, so every line already has
room and the only audio work left is placement, ducking and loudness. The bed
is sidechain-compressed against the voice rather than mixed at a fixed level:
a bed that sits under a 2.9 word-per-second read also sits over a pause.

Captions still carry the whole argument with the sound off.
"""
import json, pathlib, subprocess, sys

ROOT = pathlib.Path(__file__).parent
FFMPEG = '/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2'
FPS = 30
FINAL = json.loads((ROOT / 'v3-final.json').read_text())
PLAN = json.loads((ROOT / 'v3-vofit.json').read_text())
VO = ROOT / 'vo' / 'clean'


def tempo_wav(name, tempo):
    """atempo is pitch-preserving; the cached file keys on the rate."""
    src = VO / name
    if tempo <= 1.001:
        return src
    dst = src.with_suffix('.t%d.wav' % round(tempo * 1000))
    if not dst.exists():
        subprocess.run([FFMPEG, '-y', '-i', str(src), '-filter:a',
                        'atempo=%.4f' % tempo, str(dst)],
                       check=True, capture_output=True)
    return dst


def build(ad, theme):
    src = ROOT / 'frames' / (ad + '-' + theme)
    frames = sorted(src.glob('f*.png'))
    if not frames:
        print('  %s-%s: no frames — run v3-scenes.js first' % (ad, theme))
        return
    total = len(frames) / FPS
    bed = ROOT / ('bed-%s.wav' % ad)
    if not bed.exists():
        sys.exit('missing %s — run music-v3.py' % bed.name)
    out = ROOT / ('kyntlo-%s-%s.mp4' % (ad, theme))

    cues = [(tempo_wav(c['wav'], c['tempo']), c['at']) for c in PLAN[ad]]
    args = [FFMPEG, '-y',
            '-framerate', str(FPS), '-i', str(src / 'f%05d.png'),
            '-i', str(bed)]
    for w, _ in cues:
        args += ['-i', str(w)]

    fc = ['[0:v]format=yuv420p[v]']
    for n, (_, at) in enumerate(cues):
        ms = int(at * 1000)
        fc.append('[%d:a]adelay=%d|%d[n%d]' % (n + 2, ms, ms, n))
    # no dynaudnorm here: it rides the gain inside every gap between
    # words, which lifts the noise floor exactly where a listener notices.
    # The lines are levelled once, offline, by v3-clean-vo.py instead.
    fc.append('%samix=inputs=%d:normalize=0[voall]'
              % (''.join('[n%d]' % n for n in range(len(cues))), len(cues)))
    # a filter label is consumed once, so the voice is split: one copy drives
    # the sidechain, the other is what you hear
    fc.append('[voall]asplit=2[vokey][vomix]')
    fc.append('[1:a]atrim=0:%.3f,asetpts=N/SR/TB,afade=t=in:st=0:d=0.4,'
              'afade=t=out:st=%.3f:d=0.9,volume=0.60[mus]'
              % (total, max(0.1, total - 0.9)))
    fc.append('[mus][vokey]sidechaincompress=threshold=0.04:ratio=9:attack=8:'
              'release=260:makeup=1[duck]')
    fc.append('[duck][vomix]amix=inputs=2:normalize=0,'
              'loudnorm=I=-14:TP=-1.5:LRA=10[a]')

    args += ['-filter_complex', ';'.join(fc),
             '-map', '[v]', '-map', '[a]',
             '-c:v', 'libx264', '-preset', 'medium', '-crf', '20',
             '-pix_fmt', 'yuv420p', '-r', str(FPS),
             '-c:a', 'aac', '-b:a', '160k', '-ar', '48000',
             '-movflags', '+faststart', '-t', '%.3f' % total, str(out)]
    r = subprocess.run(args, capture_output=True, text=True)
    if r.returncode:
        print(r.stderr[-2500:]); sys.exit('ffmpeg failed on ' + ad)

    # a poster frame from the hook, for the ad manager's thumbnail slot
    poster = ROOT / ('kyntlo-%s-%s-poster.png' % (ad, theme))
    subprocess.run([FFMPEG, '-y', '-i', str(out), '-ss', '1.2', '-frames:v', '1',
                    str(poster)], check=True, capture_output=True)
    print('  %-14s %-5s %5.1fs  %4.1f MB  %s-tier %s' %
          (ad, theme, total, out.stat().st_size / 1e6, FINAL[ad]['tier'],
           FINAL[ad]['format']))


if __name__ == '__main__':
    theme = sys.argv[1] if len(sys.argv) > 1 else 'dark'
    if theme not in ('light', 'dark'):
        sys.exit('first argument is the theme: light or dark')
    for a in (sys.argv[2:] or list(FINAL)):
        build(a, theme)
