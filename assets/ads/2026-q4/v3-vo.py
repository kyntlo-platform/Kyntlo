#!/usr/bin/env python3
"""Synthesise voiceover for the five v3 ads.

Run: GEMINI_API_KEY=... VO_NO_STYLE=1 python3 v3-vo.py <adId|all>

Thirty seven unique lines against a free tier that allows roughly eleven
requests per model per day, so each ad is pinned to its own model (MODELS
below) and never re-synthesised on another one: vo.py caches on the model
name, so switching models throws away work already paid for.

The closing line is shared by all five ads and was already rendered for the
v2 campaign on 3.8-flash-lite, so it is copied rather than requested — that
keeps one request and, for the VSL, keeps the whole ad on one voice.

VO_NO_STYLE is not optional here. The 3.8 family reads the delivery direction
out loud instead of acting on it, so every ad is synthesised undirected: a
plain read that is correct beats a directed one that narrates the brief.
"""
import importlib.util, json, os, pathlib, shutil, subprocess, sys

ROOT = pathlib.Path(__file__).parent
SPEC = json.loads((ROOT / 'v3.json').read_text())
OUT = ROOT / 'vo'

# one model per ad, sized to the ad's line count against an ~11/day cap
MODELS = {
    'v3-vsl':        'gemini-3.8-flash-lite-tts',
    'v3-audit':      'gemini-3.8-flash-tts',
    'v3-stack':      'gemini-2.5-flash-preview-tts',
    'v3-objections': 'gemini-3.1-flash-tts-preview',
    'v3-timeline':   'gemini-3.1-flash-tts-preview',   # 2.5-pro serves no free-tier TTS
}
CTA_LINE = "Kyntlo. It answers when you can't."
CTA_CACHED = OUT / 'v2-a-uae-s06.wav'       # same line, 3.8-flash-lite, 2.97s


def load_vo(model):
    """Import vo.py with GEMINI_TTS_MODEL already set — it reads it at import."""
    os.environ['GEMINI_TTS_MODEL'] = model
    spec = importlib.util.spec_from_file_location('kvo_' + model.replace('-', '_'),
                                                  ROOT / 'vo.py')
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def run(ad):
    model = MODELS[ad]
    vo = load_vo(model)
    lines = [s.get('vo') for s in SPEC[ad]['scenes']]
    print('%s  %s  %d slots' % (ad, model, sum(1 for l in lines if l)), flush=True)

    done, made = {}, 0
    for i, line in enumerate(lines, 1):
        if not line:
            continue
        dest = OUT / ('%s-s%02d.wav' % (ad, i))
        if line == CTA_LINE and CTA_CACHED.exists():
            shutil.copyfile(CTA_CACHED, dest)
            print('  s%02d  (closing line, reused from v2)' % i, flush=True)
            continue
        if line in done:
            shutil.copyfile(done[line], dest)
            continue
        if dest.exists() and dest.stat().st_size > 1000:
            done[line] = dest
            continue
        print('  s%02d  %s' % (i, line[:56]), flush=True)
        try:
            vo.synth(line, dest, '')
        except vo.QuotaExhausted as e:
            print('  quota reached on %s after %d lines — resume on THIS model'
                  % (model, made), flush=True)
            return False
        done[line] = dest
        made += 1
    print('%s: complete (%d new lines)' % (ad, made), flush=True)
    return True


def main():
    which = sys.argv[1] if len(sys.argv) > 1 else 'all'
    ads = list(SPEC) if which == 'all' else [which]
    for ad in ads:
        if ad not in MODELS:
            sys.exit('unknown ad ' + ad)
        # each ad needs its own interpreter: vo.py binds GEMINI_TTS_MODEL and
        # its cache dict at import time, and re-importing in-process would
        # leave the first model's cache authoritative.
        if which == 'all':
            env = dict(os.environ, V3_SINGLE='1')
            r = subprocess.run([sys.executable, __file__, ad], env=env)
            if r.returncode != 0:
                print('  (%s incomplete — rerun it tomorrow on its own model)' % ad)
        else:
            ok = run(ad)
            sys.exit(0 if ok else 1)


if __name__ == '__main__':
    main()
