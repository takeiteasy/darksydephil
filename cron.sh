#!/bin/sh
if ps -ef | grep -v grep | grep twitch.rb ; then
	exit 0
else
	cd /Users/roryb/Dropbox/git/darksydephil
	ruby twitch.rb > ~/.twitch.log
	exit 0
fi
