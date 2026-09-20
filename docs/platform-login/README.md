# Kyntlo login skin — `hub.kyntlo.ai`

Restyles the white-label HighLevel login page to match kyntlo.ai. Two files:

| File | What it is |
|---|---|
| `kyntlo-login.css` | the whole skin |
| `kyntlo-login.js` | finds the real form elements, tags them, adds the left panel and three behaviours |

## Installing

In the agency white-label settings, paste `kyntlo-login.js` into the custom
**JavaScript** field and `kyntlo-login.css` into the custom **CSS** field for
the login page.

If only one field is available, host `kyntlo-login.css` somewhere public, set
`cssHref` at the top of the JS to that URL, and paste only the JS — it will
pull the stylesheet in itself.

Nothing else needs configuring. The logo is read off the page that is already
there; set `logoSrc` only if you want a different one.

## Why it is built this way

The login page is a Vue app whose class names belong to HighLevel and can
change in any release. So the CSS never references their selectors. The script
identifies elements by what they are — the email input, the password input, the
submit button, the button whose label says Google — and tags each with a
`data-kyn` attribute that the CSS keys off.

Three rules the script holds to, because a login page that looks good and
cannot log you in is worse than a plain one that works:

1. **It never moves a node the app owns.** Reparenting under Vue's feet is how
   you get a form that silently submits nothing. Layout is done by positioning
   the card, not relocating it.
2. **It never writes into a form field.** Prefilling without telling Vue leaves
   the model empty while the user sees a filled box. The browser's own autofill
   already does this properly.
3. **If anything fails it stops and leaves the default page**, which works. The
   `<html data-kyn-ready>` flag that switches the CSS on is set last, only once
   the form has actually been found.

## What it adds

- Dark brand ground with the drifting aurora from kyntlo.ai, and the existing
  gradient rule at the top turned into a moving signal line.
- Left panel: the logo on its white plate, a time-aware greeting, the
  *Kyntlo, Own Tomorrow.* lockup, and the four-step product loop.
- Glass card, gradient submit button, brand focus rings.
- **Caps Lock warning** under the password field.
- **Busy state** on the submit button while an attempt is in flight, released
  after 10s or on the next keystroke so a failed attempt never leaves it stuck.
- Skip link to the form, `prefers-reduced-motion` and `forced-colors` support.

## Things worth knowing

- **Injected copy is English only.** The platform's own strings are translated
  by the Platform Language selector; ours are not. They live in `KYN.copy` at
  the top of the JS — swap them per language there if you need to.
- **Fonts come from Google Fonts.** If the platform's CSP blocks them, the
  fallback stack takes over and everything still works, just in the system
  font.
- **The card is `position: fixed`.** It scrolls internally if it grows taller
  than the viewport, which is what happens on the two-factor step.
- The Kyntlo mark is dark artwork drawn for a light ground, so it keeps the
  white plate it has today rather than sitting directly on the dark panel.

## Verified

Rendered in Chromium at 1440×900, 1280×680, 820×1024 and 390×844 against a
replica of the login DOM built with deliberately unfamiliar class names, to
prove the adapter does not depend on HighLevel's markup. Checked: form still
submits with `defaultPrevented` false and both field values intact; Google
button, forgot link, terms link and language selector all still visible and
usable; a late `role="alert"` toast rendered inside a hidden branch is
un-hidden so a failed sign-in keeps its error message; no horizontal overflow
at any width; no page errors.

Not verified against the live page — this environment's proxy blocks
`hub.kyntlo.ai`, so the adapter was written to find elements rather than assume
them. Load it on a staging agency first and confirm the card lands on the real
panel.
