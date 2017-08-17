#!/bin/sh
cat logs/**/**/*.txt | grep -P '[?<=\s]cheer(\d+)(?!\S)' | grep "$1"
