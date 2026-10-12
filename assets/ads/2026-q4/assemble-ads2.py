#!/usr/bin/env python3
"""Assemble the v2 animated ads from rendered frame sequences.

Run: python3 assemble-ads2.py [adId ...]   -> kyntlo-<adId>.mp4

These ship mute-first by design, not by accident: ~85% of feed video is
watched with sound off, and after the hook rewrite the captions carry the
argument on their own. Narration is additive here rather than load-bearing,
so it can be layered in later without recutting the picture.

Music fades over the final 0.8s — a hard cut to silence reads as broken.
"""
import json, pathlib, subprocess, sys

ROOT = pathlib.Path(__file__).parent
FFMPEG = '/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2'
FPS = 30
SPEC = json.loads((ROOT / 'ads2.json').read_text())
BED = {'a': 'music-answered.wav', 'b': 'music-sprawl.wav'}


def build(ad):
    src = ROOT / 'frames' / ad
    frames = sorted(src.glob('f*.png'))
    if not frames:
        print('  %s: no frames — run ads2-scenes.js first' % ad)
        return
    total = len(frames) / FPS
    bed = ROOT / BED['b' if '-b-' in ad else 'a']
    out = ROOT / ('kyntlo-%s.mp4' % ad)

    args = [FFMPEG, '-y',
            '-framerate', str(FPS), '-i', str(src / 'f%05d.png'),
            '-i', str(bed),
            '-filter_complex',
            "[0:v]format=yuv420p[v];"
            "[1:a]atrim=0:%.3f,asetpts=N/SR/TB,afade=t=in:st=0:d=0.4,"
            "afade=t=out:st=%.3f:d=0.8,loudnorm=I=-15:TP=-1.5:LRA=10[a]"
            % (total, max(0.1, total - 0.8)),
            '-map', '[v]', '-map', '[a]',
            '-c:v', 'libx264', '-preset', 'medium', '-crf', '20',
            '-pix_fmt', 'yuv420p', '-r', str(FPS),
            '-c:a', 'aac', '-b:a', '160k', '-ar', '48000',
            '-movflags', '+faststart', '-t', '%.3f' % total, str(out)]
    r = subprocess.run(args, capture_output=True, text=True)
    if r.returncode:
        print(r.stderr[-2000:]); sys.exit('ffmpeg failed on ' + ad)
    print('  %-10s %4.1fs  %4.1f MB  %s' %
          (ad, total, out.stat().st_size / 1e6, SPEC[ad]['concept']))


if __name__ == '__main__':
    for a in (sys.argv[1:] or list(SPEC)):
        build(a)
