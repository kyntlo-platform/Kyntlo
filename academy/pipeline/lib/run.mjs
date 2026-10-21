import { spawn } from 'node:child_process';

export function run(cmd, args, { quiet = true } = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let out = '';
    let err = '';
    p.stdout.on('data', (d) => (out += d));
    p.stderr.on('data', (d) => {
      err += d;
      if (!quiet) process.stderr.write(d);
    });
    p.on('error', reject);
    p.on('close', (code) =>
      code === 0 ? resolve(out) : reject(new Error(`${cmd} exited ${code}\n${err.slice(-4000)}`)),
    );
  });
}

export const ffmpeg = (args) => run('ffmpeg', ['-hide_banner', '-v', 'error', '-y', ...args]);

export async function duration(file) {
  const out = await run('ffprobe', [
    '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', file,
  ]);
  return parseFloat(out);
}
