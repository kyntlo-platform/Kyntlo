#!/usr/bin/env bash
# preview.sh <scene.html> <outprefix> <comma-separated times>  -> <outprefix>_sheet.png
set -e
cd "$(dirname "$0")"
NODE_PATH=$(npm root -g) node dbg.cjs "$1"
NODE_PATH=$(npm root -g) node render.cjs "$1" "$2" --stills "$3"
python3 - "$2" "$3" <<'PY'
import sys
from PIL import Image
pre, times = sys.argv[1], sys.argv[2].split(',')
ims = [Image.open(f"{pre}-{t.replace('.', '_')}.png") for t in times]
w, h = 400, 711
out = Image.new('RGB', (w * len(ims), h))
for i, im in enumerate(ims): out.paste(im.resize((w, h)), (i * w, 0))
out.save(pre + '_sheet.png')
PY
