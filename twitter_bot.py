#!/usr/local/bin/python3
from TwitterAPI import TwitterAPI

config = open('twitter_bot.conf', 'rb').read().split('\n\);
print(TwitterAPI(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET).request('statuses/update_with_media', {'status':'#DSP #TheSnortReport https://takeiteasy.github.io/darksydephil/'}, {'media[]': open('twitch_out.png', 'rb').read()}).status_code)
