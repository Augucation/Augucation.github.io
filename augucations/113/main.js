
var play = false,
	muteBtn = document.getElementById("muteBtn"),
	img_soundoff = "url('https://upload.wikimedia.org/wikipedia/commons/3/3f/Mute_Icon.svg')",
	img_soundon = "url('https://upload.wikimedia.org/wikipedia/commons/2/21/Speaker_Icon.svg')",
	sounds = new Array(6),
	current_sound = 0,
	time = 0,
	radios = document.getElementsByName("bitrate");

	sounds[0] = new Audio('../../resources/audio/original8.mp3');
	sounds[1] = new Audio('../../resources/audio/original16.mp3');
	sounds[2] = new Audio('../../resources/audio/original32.mp3');
	sounds[3] = new Audio('../../resources/audio/original64.mp3');
	sounds[4] = new Audio('../../resources/audio/original96.mp3');
	sounds[5] = new Audio('../../resources/audio/original128.mp3');

function init(){
	manageRadioButtons();
	loop();
}

function mute(){

	if(play)
	{
		sounds[current_sound].pause();
		play = false;
		muteBtn.style.backgroundImage = img_soundoff;
	}
	else
	{
		sounds[current_sound].play();
		play = true;
		muteBtn.style.backgroundImage = img_soundon;
	}
}

function manageRadioButtons(){
	for(var i = 0; i < radios.length; i++){
		radios[i].onclick = function()
		{
			setBitrate(this.id);
		}
	}
}

function setBitrate(id){
	sounds[current_sound].pause();
	time = sounds[current_sound].currentTime;
	current_sound = id;
	sounds[current_sound].currentTime = time;
	sounds[current_sound].play();
}

function loop(){

	for(var i = 0; i < sounds.length; i++)
	{
		// if loop is supported, use it
		if (typeof sounds[i].loop == 'boolean')
		{
			sounds[i].loop = true;
		}

		// otherwise create own loop function by using an event listener
		else
		{
			sounds[i].addEventListener('ended', function() {
				this.currentTime = 0;
				this.play();
			}, false);
		}
	}
}

init();
