#!/bin/sh
D="$(dirname "$0")"
for ad in v3-vsl v3-audit v3-stack v3-objections v3-timeline; do
  NODE_PATH=/opt/node22/lib/node_modules /opt/node22/bin/node "$D/v3-scenes.js" "$ad" v3-final.json || exit 1
done
