#!/usr/bin/env python3
"""Zip the package. Run after package.py and md2pdf.py."""
import pathlib, zipfile
DIST = pathlib.Path(__file__).parent / 'dist'
PKG = DIST / 'kyntlo-ads-2026-q4'
z_path = DIST / 'kyntlo-ads-2026-q4.zip'
with zipfile.ZipFile(z_path, 'w', zipfile.ZIP_DEFLATED) as z:
    for p in sorted(PKG.rglob('*')):
        if p.is_file():
            z.write(p, p.relative_to(DIST))
print('%s  (%.1f MB, %d files)' % (z_path.name, z_path.stat().st_size/1e6,
      len([f for f in PKG.rglob("*") if f.is_file()])))
