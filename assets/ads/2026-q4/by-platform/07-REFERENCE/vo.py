#!/usr/bin/env python3
"""Kyntlo motion-post voiceover.

Synthesises a GUIDE track per scene with espeak-ng + MBROLA (offline), measures
each line, and writes vo-timing.json so build.js can cut every scene to the
length its narration actually takes. The result is that when a human records
the final read, the picture already fits.

This is a scratch track, not ad audio. Neural TTS is unreachable from this
environment (the egress policy blocks both the Microsoft and Google endpoints),
so the voice here is 1998-era diphone synthesis: fine for timing and for
reading along to, not for publishing.

Run:  python3 vo.py
"""
import base64, hashlib, json, os, pathlib, re, subprocess, time
import urllib.error, urllib.request, wave

ROOT = pathlib.Path(__file__).parent
VO = ROOT / 'vo'
VO.mkdir(exist_ok=True)
FFMPEG = '/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2'

# Engine picks itself: a Google Cloud TTS key in the environment gets used,
# otherwise it falls back to offline espeak. Google's output is publishable;
# espeak's is a guide track only, and build.js stamps it accordingly.
GEMINI_KEY = (os.environ.get('GEMINI_API_KEY')
              or os.environ.get('GOOGLE_AI_STUDIO_KEY') or '')
GOOGLE_KEY = os.environ.get('GOOGLE_TTS_KEY') or os.environ.get('GOOGLE_API_KEY') or ''
ENGINE = 'gemini' if GEMINI_KEY else 'google' if GOOGLE_KEY else 'espeak'

GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta'
# 2.5-flash is the default because its free-tier quota actually covers a full
# run. 3.1-flash sounds marginally better but caps around 10 requests a day on
# the free tier, and one script is 16. --models lists what a key serves.
GEMINI_MODEL = os.environ.get('GEMINI_TTS_MODEL', 'gemini-2.5-flash-preview-tts')
GEMINI_VOICE = os.environ.get('GEMINI_TTS_VOICE', 'Charon')
# Free tier allows 3 requests a minute, so the whole script takes a few
# minutes. Raise GEMINI_TTS_RPM on a paid key.
GEMINI_RPM = float(os.environ.get('GEMINI_TTS_RPM', '3'))
MIN_GAP = 60.0 / max(GEMINI_RPM, 0.1) + 1.0
_last_call = [0.0]

# Gemini TTS takes a natural-language direction alongside the line, which is
# the reason to prefer it here: the two concepts want opposite reads.
STYLE = json.loads((pathlib.Path(__file__).parent / 'vo-style.json').read_text()) \
    if (pathlib.Path(__file__).parent / 'vo-style.json').exists() else {}
TTS_URL = 'https://texttospeech.googleapis.com/v1/text:synthesize'
VOICES_URL = 'https://texttospeech.googleapis.com/v1/voices'

# A considered British read suits an ad whose whole argument is measurement.
# Override with GOOGLE_TTS_VOICE; run `python3 vo.py --voices` to see the list.
GOOGLE_VOICE = os.environ.get('GOOGLE_TTS_VOICE', 'en-GB-Neural2-D')
GOOGLE_RATE = float(os.environ.get('GOOGLE_TTS_RATE', '0.96'))

VOICE = 'mb-en1'      # MBROLA diphone — the most natural voice available offline
SPEED = 148           # words per minute; unhurried, reads as considered
PAD_HEAD = 0.35       # breath before the line
PAD_TAIL = 0.55       # beat after it, so cuts do not clip the last word

# Numbers the Day 0 run has not produced yet. These are spoken in the GUIDE
# track only, so the pacing is realistic — they never appear in any published
# file, and the guide video carries a burned-in do-not-upload strip.
PLACEHOLDER = {
    'N_TIMED': 'forty three',
    'N_NEVER_REPLIED': 'twenty six',
    'MEDIAN_HOURS': 'nineteen',
    'FASTEST_MIN': 'four',
}

SCRIPT = json.loads((ROOT / 'script.json').read_text())
SCRIPTS = {k: [ln['vo'] for ln in v] for k, v in SCRIPT.items()}

# YouTube Shorts carry the same read
SCRIPTS['youtube-a-spreadsheet'] = SCRIPTS['tiktok-a-spreadsheet']
SCRIPTS['youtube-b-11pm-lead'] = SCRIPTS['tiktok-b-11pm-lead']


def spoken(line):
    for k, v in PLACEHOLDER.items():
        line = line.replace('{' + k + '}', v)
    return line


def pcm_to_wav(pcm, path, rate=24000, channels=1, width=2):
    with wave.open(str(path), 'wb') as w:
        w.setnchannels(channels)
        w.setsampwidth(width)
        w.setframerate(rate)
        w.writeframes(pcm)


class QuotaExhausted(Exception):
    """The daily free-tier cap, as opposed to a transient rate limit."""


def _throttle():
    wait = MIN_GAP - (time.time() - _last_call[0])
    if wait > 0:
        time.sleep(wait)
    _last_call[0] = time.time()


def gemini_synth(text, out_wav, style='', attempt=0):
    prompt = (style + '\n\n' + text) if style else text
    _throttle()
    body = json.dumps({
        'contents': [{'parts': [{'text': prompt}]}],
        'generationConfig': {
            'responseModalities': ['AUDIO'],
            'speechConfig': {
                'voiceConfig': {'prebuiltVoiceConfig': {'voiceName': GEMINI_VOICE}}
            },
        },
    }).encode()
    url = '%s/models/%s:generateContent' % (GEMINI_URL, GEMINI_MODEL)
    req = urllib.request.Request(url, data=body, headers={
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_KEY,
    })
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            data = json.load(r)
    except urllib.error.HTTPError as e:
        detail = e.read().decode('utf8', 'replace')
        if e.code == 429 and 'free_tier' in detail and attempt >= 2:
            # a per-minute limit clears in a minute; a daily cap does not, and
            # burning six 60s retries against it just wastes wall clock
            raise QuotaExhausted(detail[:300])
        if e.code in (429, 503) and attempt < 6:
            m = re.search(r'retry in ([0-9.]+)s', detail)
            back = float(m.group(1)) + 2 if m else 30 * (attempt + 1)
            print('    rate limited, waiting %.0fs' % back, flush=True)
            time.sleep(back)
            return gemini_synth(text, out_wav, style, attempt + 1)
        raise SystemExit(
            'Gemini TTS refused the request (HTTP %s).\n%s\n'
            'Run `python3 vo.py --models` to see what this key actually serves, '
            'then set GEMINI_TTS_MODEL. If the voice name is the problem, set '
            'GEMINI_TTS_VOICE.' % (e.code, detail[:500]))

    try:
        part = data['candidates'][0]['content']['parts'][0]['inlineData']
    except (KeyError, IndexError):
        raise SystemExit('Gemini TTS returned no audio. Response was:\n'
                         + json.dumps(data)[:500])
    rate = 24000
    for bit in part.get('mimeType', '').split(';'):
        if bit.strip().startswith('rate='):
            rate = int(bit.split('=')[1])
    pcm_to_wav(base64.b64decode(part['data']), out_wav, rate=rate)


def list_models():
    req = urllib.request.Request(GEMINI_URL + '/models',
                                 headers={'x-goog-api-key': GEMINI_KEY})
    with urllib.request.urlopen(req, timeout=60) as r:
        data = json.load(r)
    for m in data.get('models', []):
        name = m.get('name', '').replace('models/', '')
        if 'tts' in name.lower() or 'AUDIO' in str(m.get('supportedGenerationMethods', '')):
            print('%-46s %s' % (name, m.get('displayName', '')))
    print('\nIf nothing is listed above, the key has no TTS model enabled.')


def google_synth(text, out_wav):
    body = json.dumps({
        'input': {'text': text},
        'voice': {'languageCode': GOOGLE_VOICE.rsplit('-', 2)[0] if GOOGLE_VOICE.count('-') > 2
                  else '-'.join(GOOGLE_VOICE.split('-')[:2]),
                  'name': GOOGLE_VOICE},
        'audioConfig': {'audioEncoding': 'LINEAR16', 'sampleRateHertz': 44100,
                        'speakingRate': GOOGLE_RATE},
    }).encode()
    req = urllib.request.Request(TTS_URL, data=body, headers={
        'Content-Type': 'application/json', 'x-goog-api-key': GOOGLE_KEY})
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            audio = json.load(r)['audioContent']
    except urllib.error.HTTPError as e:
        detail = e.read().decode('utf8', 'replace')[:400]
        raise SystemExit('Google TTS refused the request (HTTP %s).\n%s\n'
                         'Check the key is valid and the Text-to-Speech API is '
                         'enabled on that project.' % (e.code, detail))
    out_wav.write_bytes(base64.b64decode(audio))


def list_voices():
    req = urllib.request.Request(VOICES_URL, headers={'x-goog-api-key': GOOGLE_KEY})
    with urllib.request.urlopen(req, timeout=60) as r:
        data = json.load(r)
    for v in sorted(data.get('voices', []), key=lambda v: v['name']):
        langs = ','.join(v['languageCodes'])
        if langs.startswith(('en-GB', 'en-US', 'ar-')):
            print('%-34s %-10s %s' % (v['name'], langs, v.get('ssmlGender', '')))


CACHE_PATH = VO / '.cache.json'
CACHE = json.loads(CACHE_PATH.read_text()) if CACHE_PATH.exists() else {}


def synth(text, out_wav, style=''):
    stamp = hashlib.sha256(
        ('|'.join([ENGINE, GEMINI_MODEL, GEMINI_VOICE, VOICE, style, text]))
        .encode()).hexdigest()[:16]
    if CACHE.get(out_wav.name) == stamp and out_wav.exists() and out_wav.stat().st_size > 1000:
        return
    _synth(text, out_wav, style)
    CACHE[out_wav.name] = stamp
    CACHE_PATH.write_text(json.dumps(CACHE, indent=2))


def _synth(text, out_wav, style=''):
    if ENGINE == 'gemini':
        gemini_synth(text, out_wav, style)
    elif ENGINE == 'google':
        google_synth(text, out_wav)
    else:
        subprocess.run(['espeak-ng', '-v', VOICE, '-s', str(SPEED),
                        '-w', str(out_wav), text], check=True, capture_output=True)


def wav_seconds(path):
    with wave.open(str(path)) as w:
        return w.getnframes() / float(w.getframerate())


def main():
    timing = {}
    script_out = []

    prior = json.loads((ROOT / 'vo-timing.json').read_text()) \
        if (ROOT / 'vo-timing.json').exists() else {}
    complete = []

    for vid, lines in SCRIPTS.items():
        # the two YouTube cuts reuse the TikTok audio rather than re-synthesising
        source = 'tiktok-a-spreadsheet' if vid.endswith('a-spreadsheet') else \
                 'tiktok-b-11pm-lead' if vid.endswith('b-11pm-lead') else vid

        durations, parts, cursor = [], [], 0.0
        done = True
        for i, line in enumerate(lines, 1):
            wav = VO / f'{source}-s{i:02d}.wav'
            if source == vid:
                print('  [%d/%d] %s' % (i, len(lines), vid), flush=True)
                try:
                    synth(spoken(line), wav, STYLE.get(vid, ''))
                except QuotaExhausted:
                    print('    daily quota reached — %s left for the next run'
                          % vid, flush=True)
                    done = False
                    break
            if not wav.exists():
                # a mirror video reusing a source line the quota never reached
                done = False
                break
            spoke = wav_seconds(wav)
            scene = round(max(2.0, PAD_HEAD + spoke + PAD_TAIL), 2)
            durations.append(scene)
            parts.append((wav, cursor + PAD_HEAD, scene))
            if source == vid:
                script_out.append((vid, i, cursor, cursor + scene, line, round(spoke, 2)))
            cursor += scene

        if not done:
            # keep the cut it already had, so the captioned version still builds
            timing[vid] = prior.get(vid, [2.6] * len(lines))
            continue
        timing[vid] = durations
        complete.append(vid)

        # one continuous track per video, each line dropped at its scene offset
        total = sum(durations)
        inputs, filters, labels = [], [], []
        for n, (wav, at, _) in enumerate(parts):
            inputs += ['-i', str(wav)]
            filters.append(f'[{n}:a]aresample=44100,adelay={int(at*1000)}|{int(at*1000)}[a{n}]')
            labels.append(f'[a{n}]')
        graph = (';'.join(filters) + ';' + ''.join(labels) +
                 f'amix=inputs={len(parts)}:normalize=0,'
                 f'apad,atrim=0:{total:.2f},'
                 f'loudnorm=I=-16:TP=-1.5:LRA=11[out]')
        subprocess.run([FFMPEG, '-y', *inputs, '-filter_complex', graph,
                        '-map', '[out]', '-c:a', 'aac', '-b:a', '128k',
                        str(VO / f'{vid}-vo.m4a')],
                       check=True, capture_output=True)
        print(f'{vid}: {len(lines)} lines, {total:.1f}s')

    (ROOT / 'vo-timing.json').write_text(json.dumps(timing, indent=2))
    (ROOT / 'vo-engine.json').write_text(json.dumps({
        'engine': ENGINE,
        'voice': (GEMINI_VOICE if ENGINE == 'gemini'
                  else GOOGLE_VOICE if ENGINE == 'google' else VOICE),
        'model': GEMINI_MODEL if ENGINE == 'gemini' else None,
        'publishable': ENGINE in ('gemini', 'google'),
        'complete': complete,
    }, indent=2))

    # the recording script a human actually reads from
    md = ['# Voiceover script — Kyntlo motion posts', '',
          'Timecodes are where each line **starts**, cut to the length the line',
          'takes to say at an unhurried pace. Record against the guide track in',
          '`vo/<video>-vo.m4a`, or ignore it and read naturally — the picture',
          'was cut to these lengths, so a natural read will fit.', '',
          'Tokens in braces are the Day 0 figures. The guide audio speaks',
          'placeholder numbers so the pacing is realistic; say the real ones.', '']
    cur = None
    for vid, i, start, end, line, spoke in script_out:
        if vid != cur:
            cur = vid
            md += ['', f'## {vid}', '',
                   '| # | In | Out | Line | Spoken |', '| ---: | ---: | ---: | --- | ---: |']
        md.append(f'| {i} | {start:0.2f}s | {end:0.2f}s | {line} | {spoke:0.2f}s |')
    (ROOT / 'VOICEOVER.md').write_text('\n'.join(md) + '\n')
    print('wrote vo-timing.json and VOICEOVER.md')
    missing = [v for v in SCRIPTS if v not in complete]
    if missing:
        print('narrated: %s' % ', '.join(complete))
        print('still captions-only: %s' % ', '.join(missing))
        print('re-run when the daily quota resets; finished lines are cached.')


if __name__ == '__main__':
    import sys
    if '--models' in sys.argv:
        if not GEMINI_KEY:
            raise SystemExit('Set GEMINI_API_KEY first.')
        list_models()
    elif '--voices' in sys.argv:
        if not GOOGLE_KEY:
            raise SystemExit('Set GOOGLE_TTS_KEY first (Cloud TTS voices). '
                             'For Gemini, use --models.')
        list_voices()
    else:
        print('engine:', ENGINE, '| voice:',
              GEMINI_VOICE if ENGINE == 'gemini'
              else GOOGLE_VOICE if ENGINE == 'google' else VOICE,
              ('| model: ' + GEMINI_MODEL) if ENGINE == 'gemini' else '')
        if ENGINE == 'espeak':
            print('No GOOGLE_TTS_KEY set — producing a guide track, not final audio.')
        main()
