var delay,
		play = false,
		muteBtn = document.getElementById("muteBtn"),
		img_soundoff = "url('https://upload.wikimedia.org/wikipedia/commons/3/3f/Mute_Icon.svg')",
		img_soundon = "url('https://upload.wikimedia.org/wikipedia/commons/2/21/Speaker_Icon.svg')",
		loaded = false,
		loading_span,
		span_high,
		span_low,
		check_high,
		check_low,
		radios,
		context,
		filter,
		source,
		sound,
		high_attached,
		low_attached,
		highPassFilter,
		lowPassFilter;

function init(){
	findElements();
	//createAudioContext();
	createSound();
	createFilters();
	//createFilter();
	//loop(sound);
}

function createAudioContext(){
	window.addEventListener('load', init, false);
	function init() {
	  try {
	    // Fix up for prefixing
	    window.AudioContext = window.AudioContext||window.webkitAudioContext;
	    context = new AudioContext();
	  }
	  catch(e) {
	    alert('Web Audio API is not supported in this browser');
	  }
	}
}

function createSound(){
	//sound = new Audio('../../../resources/audio/original.wav');
	sound = new Pizzicato.Sound('../../../resources/audio/original.wav', function() {finishedLoading();});
	sound.loop = true;
}

function finishedLoading(){
	loading_span.style.visibility = "hidden";
	loaded = true;
}

function createFilters(){
	highPassFilter = new Pizzicato.Effects.HighPassFilter({
		frequency: 2000,
		peak: 10
	});

	lowPassFilter = new Pizzicato.Effects.LowPassFilter({
		frequency: 400,
		peak: 10
	});
}

function createFilter(){
	context = new AudioContext(); //webkitAudioContext
	source = context.createMediaElementSource(document.getElementsByTagName('audio')[0]);
	source.autoplay = false;

	filter = context.createBiquadFilter();
	filter.type = filter.LOWPASS;
	filter.frequency.value = 100;

	// Connect source to filter, filter to destination.
	source.connect(filter);
	filter.connect(context.destination);
	// Play!
	source.loop = true;
}

function findElements(){
	span_high = document.getElementById("span_high");
	span_low = document.getElementById("span_low");
	check_high = document.getElementById("high");
	check_low = document.getElementById("low");
	loading_span = document.getElementById("loading");
}

function mute(){

	if(!loaded)
		return;

	if(play)
	{
		sound.pause();
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

function check(id){

	if(id == "low"){
		if(check_low.checked)
			sound.addEffect(lowPassFilter);
		else
			sound.removeEffect(lowPassFilter);
	}
	else if(id == "high"){
		if(check_high.checked)
			sound.addEffect(highPassFilter);
		else
			sound.removeEffect(highPassFilter);
	}

	sound.pause();
	setTimeout(function(){if(play) sound.play();}, 1000);


}

function setFrequency(id, val){
		if(id == "slider_high"){
			highPassFilter.frequency = parseInt(val);
			span_high.innerHTML = val + "HZ";
		}
		else if(id == "slider_low"){
			lowPassFilter.frequency = parseInt(val);
			span_low.innerHTML = val + "HZ";
		}
}

init();
