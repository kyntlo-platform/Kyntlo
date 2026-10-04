# Kyntlo Post-Audit Follow-Up Email Sequence

Status: Built in HighLevel (pilot, approval mode). See `05-post-audit-approval-engine-runbook.md`
Created: 2026-10-04
Related: `01-product-decisions.md`, `02-content-and-claims-audit.md`,
`03-kyntlo-ghl-white-label-brd.md`

## 1. Purpose and Assumptions

This sequence follows up with a prospect after Kyntlo has completed a free
growth audit of their business. The audit reviews how they capture leads,
how fast they follow up, how bookings happen, and where leads are lost. It
is delivered as a report, on a review call, or both.

The audit offer is not described anywhere on the current website. These
points are assumptions until the owner confirms them:

| Assumption | Status |
| --- | --- |
| The audit is free and covers lead capture, follow-up speed, booking, reviews, and reactivation | REQUIRED |
| Every audit produces a written summary with 3 findings and 1 quick win | REQUIRED |
| The main conversion after an audit is an implementation call; a 14-day free trial is the secondary option | PROPOSED |
| A 14-day free trial, no setup fees, and cancel anytime (all on the home page) are accurate | VERIFY |
| The emails are sent from a named person (the audit owner), not from a no-reply address | PROPOSED |
| The sequence runs as a HighLevel workflow in the Kyntlo agency account | PROPOSED |

Claims rule: this copy follows `02-content-and-claims-audit.md`. It has no
customer counts, results percentages, or time-saved figures. Social proof
appears only as marked placeholders that must be filled with evidence before
sending.

## 2. Sequence Overview

```
Sequence name:   Post-Audit Follow-Up
Trigger:         Opportunity stage moves to "Audit Delivered"
                 (tag: audit-delivered)
Goal:            Book an implementation call
                 (secondary: start the free trial)
Length:          6 emails, plus 1 conditional email
Timing:          Day 0, 2, 4, 7, 10, 14. Weekdays only, sent at 09:30 in
                 the contact's time zone
Exit conditions: Implementation call booked, trial started, plan purchased,
                 the contact replies (send to owner for manual follow-up),
                 unsubscribe, or opportunity marked Lost
```

### Sequence logic

| # | Day | Job | Primary CTA |
| --- | --- | --- | --- |
| 1 | 0 | Deliver the audit and restate the top 3 findings | Book a walkthrough call |
| 2 | 2 | Give a quick win they can do on their own | Reply with questions, or book the call |
| 3 | 4 | Explain what the gap costs them, using their own numbers | Book the call |
| 4 | 7 | Show the fix: how Kyntlo would close each finding | Book an implementation call |
| 5 | 10 | Handle objections (switching, cost, time) | Start the free trial |
| 6 | 14 | Breakup email: one last offer, then stop | Reply "yes", "later" or "no" |
| C | — | No-show: they booked the walkthrough call and missed it | Rebook |

## 3. Required Merge Fields

Create these as contact custom fields in HighLevel. Fill them in when the
audit is delivered. A sequence that is missing any of them must not start.

| Field key | Example | Notes |
| --- | --- | --- |
| `contact.first_name` | Sara | Standard field |
| `contact.company_name` | Bright Smile Dental | Standard field |
| `contact.audit_report_link` | Link to report | PDF or hosted page |
| `contact.audit_finding_1` | New web enquiries wait over 4 hours for a reply | Most expensive gap first |
| `contact.audit_finding_2` | Missed calls get no text-back | |
| `contact.audit_finding_3` | No review request after appointments | |
| `contact.audit_quick_win` | Add an auto-reply to your contact form | Something they can do in 30 minutes or less without Kyntlo |
| `contact.audit_monthly_leads` | 120 | Their own figure from the audit |
| `contact.audit_avg_customer_value` | €450 | Their own figure, in their currency |
| `contact.audit_recommended_plan` | Growth | Starter / Growth / Pro / Scale |
| `user.name` | Name of the audit owner | Sender |
| `custom_values.implementation_call_link` | Calendar link | Use a separate calendar from the public demo |
| `custom_values.trial_link` | `https://kyntlo.ai/trial` | |

Findings should describe what the audit observed ("enquiries waited about
4 hours"). They should not predict results ("you'll double bookings").

## 4. Emails

### Email 1: Audit delivered

```
Send:     Day 0, within 1 hour of the audit being delivered
Subject:  {{contact.first_name}}, your Kyntlo growth audit
Preview:  The three places {{contact.company_name}} is losing leads, plus
          the one to fix first.
```

Hi {{contact.first_name}},

Thanks for letting us look under the hood at {{contact.company_name}}. Your
full audit is here: **{{contact.audit_report_link}}**

If you only read one part, read this. These are the three gaps that matter
most, most expensive first:

1. **{{contact.audit_finding_1}}**
2. **{{contact.audit_finding_2}}**
3. **{{contact.audit_finding_3}}**

None of these mean anyone is doing a bad job. They're what happens when
leads come in through five channels and the follow-up depends on whoever
is free at the time.

I'd like to walk you through the report in 20 minutes. I'll show you which
fixes you can do yourself and which need a system.

**[Book my audit walkthrough →]** {{custom_values.implementation_call_link}}

Or just reply to this email with your questions. It comes straight to me.

{{user.name}}
Kyntlo

---

### Email 2: Quick win

```
Send:     Day 2
Subject:  A 30-minute fix from your audit
Preview:  You don't need Kyntlo for this one. Do it this week.
```

Hi {{contact.first_name}},

Before we talk about tools, here's one thing from your audit you can fix
this week on your own:

**{{contact.audit_quick_win}}**

Why it's first: when a new enquiry hears back quickly, it's far more likely
to turn into a conversation. Today, that speed depends on whoever happens to
be at the desk. This fix sets a minimum standard for every lead, even when
the team is busy.

How to do it:

1. Open the place where enquiries arrive (form, inbox, or booking page).
2. Set an instant reply that confirms you got the message, says when they'll
   hear back, and gives them a way to book.
3. Send yourself a test enquiry and check what a lead actually sees.

If you get stuck, reply and I'll help. No call needed.

{{user.name}}

P.S. The other two findings, {{contact.audit_finding_2}} and
{{contact.audit_finding_3}}, are harder to fix by hand. That's where a
system helps. I'll cover them in a later email.

---

### Email 3: What the gap costs

```
Send:     Day 4
Subject:  What "{{contact.audit_finding_1}}" is costing you
Preview:  Your own numbers from the audit, not ours.
```

Hi {{contact.first_name}},

During the audit you told us {{contact.company_name}} gets about
**{{contact.audit_monthly_leads}} leads a month**, and an average customer
is worth about **{{contact.audit_avg_customer_value}}**.

Here's a simple way to think about the top finding,
*{{contact.audit_finding_1}}*:

> Each lead that goes cold because nobody followed up in time is worth
> about {{contact.audit_avg_customer_value}} in lost revenue.

You don't need an exact number. Ask yourself: *how many of last month's
leads never got a second follow-up?* Most teams we audit can't answer that.
That's the real problem. You can't fix a leak you can't see.

On a short call, we can work through this with your actual pipeline and
decide whether fixing it is worth it for you. If it isn't, I'll tell you.

**[Book a 20-minute call →]** {{custom_values.implementation_call_link}}

{{user.name}}

---

### Email 4: The fix

```
Send:     Day 7
Subject:  How we'd close the three gaps at {{contact.company_name}}
Preview:  Finding by finding, with what's automated and what stays with
          your team.
```

Hi {{contact.first_name}},

Here's how the three findings from your audit map to Kyntlo. Kyntlo is the
CRM, follow-up, and booking platform we'd set up for you.

**1. {{contact.audit_finding_1}}**
New leads from your forms, ads, and messages land in one inbox. They get an
instant reply, and they're assigned to someone with a follow-up task.

**2. {{contact.audit_finding_2}}**
Missed calls trigger an automatic text-back, so the conversation keeps going
instead of ending at voicemail.

**3. {{contact.audit_finding_3}}**
After each appointment, a review request goes out automatically. You don't
have to remember to ask.

Based on what we saw, the **{{contact.audit_recommended_plan}}** plan covers
this. We'd confirm that on the call before you commit to anything.

On an implementation call, we'll go through:

- What we'd set up, and in what order
- What your team still does by hand
- Costs, including any usage-based charges (texts, calls, email)

**[Book my implementation call →]** {{custom_values.implementation_call_link}}

{{user.name}}

> OWNER CHECK (delete before sending): Confirm that missed-call text-back,
> the unified inbox, and automated review requests are enabled on
> {{contact.audit_recommended_plan}}. Usage charges must be disclosed
> (BRD `COM-003`).

---

### Email 5: Objections

```
Send:     Day 10
Subject:  "We don't have time to switch systems"
Preview:  The three things people tell me after an audit, and straight
          answers.
```

Hi {{contact.first_name}},

After an audit, I usually hear one of three things. Here are honest answers
to each.

**"We don't have time to set up something new."**
That's fair. The setup is the part we handle. We build the pipeline,
forms, and follow-ups from a ready-made template. Your team checks the
wording and the times.

**"We already pay for a CRM, a booking tool, and a texting app."**
List what you pay for now and we'll show you which of those tools Kyntlo
would replace, and which it wouldn't. Sometimes the answer is "keep what
you have", and we'll say so.

**"What if it doesn't work for us?"**
Try it first. Every plan starts with a free trial, so you can test your own
follow-up flow before paying.

**[Start my free trial →]** {{custom_values.trial_link}}

Want to talk it through first? **[Book a call instead]**
({{custom_values.implementation_call_link}})

{{user.name}}

> EVIDENCE REQUIRED: To add a customer quote here, use a real, approved
> quote with the person's written consent and the source recorded. No
> invented or anonymous "results" quotes.
>
> VERIFY: Trial length, whether a card is needed, and setup fees must match
> the current offer before this email goes live.

---

### Email 6: Breakup

```
Send:     Day 14
Subject:  Should I close your audit file?
Preview:  One-word reply is fine. Then I'll stop emailing.
```

Hi {{contact.first_name}},

I've sent a few notes about the audit for {{contact.company_name}} and
haven't heard back. That usually means the timing is wrong, not the idea.

So I'll make it easy. Just reply with one word:

- **"Yes"**: let's book a call this week
- **"Later"**: check back in 3 months
- **"No"**: close the file, no hard feelings

Either way, the audit is yours to keep: {{contact.audit_report_link}}

{{user.name}}

> Workflow: replies are routed to the owner. "Later" sets a 90-day
> re-engagement task. "No" marks the opportunity Lost (reason: Not now) and
> stops all marketing emails except legally required notices.

---

### Conditional email C: Walkthrough no-show

```
Trigger:  Appointment status = No-show, on the implementation calendar
Send:     30 minutes after the missed start time
Subject:  We missed you. Want to rebook?
Preview:  Pick a new time. Your audit notes are still ready.
```

Hi {{contact.first_name}},

Looks like today didn't work out. No problem, things come up.

Your audit notes are ready to go whenever you are. Pick a time that suits
you:

**[Rebook my walkthrough →]** {{custom_values.implementation_call_link}}

{{user.name}}

> After rebooking, the contact rejoins the main sequence where it left off.
> If they don't rebook within 3 days, the main sequence continues.

## 5. HighLevel Workflow Build Notes

1. **Trigger:** Opportunity stage changed to `Audit Delivered` OR tag
   `audit-delivered` added.
2. **Guard:** If `audit_report_link` or `audit_finding_1` is empty, notify
   the audit owner and stop.
3. **Goal events (exit when met):** Appointment booked on the implementation
   calendar; tag `trial-started`; opportunity stage `Won`; any inbound email
   reply.
4. **Waits:** Use "Wait until" weekday windows (Mon–Fri, 09:00–11:00 in the
   contact's time zone), not fixed hour delays.
5. **Sender:** The assigned user (the audit owner), with replies to their
   inbox. Do not use a no-reply address.
6. **Internal tasks:** Day 3: "Call or text if Email 1 not opened". Day 15:
   "Review: close or schedule for later".
7. **Compliance:** Every email has an unsubscribe link and the sender's
   legal identity and address. These are still `REQUIRED` in
   `01-product-decisions.md` §4. The prospect must have agreed to receive
   follow-up when they asked for the audit (record the consent source).

## 6. Metrics

Targets are `TBD`, matching BRD §7.2. Track these for each email and for the
whole sequence:

| Metric | Measured on | Why it matters |
| --- | --- | --- |
| Audit-to-call booked rate | Whole sequence | Primary goal |
| Call show rate | Implementation calendar | Shows the quality of booked calls |
| Audit-to-paid rate, within 30 days | Whole sequence | Revenue outcome |
| Trial starts from Email 5 | Email 5 | Secondary path |
| Reply rate | Each email (especially 1 and 6) | Best sign of real engagement |
| Click rate on the main CTA | Each email | Shows whether the CTA works |
| Unsubscribe and spam rate | Each email | Watch any email that stands out |
| Email 6 replies split by Yes / Later / No | Email 6 | Gives you a pipeline for later |

Open rates are only directional because of mail privacy protection. Judge
the sequence on bookings and replies, not opens.

### First tests to run

1. Email 1 subject: personal (`{{first_name}}, your Kyntlo growth audit`) vs
   specific (`3 places {{company_name}} is losing leads`).
2. Email 5 CTA: start the trial first vs book a call first.
3. Timing: the current 14-day schedule vs a 10-day version.

## 7. Owner Decisions Needed Before Launch

- Confirm the audit scope and deliverable (§1).
- Confirm the main post-audit conversion: implementation call, trial, or
  direct purchase.
- Confirm the trial terms and setup-fee wording.
- Confirm which features are on each plan for Email 4.
- Provide the sender name, legal identity, and postal address for the email
  footer.
- Approve any customer quote for Email 5, or leave it out.
