#!/usr/bin/env python3
"""Synthesise voiceover for the v2 ads.

Run: GEMINI_API_KEY=... python3 ads2-vo.py <region> [model]
       region: uae | usa

Deduplicates by line text before calling the API. The four body beats are
identical within a market by construction, so both ads in that market share
them — that is 8 unique lines per market instead of 12, which matters against
a free tier that caps near 11 requests a day, and it guarantees the shared
half of an A/B is bit-identical rather than merely similar.
"""
import importlib.util, json, os, pathlib, shutil, sys

ROOT = pathlib.Path(__file__).parent
_spec = importlib.util.spec_from_file_location('kvo', ROOT / 'vo.py')
VOMOD = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(VOMOD)        # vo.py guards its own main()

SPEC = json.loads((ROOT / 'ads2.json').read_text())
STYLE = json.loads((ROOT / 'vo-style.json').read_text()).get('ad-a-uae', '')
OUT = ROOT / 'vo'


def main():
    region = sys.argv[1]
    ads = [k for k, v in SPEC.items() if v['region'] == region]
    if not ads:
        sys.exit('no ads for region ' + region)

    # text -> the first wav rendered for it; later slots are copies
    done = {}
    made = 0
    for ad in ads:
        for i, sc in enumerate(SPEC[ad]['scenes'], 1):
            line = sc.get('vo')
            if not line:
                continue
            dest = OUT / ('%s-s%02d.wav' % (ad, i))
            if line in done:
                shutil.copyfile(done[line], dest)
                continue
            if dest.exists() and dest.stat().st_size > 1000:
                done[line] = dest
                continue
            print('  [%s s%02d] %s' % (ad, i, line[:52]), flush=True)
            try:
                VOMOD.synth(line, dest, '' if VOMOD.NO_STYLE else STYLE)
            except VOMOD.QuotaExhausted:
                print('    daily quota reached — %d lines left for the next run'
                      % sum(1 for a in ads for s in SPEC[a]['scenes'] if s.get('vo'))
                      , flush=True)
                return
            done[line] = dest
            made += 1
    print('%s: %d unique lines synthesised, %d slots filled'
          % (region, made, sum(1 for a in ads for s in SPEC[a]['scenes'] if s.get('vo'))))


if __name__ == '__main__':
    main()
