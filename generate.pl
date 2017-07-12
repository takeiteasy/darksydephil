#!usr/bin/perl
use strict;
use warnings;

my $dataset = <<'DATASET';
{
    label: "###LABEL###",
    backgroundColor: '###BGCOL###',
    borderColor: '###BORDERCOL###',
    fill: true,
    data: ###DATA###
},
DATASET

my $data_config = <<'DATA_CONFIG';
"config_###YEAR###": {
    type: 'line',
    data: {
        labels: ###LABELS###,
        datasets: [###DATASETS###]
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

my @months = ();
my @years = split /\n/, `ls logs/`;
my $last_month = 0;
my $last_month_i = 0;
for our $j (0..$#years) {
    my $year = $years[$j];
    next unless $year =~ /\d{4}/;
    
    @months = splice @month_names, 0, `ls logs/$year | wc -l`;
    my (@cheers, @subs, @patreons, @subs_diff, @patreons_diff, @last_month_cheers, @last_month_subs) = ();
    
    # $year == 2017 ? 0 : get last years
    my $last_subs = 0;
    my ($last_patreons) = `./paymetonnes "2016-12-31"` =~ m/{"patrons":(\d+),"earnings":.*}/;
    for our $i (0..$#months) {
        my $month = $months[$i];
        my $days = ($i + 1) == 2 ? ($year % 4 == 0 && ($year % 100 != 0 or $year % 400 == 0) ? 29 : 28) : $month_days[$i];
        $last_month = ($j == $#years && $i == $#months);
        @last_month_cheers = (0)x$days + 1 if ($last_month);
        
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
            if ($last_month) {
                my ($last_month_day) = $log =~ m/\d+-\S+-(\d+)\.txt/;
                $last_month_cheers[$last_month_day - 1] = $total_cheers;
            }
            $total_total_cheers += $total_cheers;
        }
        
        push @cheers, $total_total_cheers;
        my $sub_c = int(`cat $path/subscribers.txt | wc -l`);
        my $sub_d = $sub_c - $last_subs;
        $last_subs = $sub_c;
        push @subs, ($sub_c * 4.99);
        push @subs_diff, $sub_d;
        my $month_i = $i + 1;
        my ($patreon_subs, $patreon_money) = `./paymetonnes "$year-$month_i-$days"` =~ m/{"patrons":(\d+),"earnings":([-+]?[0-9]*\.?[0-9]+)}/g;
        push @patreons, $patreon_money;
        my $patreon_d = $patreon_subs - $last_patreons;
        $last_patreons = $patreon_subs;
        push @patreons_diff, $patreon_d;
        
        $last_month_i = $i + 1;
    }
    
    my $month_str    = sprintf("[ \"%s\" ]", join('", "', @months));
    my $cheers_str   = sprintf("[ %s ]", join(', ', @cheers));
    my $subs_str     = sprintf("[ %s ]", join(', ', @subs));
    my $patreons_str = sprintf("[ %s ]", join(', ', @patreons));
    
    my $cheers_dataset = $dataset;
    $cheers_dataset =~ s/###LABEL###/Cheers/g;
    $cheers_dataset =~ s/###BGCOL###/rgba(255, 99, 132, 0.2)/g;
    $cheers_dataset =~ s/###BORDERCOL###/rgba(255, 99, 132, 1)/g;
    $cheers_dataset =~ s/###DATA###/$cheers_str/g;
    
    my $subs_dataset = $dataset;
    $subs_dataset =~ s/###LABEL###/Subscribers/g;
    $subs_dataset =~ s/###BGCOL###/rgba(54, 162, 235, 0.2)/g;
    $subs_dataset =~ s/###BORDERCOL###/rgba(54, 162, 235, 1)/g;
    $subs_dataset =~ s/###DATA###/$subs_str/g;
    
    my $patreon_dataset = $dataset;
    $patreon_dataset =~ s/###LABEL###/Patreons/g;
    $patreon_dataset =~ s/###BGCOL###/rgba(255, 206, 86, 0.2)/g;
    $patreon_dataset =~ s/###BORDERCOL###/rgba(255, 206, 86, 1)/g;
    $patreon_dataset =~ s/###DATA###/$patreons_str/g;
    
    my $out = $data_config;
    $out =~ s/###LABELS###/$month_str/g;
    $out =~ s/###DATASETS###/$cheers_dataset$subs_dataset$patreon_dataset/g;
    $out =~ s/###YEAR###/$year/g;
    $out =~ s/###TITLE###/Revenue $year/g;
    
    my $out2 = $sub_data_config;
    my $sub_diff_str = sprintf("[ \"%s\" ]", join('", "', @subs_diff));
    my $patreon_diff_str = sprintf("[ \"%s\" ]", join('", "', @patreons_diff));
    $out2 =~ s/###MONTHS###/$month_str/g;
    $out2 =~ s/###SUBS###/$sub_diff_str/g;
    $out2 =~ s/###PATREONS###/$patreon_diff_str/g;
    $out2 =~ s/###OPTIONS###/\{\}/g;
    $out2 =~ s/###YEAR###/$year/g;
    $out2 =~ s/###TITLE###/Difference $year/g;
    
    my @month_days = (1..$#last_month_cheers + 1);
    my $days_str = sprintf("[ %s ]", join(', ', @month_days));
    my $cheer_str2 = sprintf("[ %s ]", join(', ', @last_month_cheers));
    my $month_name_str = $months[$last_month_i - 1];
    
    #my (@lm_patreon_subs, @lm_patreon_money) = ();
    #foreach my $month_day (@month_days) {
    #    my ($patreon_subs, $patreon_money) = `./paymetonnes "$year-$last_month_i-$month_day"` =~ m/{"patrons":(\d+),"earnings":([-+]?[0-9]*\.?[0-9]+)}/g;
    #    push @lm_patreon_subs, $patreon_subs; # Unused
    #    push @lm_patreon_money, $patreon_money;
    #}
    #my $lm_patreon_money_str = sprintf("[ %s ]", join(', ', @lm_patreon_money));
    
    my @sub_days = (0)x$#last_month_cheers;
    open my $sub_fh, "logs/$year/$month_name_str/subscribers.txt" or die "failed to last months subs: $!";
    while (my $line = <$sub_fh>)  {
        my ($msg_day) = $line =~ m/^\[\d+-\d+\-(\d+)\s.*\]\stwitchnotify:\s.*$/;
        $sub_days[int($msg_day) - 1] += 4.99;
    }
    close $sub_fh;
    my $sub_days_str = sprintf("[ %s ]", join(', ', @sub_days));
    
    my $last_cheers_dataset = $dataset;
    $last_cheers_dataset =~ s/###LABEL###/Cheers/g;
    $last_cheers_dataset =~ s/###BGCOL###/rgba(255, 99, 132, 0.2)/g;
    $last_cheers_dataset =~ s/###BORDERCOL###/rgba(255, 99, 132, 1)/g;
    $last_cheers_dataset =~ s/###DATA###/$cheer_str2/g;
    
    my $last_subs_dataset = $dataset;
    $last_subs_dataset =~ s/###LABEL###/Subscribers/g;
    $last_subs_dataset =~ s/###BGCOL###/rgba(54, 162, 235, 0.2)/g;
    $last_subs_dataset =~ s/###BORDERCOL###/rgba(54, 162, 235, 1)/g;
    $last_subs_dataset =~ s/###DATA###/$sub_days_str/g;
    
    #my $last_patreon_money_dataset = $dataset;
    #$last_patreon_money_dataset =~ s/###LABEL###/Patreon/g;
    #$last_patreon_money_dataset =~ s/###BGCOL###/rgba(255, 206, 86, 0.2)/g;
    #$last_patreon_money_dataset =~ s/###BORDERCOL###/rgba(255, 206, 86, 1)/g;
    #$last_patreon_money_dataset =~ s/###DATA###/$lm_patreon_money_str/g;
    
    my $out3 = $data_config;
    $out3 =~ s/###LABELS###/$days_str/g;
    $out3 =~ s/###DATASETS###/$last_cheers_dataset$last_subs_dataset/g;
    $out3 =~ s/###YEAR###/month/g;
    $out3 =~ s/###TITLE###/$month_name_str/g;
    
    print $out_fh "$out $out2 $out3";
}

print $out_fh "};";
close $out_fh;
