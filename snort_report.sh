#!/bin/sh

perl generate_plot_data.pl $1 $2
/usr/local/bin/gnuplot twitch_plot.gp
/usr/local/bin/cairosvg twitch_out.svg -o twitch_out.png
rm twitch_out.svg
# Upload to twitter
rm twitch_out.png
rm twitch_data.txt

