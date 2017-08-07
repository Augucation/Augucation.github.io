var time = 100,
	img = document.getElementById("point_container"),
	time_value_span = document.getElementById("time_value_span"),
	startstop_btn = document.getElementById("startstop_btn"),
	blinkerval,
	blinking = false,
	step = 1;

function main(){
}

function setTime(val){
	time = val;
	time_value_span.innerHTML = time + " ms";
		
	if(blinking){
		clearInterval(blinkerval);
		startTimer();
	}
}

function blink(){
	step++;
	if(step == 12) step = 1;
	
	img.style.backgroundImage = "url('frames/" + step + ".png";
}

function startTimer(){
	
	blinkerval = setInterval(function() {blink();}, time);
}

// called by startstop_btn
function startStop(){
	
	if(blinking)
		clearInterval(blinkerval)
	else
		startTimer();
	
	blinking = !blinking;
		
	startstop_btn.value = blinking ? "Stop" : "Start";
}

main();