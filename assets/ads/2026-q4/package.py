#!/usr/bin/env python3
"""Package the ad batch into one folder per platform, each with its own manual.

Run: python3 package.py
Produces dist/kyntlo-ads-2026-q4/ and a zip beside it.
"""
import pathlib, shutil, zipfile

ROOT = pathlib.Path(__file__).parent
OUT = ROOT / 'out'
DIST = ROOT / 'dist'
PKG = DIST / 'kyntlo-ads-2026-q4'

if DIST.exists():
    shutil.rmtree(DIST)

# ---------------------------------------------------------------- shared text
FOOTER = """
---

## Before this ad can run at all

Five things are missing site-side and no ad on any platform works without the
first two:

1. **Conversion tracking.** This platform's pixel, plus GA4. Without it the
   campaign optimises on clicks, which is the metric least connected to money.
2. **The landing page.** `/leak-test` — one field (website URL + email), wired
   to the CRM. The ads all point here.
3. **Ad account + domain verification.** Meta's domain verification is the
   longest-lead item of the whole launch; start it first.
4. **Currency decided.** The site prices in USD, the internal docs in EUR, the
   strategy in AED. Pick AED for this market and make ads, page and checkout
   agree.
5. **Fulfilment staffed.** The offer is a free report inside 24 working hours.
   This campaign sells speed of response to people you have just taught to
   measure speed of response. If nobody is assigned to produce the reports,
   run a smaller budget rather than a slower promise.

## Two rules that apply everywhere

**Never edit a running ad that is performing.** Editing resets the learning
phase and throws away everything the algorithm knows. Launch the new version
alongside it and let the old one die. Pausing is free; editing is not.

**Never sum conversions across platforms.** Meta's 7-day window and LinkedIn's
30-day window measure different things and both will claim the same lead.
Report side by side and reconcile against the CRM monthly. When they disagree,
the CRM wins.

---

*Kyntlo creative batch 2026-10. Performance bands are expected ranges for UAE
targeting, not commitments — recalibrate against your own first thirty days.*
"""

START = """# Start here

Everything needed to run the October–November paid campaign, one folder per
platform. Each folder holds its own creative and a `README.md` that tells you
where to build the ad, what to select, what to paste and what to watch.

## The folders

| Folder | Platform | Spend share | What is in it |
| --- | --- | ---: | --- |
| `01-META` | Instagram + Facebook | 55% | 2 feed statics, a 6-frame carousel, 2 vertical videos for Reels |
| `02-LINKEDIN` | LinkedIn | 18% | 1 single-image ad, 6-page document ad |
| `03-TIKTOK` | TikTok | 12% | 2 narrated vertical videos |
| `04-YOUTUBE` | YouTube | 8% | 2 Shorts, 2 in-feed/thumbnail frames |
| `05-SNAPCHAT` | Snapchat | 5% | 2 vertical statics, one in Arabic |
| `06-GOOGLE-BUSINESS` | Business Profile | organic | 2 square profile posts |
| `07-REFERENCE` | — | — | Voiceover script, build files, how to regenerate |

## If you only do one thing

Run **`01-META`** at the floor budget: AED 150/day for four weeks, two ads.
That is roughly AED 5,500 and it answers the only question that matters at
this stage — whether the leak wedge converts at all. Everything else is
refinement on top of that answer.

## The offer, in one line

Give us your website; we submit your own enquiry form, time the reply, check
your booking path, and send you the timestamps. Free, inside 24 hours, no call
required.

Every ad in every folder points at that one offer. Nothing sells the platform,
quotes a price, or uses a testimonial — those are deliberate, and the reasons
are in each folder's manual.

## The test running underneath

Each platform carries two opposed concepts:

- **Concept A is personal** — a founder, a timestamp, a story.
- **Concept B is evidential** — a dataset, a grid, a number.

They are not two versions of one idea. They test which register this market
buys in, and the answer transfers to your landing page headline, your cold
email opener, and the first ninety seconds of your sales call. That finding is
worth more than the leads.

## Numbers to hold in your head

| | |
| --- | --- |
| Target cost per qualified lead | **$85** |
| Breakeven (gross profit per customer) | $4,200 |
| Qualification bar | 5/9 on Urgency + Budget + Fit |
| Wait before judging an ad | 3× target CPL of spend |
| Budget increase when scaling | +20%, every 3–5 days, never more |

## One thing left to fill

Four numbers come from the Day 0 timing run and are **not yet measured**. Any
asset containing one renders it as a visible amber slot so an unmeasured
figure cannot ship by accident:

`N_TIMED` · `N_NEVER_REPLIED` · `MEDIAN_HOURS` · `FASTEST_MIN`

Affected: the Tuesday Test (Meta + YouTube in-feed), the AED Number
(LinkedIn), and the spreadsheet videos (TikTok + YouTube). Run Day 0 — one
afternoon, roughly two hours — put the results in
`07-REFERENCE/tokens.json`, and re-run the build.

**Everything built on the 62-clinic audit ships today.** Those numbers are
already measured: the whole carousel, 62 Clinics, both 11pm-lead videos, both
Snapchat frames, both Google Business posts.
"""

MANUALS = {}

MANUALS['01-META'] = """# Meta — Instagram & Facebook

**55% of budget · AED 82/day per ad at full tier · the volume engine**

This is the only platform that can produce enough conversions inside eight
weeks for the algorithm to genuinely learn, and the only one that leaves you a
retargeting pool and a lookalike seed worth having. If budget is tight, run
this folder alone.

## Where to build it

Ads Manager → **Campaigns** → Create → **Leads** → Manual leads campaign.
(Ad platform UIs move; the objective name is what to look for, not the exact
click path.)

Choose **website conversions**, not an Instant Form. An Instant Form is two
taps and no site visit, which produces cheaper leads who have no memory of you
by the time you call. The whole offer depends on them landing on the page and
reading the promise.

## Campaign level

| Setting | Value |
| --- | --- |
| Objective | Leads |
| Budget | Campaign budget optimisation (CBO), AED 150/day at floor tier |
| Schedule | Run continuously; day-parting comes later, not at launch |
| Attribution | 7-day click, 1-day view |

## Ad set level

| Setting | Value |
| --- | --- |
| Conversion event | **Landing page views for the first 10 days**, then switch to Lead |
| Location | United Arab Emirates. Dubai + Abu Dhabi only if under AED 200/day |
| Age | 28–60 |
| Gender | All |
| Detailed targeting | **None.** Leave it empty |
| Advantage+ audience | On |
| Placements | Advantage+ placements (automatic) |

**Why no interest targeting.** Stacking interests on a small UAE audience
produces a small group all seeing one mediocre ad. The algorithm now finds the
buyer better than a filter does, and the audience knowledge belongs in the
copy instead — which is why the identity word ("clinic", "fit-out") sits in
the headline. The headline is both a reader trigger and a targeting signal.

**Why start on landing page views.** Meta wants roughly 50 conversions per ad
set per week to optimise properly. At floor budget you will produce about 12
leads a week — a quarter of that. Ten days on a cheaper, more frequent event
gives the pixel something to learn from before you ask it to find buyers.
Starting on the lead event with too little volume is the most common way a
small budget returns nothing.

## The ads

Both go in **one ad set**, so they compete on equal footing.

### Ad 1 — The Tuesday Test  ·  `ad-01-the-tuesday-test.png`

1080×1350. Deliberately looks like a phone screenshot rather than an ad — no
logo on the image, no brand colour, no gradient. That is the concept, not an
oversight. The Kyntlo mark sits in the caption strip, which is where a real
post carries it.

**Primary text**

```
Last Tuesday I filled in the contact form on {{N_TIMED}} Dubai businesses that are running ads right now.

Not to sell them anything. Just to see how long a reply took.

{{N_NEVER_REPLIED}} never replied at all. The median was {{MEDIAN_HOURS}} hours.

Every one of those businesses is paying for the click that produced my enquiry. They just weren't there when it landed.

The gap isn't a lazy team. It's nights, weekends, lunch, and the forty minutes reception is with someone else.

I'll run the same test on your business, free. You keep the timestamps whether or not we ever speak again.

— Kyntlo
```

**Headline** (40 char) — `We timed {{N_TIMED}} Dubai businesses`
**Description** (30 char) — `Free lead response report`
**Call to action** — Learn more

### Ad 2 — 62 Clinics  ·  `ad-02-62-clinics.png`

1080×1350. The evidential half. Every number here is already measured, so this
one ships today with no tokens to fill.

**Primary text**

```
We checked 62 UAE clinics that advertise on Instagram. Here is what we found.

35 have a "Book Now" button that opens a form — often with a free-text date field. Somebody on the team retypes every request by hand.

18 have no booking mechanism at all. The button is a phone number.

43 have a WhatsApp button. None of those conversations are recorded, assigned or followed up.

Only 8 have a real calendar. None of those sit inside anything that sends a reminder or chases a no-show.

If your ads are running this week, one of those five lines is about your clinic. We will tell you which one, free, in 24 hours.

Kyntlo — booking, reminders and recall in one place.
```

**Headline** — `35 of 62 clinics. Same broken button.`
**Description** — `Free booking audit`
**Call to action** — Learn more

### Ad 3 — the carousel  ·  `carousel-frame-01..06.png` — *retargeting only*

Do not run this cold. From **week 2**, once the pixel pool passes ~1,000
people, build a separate ad set:

- Custom audience: website visitors, 30 days, excluding converters
- Budget: AED 30/day
- Frequency cap: 6

Six frames in order. Its leads will look artificially cheap because the
audience is warm — judge it against other retargeting, never against cold.

**Primary text**

```
We checked 62 UAE clinics that advertise on Instagram — every one of them paying for leads right now.

35 have a "Book Now" button that opens a form. 18 have no booking mechanism at all. 43 run their real funnel through a WhatsApp button that records nothing.

Only 8 have a working calendar, and none of those sits inside a system that sends a reminder or chases a no-show.

Swipe for the full breakdown, including how to check your own in about two minutes.
```

### Reels  ·  `reel-*.mp4` — *optional, week 3+*

The two TikTok videos work unchanged as Reels. Add them as a separate ad set
with Reels and Stories placements only, once the feed ads have a winner. Do
not run them in the same ad set as the statics — the formats compete badly.

## The ABM warm-up — the cheapest line here

One extra ad set, roughly AED 16/day, running all eight weeks:

- Custom audience: upload the 47 interior-design records and 62 clinic records
- Creative: Ad 2 only
- Objective: reach, not leads

Its job is not to generate a click. It is to make sure that when your cold
email arrives, the name is already familiar. **Judge it by outbound reply
rate, never by its own cost per lead** — and record the pre-campaign baseline
now, or the line is unjudgeable later.

## Week one — what good looks like

| Metric | Expected band |
| --- | --- |
| CPM | $10–15 |
| CTR (link) | 0.6–1.3% |
| Cost per lead | $20–40 |
| Qualified rate | 40% (Ad 1) · 55% (Ad 2) |

**Change nothing for the first 14 days.** No pausing, no editing, no budget
moves. This is the hardest rule to follow and the one that costs most when
broken.

## When to kill

| Trigger | Action |
| --- | --- |
| Spent < 3× target CPL | **Wait.** Judging at 2× carries a 13% chance of killing a winner |
| ≥ 3× target CPL, zero leads | Kill the concept, not the copy. Do not iterate a dead angle |
| Leads but zero qualified | Swap the angle, keep the format |
| Qualified rate under 40% | Swap. At 40%, true cost per qualified lead is 2.5× the dashboard figure |
| Frequency 3.0–3.5 | Start two iterations now — they take ~14 days to be ready |
| Frequency > 3.5, or CTR down 30% from peak | Retire the concept |

**Graduate to scaling** when all five are true: ≥5 qualified leads · ≥60%
qualified · at or under target CPL · running ≥14 days · ≥1 qualified in the
last 7 days. Then +20% every 3–5 days, never more.

## Mistakes specific to this platform

- **Interest stacking.** Tempting, and it will make your audience worse.
- **Judging too early.** See the wait rule above.
- **Editing a winner.** Resets learning. Duplicate instead.
- **Running statics and video in one ad set.** They compete badly; the
  algorithm will starve one.
- **Health claims.** Ad 2 targets clinics. Keep every claim about buttons and
  calendars, never about patients, treatments or outcomes. Meta restricts
  health-adjacent personalisation and the UAE regulates health advertising
  (DHA, DoH Abu Dhabi, MOHAP).
""" + FOOTER

MANUALS['02-LINKEDIN'] = """# LinkedIn

**18% of budget · AED 40/day per ad at full tier · the quality engine**

Three to four times the cost per lead of Meta, and roughly 65% qualified
against Meta's 40%. Fewer, better, slower. This is where the multi-branch
clinic group and the larger fit-out firm actually are.

## Where to build it

Campaign Manager → **Advertise** → new campaign group → new campaign →
objective **Lead generation**.

This is the one platform where a native lead form is right. LinkedIn
pre-fills firmographics from the profile, so the form *is* the qualification —
you get job title and company without asking.

## Campaign level

| Setting | Value |
| --- | --- |
| Objective | Lead generation |
| Budget | AED 40/day per campaign |
| Schedule | **Weekdays only.** Pause Thursday evening through Sunday morning |
| Bid | Manual CPC to start. Switch to automated after 50 conversions |

**On the schedule.** The UAE private sector largely runs Monday to Friday and
Saudi runs Sunday to Thursday, so a campaign covering both has two
half-strength days. LinkedIn CPMs are premium; paying them into a Friday feed
is the most wasteful thing in this whole plan.

## Audience

| Setting | Value |
| --- | --- |
| Location | United Arab Emirates |
| Job titles | Owner · Founder · Managing Director · Marketing Manager · Clinic Manager · Operations Manager · Practice Manager |
| Company size | 11–200 |
| Industries | Health & Wellness · Medical Practice · Architecture & Planning · Real Estate · Construction |
| Audience expansion | **Off** |
| LinkedIn Audience Network | Off for the first month |

**Why filters here and not on Meta.** LinkedIn's identity data is
self-reported and kept current because people's careers depend on it. That
makes job title and company size genuinely precise in a way interest
categories are not. This is the exception to the broad-targeting rule, not a
contradiction of it.

## Lead gen form

First name · last name · work email · company · job title. **Nothing else.**
Every extra field costs completions, and the call is where you ask the rest.

Privacy policy URL is required. Thank-you message should restate the 24-hour
promise, because that is the only thing they will remember.

## The ads

### Ad 1 — The AED Number  ·  `ad-01-the-aed-number.png`

1200×627. One figure at enormous scale over a method line. The only asset in
the batch that quotes a currency figure — and it is the prospect's cost, not
Kyntlo's price.

**Intro text**

```
A missed consultation costs between AED 1,500 and AED 5,000. Most owners can quote that number without thinking.

Far fewer can quote how long their own enquiry form takes to get a reply.

We timed {{N_TIMED}} UAE businesses that were actively running ads. The median was {{MEDIAN_HOURS}} hours. {{N_NEVER_REPLIED}} never replied at all.

None of them had a slow team. They had a gap between a lead arriving and a human seeing it — nights, weekends, and the forty minutes reception is with someone else.

We close that gap in fourteen days, on your existing numbers and channels, with the success metric agreed in writing before we start. No migration, no new system to learn first.

The report is yours either way.
```

**Headline** (70 char) — `What one missed enquiry actually costs you`
**Call to action** — Download

### Ad 2 — the document ad  ·  `document-ad-page-01..06.png`

LinkedIn's highest-dwell format, and the reason it wins is that the reader
swipes through six frames inside the feed before deciding to convert. That
pre-qualifies them better than any targeting filter.

Upload the six frames in order as a document ad. Every number is already
measured — this ships today.

**Intro text**

```
We checked 62 UAE clinics that advertise on Instagram — every one of them paying for leads right now.

35 have a "Book Now" button that opens a form. 18 have no booking mechanism at all. 43 run their real funnel through a WhatsApp button that records nothing.

Only 8 have a working calendar, and none of those sits inside a system that sends a reminder or chases a no-show.

The full breakdown is in the six pages below, including how to check your own in about two minutes.

Take the method even if you never speak to us.
```

**Headline** — `62 UAE clinics. One audit. Five findings.`

This same file doubles as a sales leave-behind and an email attachment. One
build, three uses.

## Week one — what good looks like

| Metric | Expected band |
| --- | --- |
| CPM | $30–48 |
| CTR | 0.4–0.9% |
| Cost per lead | $40–75 |
| Qualified rate | 65–70% |

Cost per lead will look alarming next to Meta. Compare **cost per qualified
lead** instead and it is competitive — that is the entire reason this platform
is in the plan.

## The failure mode to guard against

LinkedIn lead forms produce leads with **no memory of you.** Two taps, no
website visit, and by the time you call they do not recognise the name. The
counter is not in targeting, it is in fulfilment: the report must arrive
within 24 hours carrying the headline they saw, because that headline is the
only thing they will recognise.

## Mistakes specific to this platform

- **Running at weekends.** Premium CPMs into an empty feed.
- **Audience expansion on.** It dilutes exactly the precision you are paying for.
- **Too many form fields.** Five is right. Seven is 20% fewer leads.
- **Judging on CPL.** Judge on cost per qualified lead or this platform always
  looks like a mistake.
- **Starting on automated bidding.** It needs conversion history it does not
  have yet. Manual CPC first.
""" + FOOTER

MANUALS['03-TIKTOK'] = """# TikTok

**12% of budget · AED 26/day per ad at full tier · cheap reach, open question**

The lowest CPMs available in this market by a wide margin, and a genuine
founder-content advantage. Lower intent than Meta, so treat its output as a
retargeting pool first and a pipeline second.

Whether TikTok produces B2B leads in the UAE at all is a real open question.
This budget is sized to answer it, not to bet on it.

## Where to build it

TikTok Ads Manager → **Campaign** → Create → **Website conversions**.
Use Custom mode, not Simplified — you need placement and schedule control.

## Campaign level

| Setting | Value |
| --- | --- |
| Objective | Website conversions |
| Budget | AED 26/day per ad group |
| Optimisation event | Complete registration (mapped to your lead event) |

## Ad group level

| Setting | Value |
| --- | --- |
| Placement | TikTok only. **Turn off Pangle and News Feed App series** |
| Location | United Arab Emirates |
| Age | 25–55 |
| Interests / behaviours | **None** |
| Schedule | **Dayparting: 20:00–00:00 GST** |
| Bid strategy | Lowest cost |

**Turn Pangle off.** It is TikTok's third-party app network — cheap traffic
that converts poorly for B2B and will flatter your CPM while poisoning your
lead quality. This is the single most important setting on this page.

**On the evening schedule.** Gulf social usage peaks late. More than that: Ad 2
depicts an enquiry arriving at 23:04 to a closed office. A business owner
seeing it at 23:04, on a phone, in bed, is being shown their own situation as
it is happening — and late-night inventory is among the cheapest of the day.
The best-converting slot and the cheapest slot are the same slot.

## The ads

Both are 1080×1920, narrated, with captions burned in.

### Ad 1 — Scrolling the Spreadsheet  ·  `ad-01-scrolling-the-spreadsheet.mp4`

32.6s. A screen recording of the actual timing spreadsheet. No face, no studio.
The blank cells in the reply column are the payoff.

**Ad text** (80 char max)

```
{{N_TIMED}} Dubai businesses. One Tuesday. {{N_NEVER_REPLIED}} never replied.
```

**Call to action** — Learn more

### Ad 2 — The 11pm Lead  ·  `ad-02-the-11pm-lead.mp4`

31.9s. A lock screen at 23:04, an enquiry arriving, the office closed, a reply
at 09:12 — and a competitor who answered at 23:06. Every number in it is
measured or dramatised without naming a real business, so it ships today.

**Ad text**

```
Your ads run at 11pm. Your team doesn't. That gap is the whole problem.
```

**Call to action** — Learn more

## Music

Neither video carries a music bed, deliberately. **Add a trending sound in
TikTok's own editor before publishing** — organic trending audio consistently
outperforms anything baked in, and TikTok's algorithm treats it as a positive
signal. Keep it low enough that the narration stays clear.

## Week one — what good looks like

| Metric | Expected band |
| --- | --- |
| CPM | $4–8 |
| CTR | 0.7–1.1% |
| Cost per lead | $18–40 |
| Qualified rate | ~30% |
| 3-second view rate | above 20% |

If the 3-second view rate is under 20%, the opening frame is failing — not the
story. Re-cut the hook, keep everything else.

## The verdict this platform owes you

By week 6, one of three things is true:

1. **Qualified rate above 30%** — this is an acquisition channel. Scale it.
2. **Qualified rate 15–30%** — this is an awareness channel. Keep it running at
   a low budget and feed its traffic into Meta retargeting, where it converts.
3. **Under 15%** — stop. Move the budget to Meta. You learned something cheaply.

All three are useful answers. The failure is running it for eight weeks
without deciding which one happened.

## Mistakes specific to this platform

- **Leaving Pangle on.** Named twice on purpose.
- **Polished production.** The unpolished screen recording is the concept. A
  studio version of Ad 1 would perform worse.
- **No captions.** Both already have them burned in. Do not remove them in
  favour of TikTok's auto-captions, which sit in the wrong place.
- **Running all day.** Daypart to evenings. Daytime inventory here is expensive
  relative to its intent.
- **Judging it by Meta's numbers.** Different funnel position, different job.
""" + FOOTER

MANUALS['04-YOUTUBE'] = """# YouTube

**8% of budget · AED 18/day at full tier · the second opinion**

Both concepts here are the TikTok cuts, re-delivered. That is the point: a
result that holds on two different algorithms is a finding, and one that holds
on a single platform is a quirk. This is the cheapest way to make the campaign's
central test trustworthy.

YouTube is also the only channel here where the ad keeps earning views after
the budget stops.

## Where to build it

Google Ads → **Campaigns** → New campaign → **Leads** → **Video** →
Efficient reach, or Drive conversions if the pixel already has data.

You need a Google Ads account, and the videos must be uploaded to a YouTube
channel first (they can be unlisted).

## Campaign level

| Setting | Value |
| --- | --- |
| Objective | Leads |
| Campaign type | Video |
| Budget | AED 18/day |
| Bid strategy | Maximum conversions, or Target CPA once 30+ conversions exist |
| Networks | YouTube only. **Turn off Display Network partners** |

**Turn off Display partners.** Same logic as Pangle on TikTok — cheap
impressions on low-intent inventory that flatter the CPM and hurt lead
quality.

## Ad group level

| Setting | Value |
| --- | --- |
| Location | United Arab Emirates |
| Age | 25–54 |
| Audience segments | Leave empty for the first two weeks |
| Devices | Mobile + tablet. Desktop off for Shorts |
| Schedule | Evenings and weekends |

## The ads

### Shorts  ·  `shorts-01-scrolling-the-spreadsheet.mp4` · `shorts-02-the-11pm-lead.mp4`

1080×1920, 32.6s and 31.9s, both narrated with captions burned in. Upload
both to the channel, then reference them in the campaign.

**Titles**

```
I filled in {{N_TIMED}} Dubai contact forms in one afternoon
```
```
Your ads run at 11pm. Your team doesn't.
```

**Descriptions**

```
{{N_NEVER_REPLIED}} never replied. Median reply {{MEDIAN_HOURS}} hours. We will run the same test on your business free — you keep the timestamps either way.
```
```
The lead arrives at 23:04. The reply goes out at 09:12. A competitor answered at 23:06. We close that gap in 14 days on your existing numbers — free test first.
```

### In-feed frames  ·  `infeed-01-tuesday-test.png` · `infeed-02-62-clinics.png`

1920×1080. These serve as in-feed video ad thumbnails and as the channel's
custom thumbnails.

**The thumbnail and the video must make one promise.** A thumbnail that
over-claims buys the view and loses the watch time — and watch time is what
decides whether YouTube keeps serving you. These two are written to match
their videos exactly; keep it that way if you edit either.

## Week one — what good looks like

| Metric | Expected band |
| --- | --- |
| CPM | $5–9 |
| View rate | 15–25% |
| Cost per lead | $30–55 |
| Qualified rate | ~35% |

## The comparison that matters

Run the identical A-versus-B test here as on TikTok and compare the *ranking*,
not the absolute numbers:

- **Same concept wins on both** → you have a real finding about this market's
  register. Apply it to the landing page and the sales script.
- **Different concepts win** → the difference is the platform, not the message.
  Keep both, and stop trying to pick a universal winner.

## Mistakes specific to this platform

- **Display partners left on.** Named for the same reason as Pangle.
- **Mismatched thumbnail.** Buys views, loses watch time, kills delivery.
- **Layering audience segments too early.** Give the algorithm two weeks broad
  before narrowing anything.
- **Judging on views.** Views are cheap here. Judge on cost per qualified lead
  like everywhere else.
- **Forgetting the videos keep working.** Leave them up when the campaign ends;
  they cost nothing to host and continue to earn organic views.
""" + FOOTER

MANUALS['05-SNAPCHAT'] = """# Snapchat

**5% of budget · AED 11/day at full tier · a probe, not a bet**

The lowest CPMs anywhere and the lowest intent anywhere. This platform is in
the plan for one strategic reason: it prices the Gulf audience cheaply before
the Saudi expansion, where Snap's reach is at its strongest.

The Arabic asset it produces is worth more than the leads it produces.

## Where to build it

Snapchat Ads Manager → **Create Ads** → Advanced Create →
objective **Website conversions**.

## Campaign level

| Setting | Value |
| --- | --- |
| Objective | Website conversions |
| Budget | AED 11/day |
| Schedule | Evenings, 19:00–00:00 GST |
| Bid | Auto-bid |

## Ad set level

| Setting | Value |
| --- | --- |
| Location | United Arab Emirates |
| Age | 25–50 |
| Audience | Broad. No predefined audiences |
| Placement | Between content. **Turn off Snap Ads in Content and Story** for now |

Snapchat skews younger and more consumer than the rest of this plan, which is
why the age floor is higher here and the budget is deliberately small.

## The ads

Both 1080×1920.

### Ad 1 — Open Sign, Closed Inbox  ·  `ad-01-open-sign-closed-inbox.png`

A shopfront at night, sign flipped to CLOSED, a phone glowing behind the glass
with enquiries stacking unread.

**Ad copy**

```
Leads arrive at 11pm. Replies go out at 9am.

That ten-hour gap is where most of your ad budget quietly goes.

We will time your own enquiry form and send you the numbers. Free, within 24 hours.
```

**Headline** — `Your ads never close. Your inbox does.`
**Call to action** — Sign Up

*Note:* this is drawn rather than photographed. A real photograph of a closed
Al Quoz shopfront with a lit phone would outperform it — the drawn version
exists so the concept can be tested before anyone books a shoot.

### Ad 2 — Arabic Receipt  ·  `ad-02-arabic-receipt.png`  ⚠️ **DO NOT RUN YET**

Right-to-left, Arabic typography, the timestamp receipt treatment.

**This file carries a burned-in warning strip across the bottom, on purpose.**
The Arabic is a draft and has not been reviewed. It cannot be uploaded until a
native Gulf-dialect speaker has rewritten it — and that is a copywriting job,
not a translation job. Arabic that reads as foreign lands worse with this
audience than an English ad does, and the cost of getting it wrong is the
brand, not the budget.

Once approved: remove the `.warn` element in `07-REFERENCE/build.js` and
re-render. The strip disappears and the file becomes shippable.

**Arabic draft copy**

```
إعلاناتك تعمل ٢٤ ساعة. فريقك لا.

العميل يرسل استفساره الساعة ١١ مساءً. الرد يصل في التاسعة صباحاً.

سنقيس سرعة الرد على نموذج التواصل في موقعك، ونرسل لك الأرقام. مجاناً، خلال ٢٤ ساعة.
```

**English reference**

```
Your ads run 24 hours. Your team doesn't.
The enquiry arrives at 11pm. The reply arrives at 9am.
We will measure your form's response time and send you the numbers. Free, within 24 hours.
```

## Week one — what good looks like

| Metric | Expected band |
| --- | --- |
| CPM | $3–6 |
| Swipe-up rate | 0.5–0.8% |
| Cost per lead | $30–60 |
| Qualified rate | ~25% |

## The verdict, week 6

Scale or stop. There is no third option for a probe this size, and running it
to week 8 out of inertia is how small budgets quietly waste money.

The question it is answering is narrow and worth answering: **does a business
message work on a consumer platform in this market?** If yes, Snapchat becomes
a serious line in the Saudi campaign. If no, you learned it for AED 600.

## Mistakes specific to this platform

- **Expecting Meta's numbers.** Different platform, different job, much lower
  intent. Judge it as a probe.
- **Running the Arabic before review.** The warning strip exists to prevent
  exactly this.
- **Scaling it early because the CPM looks good.** Cheap impressions are not
  the goal. Qualified leads are.
""" + FOOTER

MANUALS['06-GOOGLE-BUSINESS'] = """# Google Business Profile

**Organic — no spend · two posts a week · the highest-intent traffic you have**

Worth being precise about what this is: **a Business Profile is not an ad
platform.** You cannot buy impressions on it. These are profile posts, and
they are free.

It earns its place for two reasons. Someone reading your profile has already
searched your name — usually after seeing an ad or getting a cold email — and
that is the highest-intent traffic in the entire campaign. And the profile
feeds the location asset behind any Google Ads campaign you run later.

## Where to post

Google Business Profile Manager (or search your business name while signed in)
→ your profile → **Add update** / **Promote**.

Two post types are used here:

- **What's new** — for Post A
- **Offer** — for Post B (it lets you set a validity window and a button)

## Before you post anything

The profile itself has to be complete, or the posts land on a page that
undermines them:

- [ ] Business name, category, and a real description
- [ ] Address or service area
- [ ] Phone number that someone actually answers
- [ ] Website URL pointing at `/leak-test`
- [ ] Hours — including the fact that enquiries arrive outside them
- [ ] At least five photos
- [ ] Verified

A profile that is half-filled while advertising responsiveness is an own goal.

## The posts

Both 1200×1200, sized and contrasted to survive being shown at thumbnail scale
in the local panel, which is where most of them are actually seen.

### Post A — Free Lead Response Report  ·  `post-01-free-report.png`

Type: **What's new**. Post weekly.

```
How fast does your own enquiry form get answered?

Most owners have never measured it. We will — free.

Send us your website. We submit your form, time the reply, check your booking path, and send you the timestamps within 24 hours. No call required.
```

**Button** — Learn more → `/leak-test`

### Post B — The 14-Day Leak Test  ·  `post-02-leak-test.png`

Type: **Offer**. Runs the full eight weeks.

```
14 days. One leak. Fixed free.

We find the single biggest gap between a lead arriving and someone answering it, and we close that one — on your existing numbers and channels, with the success metric agreed in writing before we start.

No migration. No new system to learn first.
```

**Button** — Learn more → `/leak-test`

This is the warm offer, placed where the warmest traffic already is. It is the
one surface where the bigger ask is the right ask, because the reader arrived
by searching your name rather than by being interrupted.

## Cadence

**Two posts a week, every week.** Profile posts decay after roughly seven days
and a stale profile reads as a dead business — which is the opposite of what
this campaign is selling. Alternate the two, or write short variations.

## What to watch

Profile insights show searches, views, clicks and calls. There is nothing to
optimise here in the paid sense. The only way this fails is by going quiet.

## If you want paid search as well

That is **Google Ads**, not the Business Profile, and it is a separate budget
line from the social plan. It is a genuinely strong fit — somebody searching
"CRM for clinics Dubai" is further down the funnel than anyone in a social
feed — but folding it into this budget would starve the Meta line the whole
plan depends on.

Plan it for month three, once paid social has told you which message to bid
on. Your profile will already be feeding location assets into it by then.
""" + FOOTER

MANUALS['07-REFERENCE'] = """# Reference

Everything needed to regenerate or change the creative, plus the voiceover
script.

## Files

| File | What it is |
| --- | --- |
| `build.js` | Renders every asset from HTML. One command rebuilds the whole batch |
| `vo.py` | Generates the narration and measures it, so scene lengths match the read |
| `script.json` | Captions **and** voiceover lines in one place, so picture and read cannot drift |
| `vo-style.json` | The direction given to the TTS model per concept |
| `tokens.json` | The four Day 0 figures. Fill these and re-run |
| `vo-timing.json` | Measured scene lengths, written by `vo.py` |
| `VOICEOVER.md` | The recording script with in/out timecodes per line |
| `TTS-SETUP.md` | Which speech engines work, quota limits, and how to switch |
| `brand/` | The Kyntlo wordmark, full-colour and white knockout |

## Filling the Day 0 numbers

1. Run Day 0 — submit the enquiry forms, log the reply times. About two hours.
2. Put the results in `tokens.json`.
3. Rebuild:

```
NODE_PATH=/opt/node22/lib/node_modules node build.js
```

Every asset regenerates with real numbers in place of the amber slots.

## Re-recording the voiceover

The narration is synthetic (Gemini TTS, voice Charon). To replace it with a
human read, the picture is already cut to the line lengths — `VOICEOVER.md`
has the in/out timecode for every line, so a natural read drops in without
re-editing anything.

**Concept A should be recorded by the founder.** It speaks in the first
person — *"I filled in the contact form on N Dubai businesses"* — and the
campaign's whole argument is that the claim is literally true and independently
checkable. A convincing synthetic voice makes that harder to defend rather than
easier, because nobody listening can tell. It is sixty seconds of phone audio.
Concept B makes no first-person claim, so synthetic narration suits it fine.

## Changing copy

Edit `script.json` for the videos — it drives both the on-screen captions and
the spoken lines, so they cannot fall out of sync. Then re-run `vo.py` and
`build.js`. The per-line cache means only what changed gets re-synthesised.

## The one lesson worth keeping

On Gemini TTS the **direction controls duration**, not just tone. The same
line, same voice, same model:

| Direction | Length |
| --- | ---: |
| "…unhurried…" | 6.12s |
| "…normal conversational speed, no dramatic pauses, this is a 25-second social video…" | 3.60s |

41% shorter, and across the script it was the difference between a 49-second
TikTok ad and a 32-second one. Under 30 seconds is where short-form cold
traffic performs, so the first version was unusable however good it sounded.

When editing `vo-style.json`: **state the format and the pace, not only the
mood.**
"""

# ------------------------------------------------------------------- assemble
LAYOUT = {
    '01-META': [
        ('meta-a-tuesday-test.png', 'ad-01-the-tuesday-test.png'),
        ('meta-b-62-clinics.png', 'ad-02-62-clinics.png'),
        ('carousel-01.png', 'carousel-frame-01.png'),
        ('carousel-02.png', 'carousel-frame-02.png'),
        ('carousel-03.png', 'carousel-frame-03.png'),
        ('carousel-04.png', 'carousel-frame-04.png'),
        ('carousel-05.png', 'carousel-frame-05.png'),
        ('carousel-06.png', 'carousel-frame-06.png'),
        ('tiktok-a-spreadsheet.mp4', 'reel-01-scrolling-the-spreadsheet.mp4'),
        ('tiktok-b-11pm-lead.mp4', 'reel-02-the-11pm-lead.mp4'),
    ],
    '02-LINKEDIN': [
        ('linkedin-a-aed-number.png', 'ad-01-the-aed-number.png'),
        ('carousel-01.png', 'document-ad-page-01.png'),
        ('carousel-02.png', 'document-ad-page-02.png'),
        ('carousel-03.png', 'document-ad-page-03.png'),
        ('carousel-04.png', 'document-ad-page-04.png'),
        ('carousel-05.png', 'document-ad-page-05.png'),
        ('carousel-06.png', 'document-ad-page-06.png'),
    ],
    '03-TIKTOK': [
        ('tiktok-a-spreadsheet.mp4', 'ad-01-scrolling-the-spreadsheet.mp4'),
        ('tiktok-b-11pm-lead.mp4', 'ad-02-the-11pm-lead.mp4'),
    ],
    '04-YOUTUBE': [
        ('youtube-a-spreadsheet.mp4', 'shorts-01-scrolling-the-spreadsheet.mp4'),
        ('youtube-b-11pm-lead.mp4', 'shorts-02-the-11pm-lead.mp4'),
        ('youtube-a-infeed.png', 'infeed-01-tuesday-test.png'),
        ('youtube-b-infeed.png', 'infeed-02-62-clinics.png'),
    ],
    '05-SNAPCHAT': [
        ('snap-a-closed-inbox.png', 'ad-01-open-sign-closed-inbox.png'),
        ('snap-b-arabic-receipt.png', 'ad-02-arabic-receipt-DO-NOT-RUN-YET.png'),
    ],
    '06-GOOGLE-BUSINESS': [
        ('gbp-a-free-report.png', 'post-01-free-report.png'),
        ('gbp-b-leak-test.png', 'post-02-leak-test.png'),
    ],
}

PKG.mkdir(parents=True)
(PKG / '00-START-HERE.md').write_text(START)

missing = []
for folder, files in LAYOUT.items():
    d = PKG / folder
    d.mkdir()
    (d / 'README.md').write_text(MANUALS[folder])
    for src, dst in files:
        s = OUT / src
        if not s.exists():
            missing.append(src); continue
        shutil.copy2(s, d / dst)

ref = PKG / '07-REFERENCE'
ref.mkdir()
(ref / 'README.md').write_text(MANUALS['07-REFERENCE'])
for f in ['build.js', 'vo.py', 'script.json', 'vo-style.json', 'tokens.json',
          'vo-timing.json', 'VOICEOVER.md', 'TTS-SETUP.md']:
    if (ROOT / f).exists():
        shutil.copy2(ROOT / f, ref / f)
shutil.copytree(ROOT / 'brand', ref / 'brand')

zip_path = DIST / 'kyntlo-ads-2026-q4.zip'
with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as z:
    for p in sorted(PKG.rglob('*')):
        if p.is_file():
            z.write(p, p.relative_to(DIST))

print('missing sources:', missing or 'none')
for folder in sorted([p for p in PKG.iterdir() if p.is_dir()]):
    n = len([f for f in folder.rglob('*') if f.is_file()])
    print('  %-22s %2d files' % (folder.name, n))
print('zip: %s  (%.1f MB)' % (zip_path.name, zip_path.stat().st_size / 1e6))
