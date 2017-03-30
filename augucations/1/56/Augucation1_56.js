var charts, options, colors, data1;
var current_chart = 4; // 2 - 6 because the first two charts are Extrawürschte

var param_a, param_theta;
var param_freq = 1; // maybe -4-5

var sliders;

function initializePlotStuff(){
	charts = document.getElementsByClassName("plot_chart");

	options = new Array(charts.length);

	colors = [color_black, color_gray, color_dark_red, color_blue, color_green, color_orange];
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
	param_freq = 1;
}
initializeSliderStuff();

plotFunc = null;

function sampleFunction(x1, x2, func) {
			
	var d = [ ];
	var step = (x2-x1)/700;
	for (var i = x1; i < x2; i += step )
		d.push([i, func( i ) ]);

	return d;
}
	
function makeData(index){	
	var amp = index > 1 ? param_a[index - 2] : 1;
	var phas = index > 1 ? param_theta[index - 2] : 1;
	return sampleFunction(0, 20, function(x) {return amp * Math.cos(x + phas)} );
}	
	
function makeOptions(index){
	
	var borderWid = index == current_chart ? 2 : 0.5;
	var borderCol = index == current_chart ? colors[index] : color_gray;
	
	return {
		yaxis: 
		{
			ticks: [],
			min: -3,
			max: 3,
		}, 
		xaxis: 
		{
			ticks: [],
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
	
$(function(){
	
	function plotIt(){		
		for(var i = 0; i < charts.length; i++){
			if(i == 0)
				this.plot = $.plot($(charts[i]),  [ { data: makeData(2), color: colors[2]}, {data: makeData(3), color: colors[3]}, {data: makeData(4), color: colors[4]}, {data: makeData(5), color: colors[5]}, {data: makeData(6), color: colors[6]} ], makeOptions(i));
			else
				this.plot = $.plot($(charts[i]),  [ { data: makeData(i), color: colors[i]} ], makeOptions(i));
		}
	}
	plotIt();
	plotFunc = plotIt;
		
});

function chartSelected(index){
	current_chart = index;
	plotFunc();
	highlight();
}

function highlight(){
	
	/*
	var r = document.querySelectorAll('input[type=range]'), 
    prefs = ['moz-range-thumb', 'webkit-slider-thumb', 'ms-thumb'],
    styles = [], 
    l = prefs.length,
    n = r.length;
	
	var getTrackStyleStr = function(j) {
	  var str = '';
	  for(var i = 0; i < l; i++) {
		str += "input[type=range]" + "::-" + prefs[i] + '{background: #FF0000} ';
	  }
	  console.log(str);
	  return str;
	};

	var setDragStyleStr = function() {
	  console.log("schwabbelmin");
	  var trackStyle = getTrackStyleStr(this); 
	  //styles[this].textContent = trackStyle;
	  styles[this].textContent = trackStyle;
	};

	for(var i = 0; i < n; i++) {
	  var s = document.createElement('style');
	  document.body.appendChild(s);
	  styles.push(s);
	  //r[i].setAttribute('data-rangeId', i);
	  //setDragStyleStr.bind(i);
	  r[i].addEventListener('input', setDragStyleStr.bind(i));
	}
	
	function blubbel(){
		console.log("blubbel");
		setDragStyleStr.bind(i);
		setDragStyleStr();
	}
	
	//blubbel();
	*/
}

function sliderInput(id, val){
	if(id == "slider_amp"){
		param_a[current_chart - 2] = parseFloat(val);
	}
	else if(id == "slider_phas"){
		param_theta[current_chart - 2] = parseFloat(val);
	}
	plotFunc();
}