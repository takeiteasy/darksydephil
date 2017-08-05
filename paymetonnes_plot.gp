#!/usr/bin/gnuplot

set terminal svg size 640,480 enhanced fname 'arial'  fsize 10 butt solid
set output 'paymetonnes_out.svg'

set style line 81 lt 0 lc rgb "#808080" lw 0.5

set grid xtics
set grid ytics
set grid mxtics
set grid mytics

set style line 12 lc rgb '#808080' lt 0 lw 1
set grid back ls 12

set style line 11 lc rgb '#808080' lt 1
set border 3 back ls 11
set tics nomirror

set style line 2 lc rgb '#5e9c36' pt 6 ps 1 lt 1 lw 2 # --- green

set key inside bottom right
set xlabel 'Day'
set ylabel '$$$$$'
set xrange [1:31]
plot  "paymetonnes_data.txt" using 1:3 title '$$$' w lp ls 2
