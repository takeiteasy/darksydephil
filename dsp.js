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
  data: [ 510.84, 463.43, 1346.97, 1886.65, 1698.25, 1228.75, 1449.47 ]
},
{
  label: "Subscribers",
  backgroundColor: 'rgba(54, 162, 235, 0.2)',
  borderColor: 'rgba(54, 162, 235, 1)',
  borderWidth: 1,
  fill: true,
  data: [ 309.38, 279.44, 983.03, 598.8, 818.36, 893.21, 913.17 ]
},
{
  label: "Patreons",
  backgroundColor: 'rgba(255, 206, 86, 0.2)',
  borderColor: 'rgba(255, 206, 86, 1)',
  borderWidth: 1,
  fill: true,
  data: [ 1413.57, 1354.28, 1211.99, 1125.45, 1114.65, 1180.62, 1017.68 ]
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
  data: [ 1137.61, 1137.61, 1138.51, 1004.51, 1013.44, 1017.91, 1017.91, 982.18, 990.11, 999.04, 999.04, 999.04, 999.93, 999.93, 999.93, 1004.29, 1004.29, 1022.15, 1022.15, 1022.15, 1017.68, 1004.29, 1005.18, 1005.18, 1006.97, 1011.43, 1011.43, 998.93, 998.93, 996.25, 1017.68 ]
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
  data: [ 45.31, 35.65, 11.2, 69.75, 36.56, 99.95, 85.25, 196.71, 79.35, 96.08, 41.85, 9.63, 0, 3.3, 1.2, 5.65, 48.13, 101.25, 9.46, 49.88, 48.87, 93.87, 13.9, 27.44, 49.88, 44.71, 28.6, 38.14, 55.29, 7.64, 14.97 ]
},
{
  label: "Subscribers",
  backgroundColor: 'rgba(54, 162, 235, 0.2)',
  borderColor: 'rgba(54, 162, 235, 1)',
  borderWidth: 1,
  fill: true,
  data: [ 29.94, 49.9, 39.92, 34.93, 44.91, 29.94, 84.83, 74.85, 64.87, 4.99, 19.96, 0, 0, 0, 0, 0, 74.85, 49.9, 29.94, 19.96, 29.94, 14.97, 4.99, 19.96, 14.97, 9.98, 9.98, 34.93, 39.92, 29.94, 49.9 ]
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
    labels: [ "the_g4spharaoh", "msmonique", "insomniaticmeat", "the_abstract1", "thatanonymouse", "jamesdiyonyoutube", "flyeaglesfly01", "thatsamoankid", "planetjeff2", "availableusername888", "jack_spartacus", "yamenuj97", "errnoent", "retrothicc2b", "retrocerberus", "tantamounter", "darthradovanviking", "thirdeyethethird", "flybeast", "spazz3", "goldencolts", "wubegg", "mojosd", "eternia_forever", "deep_drive", "kingjezal", "mr_vidar_viking", "dooley258", "nolbert87", "howlinthedeep", "darthvidarviking" ],
    datasets: [{
      label: "Total Cheers",
      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
      borderColor: ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
      borderWidth: 1,
      fill: true,
      data: [ 46.6, 48, 53.65, 62, 62.9200000000001, 69.85, 72, 72.25, 80.55, 85, 98.0500000000001, 100, 101, 104.45, 104.8, 108.93, 134.61, 136.92, 155, 157.14, 158.9, 181.65, 194.96, 233.6, 260.96, 296.19, 451.18, 521.53, 527, 548.25, 631.66 ]
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
    labels: [ "cbvcalifloydian", "baronbonghits6969", "isukfartsoutofaskunksass", "mrpapaveraceae", "bigtone995", "sensationalmedia", "gamemaster2003isdead", "availableusername888", "6th_moral", "the_abstract1", "r2df", "adxmlikkleman", "yusuke14k", "jack_spartacus", "silentgeneral", "smartweirdo95", "atlastelamon9", "griffinbox", "eternia_forever", "aaronisbuddha", "flyeaglesfly01", "esteglefire", "werktwerk", "planetjeff2", "msmonique", "thatanonymouse", "yamenuj97", "goldencolts", "darthradovanviking", "kingjezal", "dooley258" ],
    datasets: [{
      label: "Total Cheers",
      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
      borderColor: ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
      borderWidth: 1,
      fill: true,
      data: [ 8.5, 8.5, 8.69999999999999, 9, 9.5, 10, 10.4, 11.1, 12.94, 14, 14.19, 15, 15, 15.25, 16, 17, 20, 22, 23, 24, 27, 29, 30, 39.15, 44, 62.9200000000001, 100, 107.65, 115.11, 156.19, 230.53 ]
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