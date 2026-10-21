# Kyntlo demo workspace (training replica)

A click-through replica of the Kyntlo (white-label HighLevel) sub-account
interface, filled with the fictional **Bloom Dental Studio**. Kyntlo Academy
lessons are filmed on it while live app access isn't available. It is not the
real product: no backend, nothing is saved after a reload.

Serve the repository root and open it:

```bash
npx http-server -p 4173 -s /home/user/Kyntlo     # from anywhere
# http://127.0.0.1:4173/academy/demo-app/index.html#/contacts
```

## Fidelity rules (most important)

Customers will use the **real** Kyntlo app after watching, so every screen
must match how HighLevel actually works: the same module tabs, button
labels, field names, settings and flows, in the same places. When unsure how
the real HighLevel UI does something, follow HighLevel's real behaviour
rather than inventing a nicer one. Keep the look consistent with
`dashboard.js` and `contacts.js` (the reference screens), which match the real
Kyntlo dashboard screenshot at `assets/dashboard-kyntlo-interface.png`.

## Structure

| File | What |
|---|---|
| `index.html` | Loads everything. Already includes a `<script>` for every screen file; don't edit it. |
| `app.css` | Shared design system (buttons, cards, tables, chips, modals, toggles…). |
| `shell.js` | Sidebar, top bar, router and helpers (`KY`). |
| `data.js` | Shared demo data. **Don't edit**: add screen-specific data inside your screen file instead (`KY.data.myThing = […]`). |
| `icons.js` | Icon set: `KY.icon(name, size)`. You may add icons to *your own* screen file via `KY_ICONS.name = '<path …/>'`. |
| `screens/<module>.js` | One file per sidebar module. Each one owns its tabs. |

## Writing a screen

```js
(() => {
  const { esc, icon, money, $, $$, avatar } = KY;
  KY.screen('calendars', {
    tabs: [{ id: 'calendar', label: 'Calendar View' }, { id: 'appointments', label: 'Appointment List' }],
    render(view, { tab, params }) {   // route: #/calendars/<tab>/<params…>
      view.innerHTML = `…`;           // then wire up events
    },
  });
})();
```

- Routes: `#/<module>/<tab>/<param>`. Sub-pages use extra params (e.g. `#/automation/workflows/w1` opens the builder).
- Helpers: `KY.modal({ title, body, wide, drawer, actions })`, `KY.menu(anchorEl, items)`, `KY.toast(msg)`,
  `KY.toggles(root)`, `KY.go(hash)`, `KY.avatar(name)`, `KY.money(n)`, `KY.esc(str)`.
- Screen-specific CSS: inject one `<style id="css-<module>">` the first time the screen renders.
- **Give every element a lesson will touch a stable `id`**, prefixed by module (`cal_new`, `wf_add_trigger`…).
  Lessons select by these ids.
- Make interactions real enough to film: buttons open the right modal/drawer, typing shows up, saving
  updates the list and shows a toast, toggles toggle, tabs switch. Fake only the backend.
- Keep data consistent with `data.js` (same contacts, team, calendars, pipelines, prices in £).
- No external network requests (no CDNs, fonts or images from the internet).

Check your screens visually:

```bash
cd academy/pipeline
node shot.mjs /tmp/x.png '#/calendars' /tmp/y.png '#/calendars::document.querySelector("#cal_new").click()'
```

## Writing lessons for these screens

Lesson files live in `academy/lessons/customer/aMM-LL-slug.mjs` (see `academy/README.md` for the full format).
On the demo workspace, use `goto: '{demo}#/contacts'` and select elements by `#id`.

Narration (spoken by Kokoro, a neural voice):
- Warm, friendly, second person, short sentences. One idea per scene. 3–6 minutes per lesson
  (≈ 450–850 spoken words over 10–16 scenes).
- Write numbers, prices and symbols the way they should be **spoken** ("ninety dollars a month",
  "fourteen-day", "three thousand two hundred pounds"). If the subtitle should look different, set
  `caption` on that scene with the written form.
- Structure: intro card (with `plan`) → context → walkthrough → pro tip card → outro card naming the next lesson.
- Give each walkthrough scene a `chapter` (shown as YouTube chapters).
- Use `title` lower-thirds, `highlight` spotlights with short labels, and `zoom` on small UI (1.4–2.0×).
- Actions must fit inside the narration: `at` times should leave the viewer time to see each step.

Verify a lesson without recording (fast, safe to run in parallel):

```bash
node render.mjs --check ../lessons/customer/a05-02-first-booking-calendar.mjs
# screenshots of each scene's end state: academy/.cache/check/<lesson>/scene-NN.png
```
