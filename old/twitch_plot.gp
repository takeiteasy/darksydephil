#!/usr/bin/gnuplot

set terminal svg size 640,480 enhanced fname 'arial'  fsize 10 butt solid
set output 'twitch_out.svg'

set grid xtics
set grid ytics
set grid mxtics
set grid mytics

set style line 12 lc rgb '#808080' lt 0 lw 1
set grid back ls 12

set style line 11 lc rgb '#808080' lt 1
set border 3 back ls 11
set tics nomirror

set style line 1 lc rgb '#8b1a0e' pt 1 ps 1 lt 1 lw 2 # --- red
set style line 2 lc rgb '#5e9c36' pt 6 ps 1 lt 1 lw 2 # --- green

set key inside bottom right
set xlabel 'Day'
set ylabel '$$$$$'
set xrange [1:31]
plot  "twitch_data.txt" using 1:2 title 'Cheer $$$' w lp ls 1, "twitch_data.txt" using 1:3 title 'Sub $$$' w lp ls 2

