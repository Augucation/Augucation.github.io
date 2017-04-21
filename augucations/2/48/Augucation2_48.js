var 	span_vol,
		span_freq,
		min_f_log = Math.log(20),
		max_f_log = Math.log(20000),
		old_v, 
		old_f,
		sound = new Pizzicato.Sound();

var radios = document.getElementsByName("type");

function init(){
	findElements();
	manageRadioButtons();
	startSound();
}

function startSound(){
	sound = new Pizzicato.Sound({ 
			source: 'wave',
			options: { type: 'sine', frequency: 400, volume: 0.5 }
	});
	sound.play();	
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
	sound.play();		
}

function manageRadioButtons()
{	
	for(var i = 0; i < radios.length; i++){
		radios[i].onclick = function()
		{
			setType(this.id);
		}
	}
}

init();