#!usr/bin/perl
use strict;
use warnings;

my $url = "https://graphtreon.com/creator/darksydephil";

my $raw_json = `/usr/local/bin/wget -qO- $url | grep "var dataJson"`;
my $json = substr $raw_json, 18, -3;

open my $fh, ">", "paymetonnes.json" or die "failed opening paymetonnes.json";
print $fh $json;
close $fh;
