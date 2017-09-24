#!/usr/bin/env python3
import sys, os, errno, re, socket, random, time, atexit, threading, imaplib, email

irc = None 
log_fh = None
log_name = ''
log_last = -1
last_msg = -1
ts_re = re.compile(r'[tmi-]?sent-ts=(\d+)')

@atexit.register
def goodbye():
    if irc:
        try:
            irc.shutdown(socket.SHUT_RDWR)
        except:
            pass
        finally:
            irc.close()
    if log_fh:
        log_fh.close()

def update_log_fh(ts):
    global log_name, log_fh, log_last
    log_last = time.time()
    ts = time.strftime('logs/%Y/%B/%Y-%m-%d.txt', time.localtime(int(ts) / 1000))
    if ts != log_name:
        log_name = ts
        if log_fh:
            log_fh.close()
            log_fh = None

        if not os.path.exists(log_name):
            if not os.path.exists(os.path.dirname(log_name)):
                try:
                    os.makedirs(os.path.dirname(log_name), exist_ok=True)
                except OSError as exc:
                    if exc.errno != errno.EEXIST:
                        raise
            log_fh = open(log_name, 'wb')
        else:
            log_fh = open(log_name, 'ab')

def send(msg):
    irc.send("{}\r\n".format(msg).encode())

def log_timeout():
    global log_last
    while True:
        if log_last > -1:
            if time.time() - log_last >= 900:
                global log_fh, log_name
                log_fh.close()
                log_fh = None
                log_last = -1
                log_name = ''
        time.sleep(2)

def irc_timeout():
    while True:
        if log_last > -1:
            if time.time() - last_msg >= 900:
                sys.exit(0)
        time.sleep(2)

config = [x[:-1] for x in open('gmail.conf', 'r').readlines() if len(x) > 1]
with imaplib.IMAP4_SSL('imap.gmail.com') as mail:
    mail.login(config[0], config[1])
    mail.select("inbox")

    result, data = mail.uid('search', None, '(HEADER Subject "darksydephil just went live on Twitch") (UNSEEN)')
    if result == "OK" and data[0].decode("utf-8"):
        for uid in data[0].decode("utf-8").split(" "):
            result2, data2 = mail.uid('fetch', uid, '(RFC822)')
            if result2 == "OK" and data2:
                irc = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                while True:
                    try:
                        user = 'justinfan' + ''.join(random.choice("0123456789") for _ in range(10))
                        irc.connect(("irc.chat.twitch.tv", 6667))
                        send("USER {} 0 0 :{}".format(user, user))
                        send("NICK {}".format(user))
                        send("CAP REQ :twitch.tv/membership")
                        send("CAP REQ :twitch.tv/tags")
                        send("CAP REQ :twitch.tv/commands")
                        send("JOIN #darksydephil")

                        thread.start_new_thread(log_timeout)
                        thread.start_new_thread(irc_timeout)

                        split_msg_buf = None
                        while True:
                            try:
                                txt = irc.recv(512).decode('utf-8').split('\r\n')
                            except KeyboardInterrupt as e:
                                sys.exit(0)
                            except:
                                try:
                                    irc.shutdown(socket.SHUT_RDWR)
                                except:
                                    pass
                                finally:
                                    break

                            if split_msg_buf:
                                txt[0] = split_msg_buf + txt[0]
                                split_msg_buf = None
                            
                            if txt[-1]:
                                split_msg_buf = txt.pop()

                            for msg in txt:
                                if msg:
                                    if msg[:3] == "@ba": # All the interesting messages start with "@ba"
                                        last_msg = time.time()
                                        ts = ts_re.findall(msg)
                                        if ts or not log_fh:
                                            update_log_fh(ts[1] if len(ts) >= 2 else ts[0])
                                        if log_fh:
                                            log_fh.write((msg + "\n").encode('utf-8'))
                                    elif msg[:4] == "PING":
                                        send("PO" + msg[2:])
                                    elif msg[:15] == "@msg-id=host_on":
                                        sys.exit(0)
                    except:
                        time.sleep(10)
