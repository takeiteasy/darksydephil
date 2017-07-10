#!usr/bin/perl
use strict;
use warnings;

my $twitch_data_config = <<'TWITCH_DATA';
"config_###YEAR###": {
    type: 'line',
    data: {
        labels: ###MONTHS###,
        datasets: [{
            label: "Cheers",
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255,99,132,1)',
            fill: true,
            data: ###CHEERS###
        }, {
            label: "Subscribers",
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            fill: true,
            data: ###SUBS###
        }]
    },
    options: options("Twitch (###YEAR###)")
}
TWITCH_DATA

my @month_days  = qw(31 28 31 30 31 30 31 31 30 31 30 31);
my @month_names = qw(January February March April May June July August September October November December);

open my $out_fh, ">", "dsp.js" or die "failed opening dsp.js";
print $out_fh "var data = {";

foreach our $year (split /\n/, `ls logs/`) {
    my @months = splice @month_names, 0, `ls logs/$year | wc -l`;
    my (@cheers, @subs) = ();
    
    foreach our $month (@months) {
        my $path = "logs/$year/$month";
        my @logs = split /\n/, `ls $path`;
        pop(@logs);
        
        my $total_total_cheers = 0;
        foreach our $log (@logs) {
            my $log_path = "$path/$log";
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
            
            $total_cheers /= 100 unless ($total_cheers == 0);
            $total_total_cheers += $total_cheers;
        }
        
        push @cheers, $total_total_cheers;
        push @subs, (`cat $path/subscribers.txt | wc -l` * 4.99);
    }
    
    my $month_str  = sprintf("[ \"%s\" ]", join('", "', @months));
    my $cheers_str = sprintf("[ %s ]", join(', ', @cheers));
    my $subs_str   = sprintf("[ %s ]", join(', ', @subs));
    
    my $out = $twitch_data_config;
    $out =~ s/###MONTHS###/$month_str/g;
    $out =~ s/###CHEERS###/$cheers_str/g;
    $out =~ s/###SUBS###/$subs_str/g;
    $out =~ s/###YEAR###/$year/g;
    
    print $out_fh "$out,\n";
}

print $out_fh " };";
close $out_fh;
