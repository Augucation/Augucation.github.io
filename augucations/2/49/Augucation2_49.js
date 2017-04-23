var 	span_vol,
		span_freq,
		min_f_log = Math.log(20),
		max_f_log = Math.log(20000),
		old_v,
		old_f,
		sound = new Pizzicato.Sound(),
		play = false,
		muteBtn = document.getElementById("muteBtn"),
		img_soundoff = "url('https://upload.wikimedia.org/wikipedia/commons/3/3f/Mute_Icon.svg')",
		img_soundon = "url('https://upload.wikimedia.org/wikipedia/commons/2/21/Speaker_Icon.svg')",
		plotFunc,
		data,
		type = "sine",
		plot_x_scale = 0.001,
		plot_x_min = 0,
		plot_x_max = 6.001;

var radios = document.getElementsByName("type");

function init(){
	findElements();
	manageRadioButtons();
	createSound();
	sound.volume = 2;
}

function createSound(){
	sound = new Pizzicato.Sound({
			source: 'wave',
			options: { type: 'sine', frequency: 400, volume: 0.5 }
	});
}

function findElements(){
	span_vol = document.getElementById("span_vol");
	span_freq = document.getElementById("span_freq");
}

function setVolume(val){

	sound.volume = parseFloat(val);
	span_vol.innerHTML = Math.round(val * 100) + "%";

	plotFunc();
}

function setFrequency(val){
	sound.frequency = logFreq(val);
	span_freq.innerHTML = logFreq(val) + " Hz";

	plotFunc();
}

function logFreq(val){
	var scale = (max_f_log - min_f_log) / 100;
	return Math.round( Math.exp(min_f_log + scale * val));

}

function setType(val){

	// save volume and frequency of the old sound
	old_v = sound.volume;
	old_f = sound.frequency;

	sound.stop();
	sound = new Pizzicato.Sound({
			source: 'wave',
			options: { type: val, frequency: old_f, volume: old_v }
	});

	if(play)
		sound.play();

	type = val;
	plotFunc();
}

function manageRadioButtons(){
	for(var i = 0; i < radios.length; i++){
		radios[i].onclick = function()
		{
			setType(this.id);
		}
	}
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

function sampleFunction(x1, x2, func) {
	var d = [ ];
	var step = (x2-x1)/10050;
	for (var i = x1; i < x2; i += step )
		d.push([i, func( i ) ]);

	return d;
}

$(function(){

	function sin(x){
		return sound.volume * Math.sin(sound.frequency * (2 * Math.PI) * x);
	}

	function square(x){
		p = 1 / sound.frequency;
		return x % p < p * 0.5 ? sound.volume : -sound.volume;
	}

	function triangle(x){
		p = 1 / sound.frequency;
		return sound.volume * 2 * Math.abs(Math.round(x / p) - x / p) * 2 - sound.volume;
	}

	function sawtooth(x){
		p = 1 / sound.frequency;
		return sound.volume * ((x / p) - Math.floor(x / p)) * 2 - sound.volume;
	}

	function plotit(){

		switch(type)
		{
			case "sine":
				data = sampleFunction( plot_x_min, plot_x_max * plot_x_scale, function(x){ return sin(x); } );
				break;
			case "square":
				data = sampleFunction( plot_x_min, plot_x_max * plot_x_scale, function(x){ return square(x); } );
				break;
			case "triangle":
				data = sampleFunction( plot_x_min, plot_x_max * plot_x_scale, function(x){ return triangle(x); } );
				break;
			case "sawtooth":
				data = sampleFunction( plot_x_min, plot_x_max * plot_x_scale, function(x){ return sawtooth(x); } );
				break;
		}

		var options =
		{
			axisLabels:
			{
				show: true
			},
			xaxis:
			{
				tickFormatter: function(val, axis) {return (val / plot_x_scale).toString() + 'ms';},
				tickSize: plot_x_scale,
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
			colors: ["#FF0000"]
		};

		$.plot($("#chart"), [data], options);
	}

	plotit();
	plotFunc = plotit;
});

init();
