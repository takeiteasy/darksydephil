#!/usr/bin/env sh
echo $(echo '{ "'$(date +%s)'": { "patrons":' $(curl -Ss https://www.patreon.com/$1 | grep -E "pledge_sum|patron_count" | head -n 2 | sed -e 's/.*: //' | tr -d '\n' | cut -d ',' -f1-2 | sed -e 's/,/, "earnings": /') "} }") $(tee < data.json) | /usr/bin/local/jq -M -c -S -s add | /usr/bin/local/sponge $2
