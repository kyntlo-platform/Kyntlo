#!/usr/bin/env python3
"""Generate v3.json — five ads in five formats.

Why five looks instead of one: the v2 ads were all the same phone mockup on
the same dark gradient, which is both monotonous and, per the Meta format
taxonomy, an F-tier device — fake-native UI stops everyone and therefore
qualifies no one. This is a portfolio instead: one S-tier cold scaler, two
A-tier, two B-tier converters, each with its own visual system.

Every figure traces to the 62-clinic audit or to arithmetic the viewer can
check. No invented statistics.

Run: python3 v3-spec.py   ->  v3.json
"""
import json, pathlib

ROOT = pathlib.Path(__file__).parent

CTA = {"look": "brand", "sec": 3.4,
       "line": "Booking, reminders and recall<br>in one place.",
       "vo": "Kyntlo. It answers when you can't."}

ADS = {
# ---------------------------------------------------------------- S-tier VSL
# The script is the ad. Education-first, because the whole proposition rests
# on a mechanism the buyer has never had named for them.
"v3-vsl": {
  "format": "VSL", "tier": "S", "role": "cold scaler", "look": "editorial",
  "scenes": [
    {"look": "editorial", "sec": 4.0, "kind": "open",
     "text": "There is<br>a number almost<br>no clinic knows<br>about <em>itself</em>.",
     "vo": "There is a number almost no clinic knows about itself."},
    {"look": "editorial", "sec": 4.2, "kind": "line",
     "text": "Not how fast<br>your team<br>replies.",
     "sub": "The gap before anyone <em>could</em>.",
     "vo": "Not how fast your team replies. The gap before anyone could."},
    {"look": "editorial", "sec": 4.0, "kind": "line",
     "text": "The minutes<br>a request sits<br>before a human<br>sees it.",
     "vo": "The minutes a request sits before a human sees it."},
    {"look": "editorial", "sec": 4.4, "kind": "big",
     "text": "At 8pm<br>that gap is<br>the <em>whole night</em>.",
     "sub": "Over a weekend, longer.",
     "vo": "At eight PM that gap is the whole night. Over a weekend, longer."},
    {"look": "editorial", "sec": 3.8, "kind": "line",
     "text": "Nobody is<br>being slow.<br>The clinic<br>is closed.",
     "vo": "Nobody is being slow. The clinic is closed."},
    {"look": "editorial", "sec": 4.2, "kind": "big",
     "text": "But the patient<br>isn't waiting.",
     "sub": "They message the next clinic.",
     "vo": "But the patient isn't waiting. They message the next clinic."},
    {"look": "editorial", "sec": 4.6, "kind": "line",
     "text": "Kyntlo answers<br><em>inside</em> that gap.",
     "sub": "Checks the calendar. Books. Confirms.",
     "vo": "Kyntlo answers inside that gap. Checks the calendar, books, confirms."},
    {"look": "editorial", "sec": 4.0, "kind": "offer",
     "text": "We measure<br>your gap first.",
     "sub": "Free, in 24 hours.",
     "vo": "We measure your gap first. Free, in twenty four hours."},
    CTA,
  ]},

# ------------------------------------------------- A-tier amateur investigation
# The audit is a real investigation, so the format is not a costume.
"v3-audit": {
  "format": "Amateur investigation", "tier": "A", "role": "cold scaler",
  "look": "audit",
  "scenes": [
    {"look": "audit", "sec": 3.6, "kind": "intro",
     "head": "62 Dubai clinics",
     "text": "I opened<br>every one<br>in an afternoon.",
     "vo": "I opened sixty two Dubai clinic websites in one afternoon."},
    {"look": "audit", "sec": 3.4, "kind": "intro",
     "head": "All of them advertising",
     "text": "Every one running<br>Instagram ads<br>that week.",
     "vo": "All of them were running Instagram ads that week."},
    {"look": "audit", "sec": 4.0, "kind": "intro",
     "head": "One question",
     "text": "What does the<br>Book Now button<br>actually do?",
     "vo": "I only wanted to know one thing. What the Book Now button actually does."},
    {"look": "audit", "sec": 4.4, "kind": "tally", "n": 35, "of": 62,
     "label": "opened a form",
     "note": "Someone retypes every one by hand.",
     "vo": "Thirty five of them opened a form. Someone retypes every one of those by hand."},
    {"look": "audit", "sec": 4.0, "kind": "tally", "n": 18, "of": 62,
     "label": "had no booking at all",
     "note": "The button was a phone number.",
     "vo": "Eighteen had no booking at all. The button was a phone number."},
    {"look": "audit", "sec": 4.0, "kind": "tally", "n": 43, "of": 62,
     "label": "ran it through WhatsApp",
     "note": "Recorded nowhere. Assigned to nobody.",
     "vo": "Forty three ran it through WhatsApp. Recorded nowhere, assigned to nobody."},
    {"look": "audit", "sec": 4.6, "kind": "tally", "n": 8, "of": 62,
     "label": "had a real calendar", "cold": True,
     "note": "Not one sent a reminder or chased a no-show.",
     "vo": "Eight had a real calendar. Not one of those eight sent a reminder, or chased a no show."},
    {"look": "audit", "sec": 4.0, "kind": "intro",
     "head": "The whole set",
     "text": "All 62 were paying<br>for clicks<br>that same week.",
     "vo": "Every one of the sixty two was paying for clicks that week."},
    {"look": "audit", "sec": 3.6, "kind": "intro",
     "head": "Yours next",
     "text": "Same method.<br>Free. 24 hours.",
     "vo": "I'll check yours the same way. Free, in twenty four hours."},
    CTA,
  ]},

# ------------------------------------------------------ A-tier David & Goliath
# The villain is the gap between tools, not any named competitor.
"v3-stack": {
  "format": "David & Goliath", "tier": "A", "role": "cold-capable",
  "look": "stack",
  "scenes": [
    {"look": "stack", "sec": 3.4, "kind": "build", "upto": 2,
     "cap": "A booking tool.<br>A WhatsApp inbox.",
     "vo": "A booking tool. A WhatsApp inbox."},
    {"look": "stack", "sec": 3.6, "kind": "build", "upto": 4,
     "cap": "An email app.<br>A spreadsheet.",
     "vo": "An email app. A spreadsheet."},
    {"look": "stack", "sec": 3.6, "kind": "build", "upto": 6,
     "cap": "A reminder app.<br>An invoice tool.",
     "vo": "A reminder app. An invoice tool."},
    {"look": "stack", "sec": 4.0, "kind": "wobble",
     "cap": "Six things that don't<br>talk to each other.",
     "vo": "Six subscriptions that don't talk to each other."},
    {"look": "stack", "sec": 4.4, "kind": "gaps",
     "cap": "Every gap between them<br>is a lead you <em>paid for</em>.",
     "vo": "And every gap between them is a lead you already paid for."},
    {"look": "stack", "sec": 3.8, "kind": "collapse",
     "cap": "The tools aren't<br>the problem.",
     "sub": "The gaps are.",
     "vo": "The tools aren't the problem. The gaps between them are."},
    {"look": "stack", "sec": 4.2, "kind": "one",
     "cap": "One of them.<br>Instead of six.",
     "cap2": "One inbox. One calendar.<br>One pipeline. One login.",
     "vo": "Kyntlo is one of them, instead of six."},
    CTA,
  ]},

# -------------------------------------------------- B-tier objection handling
"v3-objections": {
  "format": "Objection handling", "tier": "B", "role": "converter",
  "look": "objection",
  "scenes": [
    {"look": "objection", "sec": 4.2,
     "q": "“We already<br>have a system.”",
     "a": "So did all 62 clinics we audited.<br>35 of them call a form a system.",
     "vo": "We already have a system. So did all sixty two clinics we audited. Thirty five of them call a form a system."},
    {"look": "objection", "sec": 4.0,
     "q": "“My team handles<br>the messages.”",
     "a": "Until 8pm.<br>That's when a lot of them arrive.",
     "vo": "My team handles the messages. Until eight PM. That's when a lot of them arrive."},
    {"look": "objection", "sec": 4.4,
     "q": "“Switching sounds<br>like a nightmare.”",
     "a": "Nothing switches for 14 days.<br>Same number, same channels.",
     "vo": "Switching sounds like a nightmare. Nothing switches for fourteen days. Same number, same channels."},
    {"look": "objection", "sec": 4.2,
     "q": "“What if it<br>doesn't work?”",
     "a": "You keep the report,<br>and we go away.",
     "vo": "What if it doesn't work? You keep the report, and we go away."},
    CTA,
  ]},

# --------------------------------------------- B-tier educational infographic
"v3-timeline": {
  "format": "Educational infographic", "tier": "B", "role": "converter",
  "look": "timeline",
  "scenes": [
    {"look": "timeline", "sec": 3.6, "at": 0,
     "cap": "The anatomy of a lead<br>you already paid for.",
     "vo": "This is the anatomy of a lead you already paid for."},
    {"look": "timeline", "sec": 3.8, "at": 1,
     "cap": "19:41 — the ad works.",
     "sub": "Someone asks for an appointment.",
     "vo": "Nineteen forty one. The ad works. Someone asks for an appointment."},
    {"look": "timeline", "sec": 3.4, "at": 2,
     "cap": "19:41 — nobody<br>is in the clinic.",
     "vo": "Nineteen forty one. Nobody is in the clinic."},
    {"look": "timeline", "sec": 3.8, "at": 3,
     "cap": "23:00 — they message<br>two more clinics.",
     "vo": "Twenty three hundred. They message two more clinics."},
    {"look": "timeline", "sec": 3.8, "at": 4,
     "cap": "09:12 — reception<br>opens, and replies.",
     "vo": "Nine twelve. Reception opens, and replies."},
    {"look": "timeline", "sec": 4.4, "at": 5,
     "cap": "13 hours 31 minutes<br>after you paid for the click.",
     "vo": "Thirteen hours and thirty one minutes after you paid for that click."},
    {"look": "timeline", "sec": 4.0, "at": 6,
     "cap": "The ad did its job.",
     "sub": "The thirteen hours undid it.",
     "vo": "The ad did its job. The thirteen hours undid it."},
    {"look": "timeline", "sec": 3.6, "at": 7,
     "cap": "Kyntlo answers<br>at 19:41.",
     "vo": "Kyntlo answers at nineteen forty one."},
    CTA,
  ]},
}


def main():
    (ROOT / 'v3.json').write_text(json.dumps(ADS, indent=2, ensure_ascii=False))
    seen = set()
    for k, v in ADS.items():
        secs = sum(s['sec'] for s in v['scenes'])
        for s in v['scenes']:
            if s.get('vo'):
                seen.add(s['vo'])
        print('%-14s %-24s %s-tier  %d scenes  %.1fs'
              % (k, v['format'], v['tier'], len(v['scenes']), secs))
    print('unique voiceover lines across all five: %d' % len(seen))


if __name__ == '__main__':
    main()
