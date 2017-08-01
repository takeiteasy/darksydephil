#!usr/bin/perl
use strict;
use warnings;

my @month_days  = qw(31 28 31 30 31 30 31 31 30 31 30 31);
my @month_names = qw(January February March April May June July August September October November December);

my ($year, $month) = @ARGV or die "wtf";
my $num_days = ($month == 2 ? ($year % 4 == 0 && ($year % 100 != 0 or $year % 400 == 0) ? 29 : 28) : $month_days[$month - 1]) - 1;
my @cheers = (0)x($num_days);
my @subs   = (0)x($num_days);
my $month_str = $month_names[$month - 1];

my $path_to_logs = "logs/$year/$month_str";
my @logs = split /\n/, `ls $path_to_logs`;

foreach my $log (@logs) {
  my ($day) = $log =~ m/^\d+-\d+-(\d+)\.txt$/;
  next unless (defined($day));
  my $log_path = "$path_to_logs/$log";
  
  open my $fh, $log_path or die "failed to open $log_path: $!";
  my $total_cheers = 0;
  while (my $line = <$fh>)  {
    if ($line =~ /cheer(\d+)/) {
      my @matches = $line =~ m/[?<=\s]cheer(\d+)(?!\S)/g;
      if (@matches) {
        my $line_cheers = 0;
        $line_cheers += int($_) for @matches;
        $total_cheers += $line_cheers;
      }
    }
  }
  close $fh;
  
  $total_cheers /= 100 unless ($total_cheers == 0);
  $cheers[$day - 1] = $total_cheers;
}

open my $pay_fh, ">", "paymetonnes_data.txt" or die "failed to open data.txt: $!";
for my $day (1..$num_days + 1) {
  my ($paypigs, $money) = `./paymetonnes $year-$month-$day` =~ m/{"patrons":(\d+),"earnings":([-+]?[0-9]*\.?[0-9]+)}/g;
  print $pay_fh "$day $paypigs $money\n";
}
close $pay_fh;

open my $sub_fh, "$path_to_logs/subscribers.txt" or die "failed to last months subs: $!";
while (my $line = <$sub_fh>)  {
  my ($msg_day) = $line =~ m/^\[\d+-\d+\-(\d+)\s.*\]\stwitchnotify:\s.*$/;
  $subs[int($msg_day) - 1] += 4.99;
}
close $sub_fh;

open my $out_fh, ">", "twitch_data.txt" or die "failed to open data.txt: $!";
for my $i (0..$num_days) {
  my $out = sprintf("%d\t%f\t%f\n", $i + 1, $cheers[$i], $subs[$i]);
  print $out_fh $out;
}
close $out_fh;
