var data = {
"config_2017": {
    type: 'line',
    data: {
    labels: [ "January", "February", "March", "April", "May", "June", "July" ],
    datasets: [{
  label: "Cheers",
  backgroundColor: 'rgba(255, 99, 132, 0.2)',
  borderColor: 'rgba(255, 99, 132, 1)',
  borderWidth: 1,
  fill: true,
  data: [ 504.6, 455.71, 1310.36, 1822.6, 1650.28, 1165.03, 1337.16 ]
},
{
  label: "Subscribers",
  backgroundColor: 'rgba(54, 162, 235, 0.2)',
  borderColor: 'rgba(54, 162, 235, 1)',
  borderWidth: 1,
  fill: true,
  data: [ 309.38, 279.44, 983.03, 598.8, 818.36, 893.21, 873.25 ]
},
{
  label: "Patreons",
  backgroundColor: 'rgba(255, 206, 86, 0.2)',
  borderColor: 'rgba(255, 206, 86, 1)',
  borderWidth: 1,
  fill: true,
  data: [ 1413.57, 1354.28, 1211.99, 1125.45, 1114.65, 1180.62,  ]
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
          beginAtZero: false,
          callback: function(value, index, values) {
            return '$' + value;
          }
        }
      }]
    }
  }
},
 "config_month_paymetonnes": {
    type: 'line',
    data: {
    labels: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31 ],
    datasets: [{
  label: "Patreon",
  backgroundColor: 'rgba(255, 206, 86, 0.2)',
  borderColor: 'rgba(255, 206, 86, 1)',
  borderWidth: 1,
  fill: true,
  data: [ 1137.61, 1137.61, 1138.51, 1004.51, 1013.44, 1017.91, 1017.91, 982.18, 990.11, 999.04, 999.04, 999.04, 999.93, 999.93, 999.93, 1004.29, 1004.29, 1022.15, 1022.15, 1022.15, 1017.68, 1004.29, 1005.18, 1005.18, 1006.97, 1011.43, 1011.43, 998.93, 998.93, 996.25,  ]
},
]
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: "July"
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
          beginAtZero: false,
          callback: function(value, index, values) {
            return '$' + value;
          }
        }
      }]
    }
  }
},
 "config_month": {
    type: 'line',
    data: {
    labels: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31 ],
    datasets: [{
  label: "Cheers",
  backgroundColor: 'rgba(255, 99, 132, 0.2)',
  borderColor: 'rgba(255, 99, 132, 1)',
  borderWidth: 1,
  fill: true,
  data: [ 43.27, 34.43, 10.16, 68.6, 36.26, 81.65, 84.88, 192.26, 67.25, 94.98, 39.09, 9.63, 0, 3.3, 0.64, 5.65, 43.08, 97.25, 9.26, 46.38, 46.55, 70.71, 13.6, 25.15, 47.99, 42.66, 27.95, 36.85, 44.89, 7.59, 5.2 ]
},
{
  label: "Subscribers",
  backgroundColor: 'rgba(54, 162, 235, 0.2)',
  borderColor: 'rgba(54, 162, 235, 1)',
  borderWidth: 1,
  fill: true,
  data: [ 29.94, 49.9, 39.92, 34.93, 44.91, 29.94, 84.83, 74.85, 64.87, 4.99, 19.96, 0, 0, 0, 0, 0, 74.85, 49.9, 29.94, 19.96, 29.94, 14.97, 4.99, 19.96, 14.97, 9.98, 9.98, 34.93, 39.92, 29.94, 9.98 ]
},
]
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: "July"
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
          beginAtZero: false,
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
    labels: [ "werktwerk", "fluttershy1970", "the_g4spharaoh", "insomniaticmeat", "thatanonymouse", "jamesdiyonyoutube", "flyeaglesfly01", "thatsamoankid", "planetjeff2", "availableusername888", "jack_spartacus", "yamenuj97", "errnoent", "retrothicc2b", "retrocerberus", "tantamounter", "darthradovanviking", "thirdeyethethird", "goldencolts", "flybeast", "spazz3", "wubegg", "mojosd", "eternia_forever", "kingjezal", "deep_drive", "mr_vidar_viking", "dooley258", "nolbert87", "howlinthedeep", "darthvidarviking" ],
    datasets: [{
      label: "Total Cheers",
      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
      borderColor: ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
      borderWidth: 1,
      fill: true,
      data: [ 45, 45, 46.6, 53.65, 57.5300000000001, 69.85, 72, 72.25, 80.55, 85, 98.0500000000001, 100, 101, 104.45, 104.8, 105.93, 130.16, 136.92, 152.72, 155, 156.14, 181.65, 194.96, 233.15, 243.09, 259.96, 441.9, 502.53, 527, 534.63, 589.49 ]
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
 "paypig_config_month": {
  type: 'bar',
  data: {
    labels: [ "the_abstract1", "hyperior21", "baronbonghits6969", "bigtone995", "isukfartsoutofaskunksass", "mrpapaveraceae", "atlastelamon9", "sensationalmedia", "gamemaster2003isdead", "silentgeneral", "availableusername888", "aaronisbuddha", "yusuke14k", "6th_moral", "r2df", "adxmlikkleman", "jack_spartacus", "smartweirdo95", "griffinbox", "eternia_forever", "esteglefire", "flyeaglesfly01", "werktwerk", "msmonique", "planetjeff2", "thatanonymouse", "yamenuj97", "goldencolts", "darthradovanviking", "kingjezal", "dooley258" ],
    datasets: [{
      label: "Total Cheers",
      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
      borderColor: ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
      borderWidth: 1,
      fill: true,
      data: [ 8, 8.29999999999999, 8.5, 8.5, 8.69999999999999, 9, 10, 10, 10.4, 11, 11.1, 12, 12, 12.84, 14.19, 15, 15.25, 17, 22, 23, 27, 27, 30, 38, 39.15, 57.5300000000001, 100, 101.47, 110.66, 129.09, 221.53 ]
    }]
  },
  options: {
    title: {
      display: true,
      text: "Cheer-leaderboards (July)",
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