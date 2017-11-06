#!/bin/sh
cat logs/**/**/*.txt | grep -P '[?<=\s](?:kappa|kreygasm|swiftrage|muxy|streamlab|failfish|vohiyo|pjsalt|trihard|notlikethis|4head|mrdestructoid|bday|cheer)(\d+)(?!\S)' | grep "$1"
