#!/usr/bin/env python3
import datetime, os

today = datetime.datetime.now()
year = today.year
month = today.month
day = today.day

def is_leap_year(y):
    return y % 4 == 0 and (y % 100 != 0 or y % 400 == 0)

month_days  = [31, 29 if is_leap_year(year) else 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

if day == 1:
    month = month - 1 if month > 1 else 12
    if month == 12:
        year -= 1
    day = month_days[month - 1]
else:
    day -= 1

os.system("python3 {} '{}-{}-{}'".format(os.path.expanduser('~/darksydephil/daily_bot.py', year, month, day)))
