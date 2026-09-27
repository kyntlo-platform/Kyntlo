# Kyntlo Core Snapshot Template Specification

Status: Draft for owner review
Created: 2026-09-27
Source: `docs/03-kyntlo-ghl-white-label-brd.md` sections 5.4, 6.2, 15, 16,
17-22 and 26.2; current plan cards in `pricing.html`
Implements: `SNP-001` to `SNP-012`, the BRD "Recommended core snapshot" list,
and the related `AUT-*`, `CAL-*`, `COM-*`, `CRM-*`, `SIT-*` and `REP-*`
requirements

## 1. Purpose and Reading Rules

This document specifies the Kyntlo core snapshot: the HighLevel sub-account
configuration that every new Kyntlo customer receives. Under the BRD product
boundary model it is **Kyntlo Configuration** (BRD 6.2). Loading it is not
complete onboarding (BRD 5.4); the post-snapshot checklist in section 7 must
also be finished.

Marks used in this document:

- `VERIFY`: Not confirmed by the BRD or by testing in the Kyntlo agency
  account. Must be checked in the snapshot source sub-account before release.
- `LEGAL`: Needs legal review for the customer's market before use.
- `PROPOSED`: Kyntlo default awaiting owner approval.

Plan availability:

- BRD 14.3 marks every capability per plan as `TBD`. The current site draft
  (`pricing.html`) lists workflow automation and SMS/WhatsApp as not included
  in Starter; appointment reminders from Growth; missed-call text-back,
  reputation management and reactivation campaigns in Pro only.
- The "Plans" column below follows that site draft and is always `VERIFY`
  until the SaaS Configurator mapping (SAA-001, SAA-002) is approved.
- The Scale / Customized plan is by agreement and is not listed per asset.
- If Starter excludes workflows, Starter accounts receive the data assets
  (fields, tags, pipeline, calendar, form) and the workflows stay unpublished
  or are omitted. Which option applies is `VERIFY`.

Customer-facing copy rules (all templates in this document):

- Plain language. Never use "workflow", "pipeline", "leverage" or "seamless"
  in anything a contact or customer reads. Say what happens: "We'll text you
  the day before."
- Accurate sender identity: every message names the customer's business
  (COM-007).
- Every SMS and every marketing email carries an opt-out line (COM-004).
- No guarantees of results, reviews, ratings or response times the business
  cannot keep (REP-006, AI-006).
- Never name the underlying platform in customer-facing text.

## 2. Versioning, Release Notes and Source Sub-Account

### 2.1 Version scheme

Format: `core-vMAJOR.MINOR.PATCH` (SNP-003). Snapshot name in the agency
account: `Kyntlo Core core-v1.0.0 (YYYY-MM-DD)`.

| Change | Bump | Examples | Safe to push to existing accounts |
| --- | --- | --- | --- |
| Breaking | MAJOR | Rename or delete a custom field, custom value, tag or pipeline stage; change a workflow trigger or stop condition that live contacts depend on | No. New accounts only, or a planned migration per account. |
| Additive | MINOR | New workflow (unpublished), new field, new tag, new template | Usually yes, per the asset's "Safe to push" note |
| Fix | PATCH | Copy fix in a template, wait-time change, typo in a field label | Yes, after backup (section 8) |

Every sub-account records the version it received (ONB-005) in the custom
value `kyntlo_snapshot_version`, so drift can be audited (BRD 33.3).

### 2.2 Release notes template

```markdown
## core-vX.Y.Z (YYYY-MM-DD)

Snapshot owner: <name>
Previous version: core-vX.Y.Z
Bump type: MAJOR | MINOR | PATCH

### Included asset categories (SNP-004)
- <fields / tags / pipeline / calendar / form / workflows / templates / dashboards>

### Changes
| Asset ID | Change | Reason | Safe to push (Y/N + note) |
| --- | --- | --- | --- |

### Excluded / post-install configuration (SNP-005)
- <anything the customer or onboarding team must set after loading>

### Usage-cost impact (AUT-008)
- <new or changed messages, premium or AI actions; "none" if none>

### QA (SNP-006)
- Clean sub-account: <name>
- Test cases run: <IDs> | Failures: <AUD-SNAP IDs from docs/04, all Verified>

### Approval
- Approved by: <name> / <date>
```

### 2.3 Source sub-account rules

| Rule | Requirement |
| --- | --- |
| One dedicated source sub-account, named `Kyntlo Core - Snapshot Source`, used for nothing else. | SNP-001 |
| Admin access limited to the named snapshot owner and one backup. Other staff get no access. | SNP-002 |
| No real customer contacts, conversations or appointments, ever. Test contacts use `@example.com` addresses and are tagged `ops-test-contact`. | SNP-007, DAT-008 |
| No Stripe connection, phone number, sending domain or third-party integration connected in the source account. | BRD 5.4 |
| All customer-specific text lives in custom values, pre-filled with `[SET AT ONBOARDING]`. | SNP-008, AUT-012 |
| All customer-messaging workflows are saved in **Draft**. | SNP-009 |
| Every change is recorded in the release notes before a new snapshot is taken. | AUT-010 |
| A separate clean QA sub-account is used for testing (section 8). The source account is not the test account. | SNP-006 |

## 3. Data Assets

### 3.1 Contact custom fields

| ID | Field | Type | Purpose | Set by |
| --- | --- | --- | --- | --- |
| `CORE-FLD-001` | Lead source | Dropdown (values in 3.4) | Where the contact first came from (CRM-004) | Form hidden field, workflow, or staff |
| `CORE-FLD-002` | Lead source detail | Single line | Campaign, referrer name or page | Form hidden field or staff |
| `CORE-FLD-003` | Preferred channel | Dropdown: SMS, Email, Phone, WhatsApp | Which channel follow-ups use first | Form |
| `CORE-FLD-004` | Service interest | Dropdown (customer edits values) | Routes leads and personalises messages | Form |
| `CORE-FLD-005` | SMS consent | Checkbox | Recorded SMS consent (CRM-003) | Form |
| `CORE-FLD-006` | SMS consent timestamp | Date/time | When SMS consent was given | Workflow on form submit |
| `CORE-FLD-007` | Email marketing consent | Checkbox | Recorded marketing email consent | Form |
| `CORE-FLD-008` | Email consent timestamp | Date/time | When email consent was given | Workflow on form submit |
| `CORE-FLD-009` | Consent source | Single line | Form name and consent wording version shown | Workflow on form submit |
| `CORE-FLD-010` | Average job value | Monetary | This contact's typical spend; feeds reactivation planning | Staff or import |
| `CORE-FLD-011` | Last visit date | Date | Last completed appointment or job; drives reactivation | Workflow or staff |
| `CORE-FLD-012` | No-show count | Number | Missed appointments | No-show workflow |
| `CORE-FLD-013` | Last review request date | Date | Prevents repeat review asks | Review request workflow |
| `CORE-FLD-014` | Reactivation status | Dropdown: Eligible, In sprint, Returned, Opted out | Tracks the Revenue Recovery Sprint | Reactivation workflow |

Whether the timestamp fields can be set by a workflow "update contact field"
action with the current date/time is `VERIFY`.

### 3.2 Opportunity custom fields

| ID | Field | Type | Purpose |
| --- | --- | --- | --- |
| `CORE-OFD-001` | Service requested | Dropdown (same values as `CORE-FLD-004`) | What the opportunity is for |
| `CORE-OFD-002` | Quote amount | Monetary | Value quoted; opportunity value is updated to match |
| `CORE-OFD-003` | Quote sent date | Date | Starts the quote follow-up timer |
| `CORE-OFD-004` | Lost reason detail | Single line | Free text after the standard lost reason (CRM-008) |
| `CORE-OFD-005` | Next follow-up date | Date | Staff reminder date |

Standard lost reasons (CRM-008): No response, Price, Chose another provider,
Not a fit, Timing, Duplicate or spam. Whether these use the native lost
reason list or a custom dropdown is `VERIFY`.

### 3.3 Standard tags

Format: lowercase, hyphenated, with a group prefix. Tags record state that
workflows read; facts about the contact belong in fields.

| Group | Tags | Meaning |
| --- | --- | --- |
| `status-` | `status-new-lead`, `status-contacted`, `status-booked`, `status-customer`, `status-lost` | Where the contact is in the sales process |
| `flow-` | `flow-no-show`, `flow-quote-sent`, `flow-review-requested`, `flow-reactivation`, `flow-reactivated` | Set and removed by workflows; used for stop conditions |
| `consent-` | `consent-sms`, `consent-email-marketing` | Mirror of the consent fields, for filters |
| `ops-` | `ops-do-not-automate`, `ops-test-contact`, `ops-vip` | Manual controls. `ops-do-not-automate` stops every core workflow. |

### 3.4 Main sales pipeline and lead source values

Pipeline `CORE-PIP-001` "Sales" (CRM-006):

| # | Stage | Entry | Exit |
| --- | --- | --- | --- |
| 1 | New lead | Opportunity created by form, missed call or staff | First reply sent by staff or contact responds |
| 2 | Contacted | Two-way contact made | Appointment booked, or marked Lost |
| 3 | Consultation booked | Appointment booked on the consultation calendar | Appointment marked showed or no-show |
| 4 | No-show | Appointment marked no-show | Rebooked (back to 3) or Lost |
| 5 | Consultation held | Appointment marked showed | Quote sent, or Won directly |
| 6 | Quote sent | Staff records quote amount and date | Status set to Won or Lost |

Won and Lost are opportunity statuses, not stages. Stage names are editable
by the customer at onboarding (BRD 16.2); renaming them after workflows are
published is a MAJOR change for that account.

Lead source values `CORE-SRC-001` (dropdown on `CORE-FLD-001`): Website form,
Phone call, Missed call, Walk-in, Referral, Google Business Profile, Google
Ads, Meta ads, Social media (organic), Email campaign, Reactivation, Imported
list, Other.

### 3.5 Data asset inventory

| ID | Name | Category | Purpose | Custom values used | Dependencies | Post-install configuration | Safe to push | Plans |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `CORE-FLD-*` | Contact fields | Custom fields | Section 3.1 | None | None | Edit `Service interest` values | Y, additive. N for renames. | All (VERIFY) |
| `CORE-OFD-*` | Opportunity fields | Custom fields | Section 3.2 | None | `CORE-PIP-001` | Edit `Service requested` values | Y, additive | All (VERIFY) |
| `CORE-TAG` | Standard tags | Tags | Section 3.3 | None | None | None | Y | All (VERIFY) |
| `CORE-PIP-001` | Sales pipeline | Pipeline | Section 3.4 | None | Fields | Confirm or rename stages | N if the account has renamed stages or live opportunities | All (VERIFY) |
| `CORE-SRC-001` | Lead sources | Field values | Section 3.4 | None | `CORE-FLD-001` | Remove unused values | Y, additive | All (VERIFY) |
| `CORE-CAL-001` | Consultation calendar | Calendar | Bookable first appointment (CAL-001) | `consultation_name`, `consultation_duration_minutes`, `business_address_text` | Users, `CORE-FRM-001` fields | Assign users, availability, conflict calendars, timezone check (CAL-002 to CAL-004) | N. Overwrites availability and assignments. | All (VERIFY) |
| `CORE-FRM-001` | Lead capture form | Form | Website enquiry into CRM (SIT-003, SIT-004) | `sms_consent_text`, `email_consent_text`, `privacy_policy_url` | Fields, `CORE-WF-01` | Review consent text per market (SIT-005, `LEGAL`); embed on site | N if the customer has edited the form | All (VERIFY) |
| `CORE-DSH-001` | Basic dashboard | Dashboard | New leads, bookings, no-shows, won value by source | None | Pipeline, calendar | None | Y | VERIFY |
| `CORE-ONB-001` | Onboarding checklist | Checklist assets | Tracks section 7 inside the account | None | None | Onboarding owner works through it | Y | All |

Calendar settings in the snapshot (`PROPOSED`, all `VERIFY` against the
current calendar options):

- Type per use case (CAL-001): single-owner by default; round-robin for
  teams, set at onboarding.
- Timezone: the sub-account timezone; the booking page shows the contact's
  local time (CAL-004).
- Minimum notice 2 hours, buffer 15 minutes, booking window 30 days.
- Native calendar notifications **off**. Confirmations and reminders come
  only from `CORE-WF-02`, so contacts never receive duplicates.

Lead capture form fields: First name (required), Last name, Phone, Email
(one of phone or email required), Service interest, Message, Preferred
channel, SMS consent checkbox (unticked, separate), Email marketing consent
checkbox (unticked, separate), hidden Lead source = Website form. Consent
text is shown from custom values and links to `privacy_policy_url`.

## 4. Workflows

### 4.1 Common rules

- Owner (AUT-001): the Kyntlo snapshot owner owns the template; the
  customer's named admin owns the live copy after onboarding.
- Every workflow exits contacts tagged `ops-do-not-automate` or on
  Do Not Disturb for the channel being used.
- Quiet hours (AUT-005, `PROPOSED`, `LEGAL` per market): SMS and marketing
  email only 09:00-19:00 Monday to Saturday in the sub-account timezone.
  Messages due outside that window wait. Transactional appointment messages
  may send 08:00-20:00.
- Consent (COM-004): SMS steps require `consent-sms` or a transactional
  basis (an enquiry or booking the contact made); marketing steps require the
  matching marketing consent. The exact rule per market is `LEGAL`.
- Premium and AI actions (AUT-006, AUT-007): the core uses none by design.
  Which actions the platform currently bills as premium is `VERIFY` for every
  action listed below. Adding a premium or AI action is a MINOR release and
  must be flagged in the release notes.
- Usage cost (AUT-008): each SMS segment and email sent is a usage charge at
  the Kyntlo customer rate (draft rates in `docs/02` section 5, all `VERIFY`).
  Counts below are per contact per run.
- All workflows ship in Draft and are published only after the publish gate
  in section 7 passes (SNP-009).
- High-risk workflows (`CORE-WF-06`, `CORE-WF-08`, `CORE-WF-09`) send an
  internal notification to `internal_notify_email` if a send step fails
  (AUT-011).

### 4.2 Workflow inventory

| ID | Name | Purpose | Custom values used | Dependencies | Post-install configuration | Safe to push | Plans |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `CORE-WF-01` | Contact confirmation | Tell a new enquirer we received it and what happens next | `booking_link`, `response_time_text`, `business_phone` | `CORE-FRM-001`, fields | Set response time text | Y if not published in the account; otherwise N | Email: all. SMS: Growth+ (VERIFY) |
| `CORE-WF-02` | Appointment reminder | Confirm and remind booked appointments (CAL-005) | `consultation_name`, `business_address_text`, `reschedule_link` | `CORE-CAL-001` | None beyond values | N if published | Growth+ (VERIFY) |
| `CORE-WF-03` | No-show | Offer a new time once, then hand to staff | `booking_link` | `CORE-CAL-001`, `CORE-PIP-001` | None | N if published | Growth+ (VERIFY) |
| `CORE-WF-04` | New lead assignment | Assign an owner and a first-contact task (CRM-009, COM-008) | `internal_notify_email` | Users, `CORE-PIP-001` | Choose assignment users | Y, internal only | Growth+ (VERIFY) |
| `CORE-WF-05` | Opportunity stage automation | Move opportunities when appointments change (CRM-007) | None | `CORE-PIP-001`, `CORE-CAL-001` | None | N if stages were renamed | Growth+ (VERIFY) |
| `CORE-WF-06` | Review request | Ask customers for a review once | `review_link`, `review_request_delay_hours` | Review destination connected (REP-002) | Connect review destination | N if published | Pro (VERIFY) |
| `CORE-WF-07` | Missed-call text-back | Text a caller whose call was missed | `booking_link` | Phone number, messaging registration (COM-010) | Number and registration | N if published | Pro (VERIFY) |
| `CORE-WF-08` | Revenue Recovery Sprint | Invite dormant customers back | `booking_link`, `reactivation_offer_text`, `reactivation_dormant_days` | `CORE-FLD-011`, consent fields | Approve offer text and contact list | N. New per sprint. | Pro (VERIFY) |
| `CORE-WF-09` | Quote follow-up | Follow up quotes untouched for 5 days | `quote_followup_days`, `business_phone` | `CORE-PIP-001`, `CORE-OFD-003` | None | N if published | Growth+ (VERIFY) |

### 4.3 Workflow specifications

| ID | Trigger / entry (AUT-002) | Re-entry (AUT-003) | Stop conditions (AUT-004) | Quiet hours / consent | Premium / AI | Usage per run |
| --- | --- | --- | --- | --- | --- | --- |
| `CORE-WF-01` | `CORE-FRM-001` submitted. Sets consent timestamps and source, sets Lead source if blank, tags `status-new-lead`, creates opportunity in New lead if none open. | Allowed; a contact with an open opportunity is not given a second one (CRM-001). | Ends after messages. | Email always (transactional). SMS only if SMS consent ticked. Immediate send is allowed in transactional hours. | None (VERIFY) | 1 email + 0-1 SMS |
| `CORE-WF-02` | Appointment booked on `CORE-CAL-001`. Confirmation now, reminder 24 h before, reminder 2 h before. | Re-enters on reschedule; the earlier run is removed. | Appointment cancelled, rescheduled or past; contact DND. | Transactional. SMS only if a phone number exists and the contact has not opted out. | None (VERIFY) | Up to 2 email + 2 SMS |
| `CORE-WF-03` | Appointment status set to no-show. Adds 1 to `No-show count`, moves opportunity to No-show, tags `flow-no-show`. Message now, second message after 2 days, then a staff task. | Allowed, once per appointment. | Contact books again; opportunity Lost; `No-show count` >= 3 (staff task only, no messages). | Transactional hours; SMS as for `CORE-WF-02`. | "Add to number field" action may be premium (VERIFY). | Up to 2 email + 2 SMS |
| `CORE-WF-04` | Opportunity created in New lead. Assigns user (round-robin among chosen users), creates task "First contact within `response_time_text`", notifies assignee. | Once per opportunity. | Opportunity already has an owner. | Internal only. | None (VERIFY) | Internal notifications only |
| `CORE-WF-05` | Appointment booked -> Consultation booked. Showed -> Consultation held, sets Last visit date. Status Won -> tags `status-customer`, removes `status-new-lead`. | Every event. | Opportunity closed (except the Won step). | No messages. | None (VERIFY) | None |
| `CORE-WF-06` | Opportunity status Won, or appointment showed (one chosen at onboarding). Waits `review_request_delay_hours`, sends request, one reminder after 3 days. | Not if `Last review request date` is within 90 days. | Contact replies, opts out, or has `flow-review-requested` from this run. | Quiet hours apply. Every customer gets the same request and link: no screening for happy customers first, no incentives (`LEGAL`, REP-003, REP-006). | Reviews AI replies are separate and billable (REP-004); not part of this workflow. | 1-2 SMS or 1-2 email |
| `CORE-WF-07` | Inbound call to the account number missed or unanswered. Sends one text, creates contact if new with Lead source = Missed call, creates task. | Once per contact per 12 hours. | Contact on DND; call was answered. | Replying to the caller is transactional in most markets (`LEGAL` per market). Quiet hours: outside hours, the text says when the team will call back. | Trigger type may be premium (VERIFY). No AI in core. | 1 SMS |
| `CORE-WF-08` | Manual start by staff on a smart list: `Last visit date` older than `reactivation_dormant_days`, marketing consent for the channel, not DND, no open opportunity. Sets status In sprint. Three messages over 10 days. | Once per sprint; not again for 180 days (`PROPOSED`). | Contact books, replies, or opts out; status set to Returned or Opted out. | Marketing: consent required, quiet hours apply, opt-out on every message. | None (VERIFY) | Up to 3 SMS or 3 email |
| `CORE-WF-09` | Opportunity in Quote sent with no stage or status change for `quote_followup_days` (default 5). Sends one follow-up, then a staff task after 2 more days. | Once per quote; re-enters if a new quote date is set. | Opportunity moves stage or closes; contact replies. | Transactional (the contact asked for the quote). Quiet hours apply. | Stale-opportunity trigger availability is VERIFY; fallback is a wait step plus stage check. | 1 email + 0-1 SMS |

Revenue Recovery Sprint planning (internal only):

- Planning estimate = eligible contacts x 3% return x `average_job_value`.
- 3% is Kyntlo's conservative planning rate for sizing a sprint with the
  customer. It is not a promise and must never appear as an expected result in
  customer-facing copy or on the website.
- `reactivation_dormant_days` default 180 is `PROPOSED`; set per business at
  onboarding.

## 5. Message Templates

Merge-field names follow the platform picker; confirm each one in the source
account (`VERIFY`). Keep SMS under 160 characters where possible and avoid
emoji and curly quotes, which switch SMS to a longer-cost encoding.

### 5.1 Contact confirmation (`CORE-WF-01`)

SMS:

```text
{{location.name}}: Hi {{contact.first_name}}, thanks for getting in touch. We'll reply within {{custom_values.response_time_text}}. Book a time now: {{custom_values.booking_link}} Reply STOP to opt out.
```

Email subject: `We got your message - {{location.name}}`

```text
Hi {{contact.first_name}},

Thanks for contacting {{location.name}}. A member of our team will reply
within {{custom_values.response_time_text}}.

If you'd like to pick a time now, you can book here:
{{custom_values.booking_link}}

Or call us on {{custom_values.business_phone}}.

{{location.name}}
```

### 5.2 Appointment confirmation and reminders (`CORE-WF-02`)

Confirmation SMS:

```text
{{location.name}}: You're booked for {{custom_values.consultation_name}} on {{appointment.only_start_date}} at {{appointment.only_start_time}}. Need to change it? {{custom_values.reschedule_link}} Reply STOP to opt out.
```

24-hour reminder SMS:

```text
{{location.name}}: Reminder - see you tomorrow at {{appointment.only_start_time}}, {{custom_values.business_address_text}}. Can't make it? {{custom_values.reschedule_link}} Reply STOP to opt out.
```

2-hour reminder SMS:

```text
{{location.name}}: See you at {{appointment.only_start_time}} today. Running late? Call {{custom_values.business_phone}}. Reply STOP to opt out.
```

Confirmation email subject: `Your {{custom_values.consultation_name}} on {{appointment.only_start_date}}`

```text
Hi {{contact.first_name}},

You're booked with {{location.name}}:

When:  {{appointment.only_start_date}} at {{appointment.only_start_time}}
Where: {{custom_values.business_address_text}}

We'll text you the day before and two hours before.
Need a different time? {{custom_values.reschedule_link}}

{{location.name}}
```

### 5.3 No-show (`CORE-WF-03`)

```text
{{location.name}}: Sorry we missed you today, {{contact.first_name}}. Want to pick a new time? {{custom_values.booking_link}} Reply STOP to opt out.
```

Second message (2 days later):

```text
{{location.name}}: Still happy to see you. Book a time that suits you here: {{custom_values.booking_link}} or just reply to this text. Reply STOP to opt out.
```

### 5.4 Review request (`CORE-WF-06`)

```text
{{location.name}}: Thanks for choosing us, {{contact.first_name}}. If you have a minute, we'd appreciate a review: {{custom_values.review_link}} Reply STOP to opt out.
```

Reminder (3 days later, only if no reply):

```text
{{location.name}}: A quick reminder in case you'd like to leave a review: {{custom_values.review_link}} Thank you. Reply STOP to opt out.
```

### 5.5 Missed-call text-back (`CORE-WF-07`)

In hours:

```text
{{location.name}}: Sorry we missed your call. Reply here and we'll get back to you shortly, or book a time: {{custom_values.booking_link}} Reply STOP to opt out.
```

Out of hours:

```text
{{location.name}}: Sorry we missed your call. We're closed right now ({{custom_values.business_hours_text}}). We'll call you back when we open. Reply STOP to opt out.
```

### 5.6 Revenue Recovery Sprint (`CORE-WF-08`)

Message 1:

```text
{{location.name}}: Hi {{contact.first_name}}, it's been a while. We'd love to see you again. Book here: {{custom_values.booking_link}} Reply STOP to opt out.
```

Message 2 (day 4, only if `reactivation_offer_text` is approved and filled):

```text
{{location.name}}: {{custom_values.reactivation_offer_text}} Book here: {{custom_values.booking_link}} Reply STOP to opt out.
```

Message 3 (day 10):

```text
{{location.name}}: Last note from us on this. If you'd like to come back, book any time: {{custom_values.booking_link}} Reply STOP to opt out.
```

Email versions use the same wording plus the platform unsubscribe link in
the footer and the business address (`LEGAL` per market).

### 5.7 Quote follow-up (`CORE-WF-09`)

Email subject: `Your quote from {{location.name}}`

```text
Hi {{contact.first_name}},

We sent your quote a few days ago and wanted to check whether you have any
questions. Just reply to this email or call {{custom_values.business_phone}}.

{{location.name}}
```

SMS (only if the contact's preferred channel is SMS):

```text
{{location.name}}: Hi {{contact.first_name}}, any questions about your quote? Reply here or call {{custom_values.business_phone}}. Reply STOP to opt out.
```

## 6. Custom Values Register

Filled by the customer with the onboarding team (SNP-008). Every value ships
as `[SET AT ONBOARDING]`. "Gate" = must be filled before the publish gate in
section 7 passes.

| Key | Example | Used by | Gate |
| --- | --- | --- | --- |
| `booking_link` | Link to the consultation calendar | WF-01, 03, 07, 08 | Y |
| `reschedule_link` | Reschedule link for the calendar (VERIFY source) | WF-02 | Y |
| `business_phone` | +44 20 7946 0000 | WF-01, 02, 09 | Y |
| `business_address_text` | 12 High Street, Leeds, or "Online (link sent by email)" | CAL-001, WF-02 | Y |
| `business_hours_text` | Mon-Fri 9am-6pm | WF-07 | Y |
| `response_time_text` | one working day | WF-01, 04 | Y |
| `consultation_name` | free consultation | CAL-001, WF-02 | Y |
| `consultation_duration_minutes` | 30 | CAL-001 | Y |
| `review_link` | Direct review link for the business listing | WF-06 | Y if WF-06 used |
| `review_request_delay_hours` | 2 | WF-06 | Y if WF-06 used |
| `reactivation_dormant_days` | 180 | WF-08 | Y if WF-08 used |
| `reactivation_offer_text` | Approved offer wording, or left blank to skip message 2 | WF-08 | N |
| `average_job_value` | 120 | Sprint planning, dashboard | N |
| `quote_followup_days` | 5 | WF-09 | Y if WF-09 used |
| `internal_notify_email` | team@customer-domain | WF-04, error alerts | Y |
| `sms_consent_text` | Market-approved SMS consent wording (`LEGAL`) | CORE-FRM-001 | Y |
| `email_consent_text` | Market-approved marketing email consent wording (`LEGAL`) | CORE-FRM-001 | Y |
| `privacy_policy_url` | Customer's privacy notice URL | CORE-FRM-001 | Y |
| `kyntlo_snapshot_version` | core-v1.0.0 | Drift audit | Y (set by Kyntlo) |

Business name comes from `{{location.name}}`, which must be the customer's
trading name, not a legal or internal account name.

## 7. Not Carried by the Snapshot, and the Post-Snapshot Checklist

The snapshot does not transfer (BRD 5.4): contacts, appointments,
conversations and message history, reputation data, Stripe connections,
third-party integrations, assigned phone numbers, and certain
private/protected assets. The snapshot also does not replace the customer
setup checklist in BRD 16.2.

Post-snapshot integration checklist (per sub-account, SNP-005):

- [ ] Correct plan, permissions and limits applied (ONB-003, ONB-004).
- [ ] `kyntlo_snapshot_version` set to the version loaded (ONB-005).
- [ ] Business profile, address and timezone confirmed.
- [ ] Users created and assigned to the calendar and lead assignment (CAL-002).
- [ ] Phone number purchased or ported, and assigned (COM-010).
- [ ] Messaging registration submitted and approved where required for the
      market (COM-010). No SMS workflow is published before approval.
- [ ] WhatsApp connected, if included and required (VERIFY per plan).
- [ ] Stripe or other payment provider connected, if the customer takes
      payments.
- [ ] Sending domain set up and verified; reply and forwarding addresses set
      (COM-005).
- [ ] Funnel/site domain connected, if used (SIT-002).
- [ ] Google or Outlook calendars connected as conflict calendars; availability
      tested (CAL-003).
- [ ] Review destination connected and `review_link` tested (REP-002).
- [ ] AI agent knowledge base loaded and reviewed by the customer before any
      AI agent is switched on (AI-004, AI-009). Not part of the core.
- [ ] All custom values marked Gate = Y filled; no `[SET AT ONBOARDING]` left
      in any customer-facing asset (SIT-006).
- [ ] Consent wording approved for the customer's market (`LEGAL`).
- [ ] Test contacts created (`ops-test-contact`, customer staff numbers and
      addresses only) and every workflow run end to end (AUT-009).
- [ ] Lead capture form embedded and one real test submission reaches the
      pipeline with the right owner (BRD 16.3).
- [ ] **Publish gate (SNP-009):** workflows are published one by one only
      when every item above that they depend on is ticked. Record who
      published, when, and the snapshot version.

## 8. QA and Update Procedure

### 8.1 QA in a clean sub-account (SNP-006)

Load the candidate snapshot into a fresh QA sub-account with no prior
snapshot, fill custom values with test data, connect a test phone number and
sending domain, and use test contacts only. Log every failure with the
`docs/04` template as `AUD-SNAP-<nnn>`. Release only when all S1 and S2
findings are Verified.

| Test | Check | Pass when |
| --- | --- | --- |
| `QA-01` | Asset count | Every asset in sections 3 and 4 is present; nothing else came across |
| `QA-02` | No real data | No contacts, conversations or customer names in any asset (SNP-007) |
| `QA-03` | Placeholders | Every customer-facing text uses custom values; none hard-coded (AUT-012) |
| `QA-04` | Draft state | All messaging workflows arrive in Draft (SNP-009) |
| `QA-05` | Form | Submission creates one contact, sets consent fields and timestamps, creates one opportunity (SIT-003, SIT-004, CRM-001) |
| `QA-06` | Duplicate | Second submission with the same email updates, does not duplicate |
| `QA-07` | Booking | Book, reschedule, cancel: correct messages, no duplicates from native notifications (CAL-005) |
| `QA-08` | Timezone | Contact in a different timezone sees correct local time (CAL-004) |
| `QA-09` | No-show | Count increments, stage moves, stops after rebooking |
| `QA-10` | Assignment | Round-robin assigns owner and task |
| `QA-11` | Review | One request, one reminder, skipped within 90 days |
| `QA-12` | Missed call | One text per 12 hours; out-of-hours wording used out of hours |
| `QA-13` | Sprint | Only consented, dormant, non-DND contacts enter; exits on reply or booking |
| `QA-14` | Quote | Fires after `quote_followup_days` with no change; not if stage moved |
| `QA-15` | Opt-out | Replying STOP sets DND and stops every workflow |
| `QA-16` | Quiet hours | A message due at 22:00 waits until the window opens |
| `QA-17` | Copy | No banned words, no vendor name, sender is the business, opt-out present |
| `QA-18` | Cost | Messages sent per run match section 4.3 |

### 8.2 Update and push to existing accounts (SNP-010, SNP-011)

1. Write the release notes (section 2.2) with a "Safe to push" decision per
   changed asset.
2. Pass QA (8.1) in a clean sub-account.
3. List the target accounts and their current `kyntlo_snapshot_version`.
4. **Back up first:** take a snapshot of each target account (or at minimum
   of every affected asset) named `Backup <account> <date> before core-vX.Y.Z`
   and record it (SNP-011).
5. Push only assets marked Safe to push = Y. How the platform handles an
   asset that already exists in the target (skip, duplicate or overwrite) is
   `VERIFY`; test the chosen option on one account first.
6. Never push over a workflow the customer has published or edited. Send the
   change as a note to the account owner instead.
7. Spot-check the first account with `QA-01`, `QA-04`, `QA-05` and `QA-17`,
   then continue in batches.
8. Update `kyntlo_snapshot_version` in each account and log the push.
9. Rollback: restore affected assets from the backup snapshot, and log an
   `AUD-SNAP` finding.

## 9. Vertical Overlays (SHOULD, later)

Built only after the core is stable (SNP-012). An overlay is loaded on top of
the core, adds assets, and never renames or removes core assets.

| Overlay | Adds (all `PROPOSED`) |
| --- | --- |
| Clinics | Intake and consent forms, pre-visit instruction message, recall reminders by treatment interval. Health data handling is `LEGAL` before any field is added. |
| Home services | Site-visit calendar with travel buffer, job address fields, estimate stages, "on our way" message, seasonal service reminders. |
| Salons | Service and stylist calendars, rebook reminder after a set number of weeks, no-show deposit policy text (`VERIFY` payments). |
| Fitness | Trial class calendar, membership stages, missed-class check-in, renewal reminders. Memberships only where the plan includes them (`VERIFY`). |
| Agencies | Client-onboarding pipeline, discovery-call calendar, proposal follow-up, monthly report reminder. |
