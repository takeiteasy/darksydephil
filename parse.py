#!/usr/local/bin/python3
import time

def print_test(ts):
    print(time.strftime('logs/%Y/%B/%Y-%m-%d.txt', time.localtime(int(ts) / 1000)))

with open('logs/log.txt') as fh:
    for line in fh:
        parts = line.split(' #darksydephil :', 1)
        info  = dict(x.split('=') for x in parts[0].split(';'))
        if 'tmi-sent-ts' in info:
            print_test(info['tmi-sent-ts'])
        elif 'sent-ts' in info:
            print_test(info['sent-ts'])


