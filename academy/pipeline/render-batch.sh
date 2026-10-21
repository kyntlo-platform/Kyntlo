#!/usr/bin/env bash
# Renders many lessons, N at a time, skipping ones already rendered.
#   ./render-batch.sh 3 ../lessons/customer/a07-*.mjs
# Logs: academy/.cache/logs/<lesson>.log · summary line per lesson on stdout.
set -u
jobs=$1; shift
cd "$(dirname "$0")"
mkdir -p ../.cache/logs
printf '%s\n' "$@" | xargs -P "$jobs" -I{} bash -c '
  name=$(basename "{}" .mjs)
  if [ -f "../output/$name.mp4" ]; then echo "skip $name (already rendered)"; exit 0; fi
  start=$(date +%s)
  if node render.mjs "{}" > "../.cache/logs/$name.log" 2>&1; then
    echo "done $name in $(( $(date +%s) - start ))s"
  else
    echo "FAIL $name (see .cache/logs/$name.log)"
  fi'
