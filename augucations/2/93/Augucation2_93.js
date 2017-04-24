var 	span_vol_1,
		span_freq_1,
		span_vol_2,
		span_freq_2,
		sound1 = new Pizzicato.Sound(),
		sound2 = new Pizzicato.Sound(),
		play = false
		muteBtn = document.getElementById("muteBtn"),
		img_soundoff = "url('https://upload.wikimedia.org/wikipedia/commons/3/3f/Mute_Icon.svg')",
		img_soundon = "url('https://upload.wikimedia.org/wikipedia/commons/2/21/Speaker_Icon.svg')";

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

init();

/*

Voll gute Soundkombis:

1: 279
2: bis 336


*/