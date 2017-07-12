#!/bin/sh

perl generate_plot_data.pl $1 $2
/usr/local/bin/gnuplot plot.gp
/usr/local/bin/cairosvg out.svg -o out.png
rm out.svg
# Upload to twitter
rm out.png
rm data.txt
