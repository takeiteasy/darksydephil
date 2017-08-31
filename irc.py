#!/usr/bin/env python3
import sys, os, socket, random

user = 'justinfan' + ''.join(random.choice("0123456789") for _ in range(10))
irc = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
irc.connect(("irc.chat.twitch.tv", 6667))

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

    if split_msg_buf:
        txt[0] = split_msg_buf + txt[0]
        split_msg_buf = None

    if txt[-1]:
        split_msg_buf = txt[-1]
        txt.pop()

    for msg in txt:
        if msg:
            if msg[:3] == "@ba":
                print(msg)
            elif msg[:4] == "PING":
                send("PO" + msg[2:])
