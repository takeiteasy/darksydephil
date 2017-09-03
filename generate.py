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

c_date = datetime.datetime.now()
last_month = month_names[11 if c_date.month == 1 else c_date.month - 2]

users = {}
paypigs = {}
last_month_paypigs = {}
data = {}
for year in range(2016, c_date.year + 1):
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
                                    else:
                                        name = info['user-type'].split('!')[0][2:]
                                        if name not in users[info['user-id']]:
                                            users[info['user-id']].append(name)

                                    if 'bits' in info:
                                        bits = int(info['bits'])
                                        data[year][month_name][day]['bits'] += bits
                                        if not info['user-id'] in paypigs:
                                            paypigs[info['user-id']] = 0
                                        paypigs[info['user-id']] += bits
                                        if year == c_date.year and month_name == last_month:
                                            if not info['user-id'] in last_month_paypigs:
                                                last_month_paypigs[info['user-id']] = 0
                                            last_month_paypigs[info['user-id']] += bits
                                    elif 'msg-param-sub-plan' in info:
                                        data[year][month_name][day]['subs'] += sub_money[info['msg-param-sub-plan']]
                                    elif 'subscriber' in info and info['subscriber'] == '1' and 'system-msg' in info and new_sub_re.match(info['system-msg']):
                                        data[year][month_name][day]['subs'] += 2.5;

                                else:
                                    id = info['target-user-id'].split(" ")[0]
                                    data[year][month_name][day]['bans' if '@ban-duration' in info else 'permabans'].append(users[id][0] if id in users else msg)
                        else:
                            for line in fh:
                                m = sub_re.match(line)
                                if m:
                                    data[year][month_name][day]['subs'] += 2.5
                                else:
                                    data[year][month_name][day]['bits'] += sum([int(x) for x in cheer_re.findall(line)])

paypigs_out = {}
last_month_paypigs_out = {}

paypigs_out = { users[v[0]][0]: v[1] for v in sorted(paypigs.items(), key=lambda k: k[1])[-30:] }
last_month_paypigs_out = { users[v[0]][0]: v[1] for v in sorted(last_month_paypigs.items(), key=lambda k: k[1])[-30:] }

patreon_data = None
for line in requests.get("https://graphtreon.com/creator/darksydephil").text.split("\n"):
    if line[2:14] == "var dataJson":
        patreon_data = line[2:]
        break

if patreon_data:
    with open("www/data.json", 'w') as fh:
        fh.write("var data = '{}';\n{}\nvar paypigs = '{}';\nvar last_paypigs = '{}';".format(json.dumps(data), patreon_data, json.dumps(paypigs_out), json.dumps(last_month_paypigs_out)).replace('\\s', ''))
