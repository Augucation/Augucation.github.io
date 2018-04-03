
var chartSelected;

$(document).ready(function () {
	var charts, options, colors, data1;
	var current_chart = 2; // 2 - 6 because the first two charts are Extrawürschte

	var param_a, param_theta;
	var param_freq = 1; // maybe -4-5

	var sliders;

	var thatplot;

	function initializePlotStuff(){
		charts = document.getElementsByClassName("plot_chart");

		options = new Array(charts.length);

		colors = [color_black, color_gray, color_dark_red, color_blue, color_green, color_orange, color_purple];
	}
	initializePlotStuff();

	function initializeSliderStuff(){
		sliders = document.getElementsByClassName("slider");

		for (var i = 0; i < sliders.length; i++){
			sliders[i].addEventListener("input", function(e){sliderInput(this.id, this.value);});
		}

		param_a = new Array(charts.length - 2);
		param_a.fill(1);
		param_theta = new Array(charts.length - 2);
		param_theta.fill(0);

		highlight();
	}
	initializeSliderStuff();

	plotFunc = null;

	function sampleFunction(x1, x2, func) {
		var d = [ ];
		var step = (x2-x1)/500;
		for (var i = x1; i < x2; i += step )
			d.push([i, func( i ) ]);

		return d;
	}

	function makeData(index){

		// plot the fourier sum
		if(index == 1){
			return sampleFunction(0, 20, function(x){
				var sum = 0;
				for(var i = 0; i < charts.length - 2; i++){
					sum += (param_a[i] * Math.cos(i * param_freq * x + param_theta[i]));
				}
				return sum;
			} );
		}
		if(index > 1){
			return sampleFunction(0, 20, function(x) {return param_a[index-2] * Math.cos((index-2) * param_freq * x + param_theta[index-2])} );
		}
	}

	function makeOptions(index, plotAll){

		var borderWid = index == current_chart ? 2 : 0.5;
		var borderCol = index == current_chart ? colors[index] : color_gray;

		return {
			lines:
			{
				lineWidth: 1,
			},
			yaxis:
			{
				//ticks: [],
				min: -3,
				max: 3,
			},
			xaxis:
			{
				ticks: [
						 [Math.PI, "1 \u03C0"],
						 //[1.5*Math.PI, "1.5 \u03C0"],
						 [2*Math.PI, "2 \u03C0"],
						 //[2.5*Math.PI, "2.5 \u03C0"],
						 [3*Math.PI, "3 \u03C0"],
						 //[3.5*Math.PI, "3.5 \u03C0"],
						 [4*Math.PI, "4 \u03C0"],
						 //[4.5*Math.PI, "4.5 \u03C0"],
						 [5*Math.PI, "5 \u03C0"],
						 //[5.5*Math.PI, "5.5 \u03C0"],
						 [6*Math.PI, "6 \u03C0"],
						 //[6.5*Math.PI, "6.5 \u03C0"],
						],
				min: 0,
				max: 15,
			},
			grid:
			{
				borderWidth: borderWid,
				borderColor: borderCol,
			}
		};
	}

	function makeLineWidth(index){
		return index == current_chart ? 2.5 : 1;
	}

	$(function(){

		function plotIt(){
			for(var i = 0; i < charts.length; i++){
				if(i == 0)
					this.plot = $.plot($(charts[i]),  [ {
															data: makeData(2),
														    color: colors[2],
														    lines: {lineWidth: makeLineWidth(2)}
														},
														{
															data: makeData(3),
															color: colors[3],
														    lines: {lineWidth: makeLineWidth(3)}
														},
														{
															data: makeData(4),
															color: colors[4],
														    lines: {lineWidth: makeLineWidth(4)}
														},
														{
															data: makeData(5),
															color: colors[5],
														    lines: {lineWidth: makeLineWidth(5)}
														},
														{
															data: makeData(6),
															color: colors[6],
														    lines: {lineWidth: makeLineWidth(6)}
														}
														],
														makeOptions(i, true));
				else
					this.plot = $.plot($(charts[i]),  [ { data: makeData(i), color: colors[i]} ], makeOptions(i, false));

				thatplot = this.plot;
			}
		}
		plotIt();
		plotFunc = plotIt;


		window.onresize = function(event) {
		    thatplot.draw();
		};
	});

	function updateSlider(){
		sliders[0].value = param_a[current_chart - 2];
		sliders[1].value = param_theta[current_chart - 2];
	}

	chartSelected = function(index){
		current_chart = index;
		updateSlider();
		plotFunc();
		highlight();
	}

	function highlight(){
		var color_names = ["red", "blue", "green", "orange", "purple"];
		sliders[0].className = "slider color_" + color_names[current_chart-2];
		sliders[1].className = "slider color_" + color_names[current_chart-2];
	}

	function sliderInput(id, val){
		if(id == "slider_amp"){
			param_a[current_chart - 2] = parseFloat(val);
		}
		else if(id == "slider_phas"){
			param_theta[current_chart - 2] = parseFloat(val);
		}
		else if(id == "slider_freq"){
			param_freq = parseFloat(val);
		}
		plotFunc();
	}
});
