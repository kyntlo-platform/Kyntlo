#!/usr/bin/env python3
"""Render every README.md in the package to a matching PDF.

Markdown -> styled HTML -> Chromium print. Run: python3 md2pdf.py
"""
import pathlib, re, sys
import markdown as md

ROOT = pathlib.Path(__file__).parent
PKG = ROOT / 'dist' / 'kyntlo-ads-2026-q4'
FONTS = (ROOT / 'fonts').resolve()

CSS = """
@import url("file://__FONTS__/brand.css");
@page { size: A4; margin: 17mm 16mm 18mm; }
*{box-sizing:border-box}
body{
  font-family:'Inter',system-ui,sans-serif; font-size:9.6pt; line-height:1.62;
  color:#1a1424; margin:0; -webkit-print-color-adjust:exact; print-color-adjust:exact;
}
h1,h2,h3,h4{font-family:'Space Grotesk','Inter',sans-serif; letter-spacing:-.02em; line-height:1.18;
  color:#0d0818; margin:0 0 .4em; break-after:avoid}
h1{font-size:23pt; margin-bottom:.15em; letter-spacing:-.035em}
h1+p{color:#6b6280; font-size:10.5pt; margin-bottom:1.4em}
h2{font-size:14pt; margin-top:1.9em; padding-top:.7em; border-top:1.5px solid #e6e1ee}
h3{font-size:11.2pt; margin-top:1.5em; color:#6d00c1}
h4{font-size:10pt; margin-top:1.2em}
p,ul,ol{margin:0 0 .8em}
ul,ol{padding-left:1.25em}
li{margin-bottom:.25em}
strong{color:#0d0818}
em{color:#3d3450}
a{color:#b8006a; text-decoration:none}
hr{border:0;border-top:1.5px solid #e6e1ee;margin:1.8em 0}
code{font-family:'JetBrains Mono',monospace; font-size:8.4pt; background:#f4f1f8;
  padding:1px 4px; border-radius:3px; color:#4a1d7a}
pre{background:#0d0818; color:#eee9f5; border-radius:7px; padding:12px 14px;
  overflow:hidden; break-inside:avoid; margin:0 0 1em}
pre code{background:none; color:inherit; font-size:8pt; padding:0; white-space:pre-wrap; word-break:break-word}
table{width:100%; border-collapse:collapse; font-size:8.7pt; margin:0 0 1.1em; break-inside:avoid}
th,td{text-align:left; padding:6px 8px; border-bottom:1px solid #e6e1ee; vertical-align:top}
thead th{font-family:'JetBrains Mono',monospace; font-size:7pt; letter-spacing:.09em;
  text-transform:uppercase; color:#6b6280; background:#f4f1f8; border-bottom:1.5px solid #ddd6e8}
tbody tr:last-child td{border-bottom:0}
blockquote{margin:0 0 1em; padding:9px 14px; border-left:3px solid #f20089;
  background:#fdf4f9; border-radius:0 6px 6px 0}
blockquote p:last-child{margin-bottom:0}
.brandbar{height:4px; background:linear-gradient(90deg,#f20089,#6d00c1); margin-bottom:22px; border-radius:2px}
.foot{margin-top:2.4em; padding-top:.8em; border-top:1.5px solid #e6e1ee;
  font-family:'JetBrains Mono',monospace; font-size:7pt; letter-spacing:.07em; color:#8a819e}
[dir="rtl"], .rtl{font-family:'IBM Plex Sans Arabic',sans-serif; direction:rtl; text-align:right}
""".replace("__FONTS__", str(FONTS))


def build_html(text, name):
    body = md.markdown(text, extensions=['tables', 'fenced_code', 'sane_lists', 'attr_list'])
    # Arabic blocks render right-to-left
    body = re.sub(r'(<code>)([^<]*[؀-ۿ][^<]*)(</code>)',
                  r'<code class="rtl">\2</code>', body)
    return ('<!doctype html><html lang="en"><head><meta charset="utf-8">'
            '<style>%s</style></head><body><div class="brandbar"></div>%s'
            '<div class="foot">KYNTLO &middot; CREATIVE BATCH 2026-10 &middot; %s</div>'
            '</body></html>' % (CSS, body, name.upper()))


def main():
    targets = sorted(PKG.rglob('*.md'))
    if not targets:
        sys.exit('No markdown found in %s — run package.py first.' % PKG)
    for src in targets:
        label = src.parent.name if src.name == 'README.md' else src.stem
        src.with_suffix('.tmp.html').write_text(build_html(src.read_text(), label))
    print('%d HTML files staged' % len(targets))


main()
