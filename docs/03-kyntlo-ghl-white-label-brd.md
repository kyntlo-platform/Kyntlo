# Kyntlo GHL White-Label Business Requirements Document

Document ID: `KYN-BRD-001`
Version: `0.1 Draft`
Date: `2026-06-14`
Owner: Kyntlo
Prepared from: Current Kyntlo website files and current official HighLevel documentation
Status: Requires business-owner validation before implementation

## 1. Document Purpose

This Business Requirements Document defines the business, product, website,
commercial, operational, onboarding, billing, integration, compliance, and
quality requirements for Kyntlo as a white-label SaaS offering built on the
HighLevel platform.

The document has two implementation targets:

1. The public Kyntlo marketing and conversion website.
2. The Kyntlo-branded HighLevel service delivered to paying customers through
   HighLevel SaaS Mode, sub-accounts, snapshots, permissions, rebilling, and
   optional resold services.

This is not a requirement to rebuild HighLevel. Kyntlo will package,
configure, brand, sell, onboard, support, and potentially extend HighLevel.

## 2. Reading Rules

Requirement priorities:

- `MUST`: Required for launch or required to avoid a material business,
  customer, billing, security, or compliance failure.
- `SHOULD`: Important for a credible launch but can be scheduled after the
  launch-critical path if explicitly accepted.
- `COULD`: Valuable enhancement with no launch dependency.
- `WON'T NOW`: Explicitly excluded from the current release.

Decision states:

- `CONFIRMED`: Supported by the current business direction or repository.
- `GHL VERIFIED`: Supported by current official HighLevel documentation.
- `PROPOSED`: Recommended Kyntlo behavior awaiting approval.
- `TBD`: A business decision is still required.
- `CONDITIONAL`: Availability depends on the Kyntlo HighLevel agency plan,
  location, provider, approval, configuration, or add-on.

The public website must not present a `TBD` or `CONDITIONAL` capability as
universally available.

## 3. Executive Summary

Kyntlo will operate as a branded SaaS and managed enablement layer over
HighLevel. Customers should experience:

- A Kyntlo-owned marketing and sales journey.
- Kyntlo plans and packaging.
- A Kyntlo-branded login and application URL.
- A Kyntlo logo, legal links, onboarding communication, support model, and
  customer-facing documentation.
- A configured HighLevel sub-account containing the features, permissions,
  usage limits, templates, workflows, funnels, calendars, dashboards, and
  other assets included in the purchased Kyntlo plan.
- Clear recurring subscription pricing.
- Clear usage-based and optional add-on pricing.
- Controlled upgrade, downgrade, cancellation, support, and account recovery
  journeys.

Kyntlo remains operationally responsible for its customers even when the
underlying capability is provided by HighLevel or another provider.

## 4. Business Context

### 4.1 Current State

The repository currently contains a static Kyntlo website prototype with:

- A complete home-page visual concept.
- Existing animation and visual styling.
- Product-feature marketing sections.
- A software-cost comparison section.
- Four draft Kyntlo plans.
- Draft usage and add-on pricing.
- Draft About, Funnels, Pricing, Privacy, Terms, and Refund pages.

The prototype does not currently contain:

- A production build system.
- A working booking flow.
- A contact or lead form.
- A HighLevel form or calendar embed.
- SaaS checkout.
- Sub-account provisioning.
- GHL API integration.
- Customer authentication.
- A Kyntlo login route.
- Production analytics.
- Production consent management.
- Tested legal and billing disclosure.

### 4.2 Desired State

The desired state is a production-grade Kyntlo web presence that accurately
sells and supports a Kyntlo-branded HighLevel SaaS product.

The marketing website and HighLevel account configuration must use one
approved feature and pricing source of truth.

### 4.3 Business Model

The intended business model is:

- Kyntlo pays for and administers an eligible HighLevel agency account.
- Kyntlo creates customer sub-accounts.
- Kyntlo enables features according to Kyntlo plans.
- Kyntlo may configure plan-specific user and contact limits.
- Kyntlo may load a Kyntlo snapshot into customer sub-accounts.
- Kyntlo charges customers through Kyntlo-controlled Stripe/SaaS billing.
- Kyntlo may rebill supported usage at cost or with markup, subject to the
  underlying HighLevel agency plan.
- Kyntlo may resell supported HighLevel services and add-ons.
- Kyntlo may include onboarding, configuration, support, templates, or
  managed services that are not native platform features.

## 5. Verified HighLevel Platform Baseline

The following capabilities are verified at the HighLevel platform level. They
are not automatically confirmed for every Kyntlo customer or Kyntlo plan.

### 5.1 White-Label Application

HighLevel supports a branded desktop application login through a subdomain
controlled by the agency. The white-label domain is separate from the API
domain used to brand system-generated links.

Kyntlo implications:

- A dedicated app subdomain is required, such as `app.kyntlo.com`.
- The app subdomain must not conflict with the marketing website.
- A separate API/branded-links domain should be configured.
- Kyntlo Privacy Policy and Terms URLs must be available before the complete
  white-label setup.
- Kyntlo needs production-ready logo assets sized for the HighLevel company
  settings.

### 5.2 SaaS Mode

HighLevel SaaS Mode supports the resale of platform functionality to clients.
Sub-accounts created through SaaS Configurator are governed by plan-level
feature permissions.

Kyntlo implications:

- Every public Kyntlo plan must map to one SaaS Configurator plan or a
  documented manual provisioning path.
- Feature toggles in the Kyntlo plan matrix must match HighLevel sub-account
  permissions.
- Kyntlo must define what happens if a feature is marketed but disabled at the
  sub-account level.
- Customer payment and provisioning behavior must be tested end to end.

### 5.3 Permissions and Limits

HighLevel supports:

- Plan-level sub-account feature permissions.
- User-level permissions constrained by sub-account permissions.
- SaaS plan user limits.
- SaaS plan contact limits.

Important limitation:

- The documented contact limit blocks manual UI creation/import after the
  limit, but contacts may still be created through APIs, forms, workflows, and
  other paths. Kyntlo must not market this as a guaranteed hard database cap.

### 5.4 Snapshots

HighLevel snapshots can transfer reusable configuration assets such as:

- Workflows and triggers.
- Funnels and websites.
- Forms, surveys, quizzes, and templates.
- Calendars and services.
- Pipelines, custom fields, custom objects, custom values, tags, and trigger
  links.
- Dashboards, custom metrics, and custom reports.
- Conversation AI and Voice AI configuration.
- Membership products and offers.
- Review settings.
- Knowledge bases.
- Documents and contracts.
- Selected advertising and design assets.

Snapshots do not transfer live customer activity such as:

- Contacts.
- Appointments.
- Conversations and message history.
- Reputation data.
- Stripe connections.
- Third-party integrations.
- Assigned phone numbers.
- Certain private/protected assets.

Kyntlo implications:

- Kyntlo must maintain at least one controlled snapshot-source sub-account.
- Snapshot contents require versioning and release notes.
- Every provisioned customer requires a post-snapshot integration checklist.
- Snapshot deployment cannot be described as complete onboarding by itself.

### 5.5 Core Platform Capability Areas

Current official HighLevel documentation includes support areas for:

- Contacts, smart lists, custom fields, companies, and custom objects.
- Opportunities and pipelines.
- Unified conversations and supported communication channels.
- Email systems and email marketing.
- Phone, SMS, MMS, voicemail, and phone-number management.
- Workflows, triggers, actions, webhooks, and premium workflow operations.
- Funnels, websites, blogs, stores, forms, surveys, quizzes, and chat widgets.
- Calendars, services, groups, appointment notifications, and integrations.
- Payments, invoices, estimates, documents, contracts, subscriptions,
  payment links, products, taxes, coupons, and supported payment providers.
- Reputation management, review requests, Google Business Profile tools,
  competitor analysis, listings, and video testimonials.
- Dashboards, attribution, custom reporting, and scheduled reports.
- Social Planner, Ad Manager, affiliate management, and templates.
- Memberships, courses, webinars, and communities.
- Conversation AI, Voice AI, Content AI, Reviews AI, Ask AI, Workflow AI,
  Agent Studio, and knowledge bases.
- API access, OAuth, private integration tokens, webhooks, and marketplace
  extensions.

Each Kyntlo plan must select a subset of these capabilities. Platform
existence does not mean the feature is enabled, configured, included,
unlimited, available in every country, or free of usage charges.

## 6. Product Boundary Model

Every Kyntlo capability must be classified into exactly one ownership type.

### 6.1 Native Platform Capability

Functionality provided in HighLevel and exposed under Kyntlo branding.

Examples:

- Contacts.
- Pipelines.
- Workflows.
- Calendars.
- Funnels.
- Conversations.

Website wording:

- "Available in Kyntlo."
- "Manage X inside Kyntlo."

Avoid:

- Claiming Kyntlo independently invented or operates the underlying
  infrastructure unless that is true.

### 6.2 Kyntlo Configuration

HighLevel functionality configured by Kyntlo for a defined use case.

Examples:

- Prebuilt pipeline stages.
- Lead nurture workflows.
- Booking reminders.
- Review request sequences.
- Dashboard templates.

Website wording:

- "Preconfigured by Kyntlo."
- "Includes Kyntlo templates and workflows."

### 6.3 Kyntlo Managed Service

Human work performed by Kyntlo or its contractors.

Examples:

- Initial account setup.
- Funnel implementation.
- Campaign management.
- Data migration.
- Custom integrations.
- Ongoing optimization.

Managed services must not appear as automatic software features.

### 6.4 Usage-Based Platform Service

Features that create variable provider costs.

Examples:

- Email sending.
- Phone numbers.
- SMS/MMS.
- Calling.
- WhatsApp.
- AI usage.
- Premium workflow executions.
- Email validation.

These require explicit pricing and wallet disclosure.

### 6.5 Resold Add-On

Optional services enabled and billed per sub-account or agency rules.

Examples may include:

- Online Listings.
- WhatsApp.
- Branded Client Portal App.
- WordPress hosting.
- SEO.
- Dedicated IP.
- Workflow Pro tiers.

### 6.6 Kyntlo-Owned Extension

Custom functionality built outside or on top of HighLevel using:

- HighLevel API.
- OAuth.
- Private integration tokens.
- Webhooks.
- Custom menu links.
- Marketplace modules.
- External systems.

No Kyntlo-owned extension is currently implemented in the repository.

## 7. Business Objectives

### 7.1 Primary Objectives

- `OBJ-001 MUST`: Present Kyntlo as a credible unified growth and operations
  platform for the approved target market.
- `OBJ-002 MUST`: Convert qualified website visitors into demos, purchases, or
  another approved primary conversion.
- `OBJ-003 MUST`: Ensure each sold plan can be provisioned consistently in
  HighLevel.
- `OBJ-004 MUST`: Ensure website claims match actual HighLevel configuration
  and Kyntlo delivery capacity.
- `OBJ-005 MUST`: Clearly distinguish subscription fees, usage charges,
  add-ons, and managed-service fees.
- `OBJ-006 MUST`: Reduce manual onboarding through snapshots, SaaS
  Configurator, standardized forms, and checklists.
- `OBJ-007 MUST`: Create a branded journey from first website visit through
  app login, onboarding, support, billing, and renewal.
- `OBJ-008 SHOULD`: Support plan upgrades without re-creating the customer
  account.
- `OBJ-009 SHOULD`: Establish measurable acquisition, activation, adoption,
  conversion, retention, and support metrics.

### 7.2 Success Measures

Exact targets are `TBD`. The measurement model must include:

- Website visitor-to-lead conversion rate.
- Qualified lead-to-demo rate.
- Demo show rate.
- Demo-to-paid conversion rate.
- Checkout completion rate if self-service is enabled.
- Successful sub-account provisioning rate.
- Median time from payment to account access.
- Median time to onboarding completion.
- Percentage of customers completing required integrations.
- Time to first contact captured.
- Time to first pipeline opportunity.
- Time to first workflow activation.
- Time to first appointment booked.
- Active users per sub-account.
- Subscription MRR and churn.
- Expansion MRR.
- Payment failure rate.
- Usage gross margin.
- Support tickets per active customer.
- Customer satisfaction and onboarding satisfaction.

## 8. Scope

### 8.1 In Scope

- Public Kyntlo website.
- Kyntlo product positioning.
- Feature architecture and plan matrix.
- Pricing and usage disclosures.
- Lead capture and demo booking.
- Optional SaaS checkout.
- Kyntlo-branded HighLevel login.
- SaaS plan provisioning requirements.
- Snapshot strategy.
- Customer onboarding.
- Billing, wallet, rebilling, and add-on requirements.
- Upgrade, downgrade, cancellation, and failed-payment journeys.
- Support and escalation model.
- Analytics and operational reporting.
- Website SEO, accessibility, performance, privacy, and security.

### 8.2 Out of Scope for Current Website Phase

- Rebuilding the HighLevel application UI.
- Replacing HighLevel authentication.
- Building a new CRM engine.
- Building a new telephony carrier.
- Building a new email delivery provider.
- Building native iOS/Android applications.
- Custom customer dashboard outside HighLevel unless separately approved.
- Customer data migration automation unless separately specified.
- Marketplace application development unless separately approved.

## 9. Stakeholders

| Stakeholder | Responsibilities | Status |
| --- | --- | --- |
| Kyntlo owner | Final business, pricing, legal, and scope approval | TBD name |
| Product owner | Feature matrix, roadmap, acceptance | TBD |
| HighLevel administrator | Agency settings, SaaS Configurator, snapshots, billing | TBD |
| Sales | Qualification, demo, proposals, conversion feedback | TBD |
| Onboarding | Account setup, integrations, training, activation | TBD |
| Support | First-line support and escalation | TBD |
| Finance | Stripe, refunds, wallet, reconciliation, taxes | TBD |
| Legal/privacy reviewer | Terms, privacy, DPA, claims, communications consent | TBD |
| Engineering | Website, forms, integration, deployment, monitoring | TBD |
| Content/brand | Messaging, screenshots, proof, design assets | TBD |
| HighLevel | Underlying platform and platform support | External dependency |
| Stripe/payment provider | Customer charges and payment lifecycle | External dependency |
| Telecom/AI providers | Usage-based service delivery | External dependency |

## 10. Customer Segments and Personas

The final segment is `TBD`. The BRD proposes the following candidate personas.

### 10.1 Agency Owner

Needs:

- One platform for sales and client operations.
- Repeatable onboarding.
- White-label delivery.
- Pipelines, automations, funnels, and reporting.
- Multiple users or locations.

Risks:

- Expects agency-level white labeling or unlimited client accounts when only a
  single Kyntlo sub-account is sold.

### 10.2 Service Business Owner

Needs:

- Capture leads.
- Follow up quickly.
- Book appointments.
- Track opportunities.
- Request reviews.
- Understand marketing performance.

Risks:

- May not need complex agency functions.
- May require substantial onboarding and done-for-you setup.

### 10.3 Sales or Operations Manager

Needs:

- Pipeline visibility.
- Team permissions.
- Assignment rules.
- Tasks, reminders, and reporting.
- Reliable communication history.

Risks:

- Requires governance, data quality, and adoption support.

### 10.4 Marketing Manager

Needs:

- Landing pages and forms.
- Campaigns.
- Attribution.
- Social planning.
- Automations.
- Lead source reporting.

Risks:

- May expect unsupported ad platforms, perfect attribution, or unlimited
  sending.

### 10.5 Front-Line User

Needs:

- Simple inbox.
- Clear tasks.
- Contact context.
- Fast appointment and pipeline actions.

Risks:

- Overly broad permissions and menu complexity can reduce adoption.

## 11. End-to-End Customer Journeys

### 11.1 Anonymous Visitor to Qualified Lead

1. Visitor arrives through search, referral, paid media, or direct traffic.
2. Visitor understands the target customer, primary outcome, and platform
   boundaries.
3. Visitor explores capabilities and plan differences.
4. Visitor sees clear usage and add-on disclosures.
5. Visitor chooses the primary CTA.
6. Visitor submits required qualification data.
7. Consent and privacy notice are recorded where required.
8. A contact is created or updated in the approved Kyntlo CRM location.
9. Source and campaign attribution are attached.
10. An opportunity is created in the sales pipeline.
11. Kyntlo staff receive notification and task assignment.
12. Visitor receives confirmation and next steps.

### 11.2 Demo Booking

1. Visitor selects a demo CTA.
2. A Kyntlo-branded HighLevel calendar is displayed or opened.
3. Available times reflect configured team availability and timezone.
4. Visitor supplies required contact and qualification information.
5. Appointment is created.
6. Confirmation is sent through approved channels.
7. Reminder workflow runs according to consent and channel availability.
8. Opportunity stage is updated.
9. No-show and reschedule branches are handled.
10. Sales outcome is recorded.

### 11.3 Self-Service Purchase

Status: `TBD` whether supported at launch.

1. Customer selects a plan.
2. Customer reviews included features, limits, recurring price, usage charges,
   add-ons, taxes, and renewal terms.
3. Customer accepts legal terms.
4. Customer supplies business and payment information.
5. Stripe payment/subscription succeeds.
6. HighLevel creates the SaaS sub-account and initial user.
7. Correct plan permissions and limits are applied.
8. Correct snapshot is loaded.
9. Welcome email is sent using Kyntlo branding.
10. Customer signs in through the Kyntlo app domain.
11. Onboarding checklist begins.
12. Failure at any step enters a monitored recovery queue.

### 11.4 Sales-Assisted Purchase

1. Sales marks the opportunity as approved/won.
2. Customer receives a secure payment or signup link.
3. Customer accepts terms and adds payment information.
4. Subscription and account provisioning proceed.
5. Sales ownership transfers to onboarding.
6. Onboarding SLA begins.

### 11.5 Customer Onboarding

1. Customer confirms business profile.
2. Customer confirms users and roles.
3. Kyntlo confirms purchased plan and add-ons.
4. Snapshot deployment is verified.
5. Required domains are connected.
6. Email sending domain is configured.
7. Phone/SMS setup is completed where included.
8. Required regulatory registration is completed where applicable.
9. Calendar integrations and availability are configured.
10. Social, Google Business Profile, payment, WhatsApp, or other approved
    integrations are connected.
11. Pipeline and opportunity stages are validated.
12. Forms, funnels, and booking pages are tested.
13. Workflows are reviewed and published only after business details are
    correct.
14. Test contact, message, appointment, opportunity, payment, and review
    request flows are completed as applicable.
15. Customer receives training and support guidance.
16. Onboarding is marked complete with recorded acceptance.

### 11.6 Upgrade

1. Customer sees current plan and eligible upgrades.
2. Pricing and effective date are displayed.
3. Customer authorizes the change.
4. SaaS plan changes without duplicate account creation.
5. New permissions and limits are applied.
6. Additional snapshot assets are loaded only through an approved process.
7. Billing is updated.
8. Customer and internal teams receive confirmation.
9. Upgrade telemetry is recorded.

### 11.7 Downgrade

1. Customer sees features and limits that will be lost.
2. System identifies data or users exceeding the target plan.
3. Effective date is disclosed.
4. Customer explicitly confirms.
5. Permissions and billing update at the approved time.
6. Data retention behavior is documented.
7. No destructive deletion occurs without a separate approved rule.

### 11.8 Cancellation

1. Customer requests cancellation through the approved channel.
2. Identity and account ownership are verified.
3. Effective date and access end date are shown.
4. Outstanding usage, wallet, add-ons, and refund eligibility are calculated.
5. Cancellation is applied to the correct HighLevel/Stripe subscription.
6. Optional export or migration guidance is provided.
7. Data retention/deletion clock begins.
8. Customer receives confirmation.
9. Reactivation path is defined where supported.

### 11.9 Failed Payment

1. Payment failure event is detected.
2. Customer receives a branded notification.
3. Retry behavior follows the approved billing policy.
4. Kyntlo staff are notified after defined thresholds.
5. Grace period and service restrictions are applied consistently.
6. Usage-based services are handled without creating uncontrolled agency
   exposure.
7. Suspension and cancellation are auditable.

## 12. Website Information Architecture

Recommended production routes:

| Route | Purpose | Priority |
| --- | --- | --- |
| `/` | Primary product and conversion page | MUST |
| `/platform` | Capability overview | SHOULD |
| `/features/crm` | Contacts, pipelines, opportunities | SHOULD |
| `/features/automation` | Workflows and automation | SHOULD |
| `/features/conversations` | Unified communication | SHOULD |
| `/features/funnels` | Funnels, websites, forms | MUST |
| `/features/calendars` | Booking and appointment tools | SHOULD |
| `/features/reputation` | Reviews and reputation | SHOULD |
| `/features/ai` | Included and optional AI capabilities | SHOULD |
| `/pricing` | Plans, limits, usage, add-ons | MUST |
| `/compare` | Accurate comparison with fragmented stacks | MUST |
| `/about` | Kyntlo business story | SHOULD |
| `/book-demo` | Working calendar/qualification flow | MUST |
| `/contact` | Sales and support routing | MUST |
| `/login` | Redirect to Kyntlo white-label app domain | MUST |
| `/help` | Support entry and onboarding resources | SHOULD |
| `/privacy` | Privacy notice | MUST |
| `/terms` | Terms of service | MUST |
| `/refund` | Refund and cancellation policy | MUST |
| `/cookies` | Cookie notice where required | CONDITIONAL |
| `/acceptable-use` | Messaging/platform acceptable use | SHOULD |
| `/status` | Service status destination | COULD |

## 13. Website Functional Requirements

### 13.1 Global Navigation

- `WEB-001 MUST`: Display Kyntlo logo linking to the home page.
- `WEB-002 MUST`: Provide working links to Platform/Features, Pricing,
  Compare, and the primary CTA.
- `WEB-003 MUST`: Provide a visible Login link to the Kyntlo white-label app.
- `WEB-004 MUST`: Provide a functional mobile navigation menu.
- `WEB-005 MUST`: Show visible keyboard focus.
- `WEB-006 MUST`: Avoid navigation links that resolve to placeholders.
- `WEB-007 SHOULD`: Indicate the active route.

### 13.2 Home Page

- `WEB-010 MUST`: State who Kyntlo is for.
- `WEB-011 MUST`: State the primary business outcome.
- `WEB-012 MUST`: Avoid implying that all HighLevel capabilities are included
  in every plan.
- `WEB-013 MUST`: Provide primary and secondary CTAs.
- `WEB-014 MUST`: Explain the unified-platform value.
- `WEB-015 MUST`: Present evidence-backed capability groups.
- `WEB-016 MUST`: Present plan entry points or link clearly to pricing.
- `WEB-017 MUST`: Include trust information that is factual and approved.
- `WEB-018 MUST`: Replace stock UI presented as Kyntlo with approved product
  captures or clearly labeled illustrations.
- `WEB-019 SHOULD`: Retain the existing visual identity and selected
  animations after accessibility and performance remediation.

### 13.3 Feature Pages

- `WEB-030 MUST`: Identify whether each capability is included, configured,
  usage-based, add-on, or managed.
- `WEB-031 MUST`: Explain prerequisites and key limitations.
- `WEB-032 MUST`: Use Kyntlo terminology while remaining operationally
  accurate.
- `WEB-033 SHOULD`: Include approved screenshots.
- `WEB-034 SHOULD`: Include a relevant use case and CTA.

### 13.4 Pricing Page

- `WEB-040 MUST`: Use one data source for plan cards and comparison tables.
- `WEB-041 MUST`: Display recurring price and billing period.
- `WEB-042 MUST`: Display currency and tax treatment.
- `WEB-043 MUST`: Display user, contact, location, and other meaningful limits.
- `WEB-044 MUST`: Separate included features from optional add-ons.
- `WEB-045 MUST`: Separate recurring subscriptions from usage charges.
- `WEB-046 MUST`: Explain wallet and auto-recharge behavior where applicable.
- `WEB-047 MUST`: Explain that regional/provider rates can vary where true.
- `WEB-048 MUST`: Link cancellation, refund, and terms.
- `WEB-049 MUST`: Remove or fully define cashback before publication.
- `WEB-050 MUST`: Not describe Kyntlo rates as wholesale/no-markup unless the
  actual Kyntlo billing configuration supports the statement.
- `WEB-051 SHOULD`: Provide a machine-maintainable effective date for rates.

### 13.5 Compare Page

- `WEB-060 MUST`: Be distinct from the Pricing page.
- `WEB-061 MUST`: Compare capabilities or workflows, not unsupported
  competitor pricing claims.
- `WEB-062 MUST`: State assumptions for any savings calculation.
- `WEB-063 MUST`: Avoid guarantees that Kyntlo replaces every tool.
- `WEB-064 SHOULD`: Support a visitor-supplied stack-cost calculator in a
  later release.

### 13.6 Lead Form

- `WEB-070 MUST`: Capture approved required fields.
- `WEB-071 MUST`: Validate client-side and server-side.
- `WEB-072 MUST`: Prevent obvious automated spam.
- `WEB-073 MUST`: Create/update the contact in the approved Kyntlo HighLevel
  sub-account.
- `WEB-074 MUST`: Record source, landing page, and consent metadata.
- `WEB-075 MUST`: Create or update the appropriate opportunity.
- `WEB-076 MUST`: Trigger internal notification and customer confirmation.
- `WEB-077 MUST`: Provide success and failure states.
- `WEB-078 MUST`: Avoid exposing HighLevel/API secrets in browser code.

### 13.7 Demo Calendar

- `WEB-080 MUST`: Replace the existing placeholder with a working HighLevel
  calendar or approved booking route.
- `WEB-081 MUST`: Display timezone correctly.
- `WEB-082 MUST`: Prevent double booking through configured availability and
  conflict calendars.
- `WEB-083 MUST`: Support reschedule and cancellation.
- `WEB-084 MUST`: Trigger approved confirmation/reminder workflows.
- `WEB-085 MUST`: Be tested on mobile and keyboard navigation.

### 13.8 Login

- `WEB-090 MUST`: Provide a stable `/login` route.
- `WEB-091 MUST`: Redirect to the approved Kyntlo app subdomain.
- `WEB-092 MUST`: Never expose a temporary or internal HighLevel URL in normal
  customer navigation after launch.
- `WEB-093 SHOULD`: Preserve a recoverable fallback if the branded domain is
  unavailable.

## 14. Kyntlo SaaS Plan Requirements

The existing website proposes four customer plans. Their commercial values are
not yet approved.

### 14.1 Draft Plans

| Plan | Draft monthly price | Draft cashback | Status |
| --- | ---: | ---: | --- |
| Starter | EUR 85 | 10% | TBD |
| Growth | EUR 247 | 15% | TBD |
| Pro | EUR 447 | 20% | TBD |
| Scale | EUR 797 | 30% | TBD |

### 14.2 Required Plan Fields

Each plan must define:

- Plan ID and public name.
- Monthly and annual price.
- Currency.
- Tax inclusion/exclusion.
- Billing period and renewal.
- Setup/onboarding fee.
- Trial behavior.
- Included sub-accounts/locations.
- User limit.
- Contact limit and its technical caveat.
- Included feature permissions.
- Snapshot version.
- Included templates/workflows.
- Included onboarding work.
- Included support level.
- Included communication/AI credits, if any.
- Usage-based rates.
- Available add-ons.
- Upgrade/downgrade rules.
- Cancellation rules.
- Data export/retention behavior.

### 14.3 Draft Feature Matrix Structure

The following matrix is a BRD structure, not an approved offer.

| Capability | Starter | Growth | Pro | Scale |
| --- | --- | --- | --- | --- |
| Contacts and smart lists | TBD | TBD | TBD | TBD |
| Pipelines and opportunities | TBD | TBD | TBD | TBD |
| Unified conversations | TBD | TBD | TBD | TBD |
| Calendar and booking | TBD | TBD | TBD | TBD |
| Forms and surveys | TBD | TBD | TBD | TBD |
| Funnels/websites | TBD | TBD | TBD | TBD |
| Email marketing | TBD | TBD | TBD | TBD |
| Standard workflows | TBD | TBD | TBD | TBD |
| Phone/SMS access | TBD | TBD | TBD | TBD |
| WhatsApp access | TBD | TBD | TBD | TBD |
| Reputation/review requests | TBD | TBD | TBD | TBD |
| Reporting/dashboard | TBD | TBD | TBD | TBD |
| Memberships/courses | TBD | TBD | TBD | TBD |
| Conversation AI | TBD | TBD | TBD | TBD |
| Voice AI | TBD | TBD | TBD | TBD |
| Reviews AI | TBD | TBD | TBD | TBD |
| Content AI | TBD | TBD | TBD | TBD |
| Custom dashboards | TBD | TBD | TBD | TBD |
| Locations | TBD | TBD | TBD | TBD |
| Users | TBD | TBD | TBD | TBD |
| Contacts | TBD | TBD | TBD | TBD |
| Onboarding service | TBD | TBD | TBD | TBD |
| Support SLA | TBD | TBD | TBD | TBD |

### 14.4 SaaS Configurator Mapping

- `SAA-001 MUST`: Every public plan maps to an internal SaaS Configurator plan
  or a documented manual plan.
- `SAA-002 MUST`: Public feature names map to HighLevel permission toggles.
- `SAA-003 MUST`: Plan IDs remain stable even if public names change.
- `SAA-004 MUST`: User limits match the advertised plan.
- `SAA-005 MUST`: Contact-limit wording reflects the technical limitation.
- `SAA-006 MUST`: Upgrade and downgrade mappings are documented.
- `SAA-007 MUST`: Plan changes are tested with existing customer data.
- `SAA-008 MUST`: A plan provisioning audit can identify configuration drift.

## 15. Snapshot Requirements

- `SNP-001 MUST`: Maintain a dedicated snapshot source sub-account.
- `SNP-002 MUST`: Restrict source-account admin access.
- `SNP-003 MUST`: Assign a version to each snapshot release.
- `SNP-004 MUST`: Record included asset categories.
- `SNP-005 MUST`: Record excluded or post-install configuration.
- `SNP-006 MUST`: Test snapshots in a clean sub-account before release.
- `SNP-007 MUST`: Do not include real customer contacts or live activity.
- `SNP-008 MUST`: Maintain custom values/placeholders for customer-specific
  data.
- `SNP-009 MUST`: Prevent workflows from publishing before required customer
  fields and connections are validated.
- `SNP-010 MUST`: Document which assets are safe to push to existing accounts.
- `SNP-011 MUST`: Back up affected assets before broad snapshot updates.
- `SNP-012 SHOULD`: Maintain vertical-specific snapshots only after the core
  snapshot is stable.

Recommended core snapshot:

- Contact custom fields.
- Opportunity custom fields.
- Standard tags.
- Main sales pipeline.
- Lead source values.
- Demo/consultation calendar template.
- Lead capture form.
- Contact confirmation workflow.
- Appointment reminder workflow.
- No-show workflow.
- New lead assignment workflow.
- Opportunity stage automation.
- Review request workflow.
- Basic dashboards.
- Email/SMS templates with compliant placeholders.
- Kyntlo onboarding checklist assets.

## 16. Onboarding Requirements

### 16.1 Provisioning

- `ONB-001 MUST`: Detect successful payment or approved manual activation.
- `ONB-002 MUST`: Create exactly one intended sub-account per order.
- `ONB-003 MUST`: Apply the correct plan.
- `ONB-004 MUST`: Apply the correct permissions and limits.
- `ONB-005 MUST`: Apply the correct snapshot version.
- `ONB-006 MUST`: Create the initial customer admin.
- `ONB-007 MUST`: Send a Kyntlo-branded welcome email.
- `ONB-008 MUST`: Log provisioning failures.
- `ONB-009 MUST`: Alert an internal owner when automatic recovery fails.
- `ONB-010 MUST`: Prevent duplicate provisioning from retried events.

### 16.2 Customer Setup Checklist

- Business name and legal details.
- Business address and timezone.
- Primary admin.
- Team users and roles.
- Pipeline stages.
- Lead sources.
- Calendar owner(s).
- Availability and conflict calendars.
- Email sending domain.
- Reply/forwarding settings.
- Phone number and regulatory requirements.
- SMS/WhatsApp consent language.
- Google Business Profile where relevant.
- Social accounts where relevant.
- Payment provider where relevant.
- Domain(s) for funnels/sites.
- Review links.
- Notification preferences.
- Test records and test outcomes.

### 16.3 Activation Definition

A customer is not considered activated merely after account creation.

Proposed activation requires at least:

- Successful login.
- Business profile completed.
- At least one user confirmed.
- At least one lead-capture source working.
- At least one pipeline working.
- At least one calendar or next-step workflow configured.
- A complete test from lead capture to assigned opportunity.

Final activation definition is `TBD`.

## 17. CRM and Pipeline Requirements

- `CRM-001 MUST`: Every lead creates or updates a single contact according to
  an approved duplicate strategy.
- `CRM-002 MUST`: Required contact fields are defined.
- `CRM-003 MUST`: Consent metadata is stored where applicable.
- `CRM-004 MUST`: Lead source and attribution fields are preserved.
- `CRM-005 MUST`: Opportunity creation rules are defined.
- `CRM-006 MUST`: Pipeline stages have entry/exit definitions.
- `CRM-007 MUST`: Stage changes trigger only approved automations.
- `CRM-008 MUST`: Lost reasons are standardized.
- `CRM-009 MUST`: Assigned-user behavior is defined.
- `CRM-010 MUST`: Contacts and opportunities have clear data owners.
- `CRM-011 SHOULD`: Smart lists support operational queues.
- `CRM-012 SHOULD`: Custom objects are used only when standard objects are
  insufficient.

## 18. Conversations and Communication Requirements

- `COM-001 MUST`: Clearly list customer-visible supported channels.
- `COM-002 MUST`: Channel availability may depend on country, registration,
  integration, and plan.
- `COM-003 MUST`: Email, SMS, calling, and WhatsApp costs must be disclosed.
- `COM-004 MUST`: Customer consent and opt-out behavior must be defined.
- `COM-005 MUST`: Sending identities and domains must be configured.
- `COM-006 MUST`: Failed-message handling must be visible to operational users.
- `COM-007 MUST`: Templates must contain accurate sender identity.
- `COM-008 MUST`: Conversation assignment and ownership rules must be defined.
- `COM-009 MUST`: Kyntlo must not promise unrestricted sending.
- `COM-010 MUST`: Applicable phone/messaging registration is an onboarding
  dependency.

## 19. Workflow Requirements

- `AUT-001 MUST`: Every workflow has an owner and purpose.
- `AUT-002 MUST`: Every workflow has entry criteria.
- `AUT-003 MUST`: Re-entry behavior is documented.
- `AUT-004 MUST`: Stop conditions are documented.
- `AUT-005 MUST`: Communication steps respect consent and quiet-hour rules.
- `AUT-006 MUST`: Premium actions are identified.
- `AUT-007 MUST`: AI or external-model actions are separately identified.
- `AUT-008 MUST`: Usage-cost impact is documented.
- `AUT-009 MUST`: Workflows are tested with test contacts before publication.
- `AUT-010 MUST`: Production changes use version notes.
- `AUT-011 SHOULD`: High-risk workflows include internal error notification.
- `AUT-012 SHOULD`: Workflow templates use custom values rather than embedded
  customer-specific information.

## 20. Funnel, Website, and Form Requirements

- `SIT-001 MUST`: Kyntlo must state whether the website/funnel builder is
  included in each plan.
- `SIT-002 MUST`: Domain connection requirements must be disclosed.
- `SIT-003 MUST`: Published forms map to approved fields.
- `SIT-004 MUST`: Form submissions trigger a defined CRM flow.
- `SIT-005 MUST`: Consent language is configurable by market/use case.
- `SIT-006 MUST`: Templates do not contain Kyntlo/customer placeholder data
  after launch.
- `SIT-007 SHOULD`: Kyntlo supplies approved starter templates.
- `SIT-008 SHOULD`: Funnel analytics definitions are explained without
  overstating attribution accuracy.

## 21. Calendar Requirements

- `CAL-001 MUST`: Define supported calendar types per use case.
- `CAL-002 MUST`: Calendar owner and assignment rules are configured.
- `CAL-003 MUST`: Availability and conflict calendars are tested.
- `CAL-004 MUST`: Timezone behavior is clear.
- `CAL-005 MUST`: Confirmation, reminder, reschedule, cancellation, and
  no-show workflows are defined.
- `CAL-006 MUST`: Customer-facing calendars use approved Kyntlo/customer
  branding.
- `CAL-007 MUST`: Calendar embeds load without broken third-party-cookie
  assumptions where possible.

## 22. Reputation Requirements

- `REP-001 MUST`: Define whether review requests are included per plan.
- `REP-002 MUST`: Connect the correct review destination.
- `REP-003 MUST`: Review-request communication requires approved consent and
  templates.
- `REP-004 MUST`: Reviews AI availability and billing are disclosed.
- `REP-005 MUST`: Online Listings is represented as an optional/resold service
  unless included commercially.
- `REP-006 MUST`: No guarantee of review volume, rating, ranking, or removal.

## 23. AI Requirements

- `AI-001 MUST`: List the exact AI products included in each plan.
- `AI-002 MUST`: Distinguish unlimited-plan coverage from pay-per-use and
  excluded AI products.
- `AI-003 MUST`: Disclose that phone charges may still apply to AI calls.
- `AI-004 MUST`: Require customer review of AI prompts, knowledge, and actions.
- `AI-005 MUST`: Define escalation from AI to a human.
- `AI-006 MUST`: Avoid claims of perfect accuracy or autonomous sales results.
- `AI-007 MUST`: Identify AI-generated content to operational users where
  appropriate.
- `AI-008 MUST`: Protect sensitive data according to approved use cases.
- `AI-009 MUST`: Test AI agents before public deployment.
- `AI-010 MUST`: Document country, phone, channel, and provider prerequisites.

## 24. Billing, Wallet, Rebilling, and Reselling

### 24.1 Billing Principles

- `BIL-001 MUST`: Kyntlo remains the customer-facing billing owner.
- `BIL-002 MUST`: Every charge has a category: subscription, setup, managed
  service, usage, add-on, tax, adjustment, or refund.
- `BIL-003 MUST`: Customer invoices use approved legal identity.
- `BIL-004 MUST`: Stripe and HighLevel plan mappings are documented.
- `BIL-005 MUST`: Duplicate webhook/event handling is idempotent.
- `BIL-006 MUST`: Finance can reconcile customer charges to agency costs.

### 24.2 Wallet

HighLevel documents that agency wallet credits fund usage-based services and
auto-recharge when thresholds are reached.

- `BIL-010 MUST`: Kyntlo defines agency-wallet monitoring ownership.
- `BIL-011 MUST`: Minimum balance and recharge amounts are approved.
- `BIL-012 MUST`: Low-balance and failed-recharge alerts are monitored.
- `BIL-013 MUST`: Customer-facing wallet behavior is disclosed if sub-account
  wallets are used.
- `BIL-014 MUST`: Service interruption risk at zero balance is documented.

### 24.3 Rebilling

Current official HighLevel documentation states:

- Rebilling without markup is available on eligible Unlimited and Agency Pro
  plans for supported services.
- Rebilling with agency markup requires Agency Pro/SaaS Mode for supported
  services.
- HighLevel charges the agency first; the agency then charges the customer.

Requirements:

- `BIL-020 MUST`: Confirm Kyntlo's current HighLevel agency subscription.
- `BIL-021 MUST`: Confirm which services are rebilled.
- `BIL-022 MUST`: Confirm at-cost versus marked-up behavior per service.
- `BIL-023 MUST`: Disclose Kyntlo's customer rate, not only HighLevel's cost.
- `BIL-024 MUST`: Include Stripe fees and taxes in margin modeling.
- `BIL-025 MUST`: Test payment failure and auto-recharge behavior.
- `BIL-026 MUST`: Prevent unbounded agency-cost exposure.

### 24.4 Resold Services

- `BIL-030 MUST`: Identify every optional resold service.
- `BIL-031 MUST`: Define Kyntlo price and provider cost separately.
- `BIL-032 MUST`: Define per-sub-account versus agency-level billing.
- `BIL-033 MUST`: Define activation and cancellation timing.
- `BIL-034 MUST`: State usage charges that remain additional.
- `BIL-035 MUST`: Do not use outdated provider costs as permanent public
  prices.

### 24.5 Current Draft Rate Conflict

The existing Kyntlo draft prices do not match the current official HighLevel
cost guide in several places. This does not automatically make Kyntlo prices
wrong because Kyntlo may add margin, currency conversion, service, tax, or
support. It means the website must label them as Kyntlo customer prices and
define the pricing method.

Examples requiring review:

- Email infrastructure.
- Email validation.
- SMS/calling regional rates.
- Ad Manager.
- Branded Client Portal App.
- Dedicated IP.
- Domain purchase.
- WhatsApp.
- WordPress hosting.
- Online Listings.
- Workflow Pro.

## 25. Integrations and API Requirements

### 25.1 Native/Configured Integrations

- `INT-001 MUST`: Maintain an integration inventory.
- `INT-002 MUST`: Classify each as native, marketplace, Zapier/Pabbly,
  webhook, API, or manual.
- `INT-003 MUST`: Define authentication and account ownership.
- `INT-004 MUST`: Define data direction and objects synchronized.
- `INT-005 MUST`: Define failure monitoring.
- `INT-006 MUST`: Display logos only for integrations Kyntlo actually
  supports and is permitted to market.

### 25.2 Custom Integration

HighLevel supports private integration tokens for limited internal
single-sub-account use cases and OAuth for broader integrations requiring
webhooks, modules, and secure authorization.

- `INT-010 MUST`: Never embed private tokens in the public website.
- `INT-011 MUST`: Store credentials server-side.
- `INT-012 MUST`: Use least-privilege scopes.
- `INT-013 MUST`: Use OAuth where customer authorization or multi-account
  access requires it.
- `INT-014 MUST`: Validate webhook signatures/security according to the
  applicable integration.
- `INT-015 MUST`: Implement retry and idempotency.
- `INT-016 MUST`: Record integration errors without exposing sensitive data.

## 26. Data Requirements

### 26.1 Core Entities

- Visitor.
- Lead/contact.
- Company.
- User.
- Opportunity.
- Pipeline and stage.
- Appointment.
- Conversation.
- Message.
- Form/survey submission.
- Product/plan.
- Subscription.
- Invoice/payment/refund.
- Wallet transaction.
- Usage event.
- Add-on subscription.
- Consent record.
- Support request.
- Snapshot version.
- Provisioning job.

### 26.2 Data Governance

- `DAT-001 MUST`: Define authoritative source for every entity.
- `DAT-002 MUST`: Define contact duplicate rules.
- `DAT-003 MUST`: Define required and optional fields.
- `DAT-004 MUST`: Define retention periods.
- `DAT-005 MUST`: Define export and deletion procedures.
- `DAT-006 MUST`: Restrict access by role.
- `DAT-007 MUST`: Maintain auditability for commercial and administrative
  changes.
- `DAT-008 MUST`: Avoid real customer data in templates, snapshots, demos, and
  website screenshots.

## 27. Reporting and Analytics Requirements

### 27.1 Marketing Website

Track:

- Page views and landing pages.
- CTA impressions and clicks.
- Pricing-plan interactions.
- Feature-page engagement.
- Form starts, validation failures, and successful submissions.
- Calendar opens and completed bookings.
- Login clicks.
- Source/campaign attribution.

### 27.2 Sales

Track:

- New opportunities.
- Stage conversion.
- Time in stage.
- Demo outcome.
- Lost reason.
- Sales cycle.
- Plan selected.

### 27.3 SaaS Operations

Track:

- Provisioning success/failure.
- Snapshot version.
- Onboarding progress.
- Integration completion.
- Activation.
- Active users.
- Feature adoption.
- Support volume.
- Upgrade/downgrade/cancellation.

### 27.4 Finance

Track:

- MRR and ARR.
- Gross and net revenue.
- Usage revenue.
- Add-on revenue.
- Provider/HighLevel costs.
- Stripe/payment fees.
- Gross margin.
- Failed payments.
- Refunds.
- Wallet reloads.
- Cost/revenue by sub-account.

## 28. Non-Functional Requirements

### 28.1 Accessibility

- `NFR-A11Y-001 MUST`: Target WCAG 2.2 AA for the Kyntlo website.
- `NFR-A11Y-002 MUST`: Full keyboard navigation.
- `NFR-A11Y-003 MUST`: Visible focus.
- `NFR-A11Y-004 MUST`: Reduced-motion support.
- `NFR-A11Y-005 MUST`: Do not force a custom cursor on touch/coarse-pointer
  devices.
- `NFR-A11Y-006 MUST`: Accessible forms, tables, menus, and accordions.

### 28.2 Performance

- `NFR-PERF-001 MUST`: No broken local assets.
- `NFR-PERF-002 MUST`: Responsive, optimized images.
- `NFR-PERF-003 MUST`: Avoid delivering the 6250x6250 logo as-is.
- `NFR-PERF-004 MUST`: Pause or reduce decorative animation when not visible.
- `NFR-PERF-005 MUST`: Avoid unnecessary client JavaScript.
- `NFR-PERF-006 SHOULD`: Meet good Core Web Vitals at the 75th percentile.

### 28.3 Reliability

- `NFR-REL-001 MUST`: Monitor form and booking failures.
- `NFR-REL-002 MUST`: Provide a controlled fallback when third-party embeds
  fail.
- `NFR-REL-003 MUST`: Prevent duplicate form and provisioning actions.
- `NFR-REL-004 MUST`: Maintain rollback capability for website deployments.

### 28.4 Security

- `NFR-SEC-001 MUST`: HTTPS everywhere.
- `NFR-SEC-002 MUST`: No secrets in client code or repository.
- `NFR-SEC-003 MUST`: Server-side input validation.
- `NFR-SEC-004 MUST`: Rate limiting/spam controls on public endpoints.
- `NFR-SEC-005 MUST`: Least-privilege access to HighLevel and Stripe.
- `NFR-SEC-006 MUST`: Security headers and content policy appropriate to
  required embeds.
- `NFR-SEC-007 MUST`: Audit administrative access.

### 28.5 Maintainability

- `NFR-MNT-001 MUST`: Shared header, footer, buttons, plan cards, and content
  structures.
- `NFR-MNT-002 MUST`: Central plan and usage data.
- `NFR-MNT-003 MUST`: No duplicated Pricing/Compare source.
- `NFR-MNT-004 MUST`: Automated link and asset checks.
- `NFR-MNT-005 MUST`: Documented environment variables and deployment.

## 29. SEO and Content Requirements

- `SEO-001 MUST`: Unique title and description per page.
- `SEO-002 MUST`: Canonical URLs.
- `SEO-003 MUST`: Open Graph metadata and approved social image.
- `SEO-004 MUST`: Sitemap and robots rules.
- `SEO-005 MUST`: Crawlable internal links.
- `SEO-006 MUST`: Structured data only after business identity is confirmed.
- `SEO-007 MUST`: No unsupported superlative or quantified claim.
- `SEO-008 MUST`: Clearly explain Kyntlo plans without exposing internal GHL
  terminology unnecessarily.
- `SEO-009 SHOULD`: Build topic pages around approved customer problems and
  capabilities rather than copying HighLevel documentation.

## 30. Legal and Compliance Requirements

- `LEG-001 MUST`: Identify the correct contracting entity.
- `LEG-002 MUST`: Publish accurate Privacy, Terms, and Refund documents.
- `LEG-003 MUST`: Define Kyntlo's role and applicable provider/subprocessor
  disclosures.
- `LEG-004 MUST`: Define communications consent and opt-out behavior.
- `LEG-005 MUST`: Define cookie/analytics consent by target market.
- `LEG-006 MUST`: Define data rights, retention, deletion, and complaint path.
- `LEG-007 MUST`: Define subscription, renewal, usage, wallet, and add-on
  billing terms.
- `LEG-008 MUST`: Define provider outages and third-party service limitations.
- `LEG-009 MUST`: Define acceptable use for email, SMS, phone, WhatsApp, AI,
  and uploaded content.
- `LEG-010 MUST`: Obtain qualified legal review before publication.

HighLevel platform compliance or security statements must not be copied into a
claim that Kyntlo itself is compliant without evaluating Kyntlo's complete
operations, configuration, contracts, staff, and customer use.

## 31. Support Requirements

- `SUP-001 MUST`: Define customer support channels.
- `SUP-002 MUST`: Define operating hours and target response times.
- `SUP-003 MUST`: Define severity levels.
- `SUP-004 MUST`: Distinguish Kyntlo configuration/support from HighLevel
  platform incidents.
- `SUP-005 MUST`: Define the information required before escalation.
- `SUP-006 MUST`: Track sub-account, user, time, impact, and reproduction.
- `SUP-007 MUST`: Avoid sharing customer credentials through insecure
  channels.
- `SUP-008 SHOULD`: Provide onboarding and troubleshooting knowledge-base
  content.

## 32. Website-to-Product Traceability

| Current website section | Required product truth |
| --- | --- |
| Hero | Approved audience, outcome, and primary CTA |
| Dashboard preview | Real Kyntlo-branded HighLevel view or labeled mockup |
| Integrations marquee | Verified supported integration inventory |
| Platform/About | Accurate Kyntlo value and configuration layer |
| Feature cards | Feature matrix and ownership classification |
| Compare table | Approved assumptions and non-misleading comparison |
| Pricing cards | SaaS Configurator plan matrix and commercial rules |
| Usage accordion | Current Kyntlo customer rates and billing disclosures |
| Booking section | Working Kyntlo HighLevel calendar |
| Footer | Correct legal identity, support, login, legal, and social links |

## 33. Testing and Acceptance

### 33.1 Website UAT

- All routes load.
- No broken images or links.
- Mobile menu works.
- Forms create correct HighLevel records.
- Duplicate submissions are handled.
- Calendar booking, reminders, reschedule, and cancellation work.
- Login reaches Kyntlo-branded domain.
- Pricing values are consistent everywhere.
- Legal links are visible at conversion points.
- Keyboard, accessibility, responsive, performance, and browser checks pass.

### 33.2 SaaS Provisioning UAT

For each Kyntlo plan:

- Complete a real or approved test purchase.
- Confirm exactly one sub-account is created.
- Confirm customer user creation.
- Confirm welcome email branding and links.
- Confirm plan permissions.
- Confirm user limit.
- Confirm contact-limit behavior.
- Confirm snapshot assets.
- Confirm disabled features remain inaccessible.
- Confirm upgrade.
- Confirm downgrade.
- Confirm cancellation.
- Confirm payment failure.
- Confirm rebilling behavior.
- Confirm wallet visibility.
- Confirm add-on activation/cancellation.

### 33.3 Operational UAT

- Onboarding staff can complete checklist.
- Sales can view and advance opportunities.
- Support can identify account and plan.
- Finance can reconcile subscription and usage.
- Admin can identify snapshot version and configuration drift.
- Customer can find support, billing, and cancellation paths.

## 34. Dependencies

- Eligible HighLevel agency subscription.
- HighLevel SaaS Configurator configuration.
- Kyntlo Stripe connection.
- Kyntlo domain and DNS control.
- White-label app domain.
- API/branded-links domain.
- Email sending domain.
- Approved snapshot source account.
- Approved plan configuration.
- Approved product screenshots.
- Approved legal entity and legal documents.
- Booking calendar/team availability.
- Support process and staff.
- Target market and communications compliance decisions.

## 35. Risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Website sells unavailable features | Refunds, churn, legal exposure | Feature source of truth and plan UAT |
| Provider pricing changes | Margin loss or inaccurate website | Effective-dated central rates and review cadence |
| Incorrect rebilling setup | Agency absorbs usage costs | Agency-plan confirmation and billing UAT |
| Snapshot contains unsafe automation | Incorrect messages/actions | Clean test account and publish controls |
| Contact limits described as hard caps | Unexpected overage/data behavior | Accurate limitation disclosure |
| White-label links incomplete | GHL branding leakage | Configure app and API domains |
| Stock image appears to be product UI | Trust and misrepresentation risk | Real capture or labeled conceptual mockup |
| AI claims exceed configured product | Customer dissatisfaction | AI matrix and prerequisites |
| Regulatory messaging setup incomplete | Delivery failure/compliance exposure | Market-specific onboarding gates |
| Legal entity unresolved | Invalid contracting/disclosure | Block production checkout until resolved |
| Manual provisioning not monitored | Delayed onboarding | Provisioning queue, alerts, SLA |
| Kyntlo support relies entirely on GHL | Poor customer ownership | Tiered support and escalation process |

## 36. Open Decisions Requiring Kyntlo Input

These are the minimum questions that remain unclear and materially affect the
website and implementation.

### 36.1 HighLevel Account

1. Which HighLevel agency subscription does Kyntlo currently use: Starter,
   Unlimited, or Agency Pro?
2. Is SaaS Configurator already enabled and configured?
3. Is Kyntlo Stripe already connected at agency level?
4. Is LC Phone used, Twilio connected directly, or both?
5. Is LC Email used, Mailgun, SMTP, or a combination?
6. Does Kyntlo already have a snapshot? If yes, what does it contain?
7. What is the intended Kyntlo app subdomain?
8. What is the intended API/branded-links domain?
9. Is a white-label mobile app purchased or planned?

### 36.2 Commercial Model

10. Are the four website plans final?
11. Are the displayed EUR prices final and tax-inclusive or tax-exclusive?
12. Is there a setup/onboarding fee?
13. Is purchase self-service or sales-assisted?
14. What exactly does cashback mean, and is it real?
15. Which usage services are passed through at cost?
16. Which usage services include markup?
17. Which add-ons are available?
18. Is there an annual discount?
19. What are the refund and cancellation rules?

### 36.3 Feature Packaging

20. Which features are enabled in each plan?
21. What are user limits by plan?
22. What are contact limits by plan?
23. How many locations/sub-accounts does each customer receive?
24. Which AI products are included?
25. Is AI pay-per-use, unlimited, bundled with credits, or resold?
26. Is Voice AI included or only enabled on request?
27. Is WhatsApp included or an add-on?
28. Are memberships/courses included?
29. Are custom dashboards included?
30. Is the branded mobile app being sold?

### 36.4 Delivery

31. What onboarding work does Kyntlo perform?
32. Is funnel/website building software access only, template delivery, or
    done-for-you implementation?
33. Are campaign management and custom integrations sold separately?
34. Who handles customer support?
35. What are support hours and response targets?
36. Who owns billing disputes and refunds?

### 36.5 Website and Brand

37. Who is the primary customer segment and launch market?
38. Is the website English-only or bilingual?
39. What is the primary CTA?
40. What are the real sales/support contact details?
41. What are the official social URLs?
42. What is the correct company/legal identity?
43. Are Boush Adel, Rustam, Master Artists, and Kyntlo UK LTD approved public
    references?
44. Are real Kyntlo product screenshots available?

## 37. Recommended Release Sequence

### Release 0: Business Confirmation

- Answer Section 36.
- Approve legal identity.
- Approve HighLevel agency architecture.
- Approve plan and billing model.

### Release 1: Foundation

- Rebuild project structure.
- Centralize content and pricing.
- Correct assets and links.
- Configure production domains and environments.

### Release 2: Core Marketing

- Home.
- Platform/features.
- Pricing.
- Compare.
- About.
- Legal pages.

### Release 3: Conversion

- HighLevel lead form.
- HighLevel calendar.
- CRM pipeline and workflows.
- Analytics and consent.

### Release 4: SaaS Commerce

- SaaS checkout or secure sales-assisted signup.
- Provisioning.
- Welcome email.
- Snapshot.
- Login and onboarding.

### Release 5: Operational Hardening

- Billing/rebilling monitoring.
- Upgrades/downgrades/cancellations.
- Support workflows.
- Full UAT and launch monitoring.

## 38. BRD Approval Criteria

This BRD can move from Draft to Approved when:

- The HighLevel agency plan is confirmed.
- The Kyntlo business/legal identity is confirmed.
- The customer segment and primary conversion are confirmed.
- The plan matrix is complete.
- User/contact/location limits are complete.
- AI, communications, and add-on packaging are complete.
- Subscription and usage pricing are approved.
- Cashback is defined or removed.
- Onboarding and support responsibilities are approved.
- Website route map is approved.
- Legal review ownership is assigned.
- Acceptance owners are named.

## 39. Official Source Register

Sources were accessed on 2026-06-14. HighLevel features and pricing can change,
so implementation must revalidate time-sensitive values before launch.

1. HighLevel Support Knowledge Base:
   https://help.gohighlevel.com/support/solutions
2. White-label desktop app domain:
   https://help.gohighlevel.com/support/solutions/articles/48000982207-how-to-set-up-a-whitelabel-domain-for-the-desktop-web-app
3. SaaS Configurator category:
   https://help.gohighlevel.com/support/solutions/48000453216
4. SaaS Mode articles:
   https://help.gohighlevel.com/support/solutions/folders/48000676654
5. SaaS Mode activation and phone rebilling:
   https://help.gohighlevel.com/support/solutions/articles/48001177740-activate-saas-mode-request-payment-and-configure-phone-rebilling
6. SaaS permissions:
   https://help.gohighlevel.com/support/solutions/articles/48001184431-saas-user-level-permissions-vs-sub-account-level-permissions
7. User limits:
   https://help.gohighlevel.com/support/solutions/articles/155000001232-configuring-user-limits-for-saas-sub-accounts
8. Contact limits:
   https://help.gohighlevel.com/support/solutions/articles/155000001305-how-to-configure-contacts-limit-for-saas-sub-accounts
9. Welcome email customization:
   https://help.gohighlevel.com/support/solutions/articles/155000001317-how-to-customize-the-onboarding-email-that-is-sent-to-new-sub-account-users-
10. Snapshot overview:
    https://help.gohighlevel.com/support/solutions/articles/48000982511-snapshots-overview
11. HighLevel pricing guide:
    https://help.gohighlevel.com/support/solutions/articles/155000001156-highlevel-pricing-guide
12. Rebilling, reselling, and wallets:
    https://help.gohighlevel.com/support/solutions/articles/155000002095-rebilling-reselling-and-wallets-explained
13. AI Employee overview:
    https://help.gohighlevel.com/support/solutions/articles/155000003906-ai-employee-overview
14. HighLevel API documentation:
    https://marketplace.gohighlevel.com/docs/
15. HighLevel API authorization:
    https://marketplace.gohighlevel.com/docs/Authorization/authorization_doc/index.html

