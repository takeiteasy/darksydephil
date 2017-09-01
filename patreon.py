#!/usr/bin/eval python3
import requests, re, json, time

out = "logs/patreon.json"
url = "https://www.patreon.com/darksydephil"

src = requests.get(url).text
sum = int(re.findall(r'"pledge_sum": (\d+),', src)[0]) / 100
num = int(re.findall(r'"patron_count": (\d+),', src)[0])

with open(out, 'r') as rfh:
    data = json.load(rfh)

data[str(int(time.time()) * 1000)] = { 'patrons': num, 'earnings': sum}

with open (out, 'w') as wfh:
    json.dump(data, wfh)
