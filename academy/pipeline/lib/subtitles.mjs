// Turns narration text into readable subtitle cues: at most two lines of
// ~42 characters, broken at sentence and clause boundaries, timed in
// proportion to their length across the narration.
const MAX = 84;
const LINE = 42;

function chunks(text) {
  const out = [];
  for (const sentence of text.replace(/\s+/g, ' ').trim().match(/.+?(?:[.!?]+["')]?(?=\s|$)|$)/g) || []) {
    let rest = sentence.trim();
    while (rest.length > MAX) {
      // Prefer breaking after a comma/dash near the limit, else at a space.
      const window = rest.slice(0, MAX);
      let cut = Math.max(window.lastIndexOf(', '), window.lastIndexOf(' — '), window.lastIndexOf('; '));
      cut = cut > MAX * 0.45 ? cut + 1 : window.lastIndexOf(' ');
      out.push(rest.slice(0, cut).trim());
      rest = rest.slice(cut).trim();
    }
    if (rest) out.push(rest);
  }
  return out;
}

function twoLines(s) {
  if (s.length <= LINE) return s;
  const words = s.split(' ');
  let best = s;
  let bestDiff = Infinity;
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(' ');
    const b = words.slice(i).join(' ');
    const diff = Math.abs(a.length - b.length);
    if (diff < bestDiff) [best, bestDiff] = [`${a}\n${b}`, diff];
  }
  return best;
}

export function cues(text, start, seconds) {
  const parts = chunks(text);
  const total = parts.reduce((n, p) => n + p.length, 0);
  let t = start;
  return parts.map((p) => {
    const d = (seconds * p.length) / total;
    const cue = { start: t, end: t + d, text: twoLines(p) };
    t += d;
    return cue;
  });
}

const stamp = (t, sep) => {
  const ms = Math.round(t * 1000);
  const h = Math.floor(ms / 3600000);
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;
  const pad = (n, w = 2) => String(n).padStart(w, '0');
  return sep === ','
    ? `${pad(h)}:${pad(m)}:${pad(s)},${pad(ms % 1000, 3)}`
    : `${h}:${pad(m)}:${pad(s)}.${pad(Math.floor((ms % 1000) / 10))}`;
};

export function toSrt(list) {
  return list.map((c, i) => `${i + 1}\n${stamp(c.start, ',')} --> ${stamp(c.end, ',')}\n${c.text}\n`).join('\n');
}

export function toAss(list) {
  // Colours are &HAABBGGRR. Box is Kyntlo ink (#120b1f) at ~75% opacity.
  const header = `[Script Info]
ScriptType: v4.00+
PlayResX: 1920
PlayResY: 1080
WrapStyle: 2
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,Inter,46,&H00FFFFFF,&H00FFFFFF,&H401F0B12,&H401F0B12,-1,0,0,0,100,100,0,0,3,14,0,2,120,120,56,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
`;
  return header + list
    .map((c) => `Dialogue: 0,${stamp(c.start)},${stamp(c.end)},Default,,0,0,0,,{\\fad(120,120)}${c.text.replace(/\n/g, '\\N')}`)
    .join('\n') + '\n';
}
