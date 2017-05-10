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
	createSound();
	createFilters();
}

function createSound(){
	sound = new Pizzicato.Sound('../../../resources/audio/original.wav', function() {finishedLoading();});
	sound.loop = true;
}

function finishedLoading(){
	loading_span.style.visibility = "hidden";
	loaded = true;
}

function createFilters(){
	highPassFilter = new Pizzicato.Effects.HighPassFilter({
		frequency: 20,
		peak: 0.0001,
		mix: 0
	});

	lowPassFilter = new Pizzicato.Effects.LowPassFilter({
		frequency: 22050,
		peak: 0.0001,
		mix: 1
	});
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
		
		if(low_attached)
			sound.removeEffect(lowPassFilter);
		
		if(high_attached)
			sound.removeEffect(high_attached);
	}
	else
	{
		sound.play();
		play = true;
		muteBtn.style.backgroundImage = img_soundon;
		
		if(low_attached)
			sound.addEffect(lowPassFilter);
		
		if(high_attached)
			sound.addEffect(high_attached);
	}
}

function check(id){

	if(id == "low"){
		if(check_low.checked){
			sound.addEffect(lowPassFilter);
			low_attached = true;
		}
		else{
			sound.removeEffect(lowPassFilter);
			low_attached = false;
		}
	}
	else if(id == "high"){
		if(check_high.checked){
			sound.addEffect(highPassFilter);
			high_attached = true;
		}
		else{
			sound.removeEffect(highPassFilter);
			high_attached = false;
		}
	}

	sound.pause();
	setTimeout(function(){if(play) sound.play(); play = true;}, 1000);
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
