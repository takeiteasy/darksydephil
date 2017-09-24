echo $(./test.sh) $(tee < data.json) | jq -M -c -S -s add | sponge data.json
