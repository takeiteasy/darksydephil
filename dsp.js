var data = {
"config_2017": {
    type: 'line',
    data: {
        labels: [ "January", "February", "March", "April", "May", "June" ],
        datasets: [{
    label: "Cheers",
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgba(255, 99, 132, 1)',
    fill: true,
    data: [ 522.94, 463.43, 1351.34, 2888, 1704.06, 1229.91 ]
},
{
    label: "Subscribers",
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgba(54, 162, 235, 1)',
    fill: true,
    data: [ 309.38, 279.44, 983.03, 598.8, 818.36, 893.21 ]
},
{
    label: "Patreons",
    backgroundColor: 'rgba(255, 206, 86, 0.2)',
    borderColor: 'rgba(255, 206, 86, 1)',
    fill: true,
    data: [ 1413.57, 1354.28, 1211.99, 1125.45, 1114.65, 1180.62 ]
},
]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: "Revenue 2017"
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
 "sub_config_2017": {
    type: 'bar',
    data: {
        labels: [ "January", "February", "March", "April", "May", "June" ],
        datasets: [{
            label: "Twitch Subs",
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
            fill: true,
            data: [ "62", "-6", "141", "-77", "44", "15" ]
        }, {
            label: "Patreons",
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: true,
            data: [ "-5", "-7", "-10", "-9", "-15", "-5" ]
        }]
    },
    options: {
        title: {
            display: true,
            text: "Difference 2017"
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        }
    }
},
 "config_month": {
    type: 'line',
    data: {
        labels: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30 ],
        datasets: [{
    label: "Cheers",
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgba(255, 99, 132, 1)',
    fill: true,
    data: [ 24.8, 47.27, 28.67, 75.26, 100, 39.23, 0.3, 0, 12.4, 19.84, 9.81, 45.43, 51.95, 35.85, 122.54, 35.85, 102.57, 14.6, 35.17, 42.4, 57.19, 34.68, 34.91, 56.26, 30.9, 37.57, 42.71, 18.2, 25.65, 47.9 ]
},
{
    label: "Subscribers",
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgba(54, 162, 235, 1)',
    fill: true,
    data: [ 4.99, 29.94, 44.91, 49.9, 24.95, 9.98, 0, 4.99, 29.94, 24.95, 59.88, 49.9, 34.93, 24.95, 29.94, 29.94, 64.87, 19.96, 14.97, 24.95, 39.92, 14.97, 24.95, 24.95, 24.95, 19.96, 84.83, 9.98, 34.93, 34.93 ]
},
]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: "June"
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
};