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
window.KYNTLO_GA_ID = "";

/* Set to a Whop promo code to apply it automatically on quarterly checkout.
   This must exist and be active in Whop, or quarterly silently charges full
   price. Empty disables the automatic discount. */
window.KYNTLO_PROMO_CODE = "summer_50";
