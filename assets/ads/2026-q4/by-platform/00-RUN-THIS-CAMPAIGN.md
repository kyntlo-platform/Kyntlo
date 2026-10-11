# Run this campaign — 20,000 EGP per month

The complete campaign at your budget. Everything here is executable; nothing
is left as a decision for later.

**One platform: Meta.** Plus Google Business posts, which are free. The other
four folders stay packed — `00-BUDGET-20K-EGP` explains why their own daily
minimums put them out of reach.

| | |
| --- | --- |
| Budget | 20,000 EGP/month ≈ $417 ≈ AED 1,530 |
| Daily | 655 EGP ≈ $13.65 |
| Market | **Dubai only** |
| Niche | **Clinics only** |
| Campaigns to build | 3 ad sets inside 1 campaign |
| Ads live on day 1 | 1 |

---

## Before day 1 — the week that cannot be skipped

Three of these are hard stops. An ad cannot run without them.

| | Task | Why | Time |
| --- | --- | --- | --- |
| ☐ | **Meta Business Manager + domain verification** | Longest lead item of the whole launch. Start it first, today. | 10 min + 1–3 days waiting |
| ☐ | **Meta Pixel on every page, Conversions API server-side** | Without it the campaign optimises on clicks, the metric least connected to money | Half a day |
| ☐ | **Build `/leak-test`** | One field: website URL + email. Wired to the CRM. The ads all point here | 1 day |
| ☐ | **Assign the fulfilment owner** | 16 reports a month, 24-hour SLA. Name the person | 5 min |
| ☐ | **Record today's outbound reply rate** | The ABM ad set is judged against this baseline and nothing else | 10 min |
| ☐ | **Decide the currency on the site** | USD on site, EUR in docs, AED in strategy. Pick AED | 1 hour |

Test the pixel with a real form submission, not just the debugger. A pixel
that fires in preview but not in production is the most common silent failure
here.

---

## The structure

One campaign. Three ad sets. Do not add a fourth.

```
CAMPAIGN  ·  META_Leads_Clinics_Dubai_2026Q4
│   Objective: Leads  ·  Budget: ad-set level (not CBO — see note)
│
├── AD SET 1  ·  Cold prospecting          590 EGP/day  → 475 from day 15
│   └── Ad: 62 Clinics
│       (+ Tuesday Test, added once Day 0 is done)
│
├── AD SET 2  ·  Retargeting               115 EGP/day  — starts day 15
│   └── Ad: Clinic Audit carousel, 6 frames
│
└── AD SET 3  ·  ABM warm-up                65 EGP/day  — from day 1
    └── Ad: 62 Clinics
```

**Why ad-set budgets rather than campaign budget optimisation.** CBO is the
right choice at scale, because it moves money to whatever is working. At 655
EGP a day it would starve two of your three ad sets to feed one — and the ABM
and retargeting sets have jobs that are not measured in leads. Hold the
budgets manually until you are past 1,500 EGP a day.

---

## Ad set 1 — Cold prospecting

The core. Everything else supports it.

| Setting | Value |
| --- | --- |
| Daily budget | **590 EGP** days 1–14, then **475 EGP** |
| Conversion event | **Landing page views** for days 1–21, then Lead |
| Location | **Dubai** only — not all UAE |
| Age | 28–60 |
| Gender | All |
| Detailed targeting | **Empty.** No interests, no behaviours |
| Advantage+ audience | On |
| Placements | Advantage+ (automatic) |
| Attribution | 7-day click, 1-day view |

**Why Dubai only.** 655 EGP a day across seven emirates means never reaching
anyone often enough to be remembered. Concentration is the only advantage a
small budget has.

**Why landing page views for three weeks.** Meta wants roughly 50 conversions
per ad set per week to optimise. You will produce about four leads a week.
Three weeks on a cheaper, more frequent event gives the pixel something real
to learn from before you ask it to find buyers. Switching to the Lead event on
day one with this volume is the single most common way a small budget returns
nothing.

### The ad — 62 Clinics

File: `01-META/ad-02-62-clinics.png`

This runs on day 1 because every number in it is already measured. No tokens
to fill.

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
**CTA** — Learn more
**Destination** — `/leak-test`

### The second ad — added when Day 0 is done

File: `01-META/ad-01-the-tuesday-test.png`

Add it to **this same ad set** — not a new one — so the two compete fairly.
It needs `N_TIMED` and `N_NEVER_REPLIED` from the Day 0 timing run, which is
one afternoon of work. Until then you are warming the pixel, not running the
test.

The real experiment starts the day this ad goes live: personal register
against evidential. That answer is worth more than the leads.

---

## Ad set 2 — Retargeting · starts day 15

| Setting | Value |
| --- | --- |
| Daily budget | **115 EGP** |
| Audience | Website visitors, 30 days, **excluding** anyone who converted |
| Conversion event | Lead |
| Frequency cap | 6 per 30 days |
| Placements | Advantage+ |

**Why day 15 and not day 1.** It needs roughly 1,000 people in the pixel pool
to work at all. At this spend that takes about two weeks. Turning it on early
splits a small budget across an audience that does not exist yet.

### The ad — Clinic Audit carousel

Files: `01-META/carousel-frame-01.png` through `-06.png`, in order.

**Primary text**

```
We checked 62 UAE clinics that advertise on Instagram — every one of them paying for leads right now.

35 have a "Book Now" button that opens a form. 18 have no booking mechanism at all. 43 run their real funnel through a WhatsApp button that records nothing.

Only 8 have a working calendar, and none of those sits inside a system that sends a reminder or chases a no-show.

Swipe for the full breakdown, including how to check your own in about two minutes.
```

Its leads will look remarkably cheap — around a third of cold. That is the
warm audience, not brilliance. Judge it against other retargeting only.

---

## Ad set 3 — ABM warm-up · from day 1

The cheapest line here and the only one that makes something you already own
work better.

| Setting | Value |
| --- | --- |
| Daily budget | **65 EGP** |
| Audience | Custom audience from your 47 interior + 62 clinic records |
| Objective | **Reach**, not leads |
| Frequency | 2 per week |
| Ad | 62 Clinics |

Its job is not a click. It is to make sure that when your cold email arrives,
the name is already familiar.

**Judge it by outbound reply rate against the baseline you recorded in
pre-flight.** Never by its own cost per lead — it does not have a meaningful
one, and looking at it that way will make you switch off the best-value line
in the account.

---

## Google Business — free, do it anyway

Two posts a week, every week, from `06-GOOGLE-BUSINESS`.

Someone reading your profile has already searched your name — usually after
seeing an ad or getting a cold email — which makes it the highest-intent
traffic in the campaign. Profile posts decay after about seven days, so a
stale profile reads as a dead business. That is the only way this one fails.

---

## The month, day by day

| Days | Cold | Retarget | ABM | Daily total | What you are doing |
| --- | ---: | ---: | ---: | ---: | --- |
| **1–14** | 590 | — | 65 | **655 EGP** | Warming the pixel. Change nothing. |
| **15–30** | 475 | 115 | 65 | **655 EGP** | Retargeting on. Switch to Lead event on day 21. |

Monthly: 19,650 EGP spent, ~350 held back.

### The four moments that need a decision

| Day | Check | Do this |
| --- | --- | --- |
| **7** | Is the pixel firing? Are landing page views arriving at a sane cost? | Fix tracking if not. **Do not touch the ads.** |
| **15** | Pixel pool past 1,000? | Switch on ad set 2. |
| **21** | Have you had at least 15 landing page views a day for a week? | Switch ad set 1 to the **Lead** event. If not, hold another week. |
| **30** | Cost per qualified lead against the $85 target. Qualified rate against 40%. | See the decision table below. |

**Between those four dates, change nothing.** This is the hardest instruction
in the document and the one that costs most when broken. At this budget you do
not have enough data to improve anything before day 30 — you only have enough
to damage it.

---

## What to expect

| | Month 1 | Month 2 | Month 3 |
| --- | ---: | ---: | ---: |
| Leads | 10–14 | 16–18 | 18–22 |
| Qualified | 5–6 | 7–8 | 8–10 |
| Calls held | 2 | 2–3 | 3–4 |
| **Signed** | **0–1** | **1** | **1–2** |

Month 1 is deliberately the weakest: the learning phase eats most of it, and
the Tuesday Test probably is not live yet. Month 3 is better on the same spend
because the pixel has history, the retargeting pool is full, and you know
which register wins.

**One customer a month at AED 1,500–4,000 against AED 1,530 of spend pays the
month back in about a month.** The volume is slow. The economics are better
than the large plan's.

### Use the advantage a small budget gives you

Sixteen leads a month is a number one person can work entirely by hand. Call
every one. Chase every one. That is why the call rate above is higher than the
large-budget model assumed — at 340 leads a month it is impossible and the
funnel leaks.

---

## Day 30 — the decision

| What you see | What it means | Do |
| --- | --- | --- |
| Cost per qualified lead **≤ $85**, qualified rate **≥ 40%** | Working | Hold the budget one more month, then raise it 20% from revenue |
| CPQL **$85–130** | Promising, not proven | Hold. Add the Tuesday Test if it is not live. Give it month 2 |
| CPQL **> $130**, qualified rate **≥ 40%** | Right people, wrong price | The landing page is the problem, not the ad. Mirror the winning headline onto it |
| Qualified rate **< 40%** | Wrong people | Swap the angle, keep the format |
| **Zero leads** at 3× target spend | The concept is dead | Kill it. Do not iterate a dead angle — try the Tuesday Test instead |

**Never raise the budget from savings. Raise it from the customers the budget
produced.** When you reach 35,000 EGP a month, `00-BUDGET-20K-EGP` has the
ladder for which platform to add next.

---

## Six things not to do

1. **Do not split across platforms.** TikTok's minimum alone is 146% of this
   month's budget.
2. **Do not target all seven emirates.** Dubai only.
3. **Do not add interest targeting.** It will make the audience worse, not
   better.
4. **Do not edit a running ad.** Editing resets the learning phase. Duplicate
   and launch alongside instead — pausing is free, editing is not.
5. **Do not judge before day 30.** The kill rules want 3× target cost per lead
   of spend. At this budget that is most of a month.
6. **Do not let the 24-hour report SLA slip.** This campaign sells speed of
   response to people you have just taught to measure speed of response. A
   three-day report disproves the thesis to exactly the people you most wanted
   to impress.
