#!/usr/bin/env python3
"""Assemble the brand film: stills + VO + music -> kyntlo-brand-film.mp4

Scene lengths are derived from the narration, not guessed, so picture and read
cannot drift. Music is ducked under the voice with a real sidechain compressor
rather than a fixed volume cut, which is what stops a bed from fighting a VO.

Run: python3 assemble-film.py
"""
import json, pathlib, subprocess, sys, wave

ROOT = pathlib.Path(__file__).parent
FILM = ROOT / 'film'
VO = ROOT / 'vo'
FFMPEG = '/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2'
OUT = ROOT / 'kyntlo-brand-film.mp4'

W, H, FPS = 1080, 1920, 30
XF = 0.55            # crossfade length
HEAD, TAIL = 0.30, 0.80
MINLEN = 2.8

def dur(p):
    with wave.open(str(p)) as w:
        return w.getnframes() / w.getframerate()

def main():
    scenes = sorted(FILM.glob('s??.png'))
    wavs = [VO / ('brand-film-s%02d.wav' % (i + 1)) for i in range(len(scenes))]
    missing = [w.name for w in wavs if not w.exists()]
    if missing:
        sys.exit('missing narration: %s' % ', '.join(missing))

    vd = [dur(w) for w in wavs]
    d = [max(MINLEN, v + HEAD + TAIL) for v in vd]
    # scene i begins here on the finished timeline (each xfade eats XF seconds)
    starts, acc = [], 0.0
    for i, x in enumerate(d):
        starts.append(acc)
        acc += x - (XF if i < len(d) - 1 else 0)
    total = acc

    args = [FFMPEG, '-y']
    for i, s in enumerate(scenes):
        args += ['-loop', '1', '-t', '%.3f' % d[i], '-i', str(s)]
    for w in wavs:
        args += ['-i', str(w)]
    args += ['-i', str(ROOT / 'music.wav')]
    nv = len(scenes)

    fc = []
    # slow push, alternating direction, so eight stills do not feel like a slideshow
    for i in range(nv):
        frames = max(2, int(round(d[i] * FPS)))
        z = ("1.0+0.085*on/%d" % (frames - 1)) if i % 2 == 0 \
            else ("1.085-0.085*on/%d" % (frames - 1))
        fc.append(
            "[%d:v]zoompan=z='%s':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'"
            ":d=%d:s=%dx%d:fps=%d,setsar=1[v%d]" % (i, z, frames, W, H, FPS, i))

    # crossfade the chain together
    prev = 'v0'
    for i in range(1, nv):
        lab = 'x%d' % i
        fc.append("[%s][v%d]xfade=transition=fade:duration=%.3f:offset=%.3f[%s]"
                  % (prev, i, XF, starts[i], lab))
        prev = lab
    # grain + a final grade pass; keeps flat gradients from banding on compression
    fc.append("[%s]noise=alls=5:allf=t+u,eq=saturation=1.04:contrast=1.02,"
              "format=yuv420p[vout]" % prev)

    # narration: each line placed at its scene start
    for i in range(nv):
        fc.append("[%d:a]adelay=%d|%d,volume=1.0[a%d]"
                  % (nv + i, int((starts[i] + HEAD) * 1000),
                     int((starts[i] + HEAD) * 1000), i))
    fc.append("%samix=inputs=%d:normalize=0,dynaudnorm=f=250:g=9:p=0.72[voall]"
              % (''.join('[a%d]' % i for i in range(nv)), nv))
    fc.append("[voall]asplit=2[vokey][vomix]")
    # music: trim, fade, then duck under the voice
    fc.append("[%d:a]atrim=0:%.3f,asetpts=N/SR/TB,afade=t=in:st=0:d=2.0,"
              "afade=t=out:st=%.3f:d=2.2,volume=0.58[mus]" % (2 * nv, total, total - 2.2))
    fc.append("[mus][vokey]sidechaincompress=threshold=0.035:ratio=9:attack=12:"
              "release=420:makeup=1[duck]")
    fc.append("[duck][vomix]amix=inputs=2:normalize=0,"
              "loudnorm=I=-15:TP=-1.5:LRA=11[aout]")

    args += ['-filter_complex', ';'.join(fc),
             '-map', '[vout]', '-map', '[aout]',
             '-c:v', 'libx264', '-preset', 'slow', '-crf', '19',
             '-pix_fmt', 'yuv420p', '-r', str(FPS),
             '-c:a', 'aac', '-b:a', '192k', '-ar', '48000',
             '-movflags', '+faststart', '-t', '%.3f' % total, str(OUT)]

    print('scenes: ' + '  '.join('%d:%.1fs' % (i + 1, x) for i, x in enumerate(d)))
    print('total:  %.1fs' % total)
    r = subprocess.run(args, capture_output=True, text=True)
    if r.returncode:
        print(r.stderr[-3000:]); sys.exit('ffmpeg failed')
    mb = OUT.stat().st_size / 1e6
    print('wrote %s  %.1f MB  %.1fs' % (OUT.name, mb, total))

if __name__ == '__main__':
    main()
