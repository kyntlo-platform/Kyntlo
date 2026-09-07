# Version 2 — handoff

This branch (`claude/kyntlo-website-v2`) forks the finished Version 1 site at
commit `1b8ac32`. Version 1 continues on `claude/website-preview-rar-review-1ftfii`.
The two are independent from here: do not merge one into the other without a
deliberate decision, because the point of having two is to compare them.

Everything below is the state you are starting from, so you do not have to
re-derive it.

## What this site is

A 21-page static marketing site for Kyntlo, a white-label SaaS built on
HighLevel. Plain HTML, CSS and JavaScript — no build step, no framework, no
dependencies. Deployed by copying the repository root into `public_html`.

Each page carries its own `<style>` block. Three shared files do the rest:

| File | Role |
| --- | --- |
| `assets/site-shell.js` | Renders the nav and footer on every page, plus the skip link, share meta, brand cursor and scroll state. Change it once, it lands everywhere. |
| `assets/site-shell.css` | The shared shell styles and the design tokens. |
| `assets/currency-pricing.js` | **The single source of truth for prices.** Publishes `window.KyntloPricing`; `checkout-page.js` reads from it. Never hardcode a price anywhere else. |

`assets/checkout-page.{css,js}` render the checkout entirely from the query
string. The four `package-*.html` files are redirect stubs.

## Before you change anything

```
node scripts/check-site.mjs              # static pass, no dependencies
node scripts/check-site.mjs --browser    # adds JS errors, broken images, overflow
```

It must pass before every commit. It exits non-zero, so it can gate a deploy.
It has already caught two real bugs that would otherwise have shipped, both
times when an asset cleanup deleted files that were still referenced.

`CHROMIUM_PATH=/path/to/chrome` points the browser pass at a browser you already
have instead of downloading one.

## Decisions already made — do not undo these silently

These were settled with the owner. Changing them needs a fresh conversation.

- **Taxes are excluded** from all prices. The FAQ, Terms §4 and the Refund
  Policy all say so. Every price is labelled "plus taxes".
- **Whop charges when the 14-day trial ends**, not on the day of signup. The
  checkout copy says "Nothing today." Do not reintroduce "billed today".
- **There is no signup page.** Credentials are emailed after the subscription
  starts. `signup.html` was deleted; `/signup` returns 404. The checkout steps,
  the trial banner and the FAQ all describe this flow.
- **`login.html` stays**, untouched. It hands off to `hub.kyntlo.ai`, the real
  platform, and the owner asked for it to be left alone.
- **No AI-generated portraits.** The five testimonials used them with invented
  names; that is gone. The section is now five sector scenarios. A
  `.scenario-photo` slot is styled and ready for real customer photos — the
  sector icon hides itself when one is present.
- **Competitor logos stay** in the comparison matrix. The owner decided this
  knowingly after the trademark risk was raised.

## Constraints worth keeping

Not decisions, but things that cost real work to get right. Breaking them is a
regression, so do it on purpose or not at all.

- **`backdrop-filter` clips descendants' shadows** to the element's border box in
  Chromium. The nav bar and the footer CTA both keep their blurred surface on a
  `::before` layer for this reason. If you add a glassy container around a
  glowing button, you will hit this.
- **Two gradients, deliberately.** `--gradient-kinetic` (pink → `#6d00c1`) is for
  decoration and buttons. `--gradient-text` (pink → `#b06bff`) is for anything
  that is *text*: the purple end of the first measures 2.33:1 on the dark
  ground, the second 6.16:1. The check script tests this.
- **Whop's loader scans the DOM once.** Re-injecting the script does not make it
  scan again. Both billing plans mount up front and switching only toggles which
  is visible. Rebuilding the payment host on switch leaves a dead box.
- **Native `<option>` lists** are drawn by the OS on a light surface and cannot
  inherit a light-on-dark form colour. `site-shell.css` pins them.
- **`.reveal { opacity: 0 }`** is undone by an IntersectionObserver. Every page
  has a `<noscript>` fallback so the content is not invisible without JS.
- **Cache stamps.** Every local CSS and JS reference carries `?v=20260829`, and
  `.htaccess` caches those for a year while revalidating HTML every request.
  **Bump the stamp on every deploy** or the year-long cache serves stale files.
- **The CSP is report-only.** It needs a few days of real traffic — a full
  checkout, a contact submit, a demo booking — before switching to enforcing,
  because the Whop, Forminit and LeadConnector loaders pull resources that
  cannot be enumerated from this repository.

## Still open, and none of it is an engineering problem

Eight items are waiting on the owner. Version 2 inherits all of them, and
solving them in code is not possible:

1. Governing law and venue are unnamed in the Terms; the Refund Policy does not
   cover the trial or mid-quarter cancellation. Needs a lawyer.
2. "Wholesale usage rates, no markup" contradicts the repository's own
   `WEB-050 MUST` rule.
3. The `$45` headline is a one-quarter promotional rate with no end date.
4. The `$2,488` stack figure has no published basis.
5. The hero's `LIVE` badge sits on a simulated feed; the word "illustrative"
   exists only in the `aria-label`.
6. Five real customer photos, with the customers' actual words and permission.
7. `docs/01` and `docs/02` still describe EUR pricing and a "Scale" plan.
8. The competitor-logo trademark position (decided, but recorded as a decision).

## What Version 2 is for

The owner wants two finished sites to choose between, not one finished and one
half-built. So: change the visual direction, the structure, the narrative — but
keep the facts above true, keep the check script passing, and do not reopen the
settled decisions.
