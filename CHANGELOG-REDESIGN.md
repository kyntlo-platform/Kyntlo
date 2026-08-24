# ROUND 8 — Hero engine rebuilt for energy, offer badge redesigned, site-wide fixes

## Hero — rebuilt as a reactive engine
The particle field was technically sound after round 7 but deliberately calm; it now reads as a
system that is *running*, without changing a single element of the hero's layout or copy.
- **Signal packets.** Bright pulses travel along the links between nodes and flare the node they
  arrive at. This is the main change: the field now looks like traffic moving through a network
  instead of dots drifting.
- **Node energy.** Every node carries an energy value that decays each frame and spikes when a
  pulse lands on it or the cursor passes nearby. Energised nodes grow, brighten, and light up
  their links, so activity ripples outward instead of staying local.
- **Faster, organic motion.** Base speed roughly doubled (0.28–0.90 vs a flat 0.26) with a small
  random wander per frame and a hard speed clamp, so the drift never looks mechanical or runs away.
- **Click shockwaves.** Clicking or tapping the hero emits an expanding ring that pushes and
  excites every node it sweeps past.
- **Cursor field.** Nodes are drawn toward the pointer (and released when it leaves), links to the
  cursor are drawn, and a soft halo is painted at the pointer itself.
- **Entrance.** The field blooms outward from the centre over ~1s on first paint rather than
  appearing fully formed.
- **Colour.** Nodes carry a pink→purple charge; links are tinted from the blend of both ends
  rather than one flat purple.
- **Pointer lighting (CSS).** The hero has a radial spotlight that follows the cursor via CSS
  variables written inside a single rAF tick, and the dashboard/ops-feed pair leans a few degrees
  toward the pointer. Both are fine-pointer only.
- **Headline + badge.** `unstoppable growth` now uses the animated brand gradient, and the status
  badge has a slow sheen sweep.

Everything from round 7 is kept: devicePixelRatio backing store, IntersectionObserver +
`visibilitychange` gating, delta-time normalisation, squared-distance comparisons, debounced
resize, and node counts tiered by width (72 / 60 / 42 / 26).

**Cost check:** measured at parity with the old engine (same frames/sec in the same headless
harness) despite doing considerably more, because the link loop no longer builds an `rgba()`
string per segment — eight colour prefixes are precomputed and only the alpha is appended — and
`Math.hypot` was replaced with plain squared-distance maths in the hot paths.

Under `prefers-reduced-motion` the canvas, the spotlight, the sheen and the lean are all disabled.

## Limited-time badge — redesigned again
The round-7 chip was legible but generic: a flat pill floating above the switch, visually
unattached to the plan it applies to, and static regardless of what the visitor had selected.

It is now a **launch-offer ticket** that is part of the switch:
- A gradient **"50% OFF" stub** on the left, split from the copy by a dashed perforation, so the
  discount is the first thing read rather than being buried in a sentence.
- Copy that names the target plan: *Your first 3 months on the **Quarterly** plan*.
- A **caret rendered by the switch itself at 75% width**, so it lines up with the centre of the
  Quarterly tab at any container width instead of pointing at the gap between the two tabs.
- **A state.** When Quarterly is selected the ticket reads `✓ Applied`, gains a pink glow, and the
  stub is fully saturated. On Monthly it desaturates and turns into a working **`Apply offer`
  button** that switches the visitor to Quarterly — the badge is now functional, not decorative.
- A slow sheen sweep, and the pulsing status dot kept from round 7.
- Stacks to two rows below 600px with the action full-width; verified with no overflow at 360px.

## Site-wide review fixes
- **Canonical URLs.** Only the homepage had one. Every page now carries a static
  `<link rel="canonical">` pointing at its clean URL, matching `_redirects` / `.htaccess`. The four
  `package-*.html` stubs — which redirect on load — are `noindex, follow` instead.
- **Contrast failures.** `--brand-purple` (#6d00c1) was used for text on the near-black surface
  (#07050f) in eight places: roughly **2.3:1**, well under WCAG AA. All now use `--brand-pink`
  (**4.95:1**), which is already the accent colour those pages use elsewhere. Affected:
  accessibility card links, contact card links, comparison cards, the whole "Kyntlo approach"
  column of the comparison table, FAQ quick-link hover + numbered markers, the get-started badge,
  and the security status label.
- **Invisible CTA.** `security.html`'s "Contact contact@kyntlo.ai" button was purple text on a
  translucent white overlay sitting on the pink→purple gradient box — effectively unreadable. It is
  now a solid white pill with purple text, the same pattern the pricing cards already use.
- **Skip link.** There was none anywhere, despite the accessibility statement promising keyboard
  focus support. The shell now injects a "Skip to main content" link as the first tab stop on every
  page, and moves real focus (not just the hash) to `<main>`.
- **Empty ops feed.** The hero's live feed pushed its first line on load and one every 2.2s, so a
  260px-tall panel painted almost empty. It now seeds five lines immediately, then streams.
- **CLS / LCP.** The hero dashboard screenshot had no intrinsic size; it now carries
  `width`/`height` (1920×911) plus `fetchpriority="high"` and `decoding="async"`.
- **Font preconnect.** Present on 4 pages, now on all 22.
- **Checkout redirect flash.** `checkout.html?package=scale` called `location.replace()` and then
  carried on rendering a Starter checkout behind the navigation. It now bails out of the render.
- **robots.txt / sitemap.xml.** Neither existed. Added, with the checkout and `package-*` stubs
  disallowed and 17 public URLs listed.

Verified with a headless pass over all 22 pages: no JS errors, no broken internal links, no
duplicate IDs, no horizontal overflow at 360 / 768 / 1440, and canonical present everywhere.

---

# ROUND 7 — Real testimonial photos, badge redesign, hero engine rebuild

## Testimonial photos (replacing the illustrated placeholders)
- The five supplied portraits are now live at `assets/avatars/*.jpg`, face-centred square crops at
  320px, progressive JPEG, 15–20KB each. The illustrated SVG placeholders have been deleted.
- Names and roles were **matched to what each photo actually shows**, so nothing reads as a mismatch:
  - Jonas Keller → *Owner, Multi-Site Restaurant Group* (kitchen/apron photo), with a quote about
    missed-call text-back and bookings rather than agency campaigns.
  - Laura Chen → **Laura Bennett**, *Director, Property & Design Studio* (studio/blueprints photo),
    with a quote about enquiries, site visits and proposals.
- Avatars render with `object-fit: cover` so faces are never squashed at any size.

## Limited-time badge — redesigned
- The old badge was absolutely positioned **inside** the Quarterly button, so it sat on top of the
  label and read as a loud orange blob.
- It's now a **separate announcement chip above the switch**: pulsing green status dot,
  uppercase "Limited-time launch offer", hairline divider, then "50% off your first 3 months",
  in a subtle glass pill. It no longer overlaps anything (verified geometrically).
- Removed the duplicated wording from the hint line underneath.
- Wraps cleanly on small screens (302×53 at 390px, 272×53 at 360px) with the divider hidden.

## Hero canvas — rebuilt
The particle field had several real problems, all fixed:
- **No devicePixelRatio scaling** → blurry on retina. Now renders at 2× backing store
  (2800×2392 for a 1400×1196 hero) and draws in CSS pixels.
- **Ran forever**, even when scrolled far past the hero, burning CPU. Now driven by an
  IntersectionObserver plus `visibilitychange` — verified frozen when off-screen and when the tab
  is hidden.
- **`sqrt` inside an O(n²) loop.** Now compares squared distances, and particle count is tiered by
  width (58 / 40 / 24) instead of a flat 70.
- **No frame-rate normalisation** → ran twice as fast on 120Hz displays. Now delta-time based.
- **Particles seeded to `window.innerWidth`/800** instead of the canvas, so they bunched up on
  resize. Now seeded to real dimensions and rescaled proportionally, with resize debounced at 150ms.
- Pointer tracking moved from `document` to the hero itself and resets on `pointerleave`;
  velocities and cursor attraction softened so the motion reads as calm rather than jittery.

## Phone number removed
`+20 150 700 0272` removed sitewide — footer contact list, contact page, FAQ, and the shell's
"call us" link — along with the now-empty "Phone:" labels left behind. Zero `tel:` links remain.
The contact form's own phone *input* (for visitors to give their number) is untouched.

**Verification:** 18/18 pages clean — no JS errors, no horizontal scroll at 390/360/768px,
HTML well-formed, no broken references.

---

# ROUND 6 — Booking widget, trial flow, offer badge, bug sweep

## Booking calendar replaced
- The Calendly embed is gone. `index.html#book-demo` now loads the **Kyntlo booking widget**
  (`links.kyntlo.ai/widget/booking/BRMtQSYpjswqT1ItfLv2`) with its `form_embed.js` resizer.
- Container restyled so the widget can auto-grow (700px floor, white rounded frame, no clipping).

## Stray purple dot above the footer — removed
- The dot was `#custom-pointer`, a **custom-cursor element** injected by the shell. It parks at a
  default position before the mouse moves, showing as a floating purple circle.
- The whole custom-cursor feature (JS + CSS + `kyn-cursor-enabled` / `pointer-active` classes) has been
  removed, restoring the normal system cursor.

## Slow transition when navigating BACK — fixed
- Back/forward restores come from the browser's bfcache, which **does not fire `load`**, so the overlay
  had nothing to dismiss it and lingered.
- Added `pageshow` (with a `persisted` check) and `popstate` handlers that clear the overlay, plus a
  2.5s safety timeout so it can never outlive the page.
- bfcache restores now dismiss **instantly** (`kyn-instant` disables the fade, since the page is
  already painted). Forward-navigation hold cut 620ms → 320ms and the fade 0.5s → 0.32s.
- Measured: overlay fully gone ~900ms after Back (was still visible past 1600ms).

## Free trial is now a real flow, not a contact form
- `trial.html` was a message form. It's now a **guided 3-step flow**: choose package → create workspace
  → 14 days free, with a live 3-package chooser (shared pricing engine, so the billing toggle and
  limited-time pricing apply) and each button leading straight to checkout.
- A green "What happens after the 14 days" panel spells out: no charge today, card stored to continue
  the subscription, **charged on day 15** unless cancelled, cancel before day 14 and pay nothing.
- **Checkout** now shows a 3-step progress indicator and a trial banner stating the exact amount that
  will be charged after the trial, e.g. *"$405 will be charged once for your first 3 months"*.

## Limited-time offer badge
- The quarterly tab carries an **animated "Limited time" flag** (orange→pink gradient pill with a
  pulsing dot) sitting above the toggle, and the hint copy now opens with *"Limited-time launch offer."*
- Pulse animation is disabled under `prefers-reduced-motion`.

## Pro — unlimited AI
- Added **"Unlimited AI Usage — every AI feature across the platform, chat, content, voice, workflows,
  with no caps"** to the Pro card on the homepage, pricing page, trial page, and checkout highlights.
- Pro's description updated to "Unlimited AI, reviews, analytics, and reactivation in one growth system."

## YouTube
- Added to the footer social row with a proper YouTube glyph, alongside Facebook, Instagram and LinkedIn.

## Cookie banner
- Silktide consent manager updated to **your exact palette**: `--primaryColor: #B000A5`,
  white background, `#253b48` text, `#b000a5` icon on white. Backdrop, bottom-left position,
  and the three consent types (Essential / Analytics / Marketing) were already in place and verified.

## Animation & scroll smoothness
- The legal-page scroll-spy was looping every section and reading `offsetTop` (forcing layout) on
  **every scroll event**. Now **rAF-throttled with cached offsets**, re-measured only on resize.
- Verified live: active section tracks correctly while scrolling (Overview → Add-Ons) and the reading
  progress bar updates smoothly.

## Full-site scan
All 18 pages: **no JS errors, no horizontal scroll, no stuck loader, no stray cursor element.**
HTML well-formed, zero broken local references, mobile clean at 390px and 768px.

---

# ROUND 5 — Logo presentation (original look restored)

## "The cost of fragmentation" — icon badges (matching your reference)
- Replaced the wide wordmark plates with **42px circular white badges containing icon-only marks**,
  exactly like the reference layout.
- Icons were **auto-extracted from the full logo lockups**: the script finds the transparent gutter
  between the mark and the wordmark, crops the mark, trims it, and centres it on a square canvas.
  - `left` mode (mark sits left of wordmark): Birdeye, Jotform, Constant Contact, Twilio, Podium,
    Leadpages, Acuity, WordPress, Zapier, Pabbly
  - `top` mode (stacked lockups): Pipedrive, ClickFunnels, Unbounce, Klaviyo
  - `full` (already icon-only): Salesforce
- Every crop validated as square-ish (aspect 0.81–1.62) and colour-rich, so no badge is a text sliver.
- Badges get a **hover tooltip** with the platform name, plus lift + pink glow ring.
- Platforms without a supplied logo (HubSpot, Wix, Squarespace, Typeform, Google Forms, Mailchimp,
  ActiveCampaign, SimpleTexting, Calendly, Google Calendar, Make, Grade.us) render as matching-height
  pill chips, so the row stays visually even.
- Stored in `assets/platform-icons/`.

## "Plays perfectly with your stack" — centred and redesigned
- The section had **lost its CSS entirely** in an earlier edit, which is why the heading sat
  left-aligned and unstyled. Rebuilt as a proper centred section:
  - Monospace "Integrations" kicker with gradient rules
  - Gradient-accented headline: *Plays perfectly with **your stack***
  - Supporting sub-line and a **"32+ native and automation-ready integrations"** pill
  - Radial brand glow behind the block, hairline borders top and bottom
- Three rows scroll at different speeds (52s / reversed / 66s) and **pause on hover**.

## Logos now show their real colours, always
- Tiles are **solid white plates** with the logo in its original colours at all times — no more
  white-inverted logos that only revealed colour on hover.
- **Backgrounds removed from all 27 integration logos**: the supplied `.webp` files had baked-in white
  backgrounds, now stripped to true alpha, trimmed, and normalised. Saved to `assets/integration-logos/`.
- Hover lifts the tile, scales it, and adds a pink ring.

## Performance
- Logos downscaled to 2x display size and re-encoded: integration logos **873KB → 526KB**,
  platform icons **153KB → 61KB** (~440KB saved).
- Removed `loading="lazy"` from marquee tiles. The 32 files are shared between the original and the
  duplicated track, so they're already cached — eager loading costs nothing and prevents logos
  popping in mid-scroll. Verified **64/64 tiles load**.

---

# ROUND 4 — Checkout, alignment, logo clarity, header motion

## Checkout payment window (payment button was cut off)
- The payment card had `min-height: 620px` on the container and only `600px` on the iframe, so the
  Whop form was clipped — the submit button fell below the visible area, and when the form was short
  the container left a large empty box (visible in screenshots 231/232).
- The container min-height is removed and the iframe is now given explicit room:
  **1240px desktop / 1320px ≤980px / 1420px ≤560px**, so the full form *including the pay button* is visible.
- Added a **graceful fallback**: if the payment script is blocked or slow, after 7s a message appears
  offering a refresh or a direct link to the team — the payment area is never left blank. (Verified offline.)

## Pro package button alignment
- "Start your 14-Day Trial" wrapped onto two lines in the Pro card and sat 27px lower than the others.
- Two causes fixed:
  1. `white-space: nowrap` + slightly tighter padding, and the label shortened to **"Start Free Trial"**.
  2. **Removed `transform: scale(1.045)` from the Pro card** — the scale was what pushed its button out of line.
- Pro is still clearly the hero via the animated gradient border, pink glow ring, gradient CTA and badge.
- Measured result: all four buttons **56px tall, single line, bottoms at 2044–2045px** (was 2045 vs 2072).

## Fragmentation matrix logos (were unreadable)
- Logos were being squeezed into a 16px circular crop, so wordmarks were illegible.
- Chips are now **logo-first on a white plate** (every supplied logo already contains the brand name),
  with logos normalised to a consistent 21px height and natural width.
- Stacked/square logos (Pipedrive, Salesforce, Unbounce, Klaviyo) render at **38px** so they aren't tiny:
  Pipedrive 17px → **31px**, Klaviyo 29px → **53px**, Unbounce 26px → **46px**, Salesforce 30px → **55px**.
- Matrix columns rebalanced (1fr / 2fr / 96px) to give logos more room. No row overflows at any width.

## Header animation smoothness
- Scroll handler was running a `classList.toggle` on **every** scroll event. It is now
  **rAF-throttled and state-memoised**, so the DOM is touched only when the state actually flips.
- Nav promoted to its own GPU layer (`translateZ(0)`, `will-change`), and transitions switched to a
  single `cubic-bezier(0.4, 0, 0.2, 1)` easing on **compositor-friendly properties only**.
- Removed the logo hover rotation that caused sub-pixel jitter; hover is now a clean scale.
- Gradient animations disabled under `prefers-reduced-motion`.

## Mobile
Re-verified at 390px and 360px: logo tiles reflow to 132x62, matrix rows stack to a single column with
no overflow, checkout billing cards and grid go single-column, buttons full-width, **zero horizontal scroll**.

---

# ROUND 3 — Pricing, payments, logos, footer, legal pages

## New pricing + Whop checkout
- Prices updated: **Starter $90, Growth $270, Pro $490** per month.
- Quarterly is billed as 3x monthly with a 50% launch promotion applied to the first quarter:
  Starter **$45/mo** ($135 billed once), Growth **$135/mo** ($405), Pro **$245/mo** ($735).
- Checkout now uses **Whop** with the correct plan ID per package + billing period:
  | Package | Monthly | Quarterly (promo `summer_50`) |
  |---|---|---|
  | Starter | `plan_VnTTHDjp4IFiw` | `plan_aOq1QpsY5sWJB` |
  | Growth | `plan_1WNKWE6cYCupT` | `plan_QIy1lE4MfeAsi` |
  | Pro | `plan_d4YY0DcqLXx8b` | `plan_VWmHJTwHW6Pj5` |
- The promo code is applied automatically on quarterly only. Switching billing on the checkout page
  re-mounts the Whop widget with the matching plan (verified: pro/quarterly -> `plan_VWmHJTwHW6Pj5` + `summer_50`;
  clicking Monthly -> `plan_d4YY0DcqLXx8b` + no promo).

## Price block redesign
- Price is now the dominant element: **50px** headline number, struck original at 22px, `/mo` at 17px.
- "Plus taxes" reduced from a large orange pill to **10.5px** uppercase letter-spaced micro-text.
- Green "Save 50%" pill sits alongside the tax note in a dedicated meta row.
- Customized card given a matching meta line so all four card headers stay aligned.

## Integration logos
- 14 new platform logos added (ClickFunnels, ActiveCampaign, Acuity, Birdeye, Constant Contact,
  Grade.us, Unbounce, Jotform, Klaviyo, Leadpages, Salesforce, Pipedrive, Podium, Twilio).
- **Backgrounds removed**: white and checkerboard backdrops stripped to true alpha transparency,
  logos trimmed to content and normalised to a common height.
- Slider rebuilt as **3 rows** (32 tiles) scrolling at different speeds, middle row in reverse.

## Dark-logo visibility fix
- 8 of the 14 new logos are near-black (Acuity 36, Podium 38, Jotform 51, Pipedrive 51, Grade.us 54,
  Birdeye 57, Leadpages 69, ClickFunnels 89 average luminance) and would be invisible on the dark site.
- Solved with **logo tiles**: white-inverted at rest, and on hover the tile becomes a solid white chip
  so the original brand colours are fully visible regardless of how dark the logo is.
- Matrix chips use the same idea: each competitor logo sits on a white circular backing.

## Footer redesign
- New CTA band overlapping the top edge ("Ready to run growth on one system?") with primary + ghost buttons.
- Five-column layout: brand block (logo, description, icon contact list, social buttons) plus
  Platform / Company / Get Started / Legal.
- Social links are now proper SVG icon buttons with gradient hover.
- Links get an animated underline and slide on hover; monospace uppercase column titles.
- Responsive at 1080 / 860 / 760 / 430px.

## Legal pages (Refund, Terms, Privacy, Cookies)
- The left-hand section titles were completely static. They now have:
  - **Scroll-spy active state** that tracks which section you're reading, with a glowing gradient bar.
  - Hover animation (slide, pill background, growing indicator).
  - A **reading-progress bar** at the bottom of the TOC.
  - Smooth scrolling with a 118px offset so headings are no longer hidden behind the sticky nav.
  - Target-section highlight flash after clicking, and scroll-reveal animation on the cards.

## Page transition fix
- Destination text was flashing past too quickly. The label now **fades and lifts into place** over
  0.42s and the overlay is held for **900ms** (was 420ms) before navigating.
- The arriving page also shows its own name and holds for **620ms** (was 260ms), so the
  transition reads continuously instead of blinking.
- Overlay fade extended to 0.5s in both directions.

---

# Kyntlo Website — Redesign Changelog

---

# ROUND 2 — Full site redesign

## Design system (all pages)
- **Unified dark theme across all 22 pages.** One token set everywhere: `--bg-color #07050f`, glass surfaces `rgba(255,255,255,0.04)`, text `#f5f3fa`, muted `#a49fb8`, borders `rgba(255,255,255,0.09)`. Every page carries `data-theme="dark"`.
- **Typography system**: Space Grotesk (display/headings), Inter (body), JetBrains Mono (labels, eyebrows, metrics). Font links added to every page.
- Verified: full-page renders band-scanned for light regions — all pages confirmed fully dark.

## Navigation — completely redesigned
- Nav is now a **floating glass pill**: sticky, 22px radius, `backdrop-filter: blur(22px) saturate(1.4)`, layered shadow with inset highlight.
- **Scroll state**: `body.kyn-scrolled` deepens the background, shifts the border to pink, and strengthens the shadow.
- Links use pill hover backgrounds with an animated dot indicator (spring easing) instead of underlines.
- Gradient animated CTA button; logo inverts to white with a pink drop-shadow on hover.
- **Mobile**: dark blurred dropdown panel with full-width links, plus dedicated Login / Get Started buttons.

## Pricing — billing section rebuilt
- **Removed the left and right text boxes** entirely (per screenshot 227). Only a centered segmented toggle remains.
- Toggle: sliding gradient thumb with spring easing, Monthly / Quarterly, single explanatory hint line below.
- **Strike-through discount pricing** (per screenshot 228): original price in faded grey with an angled gradient strike, discounted monthly-equivalent price, and a green `SAVE 50%` pill.
  - Verified live: Pro renders `$447` (struck) then **$224/mo** + SAVE 50%; Monthly correctly shows `$447/mo` with no strike.
- Quarterly is the default billing view.

## Pro package — visual hero treatment
- Scaled to **1.045x** above the other cards with an animated gradient border, pink glow ring, and gradient CTA button.
- "Most Popular" badge sits above the card with a background-coloured cutout border.

## Text and alignment errors fixed (screenshots 225 & 226)
- Pricing headers given a flex column layout with a uniform `min-height: 234px`; plan descriptions locked to `min-height: 64px`.
- Price rows use `min-height: 1.15em` and wrap instead of `white-space: nowrap`.
- Customized card's radial glow now clipped with `border-radius: inherit` — removes the stray line artifacts.
- **Measured result**: header heights 257 / 257 / 275 / 260px; button bottoms 1950 / 1950 / 1939 / 1950px. The Pro offsets are the intentional 1.045x scale, not the previous ragged misalignment.

## "Plays perfectly with your stack" — hover behaviour
- Expanded to **22 local brand logos** (Google, Slack, Facebook, Instagram, WhatsApp, Stripe, Shopify, WooCommerce, Zapier, WordPress, Zoom, Notion, Outlook, TikTok, Square, Xero, Mailgun, PayPal, LinkedIn, Pabbly, QuickBooks, Microsoft Teams).
- Greyscale + 50% opacity at rest, then **full original brand colours at 1.35x scale on hover**, with spring easing.

## "The cost of fragmentation" — real platform logos
- Competitor rows now render actual brand glyphs: HubSpot, Pipedrive, Salesforce, ClickFunnels, Unbounce, WordPress, Wix, Squarespace, Typeform, Jotform, Google Forms, Mailchimp, ActiveCampaign, Twilio, Klaviyo, Calendly, Google Calendar, Zapier, Make, Keap.
- Each chip has an `onerror` fallback to a clean text chip, so the layout never breaks if a logo fails to load.

## Testimonials
- Card design upgraded: gradient-ring avatars that scale and tilt on hover, star ratings, quote marks, glass surfaces.
- Avatars regenerated at higher fidelity (layered shading, clothing, glasses, earrings, catchlights) at `assets/avatars/`.
- **Note**: these are illustrated portraits, not photographs — see "Known limitation" below.

## Checkout — Monthly vs Quarterly on one page
- Both options presented **side by side as selectable cards**; clicking either re-renders the page instantly and updates the URL via `history.replaceState`.
- Quarterly is visually dominant: "Best deal - Save 50%" badge, struck original price, **"You save $671 over 3 months"**, and a 4-point benefit list. Monthly is presented plainly.
- Order summary mirrors the selection with matching strike-through pricing.
- `?package=scale` and `?package=custom` redirect to Contact Sales.

## Intro and page transitions
- **Animated logo intro** on the homepage: scale-in with glow, sweeping light shine, progress bar, tagline, and Skip button. Plays once per session (`sessionStorage`), fully skipped under `prefers-reduced-motion`.
- **Branded page transitions**: dark overlay showing the Kyntlo logo, an animated bar, and the destination name — e.g. "Taking you to **Pricing**" — mapped for all 22 pages.

## Funnels page — complete rebuild
Rebuilt from scratch around the Capture / Nurture / Close framework:
- Hero with an animated CSS funnel visual (4 stages, sweeping light, live metric chips).
- Three pillar cards covering ~19 capture/nurture/close capabilities.
- Four deep feature splits: **page builder** (mock builder UI), **checkouts** (order bumps, one-click upsells, Text-2-Pay, cart abandonment, payment-provider strip), **memberships/courses/webinars**, and **analytics** (A/B testing, attribution, conversion tracking).
- 21 detailed capability points, stat band, 6-card FAQ, and closing CTA.

## Mobile compatibility
Audited at **390px (iPhone), 360px (Android), and 768px (tablet)** across 12 pages:
- **Zero horizontal scroll** on every page at every breakpoint.
- No JavaScript errors.
- All interactions functional (billing toggle, checkout switcher, mobile nav, accordions).

---

## Bugs found by automated audit and fixed in Round 2
1. **Body backgrounds became translucent white overlays**, rendering near-white — fixed to opaque dark on 12 pages, with an `html` background safety net.
2. **`--surface-light` referenced but never defined** on 13 pages, causing fallback-to-white.
3. **Invisible dark-on-dark text** on login, signup, contact, trial, and security pages.
4. **Light form inputs and a white contact form panel** on dark backgrounds.
5. **Footer grid never collapsed** — caused horizontal scroll on *every* page at both mobile and tablet. Now 3-tier responsive (1080px / 760px / 420px).
6. **Tap targets under 32px** — footer links and mailto/tel links now 40px+ on mobile and tablet.
7. `package-pages.css` still light-themed — converted.

---

# ROUND 1 — Initial redesign

- **index.html** rebuilt: dark AI theme, aurora glows, neural-particle hero canvas, live "kyntlo.ops" AI activity feed, animated stat counters, glass feature cards, tool-replacement matrix.
- **pricing.html** restructured: trust strip, ROI band ($2,488+/mo stack to from $85/mo), guidance cards, FAQ, final CTA.
- **Scale to Customized plan**: build-your-own positioning (pick features, custom limits, multi-brand, dedicated onboarding, tailored pricing) with a **Contact Sales** CTA to `contact.html#contact-form`. Updated across index, pricing, package pages, FAQ, and the trial/contact dropdowns.
- **Annual billing removed** everywhere.
- **Language selector removed**; English only (all FR/DE/IT/ES translation code stripped from the shell).
- Fixed: duplicate conflicting mobile CSS, redundant inline nav/footer that the shell overwrote, an external Unsplash hotlink, contradictory feature lists between index and pricing, dead JS branches, oversized-logo nav overflow, and missing reduced-motion support.

---

## Known limitation — testimonial photos
Photographic images of real people can't be generated in this environment, so the testimonials use high-fidelity **illustrated** portraits. They are drop-in replaceable: save real photos over the same paths in `assets/avatars/` (square, ~120x120 or larger) and the design works unchanged. Licensed stock or real customer photos are recommended before launch, since illustrated avatars read as less credible than real photography.

## Note on competitor logos
The fragmentation matrix loads competitor brand glyphs from a public icon CDN at runtime, so they require an internet connection to appear. If one fails to load it falls back automatically to a clean text chip — the layout never breaks. Your own integration logos in the marquee are all local files and always display.
