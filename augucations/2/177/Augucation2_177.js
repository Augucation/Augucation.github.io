var 	span_vol_1,
		span_freq_1,
		span_vol_2,
		span_freq_2,
		min_f_log = Math.log(20),
		max_f_log = Math.log(20000),
		sound = new Pizzicato.Sound(),
		play = false,
		muteBtn = document.getElementById("muteBtn"),
		img_soundoff = "url('https://upload.wikimedia.org/wikipedia/commons/3/3f/Mute_Icon.svg')",
		img_soundon = "url('https://upload.wikimedia.org/wikipedia/commons/2/21/Speaker_Icon.svg')",
		freq_slider1 = document.getElementById("slider_freq1"),
		freq_slider2 = document.getElementById("slider_freq2"),
		vol_slider1 = document.getElementById("slider_vol1"),
		vol_slider2 = document.getElementById("slider_vol2"),
		spanny,
		delay,
		data1,
		data2,
		data3,
		plot_x_scale = 0.001,
		plot_x_min = 0,
		plot_x_max = 3.002,
		plotFunc;

function init(){
	findElements();
	createSound();
}

function sine(x){
	return Math.sin(0.1 * x);
}

function createSound(){
	sound = new Pizzicato.Sound({
			source: 'wave',
			options: { type: 'sine', frequency: 400, volume: 0.5 }
	});

	delay = new Pizzicato.Effects.Delay({
	    feedback: 0,
	    time: 0.00125,
	    mix: 0.5
	});
	sound.addEffect(delay);
}

function findElements(){
	span_vol_1 = document.getElementById("span_vol_1");
	span_freq_1 = document.getElementById("span_freq_1");

	span_vol_2 = document.getElementById("span_vol_2");
	span_freq_2 = document.getElementById("span_freq_2");
	
	spanny = document.getElementById("spanny");
}

function mute(){

	if(play)
	{
		sound.stop();
		play = false;
		muteBtn.style.backgroundImage = img_soundoff;
	}
	else
	{
		sound.play();
		play = true;
		muteBtn.style.backgroundImage = img_soundon;
	}
}

function setFrequency(val){

	if(val == 1 / (sound.frequency * 2) * 1000)
		spanny.innerHTML = "Dekonstruktive Interferenz";
	else if(val == 0)
		spanny.innerHTML = "Konstruktive Interferenz";
	
	spanny.style.visibility = (val == 1 / (sound.frequency * 2) * 1000 || val == 0) ? "visible" : "hidden";
	

	delay.time = parseFloat(val / 1000);
	span_freq_2.innerHTML = val + " ms";
	
	plotFunc();
}

function sampleFunction(x1, x2, func) {
	var d = [ ];
	var step = (x2-x1)/50;
	for (var i = x1; i < x2; i += step )
		d.push([i, func( i ) ]);

	return d;
}

$(function(){

	function sin(x, delayed){
		if(delayed){
			return 0.5 * Math.sin(sound.frequency * (2 * Math.PI) * x - delay.time * 2500);
		}
		else{
			return 0.5 * Math.sin(sound.frequency * (2 * Math.PI) * x);
		}
	}
	
	function result(x){
		return sin(x, false) + sin(x, true);
	}

	function plotit(){

		data1 = sampleFunction( plot_x_min, plot_x_max * plot_x_scale, function(x){ return sin(x, false); });
		data2 = sampleFunction( plot_x_min, plot_x_max * plot_x_scale, function(x){ return sin(x, true); });
		
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
				tickSize: 0.0005,
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
				tickSize: 0.0005,
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
