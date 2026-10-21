import sys, glob
from PIL import Image
d, out = sys.argv[1], sys.argv[2]
sel = sys.argv[3].split(',') if len(sys.argv) > 3 else None
fs = sorted(glob.glob(d + '/scene-*.png'))
if sel: fs = [f for f in fs if f.split('-')[-1][:2] in sel]
W, H = 960, 540
ims = [Image.open(f).resize((W, H)) for f in fs]
cols = 2; rows = (len(ims) + 1) // 2
sh = Image.new('RGB', (W * cols, H * rows), 'white')
for i, im in enumerate(ims): sh.paste(im, ((i % cols) * W, (i // cols) * H))
sh.save(out); print(len(ims))
