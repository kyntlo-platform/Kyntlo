#!/usr/bin/env bash
# Renders many lessons, N at a time, skipping ones already rendered.
#   ./render-batch.sh 2 ../lessons/customer/a07-*.mjs
# Voice everything first so recordings aren't slowed by speech synthesis:
#   ./render-batch.sh 4 --voice ../lessons/customer/*.mjs
# Logs: academy/.cache/logs/<lesson>.log · summary line per lesson on stdout.
set -u
jobs=$1; shift
mode=""
if [ "${1:-}" = "--voice" ]; then mode="--voice"; shift; fi
export mode
cd "$(dirname "$0")"
mkdir -p ../.cache/logs
printf '%s\n' "$@" | xargs -P "$jobs" -I{} bash -c '
  name=$(basename "{}" .mjs)
  if [ -n "$mode" ]; then node render.mjs --voice "{}" 2>&1 | tail -1; exit 0; fi
  if [ -f "../output/$name.mp4" ]; then echo "skip $name (already rendered)"; exit 0; fi
  start=$(date +%s)
  if node render.mjs "{}" > "../.cache/logs/$name.log" 2>&1; then
    echo "done $name in $(( $(date +%s) - start ))s"
  else
    echo "FAIL $name (see .cache/logs/$name.log)"
  fi'
