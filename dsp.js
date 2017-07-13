var data = {
"config_2017": {
    type: 'line',
    data: {
    labels: [ "January", "February", "March", "April", "May", "June" ],
    datasets: [{
  label: "Cheers",
  backgroundColor: 'rgba(255, 99, 132, 0.2)',
  borderColor: 'rgba(255, 99, 132, 1)',
  borderWidth: 1,
  fill: true,
  data: [ 522.94, 463.43, 1351.34, 2888, 1704.06, 1229.91 ]
},
{
  label: "Subscribers",
  backgroundColor: 'rgba(54, 162, 235, 0.2)',
  borderColor: 'rgba(54, 162, 235, 1)',
  borderWidth: 1,
  fill: true,
  data: [ 309.38, 279.44, 983.03, 598.8, 818.36, 893.21 ]
},
{
  label: "Patreons",
  backgroundColor: 'rgba(255, 206, 86, 0.2)',
  borderColor: 'rgba(255, 206, 86, 1)',
  borderWidth: 1,
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
  borderWidth: 1,
  fill: true,
  data: [ 24.8, 47.27, 28.67, 75.26, 100, 39.23, 0.3, 0, 12.4, 19.84, 9.81, 45.43, 51.95, 35.85, 122.54, 35.85, 102.57, 14.6, 35.17, 42.4, 57.19, 34.68, 34.91, 56.26, 30.9, 37.57, 42.71, 18.2, 25.65, 47.9 ]
},
{
  label: "Subscribers",
  backgroundColor: 'rgba(54, 162, 235, 0.2)',
  borderColor: 'rgba(54, 162, 235, 1)',
  borderWidth: 1,
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
 "paypig_config_2017": {
  type: 'bar',
  data: {
    labels: [ "goldencolts", "spazz3", "ceeneon", "kushiyakitori", "fluttershy1970", "disgruntledsociallurker", "poorlymade", "blk_mage_ctype", "blueberrymuffin7", "ssjram", "retrothicc2b", "akioartorius", "durk2", "ewojo", "nukacolaking", "deep_drive", "kovorus", "dooley258", "tantamounter", "wolfofthedawn", "alexharveyconrad", "kingofhypocrisy", "mojosd", "edicus", "mr_vidar_viking", "thirdeyethethird", "eternia_forever", "jack_spartacus", "howlinthedeep", "nolbert87", "darthvidarviking" ],
    datasets: [{
      label: "Total Cheers",
      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
      borderColor: ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
      borderWidth: 1,
      fill: true,
      data: [ 1596.23, 1678.83, 1697.97, 1910.36, 2009.83, 2287.81, 2297.45, 2313.06, 2336.47, 2342.92, 2363.89, 2449.39, 2521.97, 2583.57, 2663.17, 2669.64, 2767.73, 2942.33, 2991.79, 3079.1, 3363.35, 3533.54, 3741.53, 3835.8, 3866, 6097.99, 6487.41, 6897.97, 7580.39, 8834.35, 14478.75 ]
    }]
  },
  options: {
    title: {
      display: true,
      text: "Cheer-leaderboards (Total)",
    },
    tooltips: {
      mode: 'index',
      callbacks: {
        label: function(tooltipItem, data) {
          return data.datasets[tooltipItem.datasetIndex].label + ": $" + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
        }
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          callback: function(value, index, values) {
            return '$' + value;
          }
        }
      }],
      xAxes: [{
        ticks: {
          autoSkip: false
        }
      }]
    }
  }
},
};