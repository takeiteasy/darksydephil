#!/bin/sh

perl generate_plot_data.pl $1 $2
/usr/local/bin/gnuplot twitch_plot.gp
#/usr/local/bin/gnuplot paymetonnes_plot.gp
/usr/local/bin/cairosvg twitch_out.svg -o twitch_out.png
#/usr/local/bin/cairosvg paymetonnes_out.svg -o paymetonnes_out.png
rm twitch_out.svg
#rm paymetonnes_out.svg

/usr/local/bin/python3 twitter_bot.py $1 $2

mv twitch_out.png graphs/$1_$2.png
rm twitch_data.txt
#rm paymetonnes_out.png
#paymetonnes_data.txt
