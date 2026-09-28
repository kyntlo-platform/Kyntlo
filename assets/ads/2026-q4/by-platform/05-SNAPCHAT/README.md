# Snapchat

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
