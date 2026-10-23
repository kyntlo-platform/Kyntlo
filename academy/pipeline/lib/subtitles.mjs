// Turns narration text into readable subtitle cues: at most two lines of
// ~42 characters, broken at sentence and clause boundaries, timed in
// proportion to their length across the narration.
const MAX = 84;
const LINE = 42;

function chunks(text, MAX) {
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

function twoLines(s, LINE) {
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

// `line` sets the characters per line (narrower for portrait); cues hold at most two lines.
export function cues(text, start, seconds, { line = LINE } = {}) {
  const parts = chunks(text, line * 2);
  const total = parts.reduce((n, p) => n + p.length, 0);
  let t = start;
  return parts.map((p) => {
    const d = (seconds * p.length) / total;
    const cue = { start: t, end: t + d, text: twoLines(p, line) };
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

// ASS colour from #rrggbb and an opacity (0-1): &HAABBGGRR, where AA is transparency.
export const assColour = (hex, opacity = 1) => {
  const [r, g, b] = [1, 3, 5].map((i) => hex.slice(i, i + 2));
  return `&H${Math.round((1 - opacity) * 255).toString(16).padStart(2, '0').toUpperCase()}${b}${g}${r}`.toUpperCase();
};

// `opts` adjusts the look: frame size, font size, bottom margin, box colour, and extra
// styles/events (the portrait version's title band).
export function toAss(list, opts = {}) {
  const { width = 1920, height = 1080, size = 46, marginV = 56, marginH = 120, box = '#120b1f', boxOpacity = 0.75, font = 'Inter', styles = [], events = [] } = opts;
  // Colours are &HAABBGGRR. Box is Kyntlo ink (#120b1f) at ~75% opacity by default.
  const header = `[Script Info]
ScriptType: v4.00+
PlayResX: ${width}
PlayResY: ${height}
WrapStyle: 2
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,${font},${size},&H00FFFFFF,&H00FFFFFF,${assColour(box, boxOpacity)},${assColour(box, boxOpacity)},-1,0,0,0,100,100,0,0,3,${Math.round(size * 0.3)},0,2,${marginH},${marginH},${marginV},1
${styles.join('\n')}

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
`;
  return header + [
    ...list.map((c) => `Dialogue: 1,${stamp(c.start)},${stamp(c.end)},Default,,0,0,0,,{\\fad(120,120)}${c.text.replace(/\n/g, '\\N')}`),
    ...events.map((e) => `Dialogue: ${e.layer ?? 0},${stamp(e.start)},${stamp(e.end)},${e.style},,0,0,0,,${e.text}`),
  ].join('\n') + '\n';
}


