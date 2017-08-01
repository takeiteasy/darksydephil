#!/bin/sh

MONTHS=(January February March April May June July August September October November December)

perl get_logs.pl $1 $2
perl get_paymetonnes.pl
perl generate.pl

perl generate_plot_data.pl $1 $2
/usr/local/bin/gnuplot -e "set title 'The Snort Report for the month of ${MONTHS[$2 - 1]} (Twitch)'" twitch_plot.gp
/usr/local/bin/gnuplot -e "set title 'The Snort Report for the month of ${MONTHS[$2 - 1]} (Patreon)'" paymetonnes_plot.gp
/usr/local/bin/cairosvg twitch_out.svg -o twitch_out.png
/usr/local/bin/cairosvg paymetonnes_out.svg -o paymetonnes_out.png
rm twitch_out.svg
rm paymetonnes_out.svg

/usr/local/bin/python3 monthly_bot.py $1 ${MONTHS[$2 - 1]}

mv twitch_out.png www/archives/$1_$2.png
rm twitch_data.txt
rm paymetonnes_out.png
rm paymetonnes_data.txt

sh update_www.sh
