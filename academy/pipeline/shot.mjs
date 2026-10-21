#!/usr/bin/env node
// Screenshot pages of the demo workspace (or any URL) at 1920x1080 for checking.
//   node shot.mjs out.png '#/contacts' ['#/contacts/detail/c1' out2.png ...]
// Hash-only targets open the demo app (KYNTLO_DEMO_URL). An optional JS snippet
// after "::" runs before the shot, e.g. '#/contacts::document.querySelector("#ct_add").click()'.
import { chromium } from 'playwright';
import { ENV } from './lib/config.mjs';

const args = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
for (let i = 0; i < args.length; i += 2) {
  const [out, target] = [args[i], args[i + 1]];
  const [url, js] = target.split('::');
  await page.goto(url.startsWith('#') ? `${ENV.demoUrl}${url}` : url, { waitUntil: 'load' });
  await page.waitForTimeout(300);
  if (js) { await page.evaluate(js); await page.waitForTimeout(500); }
  await page.screenshot({ path: out });
  console.log('saved', out);
}
if (errors.length) console.log('PAGE ERRORS:\n' + errors.join('\n'));
await browser.close();
