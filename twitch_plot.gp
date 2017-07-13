#!/usr/local/bin/gnuplot

set terminal svg size 640,480 enhanced fname 'arial'  fsize 10 butt solid
set output 'twitch_out.svg'

set style line 81 lt 0 lc rgb "#808080" lw 0.5

set grid xtics
set grid ytics
set grid mxtics
set grid mytics

set key inside bottom right
set xlabel 'Day'
set ylabel '$$$$$'
set xrange [1:31]
plot  "twitch_data.txt" using 1:2 title 'Cheer $$$' with lines, "twitch_data.txt" using 1:3 title 'Sub $$$' with lines

