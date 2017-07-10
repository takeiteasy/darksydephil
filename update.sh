#!/bin/sh

perl logs.pl $(date +"%Y") $(date +"%m")
perl paymetonnes.pl
perl generate.pl
mv www/dsp.js ../darksydephil_web/
cd ../darksydephil_web/
git add .
git commit "update"
git push
