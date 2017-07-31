#!/usr/bin/env python3
import sys, re, requests, itertools 

day_suffixes = ["st", "nd", "rd"]
def day_suffix(n):
    nn = n % 10
    return day_suffixes[nn - 1] if nn < 4 and nn > 0 else "th"

months = {"jan": "january", "feb": "february", "mar": "march", "apr": "april", "may": "may", "jun": "june", "jul": "july", "aug": "august", "sep": "september", "oct": "october", "nov": "november", "dec": "december"}
def parse_month(s):
    return (months[s.lower()] if len(s) == 3 else s).title()

def main(args):
    if len(args) < 2:
        print("enter month then year: e.g. \"./{} january/jan 2017\"\nyou're not very street smart are you?".format(__file__))
        sys.exit(-1)
        
    subs = { int(k):  list(v) for k, v in itertools.groupby(requests.get("https://overrustlelogs.net/Darksydephil%20chatlog/{}%20{}/subscribers.txt".format(parse_month(args[0]), args[1])).text.splitlines(), key=lambda x: re.search(r'\[\d+-\d+-(\d+)', x).group(1)) }

    for k, v in subs.items():
        print("{}{}: {} sub{}".format(k, day_suffix(k), len(v), "" if len(v) == 1 else "s"))
    
    v = [len(n) for n in subs.values()]
    print("\nAverage: {}".format(sum(v) / len(v)))
    print("Max:     {}".format(max(v)))
    print("Min      {}".format(min(v)))

if __name__ == "__main__":
    main(sys.argv[1:])
