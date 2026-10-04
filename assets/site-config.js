/* =============================================================================
   Kyntlo — site configuration
   -----------------------------------------------------------------------------
   The one file you edit to switch measurement on. Everything else on the site
   reads from here, so there is a single place to change and a single place to
   check.

   ANALYTICS
   Put your Google Analytics 4 measurement ID below — it looks like
   "G-XXXXXXXXXX" and comes from Admin → Data Streams in your GA4 property.

       window.KYNTLO_GA_ID = "G-XXXXXXXXXX";

   While it is empty, NOTHING is loaded: no Google script is requested, no
   cookie is set, no network call is made. The site works exactly as it does
   now. That is deliberate, so an unconfigured site is never silently tracking.

   When it is set, site-shell.js loads the tag through Google Consent Mode with
   every storage type DENIED by default. The cookie banner is what grants
   analytics_storage, so no measurement happens until a visitor agrees. IP
   anonymisation is on and ad-personalisation signals are off.

   If you would rather use Plausible, Fathom or Cloudflare Web Analytics, leave
   this empty and add that provider's snippet instead — those are cookieless and
   do not need the consent gate.
   ========================================================================== */
window.KYNTLO_GA_ID = "G-TPM67XPDR4";

/* Set to a Whop promo code to apply it automatically on quarterly checkout.
   This must exist and be active in Whop, or quarterly silently charges full
   price. Empty disables the automatic discount. */
window.KYNTLO_PROMO_CODE = "summer_50";

/* ---------------------------------------------------------------------------
   A/B TEST: homepage intro splash
   ---------------------------------------------------------------------------
   The animated logo splash holds the homepage for 2.6 seconds on a visitor's
   first visit of a session. That is 2.6 seconds in front of your highest-intent
   traffic, so it is running as a 50/50 test rather than an assumption.

     "splash"  the animation plays (what the site does today)
     "direct"  the visitor lands straight on the hero

   A visitor is assigned once and keeps that bucket, so the site stays
   consistent for them. The bucket is sent to GA4 as the user property
   `intro_variant`, plus one `experiment_impression` event.

   To read the result in GA4: Reports -> Engagement, then add `intro_variant`
   as a secondary dimension. Compare engagement rate and your trial-start and
   audit-booking conversions between the two. Give it enough traffic to mean
   something - a few hundred visitors per bucket at minimum.

   To end the test, set this to false. The splash then always plays; if
   "direct" won, delete the #kynIntro markup from index.html instead. */
window.KYNTLO_INTRO_TEST = true;

/* ---------------------------------------------------------------------------
   SOCIAL + COMMUNITY LINKS
   ---------------------------------------------------------------------------
   The footer icon row is built from this list, so it is the one place to add,
   change or retire a profile. Paste the full public URL for each one.

   An entry left empty renders NOTHING - no icon, no placeholder, no dead link.
   That is deliberate: a social icon that 404s costs more trust than a missing
   icon, so an unknown profile simply stays off the site until you fill it in.

   `community` is treated as a destination rather than a social profile: when
   it is set it gets the icon in the row AND a "Community" link in the footer's
   Company column, because that is a page people look for by name.
   ------------------------------------------------------------------------- */
window.KYNTLO_SOCIAL = {
    facebook:  "https://www.facebook.com/people/Kyntlo/61590216517723/",
    instagram: "https://www.instagram.com/kyntlo.ai/",
    youtube:   "https://youtube.com/@kyntlo",
    linkedin:  "https://www.linkedin.com/company/kyntlo/",

    tiktok:    "https://www.tiktok.com/@kyntlo",

    /* Google Business Profile. This is the share link from the Business Profile
       dashboard; a g.page short link or the full Maps URL would be more durable
       if one is available, since share.google links are generated per share. */
    google:    "https://share.google/ikY0QiEt9VkzBoVFv",

    /* TODO: paste the community URL (Whop / Facebook group / forum / Discord).
       Nothing renders while this is empty. */
    community: ""
};
