# What is now built inside Kyntlo

Built 2026-10-11 in sub-account `SXEax5cL2rAbWWyQLo4s` (hub.kyntlo.ai).
The record of what exists, what is still blocked, and what clears each blocker.

**Nothing is live.** The Meta campaign is `DRAFT`, every social post is a
draft, and publishing is a separate explicit action in both systems.

---

## 1. The measurement instrument — seven custom fields

Created on the **contact** object. Without these the campaign has opinions but
no numbers, and the two-concept A/B test cannot be settled.

| Field | Type | Field key |
| --- | --- | --- |
| Leak Test — Website Audited | TEXT | `contact.leak_test__website_audited` |
| Leak Test — Booking Mechanism Found | SINGLE_OPTIONS | `contact.leak_test__booking_mechanism_found` |
| Leak Test — Reply Time (minutes) | NUMERICAL | `contact.leak_test__reply_time_minutes` |
| Leak Test — Status | SINGLE_OPTIONS | `contact.leak_test__status` |
| Leak Test — Report Sent On | DATE | `contact.leak_test__report_sent_on` |
| Campaign — Source Creative | SINGLE_OPTIONS | `contact.campaign__source_creative` |
| Campaign — Qualified Lead | SINGLE_OPTIONS | `contact.campaign__qualified_lead` |

**Source Creative matters most.** Its options name every ad in the batch
individually — "Meta B — 62 Clinics (evidential)" against "Meta A — Tuesday
Test (personal)". That is what turns the register experiment from a feeling
into a reportable result.

**Qualified Lead** carries four *reasons* for a no rather than a bare No. At
sixteen leads a month, "not qualified — wrong market" four times running is a
targeting instruction; four plain Nos tell you nothing.

Pointing `/leak-test` at these field keys is what wires the ads to the CRM.

## 2. The Meta campaign — built, in DRAFT

The Business Manager connection landed, so the paid layer exists now.

**Integration** — page `Kyntlo` (`1146717545186948`) bound to ad account
**`Kyntlo Ads` (`act_1120037820712549`)**, inside Business Manager
`2013911839202719`, status `connected`.

The first build used `Kyntlo Socials` (`act_3334301210113583`). That account is
denominated in EGP, which matched the plan without conversion — but it has no
`business` owner at all, meaning it is a personal ad account. BM ownership
decides domain verification, pixel sharing, asset permissions, and whether the
ad account survives a restriction on someone's personal profile. That is worth
more than the currency convenience, so the campaign moved and the duplicate
draft was deleted.

`Kyntlo Ads` bills in **USD**, and an ad account's currency cannot be changed
after creation. Budgets below are converted at 48 EGP/USD.

| Object | ID | Settings |
| --- | --- | --- |
| **Campaign** `META_Leads_Clinics_Dubai_2026Q4` | `6acbcc2592ced54fa4bbb9c1` | Objective `OUTCOME_LEADS` · ad-set budgets, not CBO · `DRAFT` |
| **Ad set** `AS1_Cold_Prospecting_Dubai_Clinics` | `6acbcc2c92ced54fa4bbba67` | **$12.30/day** (590 EGP) · Dubai region (geo key `10`) · age 28–60 · all genders · **no interest targeting** · automatic placements · website conversions |
| **Ad** `AD_B_62_Clinics_Evidential` | `6acbcc4192ced54fa4bbbf6e` | Headline *35 of 62 clinics. Same broken button.* · Learn more → `/leak-test` |
| **Ad** `AD_A_Hand_Count_Personal` | `6acbcc49da9dce0c2dde1b86` | Headline *I checked 62 Dubai clinics by hand* · Learn more → `/leak-test` |

Four decisions worth knowing about:

- **Ad-set budgets, not campaign budget optimisation.** CBO is right at scale
  because it moves money to whatever works. At 655 EGP a day it would starve
  two ad sets to feed one. Hold budgets by hand until past 1,500 EGP/day.
- **Both ads sit in the same ad set.** That is what makes the register test
  fair — personal voice against evidential voice, same audience, same budget,
  same moment. Splitting them across ad sets would compare ad sets, not ads.
- **Multi-advertiser ads turned off** on both. Meta defaults this on; it
  places your creative in a shared browsing unit beside other advertisers,
  which quietly contradicts the "I did this by hand" register the whole
  concept rests on.
- **Dubai region, not UAE.** Geo key `10` is the emirate. Spreading this
  budget across seven emirates means never reaching anyone often enough to be
  remembered; concentration is the only advantage a small budget has.

### Why ad sets 2 and 3 are not built

They have nothing to point at. `fb-get-custom-audiences` returns empty.

- **Retargeting** needs roughly 1,000 people in the pixel pool. No pixel
  exists, so the pool cannot start filling. Build this on day 15 as planned —
  it is not a missing step, it is a step that is not due yet.
- **ABM warm-up** needs the 47 interior and 62 clinic records uploaded as a
  custom audience, and it needs a **Reach** objective. The campaign objective
  enum available here is `OUTCOME_LEADS` / `TRAFFIC` / `ENGAGEMENT` / `SALES`
  — there is no awareness objective, so a Reach ad set cannot live in this
  campaign *or* be created through this API. Build it as its own campaign in
  Ads Manager, or accept `OUTCOME_ENGAGEMENT` as a proxy and judge it the same
  way: by outbound reply rate, never by its own cost per lead.

### It is not in Ads Manager yet

`DRAFT` here means staged inside Kyntlo, not pushed to Meta. Nothing appears
in Ads Manager until `fb-publish-campaign` runs, and that call publishes
straight to Meta with no paused option — so it is deliberately not run while
the ads still have no creative attached. Publishing empty ads gets them
rejected, and a rejection is a mark on a new ad account.

## 2a. The brand film

`kyntlo-brand-film.mp4` — 58s, 1080×1920, H.264 + AAC, poster frame beside it.

Eight scenes cut to the narration rather than to a guessed grid, so picture
and read cannot drift. Narration is neural TTS; the music is **composed here,
not licensed** (`music.py` — A minor, 76 BPM, i-VI-III-VII), because a
generated bed carries no attribution requirement and cannot draw a Content ID
claim on a paid ad the way a stock track can. The bed is ducked under the
voice by a real sidechain compressor, and its arrangement follows the script:
sparse under the hook, fullest under the offer, resolving on the brand card.

Every figure in it — 62, 35, 18, 8 — is from the measured audit. The `8` scene
is deliberately drained of brand colour; it is the one number that is supposed
to feel thin.

Use it for the `/leak-test` hero, LinkedIn, and as a Meta video ad once the
pixel is live. Ask if you want a 16:9 cut for the site or a 30s version for
cold feed — both are a re-run of `assemble-film.py`, not a rebuild.

The rendered mp4 and its poster are gitignored: the push path available from
the build environment is text-only, so the 23 MB file cannot be committed
from there. Re-render with `film-scenes.js` then `assemble-film.py`.

## 3. Eleven posts, drafted with final copy

Every piece of approved copy is now in Social Planner. All **drafts** —
nothing scheduled, nothing can publish on its own.

| # | Post ID | Channel | Creative | Media file |
| --- | --- | --- | --- | --- |
| 1 | `6acbc05271e999f8a88450e7` | Google Business | Free Lead Response Report · *What's new* | `gbp-a-free-report.png` |
| 2 | `6acbc05c75ef305eccc7260b` | Google Business | The 14-Day Leak Test · *Offer, 13 Oct – 7 Dec* | `gbp-b-leak-test.png` |
| 3 | `6acbc067397e591f4837fc6e` | Facebook + Instagram | **Meta A** — The Hand Count | `meta-a-the-hand-count.png` |
| 4 | `6acbc06d6fb1669fc7c891b6` | Facebook + Instagram | **Meta B** — 62 Clinics | `meta-b-62-clinics.png` |
| 5 | `6acbc0739e8a388fd982c82a` | Facebook + Instagram | Clinic Audit carousel — *retargeting only* | `carousel-01…06.png`, in order |
| 6 | `6acbc07f397e591f48381414` | LinkedIn | The AED Number | `linkedin-a-aed-number.png` |
| 7 | `6acbc0845125a0c009517876` | LinkedIn | Document carousel (`postAsPdf`) | `carousel-01…06.png`, in order |
| 8 | `6acbc093397e591f483822c5` | TikTok | **TikTok A** — Scrolling the Spreadsheet | `tiktok-a-spreadsheet.mp4` |
| 9 | `6acbc09840d679cf81925647` | TikTok | **TikTok B** — The 11pm Lead | `tiktok-b-11pm-lead.mp4` |
| 10 | `6acbc0a711eba7424c17c2ec` | YouTube | Short A · *unlisted* | `youtube-a-spreadsheet.mp4` |
| 11 | `6acbc0ae9e8a388fd98301c7` | YouTube | Short B · *unlisted* | `youtube-b-11pm-lead.mp4` |

- **YouTube Shorts are `unlisted`** — they are ad creative, not channel
  content. Unlisted videos run fine as in-feed ads and keep two near-identical
  30-second clips off the public channel.
- **Demo accounts deliberately excluded** — `Kyntlo.Demo` and `kyntlo.demo`
  are connected and were skipped.
- **Posts 5 and 7 share the same six frames** — a swipe carousel on Meta, a
  PDF document on LinkedIn. One build, two placements.

## 4. No new pipeline needed

The plan asked for a "Paid Social — Leak Test" pipeline. **Marketing
Pipeline** already exists with the right stages:

> New Lead → Contacted → Qualified → Proposal Sent → Negotiation → Closed

Use it. A parallel pipeline would split reporting for no gain. One item off
the pre-flight checklist in `CAMPAIGN.md`.

---

## 5. What still blocks a launch

In the order that matters.

| # | Blocker | What it stops | How it clears |
| --- | --- | --- | --- |
| 1 | **No payment method** — `fundingType: NONE` on *both* ad accounts | Everything. A published campaign with no funding source does not deliver. Creating the ad account did not create billing; it is a separate step | Ads Manager → Billing → Payment settings |
| 2 | **No Meta pixel** — `fb-get-pixels` returns 0 | The whole optimisation plan. The ad set says website conversions, but with no pixel Meta falls back to clicks — the metric least connected to money. Also blocks the retargeting pool from ever starting | Install the pixel, then set `pixelId` + `customEventType` on the ad set. Start on landing-page views, switch to `LEAD` around day 21 |
| 3 | **`/leak-test` does not exist** | Both ads point at it | Build it: one field (website URL + email), wired to the seven fields in §1 |
| 4 | **Ads have no media** | Nothing to look at. Media upload is multipart and not exposed through the connector, and this environment blocks the API host and the asset CDN | Drag the 19 files into Marketing → Media Library; then media attaches to posts and ads by URL |
| 5 | **YouTube token expired** 2026-10-11 16:17 UTC | Posts 10 and 11 | Reconnect in Settings → Integrations |
| 6 | **Snapchat never connected** | The two Snapchat assets | Nothing to do now — Snapchat is on the 35,000 EGP rung of the ladder, not this one |

Two things that look like blockers and are not:

- **Page Lead Ads ToS unaccepted** (`tosAccepted: false`). That gates Instant
  Forms. This campaign deliberately uses website conversions instead, so it
  does not apply — accept it only if you later add an Instant Form ad set.
- **Retargeting and ABM ad sets missing.** Covered in §2: one is not due until
  day 15, the other needs an audience upload and a different objective.

### The Google Business Profile is a Cairo address

`regionCode: EG`, Cairo Governorate, while the campaign targets Dubai.

This does not break posts 1 and 2 — their copy is market-neutral, and a
profile post's job is catching someone who already searched your name after
seeing an ad. But the profile will not surface in Dubai local search, so count
it as confirmation, not discovery. A UAE presence is a second Business
Profile, not an edit to this one.

---

## 6. Going live, in order

1. Add the payment method (blocker 1)
2. Install the pixel, confirm it fires on a **real** form submission, not just
   in the debugger — a pixel that works in preview and not in production is
   the most common silent failure here
3. Build `/leak-test`
4. Upload the media; attach to ad `6acbcc4192ced54fa4bbbf6e` first — ad B is
   the one that ships with no unverified numbers in it
5. Set `pixelId` and `customEventType` on ad set `6acbcc2c92ced54fa4bbba67`
6. Publish the campaign (`fb-publish-campaign`) — the explicit go-live step
7. Then, and only then, `CAMPAIGN.md` runs as written: change nothing until
   day 7

---

## 7. Out of reach from here

The connector binds to one sub-account at a time. Authorising
`SXEax5cL2rAbWWyQLo4s` replaced access to `MFibqLvHTg5CIlQqNt6w` rather than
adding to it; `MFibq…` now returns `LOCATION_NOT_AUTHORIZED`.

Three leak-test fields were created there in an earlier session. They are
harmless duplicates of the fuller set in §1. This account holds the social
accounts, the media library, the pipelines, the ad integration and now the
campaign, so it is the right home; nothing needs moving.

---

## 8. Creative since this was written (2026-10-21)

The four video ads listed above still point at the **v2** media and carry v2
names. They have been superseded: see `V3-BUILD.md` and `v3-copy.md` for five
new creatives in five formats, built after the v2 phone-mockup device was
identified as the weakest format in the Meta taxonomy.

| File | Ad | Length | Role |
|---|---|---|---|
| `kyntlo-v3-vsl.mp4` | VSL (S-tier) | 38.1s | cold |
| `kyntlo-v3-audit.mp4` | Amateur investigation (A) | 41.8s | cold |
| `kyntlo-v3-stack.mp4` | David & Goliath (A) | 30.4s | cold |
| `kyntlo-v3-objections.mp4` | Objection handling (B) | 25.7s | retargeting |
| `kyntlo-v3-timeline.mp4` | Educational infographic (B) | 35.1s | retargeting |

Repointing the live ads still waits on the same blocker as everything else in
§6: media has to be uploaded to the Media Library from the account before an
ad can reference it. Nothing in the campaign has been published, so no live
delivery is affected by the swap.

---

*Built against sub-account `SXEax5cL2rAbWWyQLo4s`, 2026-10-11. Every ID here
is live — they are the handles for attaching media, setting the pixel, and
publishing.*
