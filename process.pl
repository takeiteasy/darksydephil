#!usr/bin/perl
use strict;
use warnings;

my @month_days  = qw(31 28 31 30 31 30 31 31 30 31 30 31);
my @month_names = qw(January February March April May June July August September October November December);

my ($year, $month) = @ARGV or die "wtf";
my $path_to_logs = sprintf("logs/%s/%s/", $year, $month_names[$month - 1]);

my @logs = split(/\n/, `ls $path_to_logs`);
pop(@logs);

foreach our $log (@logs) {
  my $log_path = "$path_to_logs$log";
  open my $fh, $log_path or die "failed to open $log_path: $!";

  my $total_cheers = 0;
  while (my $line = <$fh>)  {
    if ($line =~ /cheer(\d+)/) {
      my @matches = $line =~ m/cheer(\d+)/g;
      if (@matches) {
	$total_cheers += unpack "%123d*", pack("d*", @matches);
      }
    }
  }
  close $fh;
  print "$log_path: $total_cheers\n";
}


