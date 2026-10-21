#!/bin/sh
# Render every ad in one theme. Two of these run side by side — the box has
# four cores and one chromium saturates about one of them.
D="$(dirname "$0")"
TH="${1:-dark}"
for ad in v3-vsl v3-audit v3-stack v3-objections v3-timeline; do
  NODE_PATH=/opt/node22/lib/node_modules /opt/node22/bin/node \
    "$D/v3-scenes.js" "$ad" v3-final.json "$TH" || exit 1
done
