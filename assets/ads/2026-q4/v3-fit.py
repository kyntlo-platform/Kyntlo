#!/usr/bin/env python3
"""Cut the v3 picture to the narration that actually exists.

The v2 build rendered frames first and then discovered fourteen scenes were
shorter than the line they had to carry — one of them by 2.4 seconds. Doing
it in this order costs nothing: measure every rendered line, decide per scene
whether to speed the read slightly or widen the scene, and only then render
frames. Nothing gets re-rendered.

A line is sped up to 1.25x at most. Beyond that the read stops sounding
considered, which is the whole register of this campaign, so past that point
the scene widens instead.

Run after v3-vo.py: python3 v3-fit.py  ->  v3-final.json, v3-vofit.json
"""
import json, pathlib, subprocess, sys, wave

ROOT = pathlib.Path(__file__).parent
VO = ROOT / 'vo'
FFMPEG = '/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2'
SPEC = json.loads((ROOT / 'v3.json').read_text())

HEAD, TAIL, PAD = 0.15, 0.18, 0.12       # breath in, beat out, slack
TEMPO_MAX = 1.25


def wav_len(p):
    with wave.open(str(p)) as w:
        return w.getnframes() / w.getframerate()


def main():
    final, plan, missing = {}, {}, []
    for ad, a in SPEC.items():
        scenes, cues, t = [], [], 0.0
        for i, sc in enumerate(a['scenes'], 1):
            sc = dict(sc)
            line = sc.get('vo')
            w = VO / ('%s-s%02d.wav' % (ad, i))
            if line and not w.exists():
                missing.append('%s s%02d' % (ad, i))
                scenes.append(sc); t += sc['sec']; continue
            if line:
                have = wav_len(w)
                room = sc['sec'] - HEAD - TAIL - PAD
                tempo = min(TEMPO_MAX, max(1.0, have / room)) if room > 0.1 else TEMPO_MAX
                eff = have / tempo
                sc['sec'] = round(max(sc['sec'], eff + HEAD + TAIL + PAD), 2)
                cues.append({'scene': i, 'wav': w.name, 'tempo': round(tempo, 4),
                             'at': round(t + HEAD, 3), 'len': round(eff, 3)})
            scenes.append(sc)
            t += sc['sec']
        final[ad] = dict(a, scenes=scenes)
        plan[ad] = cues
        print('%-14s %5.1fs -> %5.1fs   %d lines' %
              (ad, sum(s['sec'] for s in a['scenes']), t, len(cues)))

    if missing:
        print('\nmissing narration (%d): %s' % (len(missing), ', '.join(missing)))
        print('rerun v3-vo.py for those ads before rendering')
        sys.exit(1)

    (ROOT / 'v3-final.json').write_text(json.dumps(final, indent=2, ensure_ascii=False))
    (ROOT / 'v3-vofit.json').write_text(json.dumps(plan, indent=2))
    print('\nwrote v3-final.json, v3-vofit.json')


if __name__ == '__main__':
    main()
