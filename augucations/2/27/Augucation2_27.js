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
		c = document.getElementById("myCanvas"),
		ctx = c.getContext("2d")
		c_x_min = 67,
		c_x_max = 932,
		c_y_min = 33,
		c_y_max = 656,
		freq_slider = document.getElementById("slider_freq");

function init(){
	findElements();
	createSound();
	draw();
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
}

function setFrequency(val){
	sound.frequency = logFreq(val);
	span_freq.innerHTML = logFreq(val) + " Hz";
	draw();
}

function logFreq(val){
	var scale = (max_f_log - min_f_log) / 100;
	return Math.round( Math.exp(min_f_log + scale * val));

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

function calcFreqDrawY(){
	return c_x_min + freq_slider.value * 0.01 * (c_x_max - c_x_min);
}

function draw(){
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.beginPath();
	ctx.moveTo(calcFreqDrawY(), c_y_min);
	ctx.lineTo(calcFreqDrawY(), c_y_max);
	ctx.strokeStyle = "#FF0000";
	ctx.lineWidth = 5;
	ctx.stroke();
}

init();
