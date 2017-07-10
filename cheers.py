#!/usr/bin/env python3
import sys, re, requests

def is_leap_year(y):
    return y % 4 == 0 and (y % 100 != 0 or y % 400 == 0)

month_days  = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

def days_in_month(m, y):
    return 29 if is_leap_year(y) else 28 if m == 2 else month_days[m - 1]

def prepend_zero(n):
    return "0" + str(n) if n < 10 else n

def count_those_cheers(a):
    cheers = [int(x) for x in re.findall(r'cheer(\d+)', requests.get("https://overrustlelogs.net/Darksydephil%20chatlog/{}%20{}/{}-{}-{}.txt".format(month_names[a[1] - 1], a[0], a[0], prepend_zero(a[1]), prepend_zero(a[2]))).text, re.M) if len(x)]
    print('-'.join([str(x) for x in a]))
    print("  Total Cheers:  {}".format(len(cheers)))
    print("  Sum of Cheers: {}".format(sum(cheers)))
    print("  Average Cheer: {}".format(sum(cheers) / len(cheers) if len(cheers) else 0))

def main(args):
    for arg in args:
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
    main(sys.argv[1:])
