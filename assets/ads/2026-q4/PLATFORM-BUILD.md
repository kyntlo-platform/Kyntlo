# What is now built inside Kyntlo

Built on 2026-10-11 in sub-account `SXEax5cL2rAbWWyQLo4s` (hub.kyntlo.ai).
This is the record of what exists in the platform, what is still blocked, and
the one manual step that unblocks the rest.

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

**Source Creative is the one that matters most.** Its options name every ad in
the batch individually — "Meta B — 62 Clinics (evidential)" against "Meta A —
Tuesday Test (personal)" and so on. That is what turns the register
experiment from a feeling into a reportable result.

**Qualified Lead** has four distinct *reasons* for disqualification rather
than a plain No. At sixteen leads a month, "not qualified — wrong market" four
times running is a targeting instruction; four plain Nos tell you nothing.

Pointing `/leak-test` at these field keys is what wires the ads to the CRM.

## 2. Eleven posts, drafted with final copy

Every piece of approved copy is now in Social Planner. All are **drafts** —
nothing is scheduled and nothing can publish on its own. Media attaches after
step 4 below.

| # | Post ID | Channel | Creative | Media file to attach |
| --- | --- | --- | --- | --- |
| 1 | `6acbc05271e999f8a88450e7` | Google Business | Free Lead Response Report · *What's new* | `gbp-a-free-report.png` |
| 2 | `6acbc05c75ef305eccc7260b` | Google Business | The 14-Day Leak Test · *Offer, 13 Oct – 7 Dec* | `gbp-b-leak-test.png` |
| 3 | `6acbc067397e591f4837fc6e` | Facebook + Instagram | **Meta A** — The Hand Count (personal register) | `meta-a-the-hand-count.png` |
| 4 | `6acbc06d6fb1669fc7c891b6` | Facebook + Instagram | **Meta B** — 62 Clinics (evidential register) | `meta-b-62-clinics.png` |
| 5 | `6acbc0739e8a388fd982c82a` | Facebook + Instagram | Clinic Audit carousel — *retargeting only* | `carousel-01…06.png`, in order |
| 6 | `6acbc07f397e591f48381414` | LinkedIn | The AED Number | `linkedin-a-aed-number.png` |
| 7 | `6acbc0845125a0c009517876` | LinkedIn | Document carousel (`postAsPdf`) | `carousel-01…06.png`, in order |
| 8 | `6acbc093397e591f483822c5` | TikTok | **TikTok A** — Scrolling the Spreadsheet | `tiktok-a-spreadsheet.mp4` |
| 9 | `6acbc09840d679cf81925647` | TikTok | **TikTok B** — The 11pm Lead | `tiktok-b-11pm-lead.mp4` |
| 10 | `6acbc0a711eba7424c17c2ec` | YouTube | Short A · *unlisted* | `youtube-a-spreadsheet.mp4` |
| 11 | `6acbc0ae9e8a388fd98301c7` | YouTube | Short B · *unlisted* | `youtube-b-11pm-lead.mp4` |

Three decisions worth knowing about:

- **The YouTube Shorts are set to `unlisted`.** They are ad creative, not
  channel content. Unlisted videos run perfectly well as in-feed ads and keep
  two near-identical 30-second clips off the public channel.
- **The demo accounts were deliberately excluded.** `Kyntlo.Demo` (Facebook)
  and `kyntlo.demo` (Instagram) are connected and were skipped.
- **Posts 5 and 7 share the same six frames.** On Meta it is a swipe carousel,
  on LinkedIn a PDF document — LinkedIn's highest-dwell format. One build,
  two placements.

## 3. No new pipeline needed

The campaign plan asked for a "Paid Social — Leak Test" pipeline. **Marketing
Pipeline** already exists here with exactly the right stages:

> New Lead → Contacted → Qualified → Proposal Sent → Negotiation → Closed

Use it. Building a parallel pipeline would split reporting for no gain. This
removes an item from the pre-flight checklist in `CAMPAIGN.md`.

---

## 4. The one manual step — upload the media

The media upload endpoint is multipart and is not exposed through the
connector, and the environment blocks outbound access to both
`services.leadconnectorhq.com` and the asset CDN. So this one step cannot be
automated from here.

**Marketing → Media Library → Upload**, then drag in the 19 files from
`by-platform/`. Two minutes.

Once they are there, every post above can have its media attached by ID and be
flipped from draft to scheduled — no re-typing, because the copy is already in
place.

---

## 5. What is still blocked, and by what

| Blocker | Effect | Who clears it |
| --- | --- | --- |
| **No Meta Business Manager** | The entire paid layer. Confirmed absent in *both* sub-accounts — `fb-get-integration` returns `connect_your_bm` | You. Longest lead item of the launch; start it first |
| **YouTube token expired** | Posts 10 and 11 cannot publish. The connection expired 2026-10-11 at 16:17 UTC | You — reconnect in Settings → Integrations |
| **Snapchat not connected** | `snap-a-closed-inbox.png` and `snap-b-arabic-receipt.png` have nowhere to go. No loss at this budget — Snapchat is on the 35,000 EGP rung of the ladder, not this one | You, later |
| **`/leak-test` does not exist** | Every ad points at it | You. One field: website URL + email, wired to the seven fields above |
| **Pixels + GA4 not installed** | The campaign would optimise on clicks, the metric least connected to money | You |

### One thing worth checking before you post

**The Google Business Profile is a Cairo address**, not Dubai —
`regionCode: EG`, Cairo Governorate. The campaign targets Dubai clinics.

This does not break posts 1 and 2: their copy is market-neutral, and the job of
a profile post is to catch someone who already searched your name after seeing
an ad. But it does mean the profile will not surface in Dubai local search, so
do not count on it for discovery — only for confirmation. If a UAE presence is
wanted, that is a second Business Profile, not an edit to this one.

---

## 6. What is still out of reach from here

The connector is bound to one sub-account at a time. Authorising
`SXEax5cL2rAbWWyQLo4s` replaced access to `MFibqLvHTg5CIlQqNt6w` rather than
adding to it — `MFibq…` now returns `LOCATION_NOT_AUTHORIZED`.

Three leak-test fields were created there in an earlier session. They are
harmless duplicates of the fuller set above. Since this account holds the
social accounts, the media library, the pipelines and now the campaign, it is
the right home for the work; nothing needs moving.

---

*Built against sub-account `SXEax5cL2rAbWWyQLo4s`, 2026-10-11. Post and field
IDs are live — they are the handles for attaching media and scheduling.*
