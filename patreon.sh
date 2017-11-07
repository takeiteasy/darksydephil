#!/usr/bin/env sh
echo $(echo '{ "'$(date +%s)'": { "patrons":' $(curl -Ss https://www.patreon.com/$1 | grep -E "pledge_sum|patron_count" | head -n 2 | sed -e 's/.*: //' | tr -d '\n' | cut -d ',' -f1-2 | sed -e 's/,/, "earnings": /') "} }") $(tee < $2) | /usr/local/bin/jq -M -c -S -s add | /usr/local/bin/jq "to_entries | .[] | select((.key | tonumber) > $(echo "$(date +%s) - 2592000" | bc))" | /usr/local/bin/jq -s '.' | /usr/local/bin/jq -M -c 'from_entries' | /usr/local/bin/sponge $2
