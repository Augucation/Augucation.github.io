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
		vol_slider2 = document.getElementById("slider_vol2");

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

	var delay = new Pizzicato.Effects.Delay({
	    feedback: 0.1,
	    time: 0.00285714285714,
	    mix: 0.75
	});
	sound1.addEffect(delay);
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
}

function logFreq(val){
	var scale = (max_f_log - min_f_log) / 100;
	return Math.round( Math.exp(min_f_log + scale * val));

}

function mute(){

	if(play)
	{
		sound1.stop();
		//sound2.stop();
		play = false;
		muteBtn.style.backgroundImage = img_soundoff;
	}
	else
	{
		sound1.play();
		//sound2.play();
		play = true;
		muteBtn.style.backgroundImage = img_soundon;
	}
}

init();
