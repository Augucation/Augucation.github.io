var plot;

$(function(){

	var options = {
		series: {
			bars: {
				show: true,
				lineWidth: 0.2,
			}
		},
		xaxis:
		{
			mode: "time",
			ticks: [[0, "0"], [255, "255"]],
			min: 0,
			max: 255,
			font: {
				family: 'uhh',
				color: color_gray,
			}
		},
		yaxis: {
			ticks: [],
            min: 0,
            max: 9000,
		},
		legend: {
			show: false,
		},
		  grid: {
			borderColor: color_gray,
			borderWidth: 1,
		  },
	};

    plot = $.plot($("#mydiv"),[
            {
                color: 'gray',
                data: convertToPlotDataFormat(my_image.histogram)
            }
        ],
        options);

	plot.draw();

    // if the histogram was changed, update data and plot again
    document.addEventListener("calculatedHistogram", function(e) {
        plot.setData([
                        {
                            color: 'gray',
                            data: convertToPlotDataFormat(my_image.histogram)
                        }
                    ]);
        plot.draw();
    });
});

// converts histogram data array to bin-value-tupel-data
function convertToPlotDataFormat(data) {
    var plotData = new Array(data.length);

    for (var i = 0; i < data.length; i++) {
        plotData[i] = [i, data[i]];
    }
    return plotData;
}
