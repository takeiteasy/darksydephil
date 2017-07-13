#!/bin/sh

MONTHS=(January February March April May June July August September October November December)


perl generate_plot_data.pl $1 $2
/usr/local/bin/gnuplot -e "set title 'The Snort Report for the month of ${MONTHS[$2 - 1]}'" twitch_plot.gp
#/usr/local/bin/gnuplot paymetonnes_plot.gp
/usr/local/bin/cairosvg twitch_out.svg -o twitch_out.png
#/usr/local/bin/cairosvg paymetonnes_out.svg -o paymetonnes_out.png
rm twitch_out.svg
#rm paymetonnes_out.svg

#/usr/local/bin/python3 twitter_bot.py $1 ${MONTHS[$2 - 1]}

mv twitch_out.png www/archives/$1_$2.png
rm twitch_data.txt
#rm paymetonnes_out.png
#paymetonnes_data.txt