#!usr/bin/perl
use strict;
use warnings;

my @month_names = qw(January February March April May June July August September October November December);

my ($year) = @ARGV or die "wtf";

open my $fh, '<', "template.html" or die "error opening template: $!";
my $data = do { local $/; <$fh> };
close $fh;

my $months_len = `ls logs/$year | wc -l`;
my @months = splice @month_names, 0, $months_len;

my $month_arr_str = join('", "', @months);
my $month_str = "[ \"$month_arr_str\" ]";

$data =~ s/###MONTHS###/$month_str/g;

my (@cheers, @subs) = ();
foreach our $month (@months) {
  my ($cheer, $sub) = split(/\s/, `perl process.pl $year $month`);
  push @cheers, $cheer;
  push @subs, $sub;
}

my $cheers_arr_str = join(', ', @cheers);
my $cheers_str = "[ $cheers_arr_str ]";
my $subs_arr_str = join(', ', @subs);
my $subs_str = "[ $subs_arr_str ]";

$data =~ s/###CHEERS###/$cheers_str/g;
$data =~ s/###SUBS###/$subs_str/g;

open $fh, ">>", "index.html" or die "failed opening index.html";
print $fh $data;
close $fh or die "Unable to close /home/shared/ftp";
