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
		ac,
		osc1,
		osc2;

function init(){
	findElements();
	createSound();
}

function soundysound(){
	var n = 4096;
	var real = new Float32Array(n);
	var imag = new Float32Array(n);
	ac = new AudioContext();
	osc1 = ac.createOscillator();
	osc2 = ac.createOscillator();

	/* Pick a wave pattern */

	/* Sine */
	//imag[1] = 1;
	real[0] = 0;
	imag[0] = 0;
	real[1] = 1;
	imag[1] = 0;

	/*
	var wave = ac.createPeriodicWave(real, imag);

	osc1.setPeriodicWave(wave);
	osc1.connect(ac.destination);
	osc1.start();
	osc1.stop(2);
	*/
	var realCoeffs = new Float32Array([0,0]); // No DC offset or cosine fundamental freq
	var imagCoeffs = new Float32Array([0,1]); // sine of amplitude 1 at fundamental freq (First imaginary coeff is ignored)
	var wave = ac.createPeriodicWave(realCoeffs, imagCoeffs); // will be a simple sine wave

	osc1.setPeriodicWave(wave);
	osc1.frequency.value = 440;
	osc1.connect(ac.destination);
	osc1.start(0);


	osc2.setPeriodicWave(wave);
	osc2.frequency.value = 440;
	osc2.connect(ac.destination);
	osc2.start(0);
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

//init();
soundysound();
