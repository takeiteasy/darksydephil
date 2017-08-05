#!usr/bin/perl
use strict;
use warnings;

my @month_days  = qw(31 28 31 30 31 30 31 31 30 31 30 31);
my @month_names = qw(January February March April May June July August September October November December);

my ($year, $month) = @ARGV or die "wtf";
my $days = $month == 2 ? ($year % 4 == 0 && ($year % 100 != 0 or $year % 400 == 0) ? 29 : 28) : $month_days[$month - 1];
my $month_str = $month_names[$month - 1];
my $wget = "/usr/bin/wget";
my $wget_opts = "-N -P logs/$year/$month_str";

my $url_subs = sprintf("https://overrustlelogs.net/Darksydephil chatlog/%s %s/subscribers.txt", $month_str, $year);
`$wget "$url_subs" $wget_opts`;

for our $count (1..$days) {
    my $fn  = sprintf("%s-%s-%s.txt", $year, sprintf("%02d", $month), sprintf("%02d", $count));
    my $url = sprintf("https://overrustlelogs.net/Darksydephil chatlog/%s %s/%s", $month_str, $year, $fn);
  `$wget "$url" $wget_opts`;
}
