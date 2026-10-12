#!/usr/bin/env python3
"""Generate ads2.json — the scene spec for the four v2 ads.

Written as a generator rather than hand-maintained JSON for one reason: the
body beats must stay byte-identical within a market. That is what makes the
A/B a hook test — only the opening differs, so a win is attributable to the
hook rather than to two unrelated ads. Sharing body() enforces that in code
instead of trusting copy-paste across four blocks.

Run: python3 ads2-spec.py        ->  ads2.json
"""
import json, pathlib

ROOT = pathlib.Path(__file__).parent


def body(region):
    """The four closing beats. Identical within a market, by construction."""
    wa = region == 'uae'
    return [
        {"type": "thread", "sec": 4.2, "clock": "19:41",
         "cap": "Kyntlo replies while you're<br><span class=\"hl\">with a patient</span>." if wa
                else "Kyntlo replies while<br>you're <span class=\"hl\">mid-job</span>.",
         "vo": "Kyntlo answers on WhatsApp, in seconds." if wa
               else "Kyntlo texts them back, in seconds.",
         "msgs": ([{"side": "them", "text": "Hi — do you have anything Thursday?", "at": "19:41"},
                   {"side": "us", "text": "Yes. 4:00pm or 6:30pm. Which suits?", "at": "19:41"},
                   {"side": "them", "text": "4pm please"},
                   {"side": "us", "text": "Booked ✓ confirmation sent"}] if wa else
                  [{"side": "them", "text": "Hey — can someone come Thursday?", "at": "7:41 PM"},
                   {"side": "us", "text": "Yes. 9am or 2pm. Which works?", "at": "7:41 PM"},
                   {"side": "them", "text": "2pm"},
                   {"side": "us", "text": "Booked ✓ confirmation sent"}])},
        {"type": "calendar", "sec": 3.4, "clock": "19:41",
         "cap": "It checks the <span class=\"hl\">real</span> calendar.",
         "vo": "It checks your live availability before it promises anything.",
         "head": "THURSDAY", "pick": 2,
         "slots": ([{"d": "09:00", "t": "booked"}, {"d": "11:30", "t": "free"},
                    {"d": "16:00", "t": "new"}, {"d": "18:30", "t": "free"}] if wa else
                   [{"d": "8:00 AM", "t": "booked"}, {"d": "11:30 AM", "t": "free"},
                    {"d": "2:00 PM", "t": "new"}, {"d": "4:30 PM", "t": "free"}])},
        {"type": "thread", "sec": 3.2, "clock": "08:02",
         "cap": "Then it chases<br>the <span class=\"hl\">no-show</span>.",
         "vo": "Then it sends the reminder, and chases the no show.",
         "msgs": [{"side": "us", "text": "Reminder: Thursday 4:00pm ⏰", "at": "08:02"},
                  {"side": "us", "text": "Still good for 4pm? Reply Y to confirm"},
                  {"side": "them", "text": "Y"}] if wa else
                 [{"side": "us", "text": "Reminder: Thursday 2:00 PM ⏰", "at": "8:02 AM"},
                  {"side": "us", "text": "Still good for 2pm? Reply Y to confirm"},
                  {"side": "them", "text": "Y"}]},
        {"type": "brand", "sec": 3.6, "cap": "",
         "vo": "Kyntlo. It answers when you can't.",
         "line": "Booking, reminders and recall<br>in one place.", "url": "kyntlo.ai"},
    ]


def missed(wa):
    """Hook A, beat 1 — the loss, shown before it is named."""
    return {"type": "missedcalls", "sec": 3.2, "clock": "19:41" if wa else "7:41 PM",
            "cap": "Nobody called<br>them back.",
            "vo": "Three people tried to reach you today.",
            "items": ([{"who": "Unknown", "sub": "Missed call", "at": "13:20"},
                       {"who": "+971 50 ••• 4417", "sub": "Missed call", "at": "17:05"},
                       {"who": "Unknown", "sub": "Missed call", "at": "19:41"}] if wa else
                      [{"who": "Unknown", "sub": "Missed call", "at": "1:20 PM"},
                       {"who": "+1 (512) ••• 4417", "sub": "Missed call", "at": "5:05 PM"},
                       {"who": "Unknown", "sub": "Missed call", "at": "7:41 PM"}])}


CARDS_LOCKED = {
    "type": "cards", "sec": 3.0, "clock": "19:41",
    "cap": "3 things happening<br>in your business <span class=\"hl\">right now</span>.",
    "vo": "Three things are happening in your business right now.",
    "items": [{"n": "01", "q": ""}, {"n": "02", "q": ""}, {"n": "03", "q": ""}]}

CARDS_OPEN = {
    "type": "cards", "sec": 5.4, "clock": "19:41",
    "cap": "You can't see<br><span class=\"hl\">any</span> of them.",
    "vo": "How many enquiries never got a reply. How long your average reply actually takes. "
          "How many no shows nobody chased.",
    "items": [{"n": "01", "q": "Enquiries that never got a reply"},
              {"n": "02", "q": "What your average reply time really is"},
              {"n": "03", "q": "No-shows nobody chased"}]}

# The UAE total is arithmetic the viewer watches happen: AED 1,500 is the floor
# of the range already in approved copy, so the sum is derived, not asserted.
MATH_UAE = {"type": "math", "sec": 3.8, "clock": "19:41",
            "cap": "That isn't a missed<br>call problem.",
            "vo": "At what one consultation is worth, that is four and a half thousand dirhams.",
            "rows": ["3 missed calls today", "× AED 1,500 per consultation"],
            "prefix": "AED ", "total": 4500, "label": "gone today"}

# No verified US figure exists, so the total is a phrase the viewer completes
# rather than a number we invent. Stronger hook, and nothing to be caught on.
MATH_USA = {"type": "math", "sec": 3.8, "clock": "7:41 PM",
            "cap": "Do that<br>multiplication.",
            "vo": "Three missed calls, times what one job is worth to you. "
                  "You already know that number.",
            "rows": ["3 missed calls today", "× what one job is worth"],
            "totalText": "you know", "label": "the number you just thought of"}


def main():
    ads = {
        "v2-a-uae": {"concept": "Loss arithmetic", "region": "uae",
                     "scenes": [missed(True), MATH_UAE] + body('uae')},
        "v2-b-uae": {"concept": "Curiosity gap", "region": "uae",
                     "scenes": [CARDS_LOCKED, CARDS_OPEN] + body('uae')},
        "v2-a-usa": {"concept": "Loss arithmetic", "region": "usa",
                     "scenes": [missed(False), MATH_USA] + body('usa')},
        "v2-b-usa": {"concept": "Curiosity gap", "region": "usa",
                     "scenes": [CARDS_LOCKED, CARDS_OPEN] + body('usa')},
    }
    (ROOT / 'ads2.json').write_text(json.dumps(ads, indent=2, ensure_ascii=False))
    for k, v in ads.items():
        print('%-10s %-18s %d scenes  %.1fs' % (k, v['concept'], len(v['scenes']),
                                                sum(s['sec'] for s in v['scenes'])))


if __name__ == '__main__':
    main()
