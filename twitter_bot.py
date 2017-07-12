#!/usr/local/bin/python3
from TwitterAPI import TwitterAPI

CONSUMER_KEY        = ''
CONSUMER_SECRET     = ''
ACCESS_TOKEN_KEY    = ''
ACCESS_TOKEN_SECRET = ''

print(TwitterAPI(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET).request('statuses/update_with_media', {'status':'TWEET MESSAGE'}, {'media[]': open('IMAGE PATH', 'rb').read()}).status_code)
