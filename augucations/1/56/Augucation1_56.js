var charts, options, colors, data1;
var current_chart = 4; // 2 - 6 because the first two charts are Extrawürschte

var sliders;

function initializePlotStuff(){
	charts = document.getElementsByClassName("plot_chart");

	options = new Array(charts.length);

	colors = [color_black, color_gray, color_dark_red, color_blue, color_green, color_orange];

	data1 = sampleFunction( 0, 20, function(x){ 3 * x; } );
}	
initializePlotStuff();

function initializeSliderStuff(){
	sliders = document.getElementsByClassName("slider");
}
initializeSliderStuff();

plotFunc = null;

function sampleFunction(x1, x2, func) {
			
	var d = [ ];
	var step = (x2-x1)/700;
	for (var i = x1; i < x2; i += step )
		//d.push([i, func( i ) ]);
		d.push([i, Math.sin(i) ]);

	return d;
}
	
function makeOptions(index){
	
	var borderCol = index == current_chart ? colors[index] : color_gray;
	
	return {
		colors: [colors[index]],
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
			borderWidth: 0.5,
			borderColor: borderCol,
		}
	};
}	
	
$(function(){
	
	function plotIt(){		
		for(var i = 0; i < charts.length; i++)
			this.plot = $.plot($(charts[i]),  [ { data: data1} ], makeOptions(i));
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
	
	blubbel();
}