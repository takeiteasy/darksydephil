#!/usr/bin/env python3
import datetime, os

today = datetime.datetime.now()
year = today.year
month = today.month

if month == 1:
    month = 12
    year -= 1
else:
    month -= 1

os.system("sh {} {} {}".format(os.path.expanduser('~/darksydephil/update.sh', year, month if month > 9 else "0" + str(month)))
