#!/bin/sh
grep -Po '[?<=\s]cheer(\d+)(?!\S)' | cut -d 'r' -f2 | awk '{total = total + $1}END{print total / 100}'
