#!/bin/sh
if ps -ef | grep -v grep | grep twitch.py ; then
	exit 0
else
	cd /home/reimu/darksydephil
	python3 twitch.py > ~/.twitch.log
	exit 0
fi
