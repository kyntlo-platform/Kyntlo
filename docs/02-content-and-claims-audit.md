# Kyntlo Content and Claims Audit

Status: Draft for owner review
Created: 2026-06-14
Source files: All current HTML files and `Kyntlo final.txt`

## 1. Audit Rule

Existing copy is treated as draft material. It is not automatically considered
true, legally approved, commercially current, or suitable for publication.

Claim states:

- `KEEP`: Low-risk descriptive copy that can remain as a working draft.
- `VERIFY`: Requires product or business confirmation.
- `EVIDENCE`: Requires defensible evidence.
- `LEGAL`: Requires legal review.
- `REWRITE`: Misleading, vague, contradictory, or unsupported as written.
- `REMOVE`: Placeholder or broken content that must not ship.

## 2. Core Messaging Inventory

| Current message | State | Reason/action |
| --- | --- | --- |
| "Kinetic Agency Growth Engine" | VERIFY | Confirm category language and target audience. |
| "Premium AI-optimized engine" | VERIFY | Identify exactly which features use AI and how. |
| "Replaces your fragmented marketing stack" | REWRITE | Specify the tools/capabilities it can realistically replace. |
| "One login. One bill. Zero friction." | REWRITE | Absolute "zero friction" claim is not defensible. |
| "Central hub for modern scale" | KEEP | Brand-level language with low factual risk. |
| "Enterprise-level efficiency" | EVIDENCE | Requires a defined and demonstrated basis. |
| "Predictive algorithms score leads" | VERIFY | Confirm the feature is live and describe inputs/limitations. |
| "AI auto-draft intelligent replies instantly" | VERIFY | Confirm channels, model behavior, and user controls. |
| "Securely locks them into your calendar" | REWRITE | Avoid ambiguous security claims; explain booking behavior. |
| "Complete white-label capabilities" | VERIFY | Define plans, limitations, domains, apps, and branding scope. |

## 3. High-Risk Marketing Claims

| Claim | Location | State | Required evidence or correction |
| --- | --- | --- | --- |
| Kyntlo empowers thousands of businesses | About | EVIDENCE | Active customer/account definition and verified count. |
| Team reclaimed hundreds of hours every month | About | EVIDENCE | Period, team size, methodology, and records. |
| Wiped out thousands of dollars in subscriptions | About | EVIDENCE | Before/after stack and documented cost comparison. |
| Profit margins skyrocketed | About | REWRITE | Quantify accurately or remove. |
| Global platform | About | VERIFY | Define availability, support, and customer regions. |
| Launch sites/funnels in minutes | Funnels | EVIDENCE | Demonstrable median or qualified wording. |
| Automatically optimized for lightning-fast load speeds | Funnels | REWRITE | Absolute performance language requires measured conditions. |
| Hundreds of premium templates | Funnels | VERIFY | Confirm current template count and access by plan. |
| No hidden markup / no markup | Pricing | LEGAL | Must match actual billing and third-party pass-through rules. |
| Wholesale rates | Pricing | LEGAL | Define rate source, taxes, currency conversion, and changes. |
| Full GDPR compliance | Privacy | LEGAL | Compliance depends on actual operations and contracts. |
| Encryption in transit and at rest | Privacy | VERIFY | Confirm systems, scope, providers, and exceptions. |
| Secure internationally certified gateways | Privacy | REWRITE | Name approved processors and avoid vague certification claims. |

## 4. Pricing Source of Truth

Current plan summary:

| Plan | Monthly price | Cashback label | Current positioning |
| --- | ---: | ---: | --- |
| Starter | EUR 85 | 10% | CRM, booking, and lead capture |
| Growth | EUR 247 | 15% | Follow-up automation and booking conversion |
| Pro | EUR 447 | 20% | AI, reviews, analytics, and reactivation |
| Scale | EUR 797 | 30% | Higher-volume automation and AI access |

All values are `VERIFY`.

Required commercial fields for every plan:

- Billing period.
- Currency.
- Tax/VAT inclusion.
- Contract term.
- Trial or setup fee.
- Cancellation timing.
- User limit.
- Location/account limit.
- Included usage credits.
- Overage behavior.
- Feature availability.
- Support level.
- Data migration/onboarding inclusion.
- Plan upgrade/downgrade behavior.

### Cashback

Current labels range from 10% to 30%, but the repository does not define:

- What cashback means.
- What amount it is calculated from.
- When it is earned.
- How it is paid or credited.
- Eligibility and exclusions.
- Expiration.
- Tax treatment.
- Whether it is a permanent offer.

State: `LEGAL` and `VERIFY`.

Do not publish the cashback labels until terms are approved and linked.

## 5. Usage Charge Inventory

Current draft rates:

| Item | Draft rate |
| --- | ---: |
| Email infrastructure | EUR 0.00135/email |
| Email verification | EUR 0.005/email |
| SMS messaging | EUR 0.0158/segment |
| Outbound calls | EUR 0.028/minute |
| Inbound calls | EUR 0.017/minute |
| Premium triggers | EUR 0.02/action |
| Content AI | EUR 0.18/1,000 words |
| Conversation AI | EUR 0.04/message |
| Funnels AI | EUR 1.98/FunnelAI |
| Reviews AI | EUR 0.16/response |
| Workflow AI | EUR 0.06/execution |
| Workflow Pro | EUR 14.99/month |
| Ad Manager | EUR 29/month |
| Address autocomplete | EUR 0.0044/search |
| Branded client app | EUR 79/month |
| Dedicated IP | EUR 88.50/month |
| Domain purchase | EUR 13/domain |
| WhatsApp integration | EUR 29.99/month |
| WordPress hosting | EUR 14.99/month |
| Yext Listings | EUR 75/month |

Every rate is `VERIFY` and `LEGAL`.

Required clarification:

- Provider behind each charge.
- Geographic rate variation.
- Taxes and fees.
- Currency conversion.
- Rounding rules.
- Minimum charges.
- Unit definition.
- Effective date.
- Rate-change notice.
- Whether Kyntlo adds margin.
- Whether the rate is illustrative or guaranteed.

## 6. Product Capability Verification

The current site claims or implies all of the following. Product ownership must
mark each as `LIVE`, `BETA`, `ROADMAP`, `THIRD PARTY`, or `NOT OFFERED`.

- CRM and pipelines.
- Lead scoring.
- Suggested next action.
- Visual workflow automation.
- Email automation.
- SMS automation.
- Internal task routing.
- Funnel builder.
- Website builder.
- AI copy generation.
- A/B split testing.
- Forms and surveys.
- Omnichannel inbox.
- Facebook messaging.
- Instagram messaging.
- WhatsApp messaging.
- Email inbox.
- SMS inbox.
- Booking calendar.
- Conversational booking bot.
- AI reply drafting.
- AI chatbot.
- Voice AI.
- AI sales agent.
- Reputation management.
- Review requests and monitoring.
- Reactivation campaigns.
- Memberships and courses.
- Advanced analytics.
- Attribution.
- Call tracking and recording.
- White-label platform.
- Branded mobile apps.
- Custom dashboards.
- Multiple locations.

Each live feature also needs:

- Supported plan.
- Usage limit.
- Geographic restrictions.
- Third-party dependency.
- Data processed.
- Screenshot/demo evidence.
- Customer-facing limitations.

## 7. Integrations

The current home page attempts to display:

- Google.
- Slack.
- WooCommerce.
- Mailgun.
- PayPal.
- LinkedIn.
- Pabbly.
- QuickBooks.

State: `VERIFY`.

For each integration, confirm:

- Native integration, webhook, Zapier/Pabbly connection, or manual workflow.
- Authentication method.
- Read/write capabilities.
- Plan availability.
- Current support status.
- Permission to display the trademark/logo.

Do not describe an indirect automation path as a native integration.

## 8. People and Story Copy

Current story:

- Kyntlo began in 2023.
- Founder is Boush Adel.
- It originated inside Master Artists.
- It became a global platform after interest from other businesses.
- Demo sessions involve Rustam and the core team.

State: `VERIFY`.

Recommended handling:

- Keep the origin story only after names, dates, organizations, and outcomes are
  approved.
- Replace exaggerated outcomes with measured, attributable facts.
- Add real team photos or omit personal attribution.
- Avoid naming a person in the booking CTA unless that person consistently
  handles bookings.

## 9. Contact Inventory

| Contact point | Current value | State |
| --- | --- | --- |
| WhatsApp billing support | `+12542745553` | VERIFY |
| Sales inquiry | Broken internal anchor or missing page | REMOVE/REPLACE |
| Contact support | `#` or missing `contact.html` | REMOVE/REPLACE |
| LinkedIn | `#` | REMOVE/REPLACE |
| Instagram | `#` | REMOVE/REPLACE |
| Email | None | REQUIRED |
| Postal address | None | REQUIRED |
| Booking URL | None | REQUIRED |

The phone number must be presented in international format and linked using a
reviewed `tel:` or approved WhatsApp URL if it is valid.

## 10. Legal Content Gaps

### Privacy notice

Current content is too short for production use. Missing topics include:

- Controller identity and contact details.
- Categories of personal data.
- Collection sources.
- Purposes and lawful bases.
- Processor/subprocessor categories.
- International transfers.
- Retention periods.
- User rights and complaint process.
- Marketing communications.
- Cookies and analytics.
- Automated decision-making/profiling.
- Children/minimum age.
- Security limitations.
- Notice changes.

### Terms

Missing or incomplete topics include:

- Contracting entity.
- Eligibility.
- Account creation.
- Subscription term and renewal.
- Payment authorization.
- Taxes.
- Usage charges and wallet accounting.
- Rate changes.
- Acceptable use.
- Customer content and permissions.
- Data processing.
- Intellectual property.
- Third-party services.
- Service availability.
- Suspension and termination.
- Warranties and disclaimers.
- Liability limits.
- Indemnity.
- Governing law and dispute process.
- Contact and notices.

### Refund/cancellation

Missing or incomplete topics include:

- Exact cancellation effective date.
- Renewal cutoff.
- Annual-plan treatment.
- Setup/onboarding fees.
- Promotional and cashback treatment.
- Refund review criteria.
- Processing fee amount or method.
- Refund timeline and payment method.
- Chargeback handling.
- Consumer-law exceptions by market.

All legal documents have state `LEGAL`.

## 11. Placeholder and Broken Content

Must be removed or replaced before launch:

- `[ Embed Booking Calendar Here ]`.
- Placeholder social links.
- Missing contact page.
- Missing home route.
- Missing or incorrect legal links.
- Missing logo references.
- Missing integration image references.
- Stock dashboard image presented as a Kyntlo CRM interface.
- Duplicate pricing content inside the Compare page.

## 12. Content Acceptance Criteria

Content is ready for implementation when:

- The company identity is approved.
- Product availability is classified.
- All plan and usage rates are approved with an effective date.
- Cashback is documented or removed.
- Claims marked `EVIDENCE` have supporting material.
- Claims marked `LEGAL` have legal approval.
- Contact and social destinations are supplied.
- Booking and lead-flow copy matches the actual workflow.
- Every page has one clear purpose and CTA.
- Placeholder content is removed.

