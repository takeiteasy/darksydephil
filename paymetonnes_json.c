#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <string.h>
#include <time.h>
#include "3rdparty/js0n.h"

char* load_file(const char* path) {
    FILE *file = fopen(path, "rb");
    if (!file) {
        fprintf(stderr, "fopen \"%s\" failed: %d %s\n", path, errno, strerror(errno));
        abort();
    }
    
    fseek(file, 0, SEEK_END);
    size_t length = ftell(file);
    rewind(file);
    
    char *data = (char*)calloc(length + 1, sizeof(char));
    fread(data, 1, length, file);
    fclose(file);
    
    return data;
}

char* load_paymetonnes_json() {
    return load_file("logs/paymetonnes.json");
}

long gmt_epoch(const char* str) {
    struct tm ti={0};
    if (sscanf(str, "%d-%d-%d", &ti.tm_year, &ti.tm_mon, &ti.tm_mday) != 3) {
        printf("invalid date: %s: should be, YEAR-MONTH-DAY", str);
        exit(-1);
    }
    
    ti.tm_year -= 1900;
    ti.tm_mon  -= 1;
    return (long)timegm(&ti);
}

int main(int argc, const char* argv[]) {
    if (argc < 1) {
        printf("usage: %s [date]", argv[0]);
        exit(-1);
    }
    
    char* json = load_paymetonnes_json();
    
    long t = gmt_epoch(argv[1]);
    char key[64];
    sprintf(key, "%ld000", t);
    
    size_t vlen = 0;
    const char *val = js0n(key, 0, json, strlen(json), &vlen);
    
    char final[vlen + 1];
    strncpy(final, val, vlen);
    final[vlen] = '\0';
    
    float money = 0;
    sscanf(final, "{\"patrons\":%*d,\"earnings\":%f}", &money);
    
    printf("%f", money);
    
    free(json);
    
    return 0;
}
