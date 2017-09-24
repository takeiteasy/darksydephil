#!/bin/sh
grep -Po '[?<=\s](?:kappa|kreygasm|swiftrage|muxy|streamlab|failfish|vohiyo|pjsalt|trihard|notlikethis|4head|mrdestructoid|bday|cheer)(\d+)(?!\S)' | cut -d 'r' -f2 | awk '{total = total + $1}END{print total / 100}'
