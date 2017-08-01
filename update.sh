#!/bin/sh

perl get_logs.pl $1 $2
perl get_paymetonnes.pl
perl generate.pl

sh update_monthly.sh $1 $2

sh update_www.sh
