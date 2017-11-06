#!/bin/sh
curl -sS "https://overrustlelogs.net/Darksydephil%20chatlog/August%202017/2017-08-$1.txt" | grep -P '[?<=\s](?:kappa|kreygasm|swiftrage|muxy|streamlab|failfish|vohiyo|pjsalt|trihard|notlikethis|4head|mrdestructoid|bday|cheer)(\d+)(?!\S)' | grep "$2"
