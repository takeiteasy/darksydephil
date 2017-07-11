#!usr/bin/perl
use strict;
use warnings;

my $fn = "paymetonnes.json";
open my $fh, '<', $fn or die "error opening $fn: $!";
my $data = do { local $/; <$fh> };
close $fh;

$data = "paymetonnes_data = '$data';";
open my $out_fh, '>', "www/$fn" or die "error opening www/$fn: $!";
print $out_fh $data;
close $out_fh;
