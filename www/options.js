function options(title_text) {
    return {
        responsive: true,
            title: {
                display: true,
                text: title_text
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
        };
}
