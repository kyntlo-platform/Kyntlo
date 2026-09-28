/* Render the staged HTML to PDF. Run after md2pdf.py.
   NODE_PATH=/opt/node22/lib/node_modules node md2pdf.js */
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');

const PKG = path.join(__dirname, 'dist', 'kyntlo-ads-2026-q4');

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.tmp.html')) out.push(p);
  }
  return out;
}

(async () => {
  const files = walk(PKG).sort();
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const f of files) {
    const pdf = f.replace(/\.tmp\.html$/, '.pdf');
    await page.goto('file://' + f);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(140);
    await page.pdf({
      path: pdf, format: 'A4', printBackground: true,
      margin: { top: '17mm', bottom: '18mm', left: '16mm', right: '16mm' },
    });
    fs.unlinkSync(f);
    const kb = Math.round(fs.statSync(pdf).size / 1024);
    console.log('  ' + path.relative(PKG, pdf).padEnd(40) + String(kb).padStart(4) + ' KB');
  }
  await browser.close();
  console.log(files.length + ' PDFs written');
})();
