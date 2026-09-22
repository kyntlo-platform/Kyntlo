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
import json, os, pathlib, subprocess, wave

ROOT = pathlib.Path(__file__).parent
VO = ROOT / 'vo'
VO.mkdir(exist_ok=True)
FFMPEG = '/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2'

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
                subprocess.run(
                    ['espeak-ng', '-v', VOICE, '-s', str(SPEED), '-w', str(wav), spoken(line)],
                    check=True, capture_output=True)
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
                        str(VO / f'{vid}-guide.m4a')],
                       check=True, capture_output=True)
        print(f'{vid}: {len(lines)} lines, {total:.1f}s')

    (ROOT / 'vo-timing.json').write_text(json.dumps(timing, indent=2))

    # the recording script a human actually reads from
    md = ['# Voiceover script — Kyntlo motion posts', '',
          'Timecodes are where each line **starts**, cut to the length the line',
          'takes to say at an unhurried pace. Record against the guide track in',
          '`vo/<video>-guide.m4a`, or ignore it and read naturally — the picture',
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
    main()
