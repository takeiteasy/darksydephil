var month_days = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function is_leap_year(y) {
	return ((y % 4 == 0) && (y % 100 != 0)) || (y % 400 == 0);
}

function days_in_month(y, m) {
	var i = months.indexOf(m);
	return (i == 1 ? (is_leap_year(y) ? 29 : 28) : month_days[i]);
}

function date_to_ts(y, m, d=0) {
    return new Date(y + "-" + m + "-" + (d == 0 ? days_in_month(y, m) : d) + " 00:00:00 GMT +00:00").getTime().toString()
}

window.onload = function() {
    var c_date = new Date();
	data = JSON.parse(data);
	patreon = JSON.parse(dataJson);

	var dates = [];
	var bits  = [];
	var subs  = [];
	var pays  = [];
	for (var a in data) {
		for (var b in data[a]) {
			var tmp_bits = [], tmp_subs = [];
			for (var c in data[a][b]) {
				tmp_bits.push(data[a][b][c]['bits'] / 100);
				tmp_subs.push(data[a][b][c]['subs']);
			}
			dates.push(b + ", " + a);
			bits.push(tmp_bits.reduce((a, b) => a + b, 0));
			subs.push(tmp_subs.reduce((a, b) => a + b, 0));

			var p_obj = patreon[date_to_ts(a, b)];
			if (typeof(p_obj) != "undefined")
				pays.push(p_obj['earnings']);
		}
	}
	if (pays.length < bits.length)
		pays.push(0); // Temporary

	var chart_main = new Chart(document.getElementById("chart_main").getContext('2d'), {
		type: 'line',
		data: {
			labels: dates,
			datasets: [{
				label: "Cheers",
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1,
				fill: true,
				data: bits
			}, {
				label: "Subscribers",
				backgroundColor: 'rgba(54, 162, 235, 0.2)',
				borderColor: 'rgba(54, 162, 235, 1)',
				borderWidth: 1,
				fill: true,
				data: subs
			},
			{
				label: "Patreons",
				backgroundColor: 'rgba(255, 206, 86, 0.2)',
				borderColor: 'rgba(255, 206, 86, 1)',
				borderWidth: 1,
				fill: true,
				data: pays
			}]
		},
		options: {
			responsive: true,
			title: {
				display: true,
				text: "Revenue"
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
	});
	
	var p_labels = Object.keys(patreon).map(function(k) { return parseInt(k); });
	var last_month = months[(c_date.getMonth() == 0 ? 11 : c_date.getMonth() - 1)];
	var last_month_year = (last_month == "December" ? c_date.getFullYear() - 1 : c_date.getFullYear());
	var days_last_month = Array.from(Array(days_in_month(c_date.getYear(), last_month))).map((e, i) => i + 1);
	
	var chart_1 = new Chart(document.getElementById("chart_1").getContext('2d'), {
		type: 'line',
		data: {
			labels: days_last_month,
			datasets: [{
				label: "Patreon",
				backgroundColor: 'rgba(255, 206, 86, 0.2)',
				borderColor: 'rgba(255, 206, 86, 1)',
				borderWidth: 1,
				fill: true,
				data: days_last_month.map(function(n) { return patreon[date_to_ts(last_month_year, last_month, n)]['earnings']; })
			}]
		},
		options: {
			responsive: true,
			title: {
				display: true,
				text: last_month
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
	});

	var chart_2 = new Chart(document.getElementById("chart_2").getContext('2d'), {
	    type: 'line',
	    data: {
	    labels: days_last_month,
	    datasets: [{
	  label: "Cheers",
	  backgroundColor: 'rgba(255, 99, 132, 0.2)',
	  borderColor: 'rgba(255, 99, 132, 1)',
	  borderWidth: 1,
	  fill: true,
	  data: days_last_month.map(function(n) { return data[last_month_year][last_month][n]['bits'] / 100; })
	},
	{
	  label: "Subscribers",
	  backgroundColor: 'rgba(54, 162, 235, 0.2)',
	  borderColor: 'rgba(54, 162, 235, 1)',
	  borderWidth: 1,
	  fill: true,
	  data: days_last_month.map(function(n) { return data[last_month_year][last_month][n]['subs']; })
	},
	]
	  },
	  options: {
	    responsive: true,
	    title: {
	      display: true,
	      text: last_month
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
	});
	
	var chart_3 = new Chart(document.getElementById("chart_3").getContext('2d'), {
	});
	
	var chart_4 = new Chart(document.getElementById("chart_4").getContext('2d'), {
	});

	var paymetonnes_chart1 = new Chart(document.getElementById("chart_paymetonnes1").getContext('2d'), {
		type: "line",
		data: {
			labels: p_labels,
			datasets: [{
				label: "Patreon $$$",
				backgroundColor: 'rgba(255, 206, 86, 0.2)',
				borderColor: 'rgba(255, 206, 86, 1)',
				borderWidth: 1,
				data: Object.keys(patreon).map(function(k) { return patreon[k]["earnings"] })
			}]
		},
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
	});

	var paymetonnes_chart2 = new Chart(document.getElementById("chart_paymetonnes2").getContext('2d'), {
		type: "line",
		data: {
			labels: p_labels,
			datasets: [{
				label: "Patreon Subs",
				backgroundColor: 'rgba(255, 159, 64, 0.2)',
				borderColor: 'rgba(255, 159, 64, 1)',
				borderWidth: 1,
				data: Object.keys(patreon).map(function(k) { return patreon[k]["patrons"] })
			}]
		},
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
	});
}