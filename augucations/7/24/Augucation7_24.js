var 	delay, 
		play = false,
		muteBtn = document.getElementById("muteBtn"),
		img_soundoff = "url('https://upload.wikimedia.org/wikipedia/commons/3/3f/Mute_Icon.svg')",
		img_soundon = "url('https://upload.wikimedia.org/wikipedia/commons/2/21/Speaker_Icon.svg')",
		span_val,
		sound1,
		sound2;


function init(){
	findElements();
	createSounds();
	loop(sound1);
	loop(sound2);
}

function createSounds(){
	sound1 = new Audio('../../../resources/audio/Chantar_short.ogg');
	sound2 = new Audio('../../../resources/audio/Chantar_short.ogg');
}

function findElements(){
	span_val = document.getElementById("span_val");
}

function setDelay(val){
	
	span_val.innerHTML =  val + "ms";
	
	val = parseFloat(val) * 0.001; // s to ms
	sound2.currentTime = sound1.currentTime + val;
	console.log("val: ", val, " t1: ", sound1.currentTime, " t2: ", sound2.currentTime);
	
}

function mute(){

	if(play)
	{
		sound1.pause();
		sound2.pause();
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


function loop(s){
	
	// if loop is supported, use it
	if (typeof s.loop == 'boolean')
	{
		s.loop = true;
	}
	
	// otherwise create own loop function by using an event listener
	else
	{
		s.addEventListener('ended', function() {
			this.currentTime = 0;
			this.play();
		}, false);
	}
}
init();