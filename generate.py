#!/usr/local/bin/python3
import os, time, re

def is_leap_year(y):
    return y % 4 == 0 and (y % 100 != 0 or y % 400 == 0)

def prepend_zero(n):
  return "0" + str(n) if n < 10 else n

month_days  = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

c_year, c_month, c_month_n, c_day = time.strftime("%Y/%B/%m/%d").split("/")
sub_re = re.compile(r'^\[(\d){2}:(\d){2}\] <twitchnotify> \S+ (.*)$')
cheer_re = re.compile(r'[?<=\s](?:kappa|kreygasm|swiftrage|cheer)(\d+)(?!\S)')
users = {}
data = {}
for year in range(2016, int(c_year) + 1):
    data[year] = {}
    for month in range(0, 12):
        data[year][month_names[month]] = {}
        if os.path.exists("logs/{}/{}".format(year, month_names[month])):
            for day in range(1, (29 if is_leap_year(year) else 28 if month == 1 else month_days[month]) + 1):
                path = "logs/{}/{}/{}-{}-{}.txt".format(year, month_names[month], year, prepend_zero(month + 1), prepend_zero(day))
                if os.path.exists(path):
                    data[year][month_names[month]][day] = { 'permabans': [], 'bans': [], 'bits': 0, 'subs': 0 }
                    with open(path, 'r') as fh:
                        if year > 2016:
                            for line in fh:
                                parts = line.split(' #darksydephil :', 1)
                                info  = dict(x.split('=') for x in parts[0].split(';'))
                                msg   = parts[1][:-1] if len(parts) == 2 else ""
                                if 'user-id' in info:
                                    if not info['user-id'] in users:
                                        users[info['user-id']] = []
                                    if info['display-name'] not in users[info['user-id']]:
                                        users[info['user-id']].append(info['display-name'])

                                    if 'bits' in info:
                                        data[year][month_names[month]][day]['bits'] += int(info['bits'])
                                else:
                                    data[year][month_names[month]][day]['permabans' if '@ban-duration' in info else 'bans'].append(info['target-user-id'])
                        else:
                            for line in fh:
                                m = sub_re.match(line)
                                if m:
                                    data[year][month_names[month]][day]['subs'] += 2.5
                                else:
                                    data[year][month_names[month]][day]['bits'] += sum([int(x) for x in cheer_re.findall(line)])

import code
code.interact(local=locals())
