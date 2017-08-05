#!/bin/bash

MONTHS=(January February March April May June July August September October November December)

perl generate_plot_data.pl $1 $2
/usr/bin/gnuplot -e "set title 'The Snort Report for the month of ${MONTHS[$2 - 1]} (Twitch)'" twitch_plot.gp
/usr/bin/gnuplot -e "set title 'The Snort Report for the month of ${MONTHS[$2 - 1]} (Patreon)'" paymetonnes_plot.gp
/usr/bin/cairosvg twitch_out.svg -o twitch_out.png
/usr/bin/cairosvg paymetonnes_out.svg -o paymetonnes_out.png
rm twitch_out.svg
rm paymetonnes_out.svg

/usr/bin/python3 monthly_bot.py $1 ${MONTHS[$2 - 1]}

mv twitch_out.png www/archives/$1_$2_t.png
mv paymetonnes_out.png www/archives/$1_$2_p.png
rm twitch_data.txt
rm paymetonnes_data.txt
