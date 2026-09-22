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
import base64, json, os, pathlib, subprocess, urllib.error, urllib.request, wave

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
# Overridable, because preview model ids move. --models lists what the key serves.
GEMINI_MODEL = os.environ.get('GEMINI_TTS_MODEL', 'gemini-3.1-flash-tts-preview')
GEMINI_VOICE = os.environ.get('GEMINI_TTS_VOICE', 'Charon')

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


def gemini_synth(text, out_wav, style=''):
    prompt = (style + '\n\n' + text) if style else text
    body = json.dumps({
        'contents': [{'parts': [{'text': prompt}]}],
        'generationConfig': {
            'responseModalities': ['AUDIO'],
            'speechConfig': {
                'voiceConfig': {'prebuiltVoiceConfig': {'voiceName': GEMINI_VOICE}}
            },
        },
    }).encode()
    url = '%s/models/%s:generateContent?key=%s' % (GEMINI_URL, GEMINI_MODEL, GEMINI_KEY)
    req = urllib.request.Request(url, data=body,
                                 headers={'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            data = json.load(r)
    except urllib.error.HTTPError as e:
        detail = e.read().decode('utf8', 'replace')[:500]
        raise SystemExit(
            'Gemini TTS refused the request (HTTP %s).\n%s\n'
            'Run `python3 vo.py --models` to see what this key actually serves, '
            'then set GEMINI_TTS_MODEL. If the voice name is the problem, set '
            'GEMINI_TTS_VOICE.' % (e.code, detail))

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
    with urllib.request.urlopen(GEMINI_URL + '/models?key=' + GEMINI_KEY, timeout=60) as r:
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
    req = urllib.request.Request(TTS_URL + '?key=' + GOOGLE_KEY, data=body,
                                 headers={'Content-Type': 'application/json'})
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
    with urllib.request.urlopen(VOICES_URL + '?key=' + GOOGLE_KEY, timeout=60) as r:
        data = json.load(r)
    for v in sorted(data.get('voices', []), key=lambda v: v['name']):
        langs = ','.join(v['languageCodes'])
        if langs.startswith(('en-GB', 'en-US', 'ar-')):
            print('%-34s %-10s %s' % (v['name'], langs, v.get('ssmlGender', '')))


def synth(text, out_wav, style=''):
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

    for vid, lines in SCRIPTS.items():
        # the two YouTube cuts reuse the TikTok audio rather than re-synthesising
        source = 'tiktok-a-spreadsheet' if vid.endswith('a-spreadsheet') else \
                 'tiktok-b-11pm-lead' if vid.endswith('b-11pm-lead') else vid

        durations, parts, cursor = [], [], 0.0
        for i, line in enumerate(lines, 1):
            wav = VO / f'{source}-s{i:02d}.wav'
            if source == vid:
                synth(spoken(line), wav, STYLE.get(vid, ''))
            spoke = wav_seconds(wav)
            scene = round(max(2.0, PAD_HEAD + spoke + PAD_TAIL), 2)
            durations.append(scene)
            parts.append((wav, cursor + PAD_HEAD, scene))
            if source == vid:
                script_out.append((vid, i, cursor, cursor + scene, line, round(spoke, 2)))
            cursor += scene

        timing[vid] = durations

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
