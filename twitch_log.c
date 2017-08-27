#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <netdb.h>
#include <stdarg.h>
#include <signal.h>
#include <stdlib.h>
#include <time.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/stat.h>

static int conn;
static char sbuf[512];
static int log_day = 0;
static FILE* log_fp = NULL;

void on_exit(int dummy) {
	if (log_fp)
		fclose(log_fp);
	exit(0);
}

void raw(char *fmt, ...) {
	va_list ap;
	va_start(ap, fmt);
	vsnprintf(sbuf, 512, fmt, ap);
	va_end(ap);
	write(conn, sbuf, strlen(sbuf));
}

int rand_range(int min, int max){
	return min + rand() / (RAND_MAX / (max - min + 1) + 1);
}
#define RAND_ASCII_NUM ((char)rand_range(48, 57))

char* random_user() {
	int n_len = rand_range(8, 12);
	char* ret = (char*)malloc(sizeof(char) * 10 + n_len);
	strcpy(ret, "justinfan");
	for (int i = 0; i < n_len; ++i)
		ret[9 + i] = RAND_ASCII_NUM;
	ret[9 + n_len] = '\0';
	return ret;
}

FILE* get_log_fp(const char* path) {
	if (access(path, F_OK) != -1) {
		return fopen(path, "a+");
	} else {
		int i = strlen(path);
		for (; i > 0; --i) {
			if (path[i] == '/') {
				break;
			}
		}

		char tmp[256];
		struct stat sb;
		strncpy(tmp, path, i);

		if (stat(tmp, &sb) == 0 && S_ISDIR(sb.st_mode)) {
			return fopen(path, "w+");
		} else {
			char buf[strlen(tmp)];
			int offset = 0;

			for (int i = 0; i < strlen(tmp); ++i) {
				if (tmp[i] == '/') {
					strncpy(buf, tmp + offset, i - offset);
					buf[i] = '\0';
					if (stat(buf, &sb) != 0 || !S_ISDIR(sb.st_mode))
						mkdir(buf, 0755);
				}

				if (stat(tmp, &sb) != 0 || !S_ISDIR(sb.st_mode))
					mkdir(tmp, 0755);
			}
			
			return fopen(path, "w+");
		}
	}
}

void update_log_path(const char* timestamp) {
	time_t now = (time_t)(atol(timestamp) / 1000);
	struct tm* info = gmtime(&now);
	if (info->tm_mday != log_day) {
		log_day = info->tm_mday;

		char log_path[64];
		strftime(log_path, sizeof(log_path) - 1, "logs/%Y/%B/%Y-%m-%d.txt", info);

		if (log_fp)
			fclose(log_fp);

		log_fp = get_log_fp(log_path);
	}
}

int main(void) {
	time_t t;
	srand((unsigned)time(&t));

	struct addrinfo hints, *addr;
	memset(&hints, 0, sizeof hints);
	hints.ai_family = AF_INET;
	hints.ai_socktype = SOCK_STREAM;
	getaddrinfo("irc.chat.twitch.tv", "6667", &hints, &addr);
	conn = socket(addr->ai_family, addr->ai_socktype, addr->ai_protocol);
	connect(conn, addr->ai_addr, addr->ai_addrlen);

	signal(SIGINT, on_exit);

	char* nick = random_user();
	raw("USER %s 0 0 :%s\r\n", nick, nick);
	raw("NICK %s\r\n", nick);
	raw("CAP REQ :twitch.tv/membership\r\n");
	raw("CAP REQ :twitch.tv/tags\r\n");
	raw("CAP REQ :twitch.tv/commands\r\n");
	raw("JOIN #darksydephil\r\n");
	free(nick);

	int sl, i, j, k = -1;
	char buf[513];
	while ((sl = read(conn, sbuf, 512))) {
		for (i = 0; i < sl; i++) {
			j++;
			buf[j] = sbuf[i];

			if ((i > 0 && sbuf[i] == '\n' && sbuf[i - 1] == '\r') || j == 512) {
				buf[j + 1] = '\0';
				k = j;
				j = -1;

				if (buf[0] == '@' && buf[1] == 'b') {
					char* f = strstr(buf, "tmi-sent-ts");
					if (f) {
						int start = f - buf + 12;
						int to = start;

						for (; to < k; ++to) {
							char c = buf[to];
							if (c == ';')
								break;
							else {
								if (c < '0' || c > '9') {
									to = -1;
									break;
								}
							}
						}

						if (to > -1) {
							char epoch[15];
							strncpy(epoch, buf + start, to - start);
							update_log_path(epoch);

							if (log_fp)
								fwrite(buf, 1, k + 1, log_fp);
						}
					}
				} else if (!strncmp(buf, "PING", 4)) {
					buf[1] = 'O';
					raw(buf);
				}
			}
		}
	}

	return 0;
}
