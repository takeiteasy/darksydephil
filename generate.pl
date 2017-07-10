#!usr/bin/perl
use strict;
use warnings;

my $data_config = <<'DATA_CONFIG';
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
        }, {
            label: "Patreons",
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            fill: true,
            data: ###PATREONS###
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: "###TITLE###"
        },
        tooltips: {
            mode: 'index',
            intersect: false,
            callbacks: {
                label: function(tooltipItem, data) {
                    return data.datasets[tooltipItem.datasetIndex].label + ": $" + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                },
                footer: function(tooltipItems, data) {
                    var sum = 0;
                    tooltipItems.forEach(function(tooltipItem) {
                        sum += data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    });
                    return 'Sum: $' + sum;
                },
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                    callback: function(value, index, values) {
                        return '$' + value;
                    }
                }
            }]
        }
    }
},
DATA_CONFIG

my $sub_data_config = <<'SUB_DATA_CONFIG';
"sub_config_###YEAR###": {
    type: 'bar',
    data: {
        labels: ###MONTHS###,
        datasets: [{
            label: "Twitch Subs",
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
            fill: true,
            data: ###SUBS###
        }, {
            label: "Patreons",
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: true,
            data: ###PATREONS###
        }]
    },
    options: {
        title: {
            display: true,
            text: "###TITLE###"
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        }
    }
},
SUB_DATA_CONFIG

my @month_days  = qw(31 28 31 30 31 30 31 31 30 31 30 31);
my @month_names = qw(January February March April May June July August September October November December);

open my $out_fh, ">", "www/dsp.js" or die "failed opening www/dsp.js";
print $out_fh "var data = {\n";

foreach our $year (split /\n/, `ls logs/`) {
    next unless $year =~ /\d{4}/;
    
    my @months = splice @month_names, 0, `ls logs/$year | wc -l`;
    my (@cheers, @subs, @patreons, @subs_diff, @patreons_diff) = ();
    
    # $year == 2017 ? 0 : get last years
    my $last_subs = 0;
    my ($last_patreons) = `./paymetonnes "2016-12-31"` =~ m/{"patrons":(\d+),"earnings":.*}/;
    for our $i (0..$#months) {
        my $month = $months[$i];
        
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
        my $sub_c = int(`cat $path/subscribers.txt | wc -l`);
        my $sub_d = $sub_c - $last_subs;
        $last_subs = $sub_c;
        push @subs, ($sub_c * 4.99);
        push @subs_diff, $sub_d;
        my $days = ($i + 1) == 2 ? ($year % 4 == 0 && ($year % 100 != 0 or $year % 400 == 0) ? 29 : 28) : $month_days[$i];
        my $month_i = $i + 1;
        my $paymetonnes_json = `./paymetonnes "$year-$month_i-$days"`;
        my ($patreon_subs, $patreon_money) = $paymetonnes_json =~ m/{"patrons":(\d+),"earnings":([-+]?[0-9]*\.?[0-9]+)}/g;
        push @patreons, $patreon_money;
        my $patreon_d = $patreon_subs - $last_patreons;
        $last_patreons = $patreon_subs;
        push @patreons_diff, $patreon_d;
    }
    
    my $month_str    = sprintf("[ \"%s\" ]", join('", "', @months));
    my $cheers_str   = sprintf("[ %s ]", join(', ', @cheers));
    my $subs_str     = sprintf("[ %s ]", join(', ', @subs));
    my $patreons_str = sprintf("[ %s ]", join(', ', @patreons));
    
    my $out = $data_config;
    $out =~ s/###MONTHS###/$month_str/g;
    $out =~ s/###CHEERS###/$cheers_str/g;
    $out =~ s/###SUBS###/$subs_str/g;
    $out =~ s/###PATREONS###/$patreons_str/g;
    $out =~ s/###YEAR###/$year/g;
    $out =~ s/###TITLE###/Revenue $year/g;
    
    print $out_fh "$out ";
    
    my $out2 = $sub_data_config;
    my $sub_diff_str = sprintf("[ \"%s\" ]", join('", "', @subs_diff));
    my $patreon_diff_str = sprintf("[ \"%s\" ]", join('", "', @patreons_diff));
    $out2 =~ s/###MONTHS###/$month_str/g;
    $out2 =~ s/###SUBS###/$sub_diff_str/g;
    $out2 =~ s/###PATREONS###/$patreon_diff_str/g;
    $out2 =~ s/###OPTIONS###/\{\}/g;
    $out2 =~ s/###YEAR###/$year/g;
    $out2 =~ s/###TITLE###/Difference $year/g;
    
    print $out_fh "$out2 ";
}

print $out_fh "};";
close $out_fh;
