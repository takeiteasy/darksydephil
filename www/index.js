var paymetonnes_chart_money_config = {
    type: "line",
    options: {
        responsive: true,
        title: {
            display: true,
            text: "Patreon History"
        },
        scales: {
            xAxes: [{
                    type: "time",
                    time: {
                        format: "MM/DD/YYYY HH:mm",
                        tooltipFormat: "ll HH:mm"
                    }
            }],
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
};

var paymetonnes_chart_sub_config = {
    type: "line",
    options: {
        responsive: true,
        title: {
            display: true,
            text: "Patreon Subs"
        },
        scales: {
            xAxes: [{
                type: "time",
                time: {
                    format: "MM/DD/YYYY HH:mm",
                    tooltipFormat: "ll HH:mm"
                }
            }]
        }
    }
};

window.onload = function() {
    paymetonnes_data = JSON.parse(paymetonnes_data);
    var all_labels = Object.keys(paymetonnes_data).map(function(k) { return parseInt(k); });
    var paymetonnes_chart_money = paymetonnes_chart_money_config;
    var paymetonnes_chart_subs = paymetonnes_chart_sub_config;
    paymetonnes_chart_money.data = {
    labels: all_labels,
    datasets: [{
               label: "Patreon $$$",
               backgroundColor: 'rgba(255, 206, 86, 0.2)',
               borderColor: 'rgba(255, 206, 86, 1)',
               borderWidth: 1,
               data: Object.keys(paymetonnes_data).map(function(k) { return paymetonnes_data[k]["earnings"] })
           }]
    };
    paymetonnes_chart_subs.data = {
    labels: all_labels,
    datasets: [{
               label: "Patreon Subs",
               backgroundColor: 'rgba(255, 159, 64, 0.2)',
               borderColor: 'rgba(255, 159, 64, 1)',
               borderWidth: 1,
               data: Object.keys(paymetonnes_data).map(function(k) { return paymetonnes_data[k]["patrons"] })
           }]
    };
    
    var chart_main = new Chart(document.getElementById("chart_main").getContext('2d'), data["config_2017"]);
    var chart_1 = new Chart(document.getElementById("chart_1").getContext('2d'), data["config_month_paymetonnes"]);
    var chart_2 = new Chart(document.getElementById("chart_2").getContext('2d'), data["config_month"]);
    var chart_3 = new Chart(document.getElementById("chart_3").getContext('2d'), data["paypig_config_2017"]);
    var chart_4 = new Chart(document.getElementById("chart_4").getContext('2d'), data["paypig_config_month"]);
    var paymetonnes_chart1 = new Chart(document.getElementById("chart_paymetonnes1").getContext('2d'), paymetonnes_chart_money);
    var paymetonnes_chart2 = new Chart(document.getElementById("chart_paymetonnes2").getContext('2d'), paymetonnes_chart_subs);
}
