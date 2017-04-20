var 	span_vol,
		span_freq,
		sound = new Pizzicato.Sound();

function init(){
	findElements();
	startSound();
}

function startSound(){
	sound = new Pizzicato.Sound({ 
			source: 'wave',
			options: { type: 'sine', frequency: frequency, volume: v }
	});
	sound.play();	
}
		
function findElements(){
	span_vol = document.getElementById("span_vol");
	span_freq = document.getElementById("span_freq");
}

function setVolume(val){
	sound.volume = parseFloat(val);	
	span_vol.innerHTML = v;
}

function setFrequency(val){
	sound.frequency = parseFloat(val);
	span_freq.innerHTML = frequency;
}

init();