#!/usr/bin/env bash
# Produces every Kyntlo Academy video: narration first (all cores), then recording + editing.
# Progress: academy/.cache/logs/produce-all.log
cd "$(dirname "$0")"
log=../.cache/logs/produce-all.log
mkdir -p ../.cache/logs
lessons=$(ls ../lessons/customer/a*.mjs ../lessons/prospect/b[0-9][0-9]-*.mjs ../lessons/support/c*.mjs)
echo "== voice pass $(date)" >> "$log"
./render-batch.sh 4 --voice $lessons >> "$log" 2>&1
echo "== render pass $(date)" >> "$log"
./render-batch.sh 2 $lessons >> "$log" 2>&1
echo "== finished $(date)" >> "$log"
