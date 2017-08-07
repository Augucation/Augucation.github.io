var 	span_vol_1,
		span_freq_1,
		span_vol_2,
		span_freq_2,
		min_f_log = Math.log(20),
		max_f_log = Math.log(20000),
		sound1 = new Pizzicato.Sound(),
		sound2 = new Pizzicato.Sound(),
		play = false,
		muteBtn = document.getElementById("muteBtn"),
		img_soundoff = "url('https://upload.wikimedia.org/wikipedia/commons/3/3f/Mute_Icon.svg')",
		img_soundon = "url('https://upload.wikimedia.org/wikipedia/commons/2/21/Speaker_Icon.svg')",
		freq_slider1 = document.getElementById("slider_freq1"),
		freq_slider2 = document.getElementById("slider_freq2"),
		vol_slider1 = document.getElementById("slider_vol1"),
		vol_slider2 = document.getElementById("slider_vol2"),
		data1,
		data2,
		plot_x_scale = 0.001,
		plot_x_min = 0,
		plot_x_max = 100.002,
		plotFunc;

function init(){
	findElements();
	createSound();
}

function sine(x){
	return Math.sin(0.1 * x);
}

function createSound(){
	sound1 = new Pizzicato.Sound({
			source: 'wave',
			options: { type: 'sine', frequency: 350, volume: 0.5 }
	});
	
	sound2 = new Pizzicato.Sound({
			source: 'wave',
			options: { type: 'sine', frequency: 350, volume: 0.5 }
	});
}

function findElements(){
	span_vol_1 = document.getElementById("span_vol_1");
	span_freq_1 = document.getElementById("span_freq_1");

	span_vol_2 = document.getElementById("span_vol_2");
	span_freq_2 = document.getElementById("span_freq_2");
}

function setFrequency(id, val){

	if(id == 1){
		sound1.frequency = parseFloat(val);
		span_freq_1.innerHTML = val + " Hz";
	}
	else{
		sound2.frequency = parseFloat(val);
		span_freq_2.innerHTML = val + " Hz";
	}

	plotFunc();
}

function logFreq(val){
	var scale = (max_f_log - min_f_log) / 100;
	return Math.round( Math.exp(min_f_log + scale * val));

}

function mute(){

	if(play)
	{
		sound1.stop();
		sound2.stop();
		play = false;
		muteBtn.style.backgroundImage = img_soundoff;
	}
	else
	{
		sound1.play();
		sound2.play();
		play = true;
		muteBtn.style.backgroundImage = img_soundon;
	}
}


function sampleFunction(x1, x2, func) {
	var d = [ ];
	var step = (x2-x1)/3000;
	for (var i = x1; i < x2; i += step )
		d.push([i, func( i ) ]);

	return d;
}

$(function(){

	function sin(x, id){
		if(id == 1){
			return 0.5 * Math.sin(sound1.frequency * (2 * Math.PI) * x);
		}
		else{
			return 0.5 * Math.sin(sound2.frequency * (2 * Math.PI) * x);
		}
	}
	
	function result(x){
		return sin(x, false) + sin(x, true);
	}

	function plotit(){

		data1 = sampleFunction( plot_x_min, plot_x_max * plot_x_scale, function(x){ return sin(x, 1); });
		data2 = sampleFunction( plot_x_min, plot_x_max * plot_x_scale, function(x){ return sin(x, 2); });
		
		data3 = sampleFunction( plot_x_min, plot_x_max * plot_x_scale, function(x){ return result(x); });
		
		var options_sines =
		{
			axisLabels:
			{
				show: true
			},
			xaxis:
			{
				tickFormatter: function(val, axis) {return (val / plot_x_scale).toString() + 'ms';},
				tickSize: 0.02,
				axisLabel: 'ms'
			},
			yaxis:
			{
				min: -1,
				max: 1,
				ticks: []
			},
			grid:
			{
				borderWidth: 0
			},
			colors: ["#FF0000", "#0000FF"]
		};

		var options_result =
		{
			axisLabels:
			{
				show: true
			},
			xaxis:
			{
				tickFormatter: function(val, axis) {return (val / plot_x_scale).toString() + 'ms';},
				tickSize: 0.02,
				axisLabel: 'ms'
			},
			yaxis:
			{
				min: -1,
				max: 1,
				ticks: []
			},
			grid:
			{
				borderWidth: 0
			},
			colors: ["#FF00FF"]
		};
		
		$.plot($("#chart_sines"), [{data: data1}, {data: data2}], options_sines);
		$.plot($("#chart_result"), [{data: data3}], options_result);
	}

	plotit();
	plotFunc = plotit;
});
init();
