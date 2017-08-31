#!/usr/local/bin/python3
import time, re, os

last_date = ''
cur_fh = None

def write_to_file(str, ts):
    global last_date, cur_fh
    d = time.strftime('logs/%Y/%B/%Y-%m-%d.txt', time.localtime(int(ts) / 1000))
    if last_date != d:
        last_date = d
        if cur_fh:
            cur_fh.close()
        if not os.path.exists(os.path.dirname(last_date)):
            os.makedirs(os.path.dirname(last_date))
        if os.path.exists(last_date):
            cur_fh = open(last_date, 'a')
        else:
            cur_fh = open(last_date, 'w')
    cur_fh.write(str)

regex = re.compile(r'tmi-sent-ts=(\d+)')
regex_b = re.compile(r'sent-ts=(\d+)')
with open('logs/log.txt') as fh:
    for line in fh:
        x = regex.findall(line)
        if x:
            write_to_file(line, x[0])
        else:
            x = regex_b.findall(line)
            if x:
                write_to_file(line, x[0])
            else:
                if cur_fh:
                    cur_fh.write(line)





