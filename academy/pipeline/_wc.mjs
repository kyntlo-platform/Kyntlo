import path from 'node:path'; import { pathToFileURL } from 'node:url';
for (const f of process.argv.slice(2)) { const { default: l } = await import(pathToFileURL(path.resolve(f)).href);
  const per = l.scenes.map(s => (s.say||'').split(/\s+/).filter(Boolean).length);
  console.log(path.basename(f), 'words', per.reduce((a,b)=>a+b,0), 'scenes', l.scenes.length, per.join(' ')); }
