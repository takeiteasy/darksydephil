#!/usr/bin/env python3
from TwitterAPI import TwitterAPI
import sys

config = [x[:-1] for x in open('twitter_bot.conf', 'r').readlines() if len(x) > 1];
twatter = TwitterAPI(config[0], config[1], config[2], config[3])
print(twatter.request('statuses/update_with_media', {'status': "#DSP #TheSnortReport for the month of {} ({}) for Twitch".format(sys.argv[2], sys.argv[1])}, {'media[]': open('twitch_out.png', 'rb').read()}).status_code)
print(twatter.request('statuses/update_with_media', {'status': "#DSP #TheSnortReport for the month of {} ({}) for Patreon".format(sys.argv[2], sys.argv[1])}, {'media[]': open('paymetonnes_out.png', 'rb').read()}).status_code)
