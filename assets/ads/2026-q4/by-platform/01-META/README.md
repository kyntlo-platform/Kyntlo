# Meta — Instagram & Facebook

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
