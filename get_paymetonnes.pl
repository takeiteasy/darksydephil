#!usr/bin/perl
use strict;
use warnings;

my $url = "https://graphtreon.com/creator/darksydephil";
my $fn = "paymetonnes.json";

my $raw_json = `/usr/bin/wget -qO- $url | grep "var dataJson"`;
my $json = substr $raw_json, 18, -3;
my $js_json = "paymetonnes_data = '$json';";

open my $fh, ">", $fn or die "failed opening $fn: $!";
print $fh $json;
close $fh;

open my $out_fh, '>', "www/$fn" or die "error opening www/$fn: $!";
print $out_fh $js_json;
close $out_fh;
