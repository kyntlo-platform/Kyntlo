# Kyntlo Paid Social Campaign — October–November 2026

Document ID: `KYN-PAID-001`
Version: `1.0`
Created: 2026-09-22
Status: Draft for owner approval — no spend authorised
Pre-flight: 22 Sep – 5 Oct 2026 · Live: 6 Oct – 30 Nov 2026
Interactive run sheet: <https://claude.ai/artifact/MSD4V6CBuiJZpUxkdKhRem>

Built from `01-product-decisions.md`, `02-content-and-claims-audit.md`,
`03-kyntlo-ghl-white-label-brd.md`, and the standing acquisition strategy and
prospecting playbook supplied 22 Sep 2026.

---

## 1. Launch blockers

Five hard stops and two care items. Spend placed before the hard stops are
cleared is not a test.

| # | Severity | Blocker | Fix |
| --- | --- | --- | --- |
| 1 | STOP | No conversion tracking on the site — no Meta Pixel/CAPI, LinkedIn Insight Tag, TikTok, Snap pixel or GA4 | Install all five pixels, GA4, and server-side Meta CAPI. One day of work. |
| 2 | STOP | No working lead destination. Booking, contact form, CRM submission and email delivery are all listed as not implemented | Build `/leak-test`: one field (website URL + email), CRM-wired |
| 3 | STOP | Homepage testimonials are labelled "Illustrative customer stories" | No testimonial, review card or quote in any paid creative until a real attributable customer exists. All ten concepts are built without one. |
| 4 | STOP | "No hidden markup", "wholesale rates", "full GDPR compliance" and the "$2,488+ monthly stack" figure are flagged LEGAL/EVIDENCE in the claims audit | Excluded from all creative. Clear with legal or keep out of paid. |
| 5 | STOP | No confirmed social business accounts — LinkedIn and Instagram links are `#` placeholders | Open all five ad accounts; start Meta domain verification first (longest lead time) |
| 6 | CARE | Clinics are regulated health advertising (DHA, DoH Abu Dhabi, MOHAP) and Meta restricts health-adjacent targeting | Lead with booking and no-shows, never with patient messaging or AI replies. Clinic creative below complies. |
| 7 | CARE | Three currencies in play — USD on site, EUR in product decisions, AED in the acquisition strategy | Standardise on AED for this market across ads, landing page and checkout. No concept quotes a plan price. |

**Operational risk:** the campaign sells speed of response. A fulfilment SLA of
**24 working hours** on the free report is non-negotiable — a slow report
disproves the thesis to the exact audience being courted. If the SLA cannot be
staffed, reduce budget rather than slow the promise.

---

## 2. Strategic logic

| # | Decision | Reasoning |
| --- | --- | --- |
| 01 | Sell the leak, not the platform | The standing strategy forbids leading with "CRM", "funnels" or "automation platform" — those words invite a comparison chart against twelve better-funded vendors. In paid, you pay for every impression of that invitation. The word "CRM" appears in none of the ten concepts. |
| 02 | Kyntlo's own field data is the creative | No signed client exists in these niches, so no case study and no testimonial. The substitute is measured data the prospecting work already produced: 62 UAE clinics audited, 35 with a form where a calendar belongs, 43 with an unrecorded WhatsApp funnel, 8 with a real calendar. Verifiable, unique, and free to produce. |
| 03 | Paid warms outbound rather than competing with it | The 47 niche-1 records and 62 clinics run as custom audiences for roughly 3% of budget, so cold email lands on a warmed prospect. Judged on outbound reply rate, never on its own CPL. |
| 04 | Clinics carry volume, interiors carry the founder | The playbook's own test: 181 clinic advertisers vs 77 interior, 5–22 ads each vs 1–3, appointments vs one-off projects, and a cost-of-missed-lead the clinic owner already knows in AED. Mechanics decide paid; founder credibility decides calls. |
| 05 | Broad targeting, specific creative | Interest-stacking a small UAE audience produces a small group all seeing one mediocre ad. Audience knowledge goes into copy instead — the identity word ("clinic", "fit-out", "brokerage") in the headline works as reader trigger and targeting signal. LinkedIn is the exception; its firmographics earn their place. |
| 06 | Two opposed concepts per platform | Concept A is always *personal* (founder, timestamp, story). Concept B is always *evidential* (dataset, grid, number). Testing two versions of one angle answers nothing; testing personal against evidential reveals which register this market buys in — and that transfers to the landing page and outbound scripts. |

**On "posts as ads":** every concept is a feed post — static or carousel, not
produced video. Statics are ~10× cheaper and faster, which is what makes
fortnightly creative refresh possible; Meta's delivery currently favours them;
and a post that looks like a post outperforms one that looks like an ad.
TikTok and Snapchat get a light motion treatment (screen recording, slow push)
because a fully static frame under-delivers there.

---

## 3. Offer architecture

**Door 1 — cold traffic (the ad destination): The Lead Response Report.**
One field: the business's website URL. Kyntlo submits their own enquiry form,
times the reply, checks the booking mechanism and WhatsApp path, returns a
one-page report with timestamps. Free, 24-hour SLA. It costs the prospect
nothing, cannot be faked, self-qualifies (only businesses with inbound leads
care), and no competitor can copy it without doing the work.

**Door 2 — warm traffic (retargeting only): The 14-Day Leak Test.**
One leak, fixed free, on existing numbers and channels, success metric agreed
in writing beforehand. Too large an ask for cold traffic; correct for someone
who has read their own report.

### Path from impression to signature

| Stage | What happens | Owner | SLA |
| --- | --- | --- | --- |
| 1 Impression | Feed post, broad targeting, identity word in headline | Platform | — |
| 2 Click | Lands on `/leak-test`, headline mirrors the ad verbatim | Web | <3s load |
| 3 Lead | URL + email + emirate only | Web → CRM | Instant |
| 4 Report | Form timed, booking path checked, one-page PDF sent | Ops | **24 working hours** |
| 5 Call | Booking link in the report; 20 min walking the timestamps | Sales | Within 5 days |
| 6 Pilot | 14-Day Leak Test, one metric agreed in writing | Delivery | 14 days |
| 7 Signature | Plan selected against the measured result | Sales | Day 15 |

**Integrity rule (carried from outbound):** when a real salesperson replies to
a test enquiry, tell them immediately what the message was and that the form
was being timed. Never let anyone build a quote for a project that does not
exist. At paid volume this becomes policy — write it into the fulfilment
script before the first report goes out.

---

## 4. Budget

No budget was set by the owner. Modelled at **USD 12,000 over eight weeks**.
The percentage split holds at any budget; the platform count does not. Below
roughly $6,000 total, drop Snapchat and X and move the money to Meta.

Platform set confirmed by the owner 22 Sep 2026: Instagram, Facebook,
LinkedIn, TikTok, YouTube, Google Business Profile, and Snapchat if needed.
X is not held and has been dropped from the plan.

| Platform | Share | 8-week spend | Daily avg | Role |
| --- | ---: | ---: | ---: | --- |
| Meta (IG + FB) | 55% | $6,600 | $117.86 | Volume engine. The only platform that can produce enough conversions to leave the learning phase inside eight weeks. |
| LinkedIn | 18% | $2,160 | $38.57 | Quality engine. 3–4× the CPL, ~65% qualified vs Meta's ~40%. |
| TikTok | 12% | $1,440 | $25.71 | Cheap reach, genuine founder-content advantage, lower intent. Feeds retargeting. |
| YouTube | 8% | $960 | $17.14 | Shorts carry the same two concepts as TikTok. One test on two algorithms turns a result into a finding rather than a quirk. |
| Snapchat | 5% | $600 | $10.71 | Deliberate probe. De-risks the KSA expansion in month three. |
| Google Business | — | organic | — | Not an ad platform; profile posts are organic. Feeds the location asset behind any later Google Ads campaign. |
| ABM warm-up | — | $360 | $6.43 | Carved from Meta + LinkedIn above, not added. |
| Winner reserve | 2% | $240 | — | Released in week 5 into whichever concept cleared graduation. |
| **Total** | **100%** | **$12,000** | **$214.29** | |

**Why 55% to one platform:** the commonest five-platform failure is that no
platform gets enough spend to leave the learning phase, producing five
inconclusive results. Meta needs roughly 50 conversions per ad set per week to
optimise. Evenly split, nothing reaches that. Weighted, Meta does — and Meta
is also the only channel producing a retargeting pool and lookalike seed large
enough to make months three and four cheaper.

---

## 5. The eight weeks

### Weeks 1–2 · Learn — *does the wedge land in a feed?*
$1,200/week. All ten concepts live, equal budget within each platform.
**Change nothing** — no pausing, editing or budget moves. Editing a running ad
resets the learning phase; pausing does not. Log lead quality
(Urgency / Budget / Fit, 0–3 each) against the originating ad from lead one.
ABM warm-up starts day one; it needs the longest runway.

### Weeks 3–4 · Cut — *which half is dead?*
$1,400/week. Apply the kill rules; expect to lose four or five of ten. Kill
the *concept*, not the copy, when a concept produces zero qualified leads.
Write two iterations of each survivor now — they take ~14 days to be ready.
Retargeting switches on once the pixel pool passes ~1,000. First lead-quality
read: rank ads by average score, not CPL.

### Weeks 5–6 · Scale — *how far does the winner go?*
$1,700/week; winner reserve released. Budget increases of 20% every 3–5 days,
never 30%+ in one move. Build a 1% lookalike from converters, not all leads.
Launch identity-word variants (the winning ad with "clinic", "fit-out",
"brokerage" swapped into the headline). Run the zombie pass on high-conviction
variants the algorithm starved. Snapchat and X get their verdict.

### Weeks 7–8 · Compound — *what carries into month three?*
$1,700/week. Mirror the winning ad headline onto the landing page word for
word (expect 15–20% lift). Refresh anything past 21 days — small UAE audiences
build frequency fast. Draft Arabic variants with native review for KSA. Push
CRM stage changes back to the platforms. Write the retro: winning register,
winning niche, winning hook. That is the real deliverable.

**Calendar checks:** GITEX Global runs in Dubai in October and inflates CPMs
across tech and business targeting for its week. UAE National Day is 2
December, just past the window, and late November runs hot on retail
competition. Neither is a reason to move; both are reasons not to misread a
CPM spike as creative fatigue.

---

## 6. The ten concepts

All tokens (`{{N_TIMED}}`, `{{N_NEVER_REPLIED}}`, `{{MEDIAN_HOURS}}`,
`{{FASTEST_MIN}}`) stay unfilled until Day 0 is run, so an unmeasured number
cannot ship by accident. The clinic figures (62 / 35 / 43 / 8) are already
measured and ship as written.

Full copy blocks with copy buttons are in the run sheet artifact linked above.
Summarised here:

### Meta — Instagram & Facebook (60%)
Objective: Leads via site conversion, not native lead form. Broad UAE, 28–60,
no interest stack. One CBO with both concepts.

- **A · The Tuesday Test** — founder message, single static 4:5, *personal*.
  A screenshot of a real enquiry confirmation and its two-days-later reply,
  timestamps circled in red pen. No logo, no brand colours. Long-form
  founder copy opening "Last Tuesday I filled in the contact form on
  `{{N_TIMED}}` Dubai businesses that are running ads right now."
  Hypothesis: first-person account beats institutional proof.
- **B · 62 Clinics** — grid static 4:5, *evidential*. A 62-tile grid, 35 lit
  hot pink. "35 / 62 — UAE clinics whose 'Book Now' opens a form, not a
  calendar." Copy lists all five measured findings.
  Hypothesis: a verifiable dataset beats a personal story, and the reader's
  instinct to check their own site is the click.
- **ABM warm-up** rides inside this budget: one ad set, ~$6/day, custom
  audience of the 47 niche-1 records plus 62 clinics, Concept B only, all
  eight weeks. Judged on outbound reply rate.

### LinkedIn (20%)
Objective: native Lead Gen Forms — the one platform where a native form is
right, because pre-filled firmographics *are* the qualification. UAE; Owner /
Founder / MD / Marketing Manager / Clinic Manager / Operations Manager;
11–200 staff; Health & Wellness, Medical Practice, Architecture & Planning,
Real Estate.

- **A · The AED Number** — single image, *personal*. "AED 1,500–5,000" at
  enormous scale over "What one missed consultation costs", with the method
  line in mono beneath. Copy anchors on a cost the buyer already carries and
  never says what Kyntlo is.
- **B · The Gulf Speed-to-Lead Report** — six-page document ad, *evidential*.
  LinkedIn's highest-dwell format. Cover, method, distribution chart, the 11pm
  problem, the three gaps, and how to run the test yourself.
  Hypothesis: giving away the method builds more trust than withholding it.

*Caveat:* native lead forms produce leads with no memory of the brand. Counter
in fulfilment — the report must arrive within 24 hours carrying the headline
they saw.

### TikTok (10%)
Objective: website conversions. Broad UAE, 25–55. Captions burned in (white
fill, black stroke, no pill), text inside the 720×1200 safe band.

- **A · Scrolling the Spreadsheet** — 24s screen recording, *personal*. The
  actual timing spreadsheet scrolling; the camera lingers on blank reply
  cells. Cheapest asset in the plan, probably the most persuasive.
- **B · The 11pm Lead** — 18s phone-screen reveal, *evidential*. 23:04 a
  villa fit-out enquiry arrives; 09:12 a reply is typed; a competitor's reply
  is stamped 23:06. No voiceover.

### Snapchat (5%)
A probe with a verdict point in week 6; strategic purpose is pricing the Gulf
audience before KSA.

- **A · Open Sign, Closed Inbox** — 9:16 single image, *personal*. A
  shopfront flipped to CLOSED with a phone glowing unread behind the glass.
  "Your ads never close. Your inbox does."
- **B · Arabic Receipt** — 9:16 RTL, *evidential*. The timestamp receipt
  rebuilt right-to-left with proper Arabic typography. This asset is the real
  deliverable of the Snapchat probe — it is the first Arabic creative Kyntlo
  owns and what makes month three possible.

> **The Arabic copy in the run sheet is a draft, not shippable text.** It must
> be rewritten by a native Gulf-dialect speaker. Machine-adjacent Arabic reads
> as foreign to this audience faster than any English ad, and the cost is the
> brand, not the budget.

### YouTube (8%)
Objective: video views into website conversions. Shorts plus 16:9 in-feed
frames. Both concepts are the TikTok cuts re-delivered — running one test on
two algorithms is what makes the result a finding rather than a quirk.

- **A · Scrolling the Spreadsheet** — Shorts 21s + 1920×1080 in-feed,
  *personal*. The thumbnail and the Short must make one promise; a thumbnail
  that over-claims buys a view and loses the watch time that decides whether
  YouTube keeps serving it.
- **B · The 11pm Lead** — Shorts 22s + 1920×1080 in-feed, *evidential*. The
  in-feed frame reuses the clinic grid so the evidential register stays
  visually consistent across every platform.

### Google Business Profile (organic)
Not an ad platform — you cannot buy impressions on a Business Profile. These
are profile posts. It earns its place for two reasons: it feeds the location
asset behind any Google Ads campaign run later, and it is one of the few
places a Gulf buyer checks before replying to a cold email.

- **A · Free Lead Response Report** — "What's new" post, 1200×1200, weekly.
- **B · The 14-Day Leak Test** — "Offer" post, 1200×1200, runs the full eight
  weeks. The warm offer, placed where the warmest traffic already is.

> Paid search is a genuinely strong channel for this offer — somebody
> searching "CRM for clinics Dubai" is further down the funnel than anyone in
> a social feed — but it is Google Ads, not the Business Profile, and it is a
> separate budget line. Folding it in here would starve the Meta line the
> whole plan depends on. Plan it for month three, once paid social has said
> which message to bid on.

---

## 6b. Rendered creative

All eighteen assets are built and committed under `assets/ads/2026-q4/`, with
`INDEX.md` listing every file, its dimensions and its placement. They are
rendered from HTML by `build.js`, so the set is reproducible and a copy change
is a re-render rather than a redraw.

| Ready | Count | Detail |
| --- | ---: | --- |
| Ships today | 11 | Whole six-frame carousel, Meta B, both YouTube in-feed frames, both 11pm-lead videos, both Snapchat frames, both Google Business posts |
| Awaiting Day 0 | 5 | Meta A, LinkedIn A, YouTube A in-feed, both spreadsheet videos |
| Awaiting Arabic review | 1 | Snapchat B, which carries a burned-in warning strip until the copy is signed off |

Unmeasured tokens render as visible amber slots rather than invented figures.
Fill `tokens.json` after Day 0 and re-run the build.

Review page: <https://claude.ai/artifact/9ckUoUE9qA6hfCzP1cJVYM>

What the batch does not contain, deliberately: no testimonials, faces or
customer names (the site's stories are illustrative); no press logos; no
photography (the Snapchat shopfront is drawn); and no plan prices, which
sidesteps the unresolved USD/EUR/AED inconsistency until the landing page
settles it.

## 7. Decision rules

Anchor: **TCPL $85** — target cost per *qualified* lead, not per form fill.
Breakeven gross profit per customer: **$4,200**. Qualification bar: **5/9** on
Urgency + Budget + Fit, scored by whoever runs the call, logged against the
originating ad.

| Trigger | Threshold | Action | Why |
| --- | --- | --- | --- |
| Barely delivering | ≥1× TCPL lifetime, <$10/day for 7 days | Kill | Iterate hook/visual only — nobody got far enough for copy to matter |
| Not enough signal | <3× TCPL spent | **Wait** | Judging at 2× carries a 13% chance of killing a winner |
| Zero leads | ≥3× TCPL, 0 leads | Kill the concept | Abandon the angle, not the execution |
| Leads, none qualified | ≥3× TCPL, 0 qualified | Swap the angle | Keep the format, change who it speaks to |
| Weak qualification | Qualified rate <40% | Swap | At 40%, true cost per qualified lead is 2.5× the dashboard CPL |
| Structural overspend | Cost per qualified >1.5× TCPL | Swap | Above 1.5× it is no longer variance |
| Fatigue warning | Frequency 3.0–3.5 or cost +20% | Start 2 iterations | They take ~14 days to be ready |
| Fatigue critical | Frequency >3.5 or CTR −30% from peak | Retire | Concept exhausted, not execution |
| **Graduate** | ≥5 qualified · ≥60% qualified · ≤TCPL · ≥14 days · ≥1 qualified in last 7 | **Scale +20%** | All five must be true; then 20% every 3–5 days |

**Never edit creative inside a performing ad** — it resets the learning phase.
Launch the new version alongside and let the old one die. Pausing is free;
editing is not.

---

## 8. Measurement

### Events, in priority order
1. **Lead** — leak-test form submitted. The optimisation event everywhere.
2. **ReportDelivered** — proves the SLA, first honest quality signal.
3. **CallBooked** — the event that correlates with revenue.
4. **PilotStarted** — pushed from the CRM, not fired in the browser.
5. **Signed** — with deal value attached.

### Naming convention
```
[PLATFORM]_[STAGE]_[NICHE]_[OFFER]_[CONCEPT]_[WEEK]

META_Capture_Clinics_LeakTest_62Clinics_2026W41
LI_Capture_Multi_Report_GulfSpeed_2026W41
META_Warm_ABM-N1_LeakTest_62Clinics_2026W41
```

### The offline conversion loop
The highest-impact item in this section. Smart bidding optimises toward
whatever you call a conversion — feed it raw form fills and it will buy cheap
junk form fills while CPL improves and pipeline dies. Push CRM stage changes
back (CAPI lifecycle events on Meta, Conversions API on LinkedIn, offline
import on TikTok). Target week 7. Until live, a human reads lead quality
weekly — job titles and company names, not just CPL.

**Never sum conversions across platforms.** Meta's 7-day and LinkedIn's 30-day
windows measure different things and both will claim the same lead. Report
side by side, reconcile against the CRM monthly; when they disagree the CRM
wins. Expect platforms to collectively claim ~1.4× the CRM's leads — normal.

### Weekly review (30 minutes, fixed slot)
Spend pacing within 10% · cost per qualified lead against $85 · qualified rate
per ad (swap below 40%) · frequency (two iterations above 3.0 on cold) ·
fulfilment SLA (cut budget before letting the promise slip) · landing page
conversion (mirror the winning headline below 4%) · outbound reply rate
against the pre-ABM baseline.

---

## 9. Projected results

Modelled at $12,000, not measured.

| Stage | Base case | Basis |
| --- | ---: | --- |
| Impressions | 1,090,000 | blended CPM ~$11 |
| Clicks | 9,260 | blended CTR ~0.85% |
| Leads | 342 | blended CPL $35 |
| Qualified leads | 141 | 41%, scored 5+/9 |
| Calls held | 34 | 35% booked × 70% show |
| Pilots started | 14 | 40% of calls held |
| **Signed** | **7** | 50% of pilots |

Blended CAC **$1,714** · New MRR **$4,200** · Annualised **$50,400** ·
CAC payback **4.1 months**.

| Outcome | Conservative | Base | Strong |
| --- | ---: | ---: | ---: |
| Leads | 212 | 342 | 496 |
| Qualified leads | 87 | 141 | 204 |
| Calls held | 21 | 34 | 49 |
| Signed customers | 4 | 7 | 10 |
| Blended CAC | $3,000 | $1,714 | $1,200 |
| New MRR | $2,400 | $4,200 | $6,000 |

**Months one and two are the worst this will ever look.** No pixel history, no
lookalike seed, no proven creative, no offline conversion data — all four
arrive during this campaign. On comparable cold starts, CAC typically falls
30–50% between month two and month four purely from the assets this campaign
creates.

**The database is worth more than the signatures.** The base case leaves ~300
businesses who raised their hand, gave their website, and had their response
time measured — a scored, enriched, warm prospecting list that cost nothing
extra and feeds the outbound engine for months. Re-scoring is where the
warmest leads come from: a business that ignored the report in October and
starts running ads in January is the hottest lead in the database.

### Assumptions — argue with these

| Assumption | Value | Confidence and basis |
| --- | ---: | --- |
| Average monthly ticket | ~$600 | **Medium.** Midpoint of the AED 1,500–4,000 and 2,500–6,000 ranges. Well above the $90–490 site prices because it assumes a services component. |
| Average retention | 10 months | **Low.** No churn data exists. Softest input in the model; first to replace with real data. |
| Gross margin | 70% | **Medium.** After platform and usage costs. Usage-heavy customers come in lower. |
| Landing page → lead | 5% | **Medium.** Reasonable for a one-field offer, but the page does not exist yet. |
| Lead → qualified | 41% | **Medium.** Blended; LinkedIn much higher, TikTok and Snap much lower. |
| Qualified → call held | 24% | **Low.** Most fragile number here. A ten-point move changes the signed count by ~3. |
| Call → pilot → signed | 40% × 50% | **Low.** No paid-sourced cohort exists. Outbound behaviour may not transfer. |
| UAE CPMs | $4–38 | **Medium.** Varies enormously by platform. Confirm each with a $100 probe. |

---

## 10. Pre-flight checklist

Ordered by lead time, not by importance.

**Week of 22 September**
- [ ] Open all five ad accounts. **Start Meta domain verification first** — longest lead item.
- [ ] Run Day 0 (~2 hours): submit the enquiry forms, log reply times. Fills every creative token.
- [ ] Install all five pixels, GA4, and server-side Meta CAPI. Test with a real submission.
- [ ] Build `/leak-test` — one field, CRM-wired, headline matching the ads verbatim.
- [ ] Decide the currency (AED) and make ads, page and checkout agree.

**Week of 29 September**
- [ ] Produce the ten assets — eight statics, two light-motion posts. Two days.
- [ ] Native Gulf-dialect review of the Arabic. Not a translation task.
- [ ] Build custom audiences (47 niche-1 records + 62 clinics) and let them populate.
- [ ] Write the fulfilment script including the test-enquiry disclosure line.
- [ ] Staff the SLA — the base case implies ~40 reports/week at peak.
- [ ] Record the current outbound reply rate as the ABM baseline.

**If only three get done:** tracking, the landing page, and Day 0.

---

## 11. Owner decisions required

- [ ] Approve or set the total budget (modelled at $12,000).
- [ ] Approve the currency decision (AED for the UAE market).
- [ ] Confirm the founder name and whether it may appear in creative.
- [ ] Confirm the fulfilment owner and the 24-hour SLA is staffable.
- [ ] Approve the clinic niche for paid given health-advertising regulation.
- [ ] Confirm official social account handles once created.
- [ ] Approve or reject each of the eighteen rendered assets.
- [ ] Name the native Gulf-dialect reviewer for the Arabic creative.
- [ ] Approve the free Lead Response Report as a committed offer.
- [ ] Confirm legal position on the claims excluded from creative in §1.
