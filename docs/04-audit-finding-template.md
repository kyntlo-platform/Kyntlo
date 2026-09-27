# Kyntlo Audit Finding Template

Status: Draft for owner review
Created: 2026-09-27
Source: `docs/02-content-and-claims-audit.md`, `docs/03-kyntlo-ghl-white-label-brd.md`,
and the "Findings, all fixed" pattern in `CHANGELOG-REDESIGN.md`

## 1. Purpose

This is the one format for logging findings from any internal Kyntlo audit:

- Site QA (pages, links, accessibility, responsive, performance, checkout).
- Content and claims audit (as in `docs/02`).
- Snapshot QA (see `docs/05-core-snapshot-template-spec.md`).
- Onboarding and provisioning audit (BRD sections 16 and 33.2).
- Security and data review (BRD sections 26.2 and 28.4).

Use it whenever a problem is found that someone other than the finder must
fix, verify, or accept. A one-line typo fixed on the spot by the finder does
not need a record; anything that touches claims, billing, consent, customer
data, or the brand rules always does.

Rules:

- One finding per record. Split compound problems.
- Evidence is required. A finding without a URL, file path, screenshot, or
  reproduction steps is returned to the finder.
- The person who fixes a finding does not verify it.
- Findings are never deleted. Closed findings stay in the log.

## 2. Severity Scale

| Severity | Meaning | Kyntlo examples | Release rule |
| --- | --- | --- | --- |
| `S1 Blocker` | Loses money, breaks a legal/brand rule, exposes data, or stops a core journey. | Checkout pay button unreachable or wrong plan ID charged; lead form or booking not reaching the CRM; a `LEGAL` or `EVIDENCE` claim published (for example "Full GDPR compliance", unapproved cashback); the underlying vendor (HighLevel, LeadConnector) named in customer-facing pages, emails, SMS, or the app outside an approved legal disclosure; real customer data in a snapshot, demo, or screenshot (DAT-008, SNP-007); an automated message sent without consent or without an opt-out; price on pricing page differs from checkout. | Must be fixed and verified before release. No sign-off with an open S1. |
| `S2 Major` | Core page or flow visibly wrong, or a requirement failed, but no money, legal, or data loss and a workaround exists. | WCAG 2.2 AA contrast failure on primary content; layout clipped or stretched on every page; horizontal scroll at a supported width; a `VERIFY` claim live on a page; a required workflow (for example appointment reminders, CAL-005) missing or not tested; broken internal link in navigation. | Fix before release unless the product owner accepts it in writing with a target date. |
| `S3 Minor` | Limited impact on one page, element, or edge case. | Heading-order skip; wrong ARIA pattern on a secondary control; missing canonical tag; a custom value left with a sample value in a non-customer-facing asset; inconsistent tag naming in a snapshot. | Fix in the next scheduled round. |
| `S4 Polish` | Cosmetic or tone issue with no functional or trust impact. | Animation timing, spacing, icon alignment, copy that is correct but wordy. | Backlog. May be closed as `Won't fix`. |

Tie-breakers:

- When in doubt between two levels, choose the higher one and let triage
  lower it.
- A legally required disclosure that names a provider (for example a cookie
  or subprocessor list) is not a brand-rule breach. Log it with claim state
  `LEGAL` instead.

### Claim state (optional, content findings only)

Reuse the states from `docs/02`, section 1:

| State | Use when the finding is about copy that... |
| --- | --- |
| `KEEP` | Is fine as a working draft (logged only to record the decision). |
| `VERIFY` | Needs product or business confirmation. |
| `EVIDENCE` | Needs defensible evidence before it can stay. |
| `LEGAL` | Needs legal review. |
| `REWRITE` | Is misleading, vague, contradictory, or unsupported as written. |
| `REMOVE` | Is placeholder or broken content that must not ship. |

A live claim in state `LEGAL` or `EVIDENCE` without approval is `S1`. A live
claim in state `VERIFY` or `REWRITE` is at least `S2`.

## 3. Status Lifecycle

```text
Open -> In progress -> Fixed -> Verified
  |          |           |
  |          |           +-> Open        (verification failed; reopen)
  +----------+-> Won't fix | Duplicate  (closed without a fix)
```

| Status | Meaning | Who may set it |
| --- | --- | --- |
| `Open` | Logged with evidence, not yet picked up. Also used to reopen. | Anyone (finder); verifier when reopening. |
| `In progress` | An owner is working on it. | The assigned owner. |
| `Fixed` | Change made; fix location recorded (commit, file, asset version). | The assigned owner. |
| `Verified` | Re-tested in the same environment and passed. Closed. | The audit lead or another reviewer, never the person who fixed it. |
| `Won't fix` | Accepted as is, with a written reason. | Product owner. Not allowed for `S1`. Not allowed for `LEGAL` or `EVIDENCE` claims unless the claim is removed. |
| `Duplicate` | Same problem as another record; link the original ID. | Audit lead. |

## 4. Finding ID Format

`AUD-<AREA>-<nnn>`, numbered per area, never reused.

| Area code | Covers |
| --- | --- |
| `SITE` | Marketing website pages, layout, links, accessibility, performance, SEO |
| `CHK` | Pricing, trial, and checkout flow |
| `CONT` | Content and claims (use the claim state field) |
| `SNAP` | Snapshot assets and snapshot QA |
| `ONB` | Provisioning, onboarding, activation |
| `SEC` | Security, privacy, data handling |
| `BRAND` | Brand rules, including naming the underlying vendor |

Example: `AUD-SITE-014`, `AUD-SNAP-003`.

## 5. Single-Finding Block

Copy, fill, and keep field names unchanged so records can be searched.

```text
ID:                AUD-<AREA>-<nnn>
Title:             <what is wrong, in one line>
Area / page:       <route, file, or asset ID>
Severity:          S1 Blocker | S2 Major | S3 Minor | S4 Polish
Claim state:       KEEP | VERIFY | EVIDENCE | LEGAL | REWRITE | REMOVE | n/a
Found by / date:   <name or audit round> / <YYYY-MM-DD>
Evidence:
  URL:             <full URL or file path + line>
  Screenshot:      <path, e.g. audits/<audit-id>/AUD-SITE-014.png>
  Viewport:        <width x height, device>
  Browser / env:   <browser + version, preview or production, sub-account>
Steps to reproduce:
  1.
  2.
  3.
Expected:          <what should happen, per requirement or design>
Actual:            <what happens, with measured values where possible>
Requirement ref:   <BRD ID, docs/01 or docs/02 section, WCAG criterion>
Proposed fix:      <smallest change that resolves it>
Owner:             <name>
Status:            Open | In progress | Fixed | Verified | Won't fix | Duplicate
Fix reference:     <commit, file, snapshot version>
Verified by / date: <name> / <YYYY-MM-DD>
Notes:             <related IDs, Won't fix reason, Duplicate-of ID>
```

## 6. Audit Summary Table and Report Skeleton

### 6.1 Findings table header

```markdown
| ID | Title | Area / page | Severity | Claim state | Owner | Status | Requirement |
| --- | --- | --- | --- | --- | --- | --- | --- |
```

### 6.2 Audit report skeleton

```markdown
# Audit <audit-id>: <short name>

Status: Draft | Final
Created: <YYYY-MM-DD>
Audit lead: <name>
Source: <build, commit, snapshot version, or document under review>

## 1. Scope

- In scope: <pages, routes, assets, sub-accounts, documents>
- Out of scope: <explicit exclusions>

## 2. Method

- <checks performed: manual review, headless crawl, contrast measurement,
  test purchases, test contacts, claim-by-claim review>
- Standard used: <BRD sections, WCAG 2.2 AA, docs/02 claim states>

## 3. Environment

| Item | Value |
| --- | --- |
| Build / commit / snapshot | |
| URL or sub-account | |
| Browsers | |
| Viewports | |
| Test data | <test contacts and numbers only; no real customer data> |

## 4. Summary

| Severity | Open | In progress | Fixed | Verified | Won't fix | Duplicate | Total |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| S1 Blocker | | | | | | | |
| S2 Major | | | | | | | |
| S3 Minor | | | | | | | |
| S4 Polish | | | | | | | |

Release recommendation: <Go | Go with accepted S2 list | No go>

## 5. Findings

<findings table from 6.1, then one finding block per S1 and S2>

## 6. Sign-off

| Role | Name | Date | Decision |
| --- | --- | --- | --- |
| Audit lead | | | |
| Product owner | | | |
| Legal (if any `LEGAL` finding) | | | |
```

## 7. Worked Example

Taken from Round 10 of `CHANGELOG-REDESIGN.md` ("The footer was slicing the
top off its own CTA band"). The changelog does not record names or dates, so
those fields say so rather than guessing.

```text
ID:                AUD-SITE-001
Title:             Footer clips the top 45px of its own CTA band on every page
Area / page:       Site-wide footer (.site-footer, .site-footer__cta); all 22 pages
Severity:          S2 Major
Claim state:       n/a
Found by / date:   Reviewer feedback on the published preview, Round 10 / date not recorded
Evidence:
  URL:             Any page, footer CTA band
  Screenshot:      Not recorded in the changelog
  Viewport:        All widths
  Browser / env:   Published preview
Steps to reproduce:
  1. Open any page on the preview.
  2. Scroll to the footer CTA band ("Ready to run growth on one system?").
  3. Inspect the band's top edge.
Expected:          The CTA band overhangs the footer's top edge and renders whole,
                   including its top border and heading.
Actual:            .site-footer has overflow: hidden while .site-footer__cta has
                   margin-top: -46px, so 45px of the band (top border and part of
                   the heading) is clipped on every page.
Requirement ref:   BRD 33.1 (no broken layout; responsive checks pass)
Proposed fix:      Remove overflow: hidden from .site-footer. It only existed to
                   contain .site-footer__glow (260px above the footer), so make
                   the glow clip itself with clip-path: inset(260px 0 0 0).
Owner:             Website implementer
Status:            Verified
Fix reference:     Round 10 changes to .site-footer and .site-footer__glow
Verified by / date: Round 10 re-verification / date not recorded
Notes:             Removing the clip exposed a second problem, logged separately
                   as AUD-SITE-002: the 130vw glow caused 115px of horizontal
                   overflow at 768px. Fixed with width min(1100px, 100%);
                   re-verified with no horizontal overflow at 360, 768 and 1280
                   on all 22 pages.
```

Summary row for the same finding:

```markdown
| ID | Title | Area / page | Severity | Claim state | Owner | Status | Requirement |
| --- | --- | --- | --- | --- | --- | --- | --- |
| AUD-SITE-001 | Footer clips top 45px of CTA band | Site-wide footer | S2 Major | n/a | Website implementer | Verified | BRD 33.1 |
| AUD-SITE-002 | Footer glow causes 115px horizontal overflow at 768px | Site-wide footer | S2 Major | n/a | Website implementer | Verified | BRD 33.1 |
```
