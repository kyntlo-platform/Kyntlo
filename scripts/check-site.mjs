#!/usr/bin/env node
/**
 * Kyntlo site check.
 *
 *   node scripts/check-site.mjs            static checks only, no dependencies
 *   node scripts/check-site.mjs --browser  also run the browser checks
 *
 * The static pass needs nothing but Node. The browser pass needs Playwright
 * (`npm i -D playwright && npx playwright install chromium`) and serves the site
 * on a local port to catch JavaScript errors, broken images and sideways scroll.
 * Set CHROMIUM_PATH to use a browser you already have rather than downloading one.
 *
 * Exits non-zero if anything fails, so it can gate a deploy.
 */

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname, extname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
const warnings = [];
const notes = [];

const fail = (msg) => failures.push(msg);
const warn = (msg) => warnings.push(msg);

const REQUIRED_PAGES = [
    "index.html", "about.html", "funnels.html", "compare.html", "pricing.html",
    "checkout.html", "trial.html", "get-started.html", "contact.html", "faq.html",
    "security.html", "privacy.html", "terms.html", "refund.html", "cookies.html", "dpa.html",
    "accessibility.html"
];

/* Redirect stubs: intentionally thin, so most page-level rules do not apply. */
const STUBS = new Set([
    "package-starter.html", "package-growth.html", "package-pro.html", "package-scale.html"
]);

const htmlFiles = readdirSync(ROOT).filter((f) => f.endsWith(".html")).sort();
const read = (f) => readFileSync(join(ROOT, f), "utf8");

/* ------------------------------------------------------------ structure --- */

for (const page of REQUIRED_PAGES) {
    if (!existsSync(join(ROOT, page))) fail(`Missing required page: ${page}`);
}

for (const f of htmlFiles) {
    if (f.endsWith(".html.html")) fail(`Double HTML extension: ${f}`);
}

/* ------------------------------------------------- local references exist --- */

const referenced = new Set();

for (const f of htmlFiles) {
    const html = read(f);
    for (const m of html.matchAll(/(?:href|src)\s*=\s*["']([^"']+)["']/g)) {
        const raw = m[1];
        if (/^(https?:|mailto:|tel:|data:|javascript:|#|\/\/)/i.test(raw)) continue;
        const path = decodeURIComponent(raw.split("#")[0].split("?")[0]);
        if (!path) continue;
        referenced.add(path);
        if (!existsSync(join(ROOT, path))) fail(`${f} references a missing file: ${raw}`);
    }
}

/* CSS and JS reference images too */
for (const asset of ["assets/site-shell.css", "assets/checkout-page.css",
                     "assets/site-shell.js", "assets/currency-pricing.js",
                     "assets/checkout-page.js"]) {
    if (!existsSync(join(ROOT, asset))) { fail(`Missing shared asset: ${asset}`); continue; }
    const src = readFileSync(join(ROOT, asset), "utf8");
    for (const m of src.matchAll(/url\(["']?([^)"']+)["']?\)|["'](assets\/[^"']+\.(?:png|jpe?g|webp|svg|gif))["']/gi)) {
        const path = (m[1] || m[2] || "").split("#")[0].split("?")[0];
        if (!path || /^(https?:|data:)/i.test(path)) continue;
        /* the case-insensitive flag makes `new URL(href, ...)` look like `url(...)`,
           so only treat a match as an asset if it actually names an image file */
        if (!/\.(png|jpe?g|webp|svg|gif)$/i.test(path)) continue;
        referenced.add(path);
        if (!existsSync(join(ROOT, path))) fail(`${asset} references a missing file: ${path}`);
    }
}

/* ------------------------------------------------------- unused payload --- */

const IGNORE_DIRS = new Set([".git", "docs", "scripts", "node_modules", "dist-packages"]);
const walk = (dir, out = []) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (IGNORE_DIRS.has(entry.name) || entry.isSymbolicLink()) continue;
        const abs = join(dir, entry.name);
        if (entry.isDirectory()) walk(abs, out);
        else out.push(relative(ROOT, abs));
    }
    return out;
};

const SHIPPED = new Set([".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif", ".css", ".js", ".ico"]);
for (const file of walk(ROOT)) {
    if (!SHIPPED.has(extname(file).toLowerCase())) continue;
    if (referenced.has(file)) continue;
    if (file === "assets/og-kyntlo-preview.png") continue;   // referenced by absolute URL in meta tags
    warn(`Not referenced by anything: ${file}`);
}

/* ------------------------------------------------------------ per page ---- */

for (const f of htmlFiles) {
    const html = read(f);
    const stub = STUBS.has(f);

    if (!stub) {
        for (const landmark of ["<nav", "<main", "<footer"]) {
            if (!html.includes(landmark)) fail(`${f} is missing ${landmark}`);
        }
        if (!html.includes("<noscript")) fail(`${f} has no <noscript> fallback`);
    }

    if (!/rel="canonical"/.test(html)) fail(`${f} has no canonical link`);
    if (!/<title>[^<]+<\/title>/.test(html)) fail(`${f} has no title`);
    if (!stub && !/name="description"/.test(html)) warn(`${f} has no meta description`);

    /* every local stylesheet and script must carry a cache-busting stamp */
    for (const m of html.matchAll(/(?:href|src)="(assets\/[^"]+\.(?:css|js))"/g)) {
        fail(`${f} loads ${m[1]} without a ?v= stamp`);
    }

    /* one h1, and no skipped heading levels */
    /* checkout.html renders its heading from checkout-page.js, so the source has none. */
    const rendersOwnHeading = /id="checkout-page"/.test(html);
    const h1s = (html.match(/<h1[\s>]/g) || []).length;
    if (!stub && !rendersOwnHeading && h1s !== 1) {
        fail(`${f} has ${h1s} <h1> elements (expected exactly 1)`);
    }

    let previous = 0;
    for (const m of html.matchAll(/<h([1-6])[\s>]/g)) {
        const level = Number(m[1]);
        if (previous && level > previous + 1) {
            fail(`${f} skips a heading level (h${previous} to h${level})`);
            break;
        }
        previous = level;
    }

    /* images need alt text */
    for (const m of html.matchAll(/<img\b[^>]*>/g)) {
        if (!/\salt=/.test(m[0])) fail(`${f} has an <img> with no alt attribute`);
    }

    /* structured data must parse */
    for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
        try {
            const data = JSON.parse(m[1]);
            notes.push(`${f}: valid ${data["@type"]} structured data`);
        } catch (error) {
            fail(`${f} has JSON-LD that does not parse: ${error.message}`);
        }
    }
}

/* --------------------------------------------------------- server config -- */

const htaccess = existsSync(join(ROOT, ".htaccess")) ? read(".htaccess") : "";
for (const rule of ["Cache-Control", "X-Content-Type-Options", "Referrer-Policy", "RedirectMatch 404"]) {
    if (!htaccess.includes(rule)) fail(`.htaccess is missing ${rule}`);
}
if (!existsSync(join(ROOT, "robots.txt"))) fail("robots.txt is missing");
if (!existsSync(join(ROOT, "sitemap.xml"))) fail("sitemap.xml is missing");

/* every sitemap URL must resolve to a real page */
if (existsSync(join(ROOT, "sitemap.xml"))) {
    for (const m of read("sitemap.xml").matchAll(/<loc>https:\/\/kyntlo\.ai\/([^<]*)<\/loc>/g)) {
        const slug = m[1].replace(/\/$/, "");
        const page = slug === "" ? "index.html" : `${slug}.html`;
        if (!existsSync(join(ROOT, page))) fail(`sitemap.xml lists /${slug}, but ${page} does not exist`);
    }
}

/* ------------------------------------------------------------- contrast --- */

const luminance = (hex) => {
    const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(1 + i, 3 + i), 16) / 255);
    const f = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const contrast = (a, b) => {
    const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return (hi + 0.05) / (lo + 0.05);
};

/* Pairs that have regressed before. WCAG AA wants 4.5:1 for normal-size text. */
const PAIRS = [
    ["price-tax on the white pricing card", "#5f5a6d", "#ffffff"],
    ["price-per on the white pricing card", "#5f5a6d", "#ffffff"],
    ["muted body text on the dark ground", "#a49fb8", "#07050f"],
    ["gradient heading tail on the dark ground", "#b06bff", "#07050f"],
    ["brand pink on the dark ground", "#f20089", "#07050f"]
];
for (const [label, fg, bg] of PAIRS) {
    const ratio = contrast(fg, bg);
    if (ratio < 4.5) fail(`Contrast ${ratio.toFixed(2)}:1 (needs 4.5) — ${label}, ${fg} on ${bg}`);
    else notes.push(`Contrast ${ratio.toFixed(2)}:1 — ${label}`);
}

/* --------------------------------------------------------- browser pass --- */

if (process.argv.includes("--browser")) {
    const { chromium } = await import("playwright").catch(() => ({}));
    if (!chromium) {
        warn("--browser requested but Playwright is not installed; skipping the browser pass");
    } else {
        const { createServer } = await import("node:http");
        const PORT = 8123;
        const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript",
                        ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp",
                        ".svg": "image/svg+xml", ".xml": "application/xml", ".txt": "text/plain" };
        const server = createServer((req, res) => {
            const path = join(ROOT, decodeURIComponent(req.url.split("?")[0]).replace(/^\/+/, "") || "index.html");
            if (!path.startsWith(ROOT) || !existsSync(path) || statSync(path).isDirectory()) {
                res.writeHead(404).end("not found");
                return;
            }
            res.writeHead(200, { "Content-Type": TYPES[extname(path)] || "application/octet-stream" });
            res.end(readFileSync(path));
        }).listen(PORT);

        /* CHROMIUM_PATH lets you point at a Chrome/Chromium you already have,
           instead of the build Playwright downloads for itself. */
        const browser = await chromium.launch(
            process.env.CHROMIUM_PATH
                ? { executablePath: process.env.CHROMIUM_PATH, args: ["--no-sandbox"] }
                : {}
        );
        const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        /* Third-party hosts are not the site's to test, and blocking them keeps the
           run fast and offline-safe. */
        await context.route("**/*", (route) =>
            route.request().url().includes(`127.0.0.1:${PORT}`) ? route.continue() : route.abort());

        for (const f of htmlFiles) {
            if (STUBS.has(f)) continue;
            const page = await context.newPage();
            const errors = [];
            page.on("pageerror", (e) => errors.push(String(e).slice(0, 160)));
            await page.goto(`http://127.0.0.1:${PORT}/${f}`, { waitUntil: "domcontentloaded" });
            await page.waitForTimeout(1400);

            const result = await page.evaluate(() => ({
                broken: [...document.querySelectorAll("img")]
                    .filter((i) => i.complete && i.naturalWidth === 0)
                    .map((i) => (i.getAttribute("src") || "").slice(0, 70)),
                overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
            }));

            for (const e of errors) fail(`${f} threw: ${e}`);
            for (const src of result.broken) fail(`${f} has a broken image: ${src}`);
            if (result.overflow) fail(`${f} scrolls sideways at 1440px`);
            await page.close();
        }

        /* narrow viewport: the pages most likely to overflow */
        const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
        await mobile.route("**/*", (route) =>
            route.request().url().includes(`127.0.0.1:${PORT}`) ? route.continue() : route.abort());
        for (const f of ["index.html", "pricing.html", "funnels.html", "checkout.html", "contact.html"]) {
            const page = await mobile.newPage();
            await page.goto(`http://127.0.0.1:${PORT}/${f}`, { waitUntil: "domcontentloaded" });
            await page.waitForTimeout(1200);
            if (await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)) {
                fail(`${f} scrolls sideways at 390px`);
            }
            await page.close();
        }

        await browser.close();
        server.close();
        notes.push(`Browser pass ran on ${htmlFiles.length - STUBS.size} pages`);
    }
}

/* ----------------------------------------------------------------- report -- */

const RED = "[31m", YELLOW = "[33m", GREEN = "[32m", DIM = "[2m", OFF = "[0m";

if (notes.length) {
    console.log(`${DIM}${notes.length} checks passed with detail:${OFF}`);
    for (const n of notes) console.log(`${DIM}  · ${n}${OFF}`);
    console.log();
}
if (warnings.length) {
    console.log(`${YELLOW}${warnings.length} warning(s):${OFF}`);
    for (const w of warnings) console.log(`${YELLOW}  ! ${w}${OFF}`);
    console.log();
}
if (failures.length) {
    console.log(`${RED}Site check failed with ${failures.length} issue(s):${OFF}`);
    for (const f of failures) console.log(`${RED}  ✗ ${f}${OFF}`);
    process.exit(1);
}

console.log(`${GREEN}Site check passed.${OFF}`);
console.log(`  Pages checked: ${htmlFiles.length}`);
console.log(`  Broken local references: 0`);
console.log(`  Warnings: ${warnings.length}`);
