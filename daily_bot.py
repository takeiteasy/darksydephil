#!/usr/bin/env python3
import sys, re, requests, itertools
from TwitterAPI import TwitterAPI

def is_leap_year(y):
    return y % 4 == 0 and (y % 100 != 0 or y % 400 == 0)

month_days  = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
convert_sub = { '4.99': 2.5, '9.99': 6.66, '24.99': 17.5, '': 2.5 }

def days_in_month(m, y):
  return 29 if is_leap_year(y) else 28 if m == 2 else month_days[m - 1]

def prepend_zero(n):
  return "0" + str(n) if n < 10 else n

def count_those_cheers(a):
  month_name = month_names[a[1] - 1];
  subs = { int(k): { b[0]: convert_sub[''.join(re.findall(r'\$([-+]?[0-9]*\.?[0-9]+)', ' '.join(b[1:])))] for b in [':'.join(x.split(':')[3:])[1:].split(' ') for x in v] } for k, v in itertools.groupby(requests.get("https://overrustlelogs.net/Darksydephil%20chatlog/{}%20{}/subscribers.txt".format(month_name, a[0])).text.splitlines(), key=lambda x: re.search(r'\[\d+-\d+-(\d+)', x).group(1)) }
  
  prev_k = sum([list(subs[x].keys()) for x in range(1, a[2]) if x in subs], [])
  subs_n = { k: v for k, v in (subs[a[2]] if a[2] in subs else {}).items() if not k in prev_k }
  
  cheers = [int(x) for x in re.findall(r'[?<=\s](?:kappa|kreygasm|swiftrage|muxy|streamlab|failfish|vohiyo|pjsalt|trihard|notlikethis|4head|mrdestructoid|bday|cheer)(\d+)(?!\S)', requests.get("https://overrustlelogs.net/Darksydephil%20chatlog/{}%20{}/{}-{}-{}.txt".format(month_names[a[1] - 1], a[0], a[0], prepend_zero(a[1]), prepend_zero(a[2]))).text, re.M) if len(x)]
  
  sum_cheers = sum(cheers)
  len_cheers = len(cheers)
  test = "#DSP #TheSnortReport for {}-{}-{}: Total Cheers {}, Sum ${}, Average ${} / Total Subs {} (${})".format(a[0], a[1], a[2], len_cheers, sum_cheers / 100, (sum_cheers / len_cheers) / 100 if len_cheers else 0, len(subs_n), sum(subs_n.values()))
  
  if (len(test) > 140):
    print("ERROR! \"{}\" too long!".format(test));
    exit(-1)
  
  config = [x[:-1] for x in open('twitter_bot.conf', 'r').readlines() if len(x) > 1];
  print(TwitterAPI(config[0], config[1], config[2], config[3]).request('statuses/update', {'status': test}).status_code)
  print(test);

def main(arg):
  if re.match(r'20\d{2}-0?\d{1,2}(-0?\d{1,2})?', arg):
    arg = [int(x) for x in arg.split('-')]
    if len(arg) == 2:
      for i in range(1, days_in_month(arg[1], arg[0]) + 1):
        count_those_cheers(arg + [i])
    else:
      count_those_cheers(arg)
  else:
    print("can't parse your stupid input \"{}\"\nyou're not very street smart are you?".format(arg))

if __name__ == "__main__":
    main(sys.argv[1])
