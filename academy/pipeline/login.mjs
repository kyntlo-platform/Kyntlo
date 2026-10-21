#!/usr/bin/env node
// Signs in to the Kyntlo app once and saves the session so recordings start
// logged in. Reads KYNTLO_EMAIL / KYNTLO_PASSWORD from the environment; never
// pass credentials on the command line. If the account asks for a one-time
// code, set KYNTLO_OTP to the code and run again within its validity window.
import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
import { AUTH_STATE, ENV } from './lib/config.mjs';

const { KYNTLO_EMAIL: email, KYNTLO_PASSWORD: password, KYNTLO_OTP: otp } = process.env;
if (!email || !password) {
  console.error('Set KYNTLO_EMAIL and KYNTLO_PASSWORD as environment secrets first.');
  process.exit(1);
}

const browser = await chromium.launch({ headless: !process.argv.includes('--headed') });
const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
const page = await context.newPage();
await page.goto(ENV.appUrl, { waitUntil: 'networkidle' });
await page.locator('input[type="email"], input[name="email"]').first().fill(email);
await page.locator('input[type="password"]').first().fill(password);
await page.locator('button[type="submit"], button:has-text("Sign in"), button:has-text("Log in")').first().click();

if (otp) {
  const code = page.locator('input[autocomplete="one-time-code"], input[name*="otp" i], input[maxlength="1"]');
  await code.first().waitFor({ timeout: 20000 });
  if ((await code.count()) > 1) for (const [i, d] of [...otp].entries()) await code.nth(i).fill(d);
  else await code.first().fill(otp);
  await page.keyboard.press('Enter');
}

await page.waitForURL(/\/(v2\/)?location\/|\/dashboard/, { timeout: 60000 }).catch(async () => {
  await page.screenshot({ path: 'login-failed.png' });
  console.error('Login did not reach the app (screenshot: login-failed.png). It may need a one-time code: set KYNTLO_OTP.');
  process.exit(1);
});
const loc = page.url().match(/location\/([A-Za-z0-9]+)/)?.[1];
await fs.mkdir(path.dirname(AUTH_STATE), { recursive: true });
await context.storageState({ path: AUTH_STATE });
await browser.close();
console.log(`Saved session to ${AUTH_STATE}${loc ? `\nLocation id: ${loc} (set KYNTLO_LOCATION_ID=${loc})` : ''}`);
