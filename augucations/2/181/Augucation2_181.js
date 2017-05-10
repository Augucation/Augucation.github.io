var 	delay,
		play = false,
		muteBtn = document.getElementById("muteBtn"),
		img_soundoff = "url('https://upload.wikimedia.org/wikipedia/commons/3/3f/Mute_Icon.svg')",
		img_soundon = "url('https://upload.wikimedia.org/wikipedia/commons/2/21/Speaker_Icon.svg')",
		span_chorus,
		span_flanging,
		loaded = false,
		loading_span,
		sound1,
		flanger,
		delay,
		effects = {CHORUS : 1, FLANGING : 2, NOTHING : 3},
		currentEffect = effects.NOTHING;


function init(){
	findElements();
	createSounds();
	manageRadioButtons();
}

function createSounds(){
	//sound1 = new Audio('../../../resources/audio/Chantar_short.ogg');
	//sound2 = new Audio('../../../resources/audio/Chantar_short.ogg');

	sound1 = new Pizzicato.Sound('../../../resources/audio/Chantar_short.ogg', function() {finishedLoading();});
	sound1.loop = true;

	flanger = new Pizzicato.Effects.Flanger({
		time: 0.45,
		speed: 0.5,
		depth: 0.1,
		feedback: 0.5,
	mix: 0.5
	});

    //sound1.addEffect(flanger);

	delay = new Pizzicato.Effects.Delay({
		  feedback: 0.5,
		  time: 0.4,
		  mix: 0.5
	});
}

function findElements(){
	span_chorus = document.getElementById("span_chorus");
	span_flanging = document.getElementById("span_flanging");
	loading_span = document.getElementById("loading");
}

function finishedLoading(){
	loading_span.style.visibility = "hidden";
	loaded = true;
}

function setDelay(id, val){

	if(id == "slider_chorus"){
		delay.time = parseFloat(val);
		span_chorus.innerHTML =  val * 1000 + " ms";
	}
	else if(id == "slider_flanging"){
		flanger.time = parseFloat(val);
		flanger.mix = parseFloat(val * 5);
		span_flanging.innerHTML =  val * 1000+ " ms";
	}
}

function setEffect(id){

	sound1.pause();

	// if nothing, add effect
	if(currentEffect == effects.NOTHING){
		if(id == "chorus"){
			sound1.addEffect(delay);
			currentEffect = effects.CHORUS;
				setTimeout(function(){if(play) sound1.play();}, 1000);
			return;
		}
		else if(id == "flanging"){
			sound1.addEffect(flanger);
			currentEffect = effects.FLANGING;
				setTimeout(function(){if(play) sound1.play();}, 1000);
			return;
		}
	}

	// if new effect is clicked, add it
	if(currentEffect == effects.CHORUS && id == "flanging"){
			sound1.removeEffect(delay);
			sound1.addEffect(flanger);
			currentEffect = effects.FLANGING;
				setTimeout(function(){if(play) sound1.play();}, 1000);
			return;
		}


	if(currentEffect == effects.FLANGING && id == "chorus"){
			sound1.removeEffect(flanger);
			sound1.addEffect(delay);
			currentEffect = effects.CHORUS;
				setTimeout(function(){if(play) sound1.play();}, 1000);
			return;
		}

		// if current effect is clicked, remove it
		if(currentEffect == effects.CHORUS && id == "chorus"){
			sound1.removeEffect(delay);
			currentEffect = effects.NOTHING;
			setTimeout(function(){if(play) sound1.play();}, 1000);
			return;
		}
		else if(currentEffect = effects.FLANGING && id == "flanging"){
			sound1.removeEffect(flanger);
			currentEffect = effects.NOTHING;
			setTimeout(function(){if(play) sound1.play();}, 1000);
			return;
		}
}

function mute(){

	if(!loaded)
		return;

	if(play)
	{
		sound1.pause();
    play = false;
		muteBtn.style.backgroundImage = img_soundoff;
	}
	else
	{
		sound1.play();
		play = true;
		muteBtn.style.backgroundImage = img_soundon;
	}
}

function manageRadioButtons(){
	$(function(){
	    $('input[name="type"]').click(function(){
	        var $radio = $(this);

	        // if this was previously checked
	        if ($radio.data('waschecked') == true)
	        {
	            $radio.prop('checked', false);
	            $radio.data('waschecked', false);
	        }
	        else
	            $radio.data('waschecked', true);

	        // remove was checked from other radios
	        $radio.siblings('input[name="type"]').data('waschecked', false);
	    });
	});
}

init();
