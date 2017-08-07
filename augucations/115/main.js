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
		highPassFilter1,
		highPassFilter2,
		highPassFilter3,
		highPassFilter4,
		highPassFilter5,
		lowPassFilter,
		lowPassFilter1,
		lowPassFilter2,
		lowPassFilter3,
		lowPassFilter4,
		lowPassFilter5;

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
	
	highPassFilter1 = highPassFilter;
	highPassFilter2 = highPassFilter;
	highPassFilter3 = highPassFilter;
	highPassFilter4 = highPassFilter;
	highPassFilter5 = highPassFilter;

	
	lowPassFilter = new Pizzicato.Effects.LowPassFilter({
		frequency: 22050,
		peak: 0.0001,
		mix: 1
	});
	
	lowPassFilter1 = lowPassFilter;
	lowPassFilter2 = lowPassFilter;
	lowPassFilter3 = lowPassFilter;
	lowPassFilter4 = lowPassFilter;
	lowPassFilter5 = lowPassFilter;
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
			sound.addEffect(lowPassFilter1);
			sound.addEffect(lowPassFilter2);
			sound.addEffect(lowPassFilter3);
			sound.addEffect(lowPassFilter4);
			sound.addEffect(lowPassFilter5);
			low_attached = true;
		}
		else{
			sound.removeEffect(lowPassFilter);
			sound.removeEffect(lowPassFilter1);
			sound.removeEffect(lowPassFilter2);
			sound.removeEffect(lowPassFilter3);
			sound.removeEffect(lowPassFilter4);
			sound.removeEffect(lowPassFilter5);
			low_attached = false;
		}
	}
	else if(id == "high"){
		if(check_high.checked){
			sound.addEffect(highPassFilter);
			sound.addEffect(highPassFilter1);
			sound.addEffect(highPassFilter2);
			sound.addEffect(highPassFilter3);
			sound.addEffect(highPassFilter4);
			sound.addEffect(highPassFilter5);
			high_attached = true;
		}
		else{
			sound.removeEffect(highPassFilter);
			sound.removeEffect(highPassFilter1);
			sound.removeEffect(highPassFilter2);
			sound.removeEffect(highPassFilter3);
			sound.removeEffect(highPassFilter4);
			sound.removeEffect(highPassFilter5);
			high_attached = false;
		}
	}

	sound.pause();
	setTimeout(function(){if(play) sound.play(); play = true;}, 1000);
}

function setFrequency(id, val){
		if(id == "slider_high"){
			highPassFilter.frequency = parseInt(val);
			highPassFilter1.frequency = parseInt(val);
			highPassFilter2.frequency = parseInt(val);
			highPassFilter3.frequency = parseInt(val);
			highPassFilter4.frequency = parseInt(val);
			highPassFilter5.frequency = parseInt(val);
			span_high.innerHTML = val + "HZ";
		}
		else if(id == "slider_low"){
			lowPassFilter.frequency = parseInt(val);
			lowPassFilter1.frequency = parseInt(val);
			lowPassFilter2.frequency = parseInt(val);
			lowPassFilter3.frequency = parseInt(val);
			lowPassFilter4.frequency = parseInt(val);
			lowPassFilter5.frequency = parseInt(val);
			span_low.innerHTML = val + "HZ";
		}
}

init();
