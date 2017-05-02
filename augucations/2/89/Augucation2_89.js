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
		c = document.getElementById("myCanvas"),
		ctx = c.getContext("2d"),
		c_x_min = 25,
		c_x_max = 940,
		c_y_min = 20,
		c_y_max = 132,
		freq_slider1 = document.getElementById("slider_freq1"),
		freq_slider2 = document.getElementById("slider_freq2"),
		vol_slider1 = document.getElementById("slider_vol1"),
		vol_slider2 = document.getElementById("slider_vol2");


function init(){
	findElements();
	createSound();
	draw();
}

function createSound(){
	sound1 = new Pizzicato.Sound({
			source: 'wave',
			options: { type: 'sine', frequency: 400, volume: 0.5 }
	});

	sound2 = new Pizzicato.Sound({
			source: 'wave',
			options: { type: 'sine', frequency: 400, volume: 0.5 }
	});
}

function findElements(){
	span_vol_1 = document.getElementById("span_vol_1");
	span_freq_1 = document.getElementById("span_freq_1");

	span_vol_2 = document.getElementById("span_vol_2");
	span_freq_2 = document.getElementById("span_freq_2");
}

function setVolume(id, val){

	if(id == 1){
		sound1.volume = parseFloat(val);
		span_vol_1.innerHTML =  Math.round(val * 100) + "%";
	}
	else{
		sound2.volume = parseFloat(val);
		span_vol_2.innerHTML =  Math.round(val * 100) + "%";
	}

	draw();
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

	draw();
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

function calcFreqDrawX(num){
	if(num == 1)
		return c_x_min + (freq_slider1.value - 200) * 0.001 * (c_x_max - c_x_min);
	else if(num == 2)
		return c_x_min + (freq_slider2.value - 200) * 0.001 * (c_x_max - c_x_min);
}

function calcVolDrawY(num){
	if(num == 1)
		return c_y_min + (1 - vol_slider1.value) * (c_y_max - c_y_min);
	else if(num == 2)
		return c_y_min + (1 - vol_slider2.value) * (c_y_max - c_y_min);
}

function calcControlPoint(){
	return c_y_min + (1 - vol_slider1.value * 2) * (c_y_max - c_y_min);
}

function draw(){
	var maskOffsetX = 50;

	ctx.clearRect(0, 0, c.width, c.height);

	// sound 2
	ctx.beginPath();
	ctx.moveTo(calcFreqDrawX(2), calcVolDrawY(2));
	ctx.lineTo(calcFreqDrawX(2), c_y_max);
	ctx.strokeStyle = "#FF0000";
	ctx.lineWidth = 5;
	ctx.stroke();

	// sound 1
	ctx.beginPath();
	ctx.moveTo(calcFreqDrawX(1), calcVolDrawY(1));
	ctx.lineTo(calcFreqDrawX(1), c_y_max);
	ctx.strokeStyle = "#0000FF";
	ctx.lineWidth = 5;
	ctx.stroke();

	// mask
	ctx.beginPath();
	ctx.moveTo(calcFreqDrawX(1) - maskOffsetX, c_y_max);
	ctx.quadraticCurveTo(calcFreqDrawX(1), calcControlPoint(), calcFreqDrawX(1) + maskOffsetX, c_y_max);
	ctx.strokeStyle = "#555555";
	ctx.lineWidth = 3;
	ctx.stroke();
}

init();

/*

Voll gute Soundkombis:

1: 279
2: bis 336


*/
