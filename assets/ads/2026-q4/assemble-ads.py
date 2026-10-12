#!/usr/bin/env python3
"""Assemble the fast cold-feed ads.

Run: python3 assemble-ads.py [adId ...]      -> kyntlo-<adId>.mp4

Hard cuts, not crossfades. At a three-second cut rate a dissolve reads as
hesitation, and it also costs the frames where the next line should already
be legible. Each scene gets a short punch-in instead.

Scene length follows the narration, with a floor so one-word lines ("Texts.")
still land rather than flashing past.
"""
import json, pathlib, subprocess, sys, wave

ROOT = pathlib.Path(__file__).parent
FFMPEG = '/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2'
W, H, FPS = 1080, 1920, 30
HEAD, TAIL = 0.18, 0.46       # tight: this is a fast ad, not a brand film
MINLEN, HOLD_LAST = 1.35, 1.1

BED = {'a': 'music-answered.wav', 'b': 'music-sprawl.wav'}


def dur(p):
    with wave.open(str(p)) as w:
        return w.getnframes() / w.getframerate()


SCRIPT = json.loads((ROOT / 'script.json').read_text())
TARGET_WPM = 190.0          # the pace concept A came back at, which reads right


def pace_fix(ad, wavs):
    """Normalise speaking rate across ads.

    The TTS free tier caps each model at about eleven requests a day, so four
    ads cannot all come from one model - and the models differ wildly in pace
    (3.1-flash reads at ~120 wpm where 2.5-flash reads at ~200). Left alone,
    the two ads in an A/B would differ in tempo, which is a far bigger
    creative variable than the hook being tested. Speeding the slow ones up
    with atempo is pitch-preserving and keeps the comparison about the writing.

    Only ever speeds up, never past 1.35x, where atempo stops being clean.
    """
    words = sum(len(l['vo'].split()) for l in SCRIPT[ad])
    spoken = sum(dur(w) for w in wavs)
    wpm = words / spoken * 60
    factor = min(1.35, max(1.0, TARGET_WPM / wpm))
    if factor < 1.02:
        return wavs
    out = []
    for w in wavs:
        o = w.with_suffix('.t%d.wav' % round(factor * 100))
        if not o.exists():
            subprocess.run([FFMPEG, '-y', '-i', str(w), '-filter:a',
                            'atempo=%.4f' % factor, str(o)],
                           check=True, capture_output=True)
        out.append(o)
    print('  %-10s %.0f wpm -> %.0f wpm (atempo %.2fx)' % (ad, wpm, wpm * factor, factor))
    return out


def build(ad):
    scenes = sorted((ROOT / 'ads' / ad).glob('s??.png'))
    wavs = [ROOT / 'vo' / ('%s-s%02d.wav' % (ad, i + 1)) for i in range(len(scenes))]
    narrated = all(w.exists() for w in wavs)

    if narrated:
        wavs = pace_fix(ad, wavs)
        d = [max(MINLEN, dur(w) + HEAD + TAIL) for w in wavs]
    else:
        # Mute-first cut. Most feed video is watched with sound off, so a
        # captioned ad carried by music is a legitimate format rather than a
        # fallback - but the picture now has to set its own pace, so each
        # scene is timed off how much there is to read.
        d = []
        for l in SCRIPT[ad]:
            words = len((l['cap'].replace('<br>', ' ') + ' ' + l.get('sub', '')).split())
            d.append(min(3.6, max(1.6, 0.9 + 0.30 * words)))
    d[-1] += HOLD_LAST                      # let the logo breathe
    starts, acc = [], 0.0
    for x in d:
        starts.append(acc); acc += x
    total = acc

    bed = ROOT / BED['b' if '-b-' in ad else 'a']
    args = [FFMPEG, '-y']
    for i, s in enumerate(scenes):
        args += ['-loop', '1', '-t', '%.3f' % d[i], '-i', str(s)]
    if narrated:
        for w in wavs:
            args += ['-i', str(w)]
    args += ['-i', str(bed)]
    nv = len(scenes)
    mus_idx = (2 * nv) if narrated else nv

    fc = []
    for i in range(nv):
        f = max(2, int(round(d[i] * FPS)))
        # quick settle: most of the movement is spent in the first half-second
        z = "1.055-0.055*min(1,on/%d)" % max(1, int(FPS * 0.55))
        fc.append("[%d:v]zoompan=z='%s':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'"
                  ":d=%d:s=%dx%d:fps=%d,setsar=1[v%d]" % (i, z, f, W, H, FPS, i))
    fc.append("%sconcat=n=%d:v=1:a=0[cat]" % (''.join('[v%d]' % i for i in range(nv)), nv))
    fc.append("[cat]noise=alls=4:allf=t+u,eq=saturation=1.05:contrast=1.03,"
              "format=yuv420p[vout]")

    if narrated:
        for i in range(nv):
            ms = int((starts[i] + HEAD) * 1000)
            fc.append("[%d:a]adelay=%d|%d[a%d]" % (nv + i, ms, ms, i))
        fc.append("%samix=inputs=%d:normalize=0,dynaudnorm=f=200:g=7:p=0.75[voall]"
                  % (''.join('[a%d]' % i for i in range(nv)), nv))
        fc.append("[voall]asplit=2[vokey][vomix]")
        fc.append("[%d:a]atrim=0:%.3f,asetpts=N/SR/TB,afade=t=in:st=0:d=0.5,"
                  "afade=t=out:st=%.3f:d=1.4,volume=0.62[mus]"
                  % (mus_idx, total, max(0.1, total - 1.4)))
        fc.append("[mus][vokey]sidechaincompress=threshold=0.04:ratio=9:attack=8:"
                  "release=260:makeup=1[duck]")
        fc.append("[duck][vomix]amix=inputs=2:normalize=0,"
                  "loudnorm=I=-14:TP=-1.5:LRA=10[aout]")
    else:
        # nothing to duck under, so the bed carries the whole track
        fc.append("[%d:a]atrim=0:%.3f,asetpts=N/SR/TB,afade=t=in:st=0:d=0.5,"
                  "afade=t=out:st=%.3f:d=1.4,volume=1.0,"
                  "loudnorm=I=-15:TP=-1.5:LRA=10[aout]"
                  % (mus_idx, total, max(0.1, total - 1.4)))

    out = ROOT / ('kyntlo-%s.mp4' % ad)
    args += ['-filter_complex', ';'.join(fc), '-map', '[vout]', '-map', '[aout]',
             '-c:v', 'libx264', '-preset', 'medium', '-crf', '21',
             '-pix_fmt', 'yuv420p', '-r', str(FPS),
             '-c:a', 'aac', '-b:a', '160k', '-ar', '48000',
             '-movflags', '+faststart', '-t', '%.3f' % total, str(out)]
    r = subprocess.run(args, capture_output=True, text=True)
    if r.returncode:
        print(r.stderr[-2500:]); sys.exit('ffmpeg failed on ' + ad)
    print('  %-10s %4.1fs  %4.1f MB  %s  cuts: %s' %
          (ad, total, out.stat().st_size / 1e6,
           'narrated' if narrated else 'mute-first',
           ' '.join('%.1f' % x for x in d)))
    return out


if __name__ == '__main__':
    ads = sys.argv[1:] or ['ad-a-uae', 'ad-a-usa', 'ad-b-uae', 'ad-b-usa']
    for a in ads:
        build(a)
