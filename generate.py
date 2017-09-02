#!/usr/local/bin/python3
import os, datetime, re, json, requests

def is_leap_year(y):
    return y % 4 == 0 and (y % 100 != 0 or y % 400 == 0)

def prepend_zero(n):
  return "0" + str(n) if n < 10 else n

month_days  = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
sub_money = { 'Prime': 2.5, '1000': 2.5, '2000': 6.66, '3000': 17.5 }

sub_re = re.compile(r'^\[(\d){2}:(\d){2}\] <twitchnotify> \S+ (.*)$')
new_sub_re = re.compile(r'.*\\ssubscribed\\s')
cheer_re = re.compile(r'[?<=\s](?:kappa|kreygasm|swiftrage|cheer)(\d+)(?!\S)')

users = {}
data = {}
for year in range(2016, datetime.datetime.now().year + 1):
    data[year] = {}
    for month in range(0, 12):
        month_name = month_names[month]
        if os.path.exists("logs/{}/{}".format(year, month_name)):
            data[year][month_name] = {}
            for day in range(1, (29 if is_leap_year(year) else 28 if month == 1 else month_days[month]) + 1):
                path = "logs/{}/{}/{}-{}-{}.txt".format(year, month_name, year, prepend_zero(month + 1), prepend_zero(day))
                if os.path.exists(path):
                    data[year][month_name][day] = { 'permabans': [], 'bans': [], 'bits': 0, 'subs': 0 }
                    with open(path, 'r') as fh:
                        if year > 2016:
                            for line in fh:
                                parts = line.split(' #darksydephil :', 1)
                                info  = dict(x.split('=') for x in parts[0].split(';'))
                                msg   = parts[1][:-1] if len(parts) == 2 else ""
                                if 'user-id' in info:
                                    if not info['user-id'] in users:
                                        users[info['user-id']] = []
                                    if 'display-name' in info and info['display-name'] not in users[info['user-id']] and info['display-name'] != '':
                                        users[info['user-id']].append(info['display-name'])

                                    if 'bits' in info:
                                        data[year][month_name][day]['bits'] += int(info['bits'])
                                    elif 'msg-param-sub-plan' in info:
                                        data[year][month_name][day]['subs'] += sub_money[info['msg-param-sub-plan']]
                                    elif 'subscriber' in info and info['subscriber'] == '1' and 'system-msg' in info and new_sub_re.match(info['system-msg']):
                                        data[year][month_name][day]['subs'] += 2.5;

                                else:
                                    id = info['target-user-id'].split(" ")[0]
                                    data[year][month_name][day]['bans' if '@ban-duration' in info else 'permabans'].append((users[id][-1] if len(users[id]) else msg) if id in users else msg)
                        else:
                            for line in fh:
                                m = sub_re.match(line)
                                if m:
                                    data[year][month_name][day]['subs'] += 2.5
                                else:
                                    data[year][month_name][day]['bits'] += sum([int(x) for x in cheer_re.findall(line)])

patreon_data = None
for line in requests.get("https://graphtreon.com/creator/darksydephil").text.split("\n"):
    if line[2:14] == "var dataJson":
        patreon_data = line[2:]
        break
if patreon_data:
    with open("www/data.json", 'w') as fh:
        fh.write("var data = '{}';\n{}".format(json.dumps(data).replace('\\s', ''), patreon_data))
