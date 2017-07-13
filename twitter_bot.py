#!/usr/local/bin/python3
from TwitterAPI import TwitterAPI
import sys

config = [x[:-1] for x in open('twitter_bot.conf', 'r').readlines() if len(x) > 1];
print(TwitterAPI(config[0], config[1], config[2], config[3]).request('statuses/update_with_media', {'status': "#DSP #TheSnortReport for the month of {} ({})".format(sys.argv[1], sys.argv[2])}, {'media[]': open('twitch_out.png', 'rb').read()}).status_code)
