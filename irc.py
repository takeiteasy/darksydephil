#!/usr/bin/env python3
import sys, os, errno, re, socket, random

user = 'justinfan' + ''.join(random.choice("0123456789") for _ in range(10))
irc = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
irc.connect(("irc.chat.twitch.tv", 6667))
log_fh = None
log_name = ''
ts_re = re.compile(r'[tmi-]?sent-ts=(\d+)')

def update_log_fh(ts):
    global log_name, log_fh
    ts = time.strftime('logs/%Y/%B/%Y-%m-%d.txt', time.localtime(int(ts) / 1000))
    if ts != log_name:
        log_name = ts
        if log_fh:
            log_fh.close()

        if os.path.exists(log_name):
            if not os.path.exists(os.path.dirname(log_name)):
                try:
                    os.makedirs(os.path.dirname(log_name), exist_ok=True)
                except OSError as exc:
                    if exc.errno != errno.EEXIST:
                        raise
            log_fh = open(log_name, 'w')
        else:
            log_fh = open(log_name, 'a')

def send(msg):
    irc.send("{}\r\n".format(msg).encode())

send("USER {} 0 0 :{}".format(user, user))
send("NICK {}".format(user))
send("CAP REQ :twitch.tv/membership")
send("CAP REQ :twitch.tv/tags")
send("CAP REQ :twitch.tv/commands")
send("JOIN #darksydephil")

split_msg_buf = None
while True:
    try:
        txt = irc.recv(512).decode().split('\r\n')
    except KeyboardInterrupt as e:
        break
    except:
        import traceback
        print('Unknown error ({})'.format(traceback.format_exc().splitlines()[-1]))
        break

    if split_msg_buf:
        txt[0] = split_msg_buf + txt[0]
        split_msg_buf = None

    if txt[-1]:
        split_msg_buf = txt[-1]
        txt.pop()

    for msg in txt:
        if msg:
            if msg[:3] == "@ba": # All the interesting messages start with "@ba"
                ts = regex.findall(msg)
                if ts:
                    update_log_fh(ts[1] if len(ts) >= 2 else ts[0])
                if log_fh:
                    log_fh.write(msg)
                print(msg)
            elif msg[:4] == "PING":
                send("PO" + msg[2:])

if log_fh:
    log_fh.close()

