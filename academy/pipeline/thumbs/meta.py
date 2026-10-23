# Course arrangement, YouTube titles and thumbnail hooks for every Kyntlo Academy video.
# Writes academy/course/youtube-meta.json, which the thumbnail renderer and the
# YouTube publishing step both read.
import json, pathlib

MODULES = {1: 'Getting Started', 2: 'Dashboard & Reports', 3: 'Contacts', 4: 'Conversations',
           5: 'Calendars & Booking', 6: 'Pipelines', 7: 'Funnels & Websites', 8: 'Marketing',
           9: 'Automation', 10: 'AI', 11: 'Reputation', 12: 'Payments', 13: 'Memberships',
           14: 'Settings', 15: 'Capstone'}

# stem: (topic for the title, thumbnail hook with *highlight*, demo-app screen)
LESSONS = {
 'a01-01-welcome': ('Welcome to Kyntlo & Its 4 Plans', 'START *HERE*', '#/dashboard'),
 'a01-02-interface-tour': ('Logging In & Interface Tour', 'INTERFACE *TOUR*', '#/dashboard'),
 'a01-03-launchpad': ('Launchpad: First-Day Setup', 'DAY-ONE *SETUP*', '#/launchpad'),
 'a01-04-business-profile': ('Business Profile & Branding', 'BUSINESS *PROFILE*', '#/settings/business-profile'),
 'a01-05-team-permissions': ('Invite Your Team & Permissions', 'ADD YOUR *TEAM*', '#/settings/my-staff'),
 'a02-01-reading-your-dashboard': ('Reading Your Dashboard', 'READ YOUR *DASHBOARD*', '#/dashboard'),
 'a02-02-customising-dashboards': ('Customising Dashboards', 'CUSTOM *DASHBOARDS*', '#/dashboard'),
 'a02-03-ads-reporting': ('Google & Facebook Ads Reporting', 'ADS *REPORTING*', '#/reporting/google-ads'),
 'a02-04-call-appointment-agent-reports': ('Call, Appointment & Agent Reports', 'TEAM *REPORTS*', '#/reporting/calls'),
 'a03-01-contact-list': ('The Contact List', 'CONTACT *LIST*', '#/contacts'),
 'a03-02-adding-importing-contacts': ('Adding & Importing Contacts', 'IMPORT *CONTACTS*', '#/contacts'),
 'a03-03-inside-a-contact-record': ('Inside a Contact Record', 'CONTACT *RECORD*', '#/contacts/detail/c1'),
 'a03-04-tags-custom-fields-values': ('Tags, Custom Fields & Values', 'TAGS & *FIELDS*', '#/settings/custom-fields'),
 'a03-05-smart-lists-bulk-actions': ('Smart Lists & Bulk Actions', 'SMART *LISTS*', '#/contacts'),
 'a03-06-companies-duplicates': ('Companies & Merging Duplicates', 'MERGE *DUPLICATES*', '#/contacts/companies'),
 'a04-01-inbox-tour': ('Unified Inbox Tour', 'ONE *INBOX*', '#/conversations/conversations/v1'),
 'a04-02-replying-across-channels': ('Reply on Every Channel', 'REPLY *EVERYWHERE*', '#/conversations/conversations/v4'),
 'a04-03-snippets-templates-scheduling': ('Snippets, Templates & Scheduling', 'REPLY *FASTER*', '#/conversations/snippets'),
 'a04-04-chat-widget': ('Website Chat Widget Setup', 'CHAT *WIDGET*', '#/sites/chat-widget'),
 'a04-05-calls-missed-call-text-back': ('Calls & Missed-Call Text-Back', 'MISSED-CALL *TEXT-BACK*', '#/conversations/conversations/v6'),
 'a05-01-calendar-types': ('Calendar Types Explained', 'CALENDAR *TYPES*', '#/calendars/settings'),
 'a05-02-first-booking-calendar': ('Your First Booking Calendar', 'BOOKING *CALENDAR*', '#/calendars/settings/edit/k1/details'),
 'a05-03-booking-forms-payments': ('Booking Forms & Payments', 'TAKE *DEPOSITS*', '#/calendars/settings/edit/k1/details'),
 'a05-04-google-outlook-sync': ('Google & Outlook Calendar Sync', 'CALENDAR *SYNC*', '#/calendars/settings/connections'),
 'a05-05-managing-appointments': ('Managing Appointments & No-Shows', 'MANAGE *BOOKINGS*', '#/calendars/calendar'),
 'a05-06-automatic-reminders': ('Automatic Appointment Reminders', 'AUTO *REMINDERS*', '#/calendars/settings'),
 'a06-01-pipelines-explained': ('Pipelines Explained', 'PIPELINES *101*', '#/opportunities'),
 'a06-02-building-a-pipeline': ('Building a Pipeline', 'BUILD A *PIPELINE*', '#/opportunities/pipelines'),
 'a06-03-working-the-board': ('Working the Pipeline Board', 'MOVE *DEALS*', '#/opportunities'),
 'a06-04-pipeline-reporting': ('Pipeline Reporting', 'PIPELINE *REPORTS*', '#/dashboard'),
 'a07-01-funnels-vs-websites': ('Funnels vs. Websites', 'FUNNEL OR *WEBSITE?*', '#/sites/funnels'),
 'a07-02-funnel-from-template': ('Build a Funnel from a Template', 'FUNNEL IN *MINUTES*', '#/sites/funnels'),
 'a07-03-page-builder': ('The Page Builder in Depth', 'PAGE *BUILDER*', '#/sites/funnels/f1/builder/s1'),
 'a07-04-forms-surveys': ('Forms & Surveys', 'FORMS & *SURVEYS*', '#/sites/forms'),
 'a07-05-connecting-your-domain': ('Connecting Your Domain', 'YOUR OWN *DOMAIN*', '#/sites/domains'),
 'a07-06-funnel-stats-ab-seo': ('Funnel Stats, A/B Tests & SEO', 'A/B *TESTING*', '#/sites/funnels/f1/stats'),
 'a07-07-blogs-qr-codes': ('Blogs & QR Codes', 'BLOGS & *QR CODES*', '#/sites/blogs'),
 'a08-01-email-builder-templates': ('Email Builder & Templates', 'EMAIL *BUILDER*', '#/marketing/emails/builder/e4'),
 'a08-02-sending-email-campaign': ('Sending an Email Campaign', 'SEND A *CAMPAIGN*', '#/marketing/emails'),
 'a08-03-email-deliverability': ('Email Deliverability Basics', 'AVOID *SPAM*', '#/marketing/emails/stats/e1'),
 'a08-04-sms-whatsapp-broadcasts': ('SMS & WhatsApp Broadcasts', 'SMS *BROADCASTS*', '#/marketing/templates'),
 'a08-05-social-planner': ('Social Planner', 'SCHEDULE *SOCIAL*', '#/marketing/social-planner'),
 'a08-06-trigger-links': ('Trigger Links & Link Tracking', 'TRACK *CLICKS*', '#/marketing/trigger-links/analyze'),
 'a09-01-how-workflows-think': ('How Workflows Work', 'WORKFLOWS *101*', '#/automation/workflows/w1'),
 'a09-02-first-workflow-new-lead': ('Your First Workflow', 'FIRST *WORKFLOW*', '#/automation/workflows/w2'),
 'a09-03-if-else-waits-goals': ('If/Else, Waits & Goals', 'IF/ELSE *LOGIC*', '#/automation/workflows/w6'),
 'a09-04-appointment-workflows': ('Appointment Workflows', 'NO-SHOW *RECOVERY*', '#/automation/workflows/w3'),
 'a09-05-pipeline-automation': ('Pipeline Automation', 'AUTO-MOVE *DEALS*', '#/automation/workflows/w8'),
 'a09-06-recipes-templates': ('Workflow Recipes & Templates', 'WORKFLOW *RECIPES*', '#/automation/workflows'),
 'a09-07-webhooks-sheets-premium': ('Webhooks & Google Sheets', 'WEBHOOKS & *SHEETS*', '#/automation/workflows/w9'),
 'a09-08-execution-logs': ('Troubleshooting Workflows', 'FIX *WORKFLOWS*', '#/automation/workflows/w1/logs'),
 'a10-01-ai-overview-plans': ("AI Overview: What's in Your Plan", 'AI IN *KYNTLO*', '#/ai-agents/getting-started'),
 'a10-02-conversation-ai-chatbot': ('Conversation AI Chatbot', 'AI *CHATBOT*', '#/ai-agents/conversation-ai'),
 'a10-03-knowledge-base-faqs': ('AI Knowledge Base & FAQs', 'TRAIN YOUR *AI*', '#/ai-agents/knowledge-base'),
 'a10-04-voice-ai-receptionist': ('Voice AI Receptionist', 'AI ANSWERS *YOUR PHONE*', '#/ai-agents/voice-ai'),
 'a10-05-content-ai': ('Content AI', 'AI WRITES *FOR YOU*', '#/ai-agents/content-ai'),
 'a10-06-ai-in-workflows': ('AI Inside Workflows', 'AI *WORKFLOWS*', '#/ai-agents/getting-started'),
 'a11-01-connect-google-business': ('Connect Google Business Profile', 'CONNECT *GOOGLE*', '#/reputation/overview'),
 'a11-02-requesting-reviews': ('Requesting Reviews Automatically', 'GET MORE *REVIEWS*', '#/reputation/requests'),
 'a11-03-reviews-ai-replies': ('Replying with Reviews AI', 'AI REVIEW *REPLIES*', '#/reputation/reviews'),
 'a11-04-review-widgets': ('Review Widgets', 'SHOW OFF *REVIEWS*', '#/reputation/widgets'),
 'a12-01-connecting-stripe': ('Connecting Stripe', 'CONNECT *STRIPE*', '#/payments/integrations'),
 'a12-02-products-prices-invoices': ('Products, Prices & Invoices', 'SEND *INVOICES*', '#/payments/products'),
 'a12-03-payment-links-text-to-pay': ('Payment Links & Text2Pay', 'GET PAID *BY TEXT*', '#/payments/payment-links'),
 'a12-04-subscriptions-transactions': ('Subscriptions & Transactions', 'SUBSCRIPTIONS *& REFUNDS*', '#/payments/subscriptions'),
 'a13-01-creating-a-course': ('Creating a Course', 'CREATE A *COURSE*', '#/memberships/courses/products'),
 'a13-02-selling-access': ('Selling Course Access', 'SELL YOUR *COURSE*', '#/memberships/courses/offers'),
 'a13-03-communities': ('Communities', 'BUILD A *COMMUNITY*', '#/memberships/communities'),
 'a14-01-phone-numbers': ('Phone Numbers & Caller ID', 'PHONE *NUMBERS*', '#/settings/phone-numbers'),
 'a14-02-email-services': ('Email Sending Domain', 'SENDING *DOMAIN*', '#/settings/email-services'),
 'a14-03-integrations-marketplace': ('Integrations & App Marketplace', 'CONNECT *YOUR APPS*', '#/settings/integrations'),
 'a14-04-usage-wallet-billing': ('Usage, Wallet & Billing', 'BILLING & *WALLET*', '#/settings/billing/wallet'),
 'a14-05-data-privacy-dnd': ('Data, Privacy & DND', 'PRIVACY & *DND*', '#/contacts/detail/c1'),
 'a15-01-lead-to-booking-system': ('Build a Lead-to-Booking System', 'FULL SYSTEM *BUILD*', '#/automation/workflows/w4'),
 'a15-02-30-day-action-plan': ('Your 30-Day Action Plan', 'YOUR 30-DAY *PLAN*', '#/launchpad'),
}
# Product videos keep their titles; label shown above the hook.
PROMOS = {
 'b00-course-trailer': ('FREE COURSE', '75 LESSONS · 15 MODULES', 'LEARN *KYNTLO* FROM ZERO', '#/dashboard'),
 'b01-kyntlo-in-90-seconds': ('KYNTLO', 'PRODUCT TOUR', 'KYNTLO IN *90 SECONDS*', '#/dashboard'),
 'b02-replace-your-tool-stack': ('KYNTLO', 'SAVE MONEY', 'REPLACE *9 TOOLS*', '#/sites/funnels'),
 'b03-never-miss-a-lead': ('KYNTLO', 'ONE INBOX', 'NEVER MISS *A LEAD*', '#/conversations/conversations/v9'),
 'b04-bookings-on-autopilot': ('KYNTLO', 'ONLINE BOOKING', 'BOOKINGS ON *AUTOPILOT*', '#/calendars/calendar'),
 'b05-your-ai-employee': ('KYNTLO', 'AI CHATBOT + AI PHONE', 'YOUR *AI* EMPLOYEE', '#/ai-agents/voice-ai'),
 'b06-build-a-funnel-in-minutes': ('KYNTLO', 'FUNNEL BUILDER', 'FUNNEL IN *MINUTES*', '#/sites/funnels/f1/builder/s1'),
 'b07-five-star-reviews': ('KYNTLO', 'REPUTATION', '5-STAR *REVIEWS*', '#/reputation/reviews'),
 'b08-which-plan-is-right': ('KYNTLO', 'STARTER · GROWTH · PRO', 'WHICH *PLAN?*', 'SITE:/pricing.html'),
 'b09-kyntlo-for-clinics': ('KYNTLO FOR', 'CLINICS & DENTISTS', 'FOR *CLINICS*', '#/dashboard'),
 'b10-kyntlo-for-salons': ('KYNTLO FOR', 'SALONS & SPAS', 'FOR *SALONS*', '#/calendars/calendar'),
 'b11-kyntlo-for-agencies': ('KYNTLO FOR', 'MARKETING AGENCIES', 'FOR *AGENCIES*', '#/opportunities'),
}
TEAM = {
 'c01-how-kyntlo-is-put-together': ('HOW KYNTLO *WORKS*', '#/settings/business-profile'),
 'c02-onboarding-a-new-customer': ('NEW CUSTOMER *ONBOARDING*', '#/launchpad'),
 'c03-email-deliverability': ('EMAIL *DELIVERABILITY*', '#/settings/email-services'),
 'c04-sms-a2p-registration': ('SMS & *A2P*', '#/settings/phone-numbers'),
 'c05-why-didnt-my-workflow-fire': ("WORKFLOW DIDN'T *FIRE?*", '#/automation/workflows/w1/logs'),
 'c06-calendar-booking-issues': ('BOOKING *ISSUES*', '#/calendars/settings/edit/k3/details'),
 'c07-domain-funnel-publishing': ('DOMAIN *ISSUES*', '#/sites/domains'),
 'c08-billing-usage-wallet': ('BILLING *QUESTIONS*', '#/settings/billing/wallet'),
 'c09-plan-changes-cancellations': ('PLAN *CHANGES*', '#/settings/billing/subscription'),
 'c10-escalation-ticket-handling': ('ESCALATE *RIGHT*', '#/settings/audit-logs'),
}

def build():
    out, n = {}, 0
    per_module = {m: 0 for m in MODULES}
    for stem in LESSONS:
        per_module[int(stem[1:3])] += 1
    for stem, (topic, hook, route) in LESSONS.items():
        n += 1
        m, l = int(stem[1:3]), int(stem[4:6])
        title = f'Lesson {n}/75 · {topic} | Kyntlo Course – Module {m}: {MODULES[m]}'
        assert len(title) <= 100, title
        out[stem] = dict(kind='lesson', n=n, total=len(LESSONS), module=m, moduleName=MODULES[m], lesson=l,
                         topic=topic, hook=hook, route=route, title=title)
    for stem, (pill, label, hook, route) in PROMOS.items():
        out[stem] = dict(kind='promo', pill=pill, label=label, hook=hook, route=route)
    for stem, (hook, route) in TEAM.items():
        out[stem] = dict(kind='team', pill=f'SUPPORT PLAYBOOK C{int(stem[1:3])}', label='INTERNAL · SUPPORT TEAM', hook=hook, route=route)
    return out, per_module

if __name__ == '__main__':
    meta, per_module = build()
    path = pathlib.Path(__file__).resolve().parents[2] / 'course' / 'youtube-meta.json'
    path.write_text(json.dumps({'modules': MODULES, 'lessonsPerModule': per_module, 'videos': meta}, indent=1, ensure_ascii=False))
    print(len(meta), 'videos;', 'longest title', max(len(v.get('title', '')) for v in meta.values()))
