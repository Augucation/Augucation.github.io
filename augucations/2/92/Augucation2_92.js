var 	span_vol_1,
		span_freq_1,
		span_vol_2,
		span_freq_2,
		sound1 = new Pizzicato.Sound(),
		sound2 = new Pizzicato.Sound();

function init(){
	findElements();
	startSound();
}

function startSound(){
	sound1 = new Pizzicato.Sound({ 
			source: 'wave',
			options: { type: 'sine', frequency: 400, volume: 0.5 }
	});
	sound1.play();	
	
	sound2 = new Pizzicato.Sound({ 
			source: 'wave',
			options: { type: 'sine', frequency: 400, volume: 0.5 }
	});
	sound2.play();	
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
		span_vol_1.innerHTML = val;
	}
	else{
		sound2.volume = parseFloat(val);	
		span_vol_2.innerHTML = val;
	}
		
}

function setFrequency(id, val){
	
	if(id == 1){
		sound1.frequency = parseFloat(val);
		span_freq_1.innerHTML = val;;
	}
	else{
		sound2.frequency = parseFloat(val);
		span_freq_2.innerHTML = val;
	}
}

init();

/*

Voll gute Soundkombis:

1: 279
2: bis 336


*/