# Kyntlo Website Product Decisions

Status: Draft for owner review
Created: 2026-06-14
Scope: Website requirements and source-of-truth decisions before implementation

Business model clarification:

- Kyntlo is intended to be a white-label SaaS offering built on HighLevel.
- The detailed business and implementation requirements are maintained in
  `docs/03-kyntlo-ghl-white-label-brd.md`.
- Product claims must distinguish native HighLevel capabilities, Kyntlo
  configuration, Kyntlo managed services, usage-based services, resold
  add-ons, and Kyntlo-owned extensions.

## 1. Purpose

This document is the decision register for the Kyntlo marketing website.
No factual, commercial, legal, or integration claim should be treated as
approved merely because it appears in an existing HTML file.

Decision states:

- `CONFIRMED`: Safe to use as the current implementation baseline.
- `PROPOSED`: Recommended direction, awaiting owner approval.
- `REQUIRED`: Missing information that blocks final production content.
- `LEGAL REVIEW`: Requires qualified legal review before publication.
- `EVIDENCE REQUIRED`: Requires internal evidence or a defensible source.

## 2. Current Product Definition

| Topic | Current repository statement | Status | Required decision |
| --- | --- | --- | --- |
| Product name | Kyntlo | CONFIRMED | Confirm exact capitalization remains `Kyntlo`. |
| Product type | Kyntlo-branded SaaS offering built on HighLevel, packaging CRM, marketing, automation, funnels, booking, communication, AI, and optional services | CONFIRMED | Confirm which HighLevel features are enabled in each Kyntlo plan and which services Kyntlo configures or manages. |
| Primary positioning | "Kinetic Agency Growth Engine" | PROPOSED | Approve as the primary category/tagline or replace it. |
| Primary audience | Agencies and growing businesses | PROPOSED | Choose the primary buyer segment and secondary segments. |
| Primary website goal | Generate demo/onboarding calls | PROPOSED | Confirm whether the main conversion is demo booking, trial signup, purchase, or WhatsApp contact. |
| Main language | English | PROPOSED | Confirm whether Arabic is required at launch and whether the site needs RTL support. |
| Pricing currency | EUR | PROPOSED | Confirm currency, tax treatment, billing region, and whether localized currencies are planned. |

## 3. Brand Decisions

| Decision | Status | Notes |
| --- | --- | --- |
| Primary pink: `#f20089` | CONFIRMED | Used consistently across current pages. |
| Primary purple: `#6d00c1` | CONFIRMED | Used consistently across current pages. |
| Primary typeface: Inter | PROPOSED | Currently loaded from Google Fonts. Decide whether to self-host. |
| Existing square logo is the approved master logo | REQUIRED | The only root logo is a 6250x6250 PNG. Confirm approved variants and clear-space rules. |
| Brand tone is premium, energetic, intelligent, and operational | PROPOSED | Current copy mixes premium language with aggressive promotional language. |
| Custom cursor is part of the brand identity | PROPOSED | Recommendation: remove it or restrict it to fine-pointer desktop devices. |

Required brand assets:

- Approved full-color logo.
- Approved light/dark logo variants.
- SVG or other vector master.
- Favicon/icon mark.
- Social sharing image.
- Product screenshots or approved dashboard mockups.
- Approved integration logos and permission to display them.

## 4. Company and People

The repository contains conflicting or incomplete identity statements.

| Statement | Source | Status |
| --- | --- | --- |
| Founder: Boush Adel | About page | REQUIRED |
| Current operator: Boush Adel | Legal-page footer | REQUIRED |
| Transitioning to Kyntlo UK LTD | Legal pages | REQUIRED |
| Demo/onboarding calls are with Rustam and the core team | Home page | REQUIRED |
| Kyntlo Systems owns the copyright | All footers | REQUIRED |
| Kyntlo began inside an agency called Master Artists in 2023 | About page | EVIDENCE REQUIRED |

Owner must provide:

- Exact legal entity name.
- Company registration number, if applicable.
- Registered and operational address.
- Country of establishment.
- Legal contact email.
- Privacy/data-protection contact email.
- Billing/support email.
- Public support phone or WhatsApp number.
- Correct founder and leadership names/titles.
- Whether Rustam should be named publicly.
- Relationship between Kyntlo, Boush Adel, Kyntlo Systems, Kyntlo UK LTD,
  and Master Artists.

Until confirmed, the implementation must avoid presenting an unregistered or
future entity as the current contracting party.

## 5. Audience and Conversion

Recommended initial audience definition:

> Service businesses and agencies that need CRM, lead capture, follow-up,
> booking, and marketing automation in one operational platform.

This is a proposal, not an inferred fact.

Required decisions:

- Primary buyer: agency owner, local business owner, sales leader, or operator.
- Primary market/countries.
- Typical company size.
- Minimum viable use case.
- Main customer pain.
- Main measurable outcome.
- Primary CTA.
- Secondary CTA.
- Qualification criteria for a demo.
- Whether self-service signup exists.

## 6. Information Architecture

Recommended launch routes:

| Route | Purpose | Status |
| --- | --- | --- |
| `/` | Product overview and primary conversion | PROPOSED |
| `/features` | Platform capability overview | PROPOSED |
| `/features/funnels` | Funnel and website builder detail | PROPOSED |
| `/pricing` | Plans, usage charges, and billing notes | PROPOSED |
| `/compare` | Fair comparison against alternative approaches | PROPOSED |
| `/about` | Company story and team | PROPOSED |
| `/contact` | Support/sales contact and lead form | REQUIRED |
| `/book-demo` | Working booking experience | REQUIRED |
| `/privacy` | Privacy notice | REQUIRED |
| `/terms` | Terms of service | REQUIRED |
| `/refund` | Refund and cancellation policy | REQUIRED |
| `/cookies` | Cookie policy, if non-essential tracking is used | LEGAL REVIEW |

Decision needed: separate `/features` page versus keeping the overview only on
the home page.

## 7. Functional Requirements

### Launch-critical

- Every navigation item resolves to an existing page or section.
- Every image and font request resolves successfully.
- Mobile navigation remains usable at all supported widths.
- The primary CTA opens a real conversion flow.
- Demo/contact submissions reach an approved destination.
- Forms validate on both client and server.
- Forms include success, validation, duplicate, and failure states.
- Spam controls do not block normal users.
- Consent text links to the published privacy notice.
- Legal pages identify the correct contracting entity.
- Prices and usage charges come from one maintainable source.
- Analytics only load according to the approved consent model.

### Not currently implemented

- Booking integration.
- Contact or lead form.
- CRM submission.
- Email delivery.
- Authentication.
- Checkout or subscription purchase.
- Customer dashboard.
- Backend/API.
- Analytics.
- Cookie consent.
- Error monitoring.

## 8. Technical Direction

Recommended architecture:

- Next.js App Router.
- TypeScript.
- Reusable server-rendered marketing components.
- Central content/data files for plans, integrations, navigation, and legal
  metadata.
- Minimal client JavaScript limited to genuinely interactive components.
- Static generation for marketing and legal pages where possible.
- Server-side form endpoint or a reviewed form provider.

Decision status: PROPOSED.

Before scaffolding, confirm:

- Hosting target.
- Domain and DNS ownership.
- Preferred form/CRM destination.
- Booking provider.
- Analytics provider.
- Consent requirements.
- Whether a CMS is needed.
- Who will maintain prices and copy.

## 9. Accessibility Baseline

These requirements are implementation requirements, not optional polish:

- Semantic landmarks including one `main` element per page.
- Complete keyboard operation.
- Visible focus states.
- A functional mobile menu.
- No forced custom cursor on touch, coarse-pointer, or reduced-motion contexts.
- Reduced-motion alternatives.
- Accurate button and accordion ARIA state.
- Accessible comparison table markup.
- Meaningful image alternatives.
- Sufficient color contrast.
- No essential information conveyed by color or animation alone.

Target: WCAG 2.2 AA where reasonably applicable.

## 10. Performance Baseline

Proposed production targets:

- No missing local assets.
- Responsive image sizes and modern formats.
- No 6250x6250 logo delivery to normal page visitors.
- Lazy-load below-the-fold non-critical images.
- Reserve image dimensions to prevent layout shift.
- Pause decorative animation outside the viewport.
- Avoid continuous animation for reduced-motion users.
- Minimize third-party scripts.
- Target good Core Web Vitals at the 75th percentile.

## 11. SEO Baseline

Every indexable page requires:

- Unique title.
- Unique meta description.
- Canonical URL.
- Open Graph metadata.
- Social sharing image.
- Correct heading hierarchy.
- Crawlable internal navigation.

The site also requires:

- `robots.txt`.
- XML sitemap.
- Favicon and web app icons.
- Organization schema after legal identity is confirmed.
- Product/software schema only where claims and pricing are accurate.

## 12. Owner Approval Checklist

The following answers are required before final copy and production integrations:

- [ ] Exact legal business identity.
- [ ] Founder/team names and public titles.
- [ ] Primary audience and launch countries.
- [ ] English-only or multilingual launch.
- [ ] Primary conversion action.
- [ ] Booking provider and account/link.
- [ ] CRM/form destination.
- [ ] Public support channels.
- [ ] Official social URLs.
- [ ] Final plan names and prices.
- [ ] Tax/VAT treatment.
- [ ] Cashback definition, eligibility, and legal terms.
- [ ] Approved usage rates and their change policy.
- [ ] Features currently available in each plan.
- [ ] Features that are beta or roadmap only.
- [ ] Approved customer counts, savings, and performance claims.
- [ ] Approved integrations and logo permissions.
- [ ] Domain and hosting target.
- [ ] Analytics and consent preference.
- [ ] Legal review owner.

## 13. Exit Criteria for Phase 1

Phase 1 is complete only when:

- Required owner decisions are answered or explicitly deferred.
- No unresolved identity conflict is used as production copy.
- Commercial claims have an owner and evidence status.
- Pricing has one approved source of truth.
- Primary CTA and lead destination are confirmed.
- The launch page map is approved.
- The technical direction is approved.
