#!/usr/bin/env python3
"""One music bed per v3 ad, cut to that ad's final length.

Reuses the 104 BPM synthesis in music-fast.py rather than re-deriving it, so
all five beds sit in the same key (A minor) as the brand film and the v2 ads.
What differs per ad is the gain shape: the bed has to get out of the way of
the voice and lift on the beat the argument turns, and those beats are in
different places in a 20-second objection reel and a 39-second investigation.

Gain points are given as fractions of the ad's duration, so a scene widened
to fit its narration moves the lift with it instead of stranding it.

Run after v3-fit.py: python3 music-v3.py   ->  bed-v3-*.wav
"""
import importlib.util, json, pathlib

ROOT = pathlib.Path(__file__).parent
_spec = importlib.util.spec_from_file_location('kmusicfast', ROOT / 'music-fast.py')
MF = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(MF)          # music-fast.py guards its own main()

FINAL = json.loads((ROOT / 'v3-final.json').read_text())

# (progression, busy, gain points as (fraction-of-duration, gain))
PLAN = {
    # VSL: holds right back under the script, lifts where the patient leaves
    'v3-vsl': (MF.ANSWERED, False,
               [(0, .26), (.08, .34), (.55, .72), (.70, .86), (.88, .62), (1, 0)]),
    # investigation: a steady tick that mounts as the tally mounts
    'v3-audit': (MF.ANSWERED, False,
                 [(0, .30), (.25, .46), (.62, .80), (.80, .88), (.92, .60), (1, 0)]),
    # stack: cluttered and loud, drops out on the collapse, rebuilds clean
    'v3-stack': (MF.SPRAWL, True,
                 [(0, .55), (.30, .95), (.62, .34), (.74, .80), (.90, .70), (1, 0)]),
    # objections: a pulse per objection, nothing in the way of the answers
    'v3-objections': (MF.ANSWERED, False,
                      [(0, .34), (.20, .52), (.60, .64), (.84, .80), (1, 0)]),
    # timeline: the clock is the bed; it lifts on the thirteen-hour badge
    'v3-timeline': (MF.ANSWERED, False,
                    [(0, .32), (.30, .48), (.60, .86), (.76, .58), (.88, .76), (1, 0)]),
}


def main():
    for ad, (prog, busy, pts) in PLAN.items():
        dur = sum(s['sec'] for s in FINAL[ad]['scenes'])
        MF.DUR = dur                      # build() reads DUR from the module
        MF.build(prog, busy, 'bed-%s.wav' % ad,
                 [(f * dur, g) for f, g in pts])


if __name__ == '__main__':
    main()
