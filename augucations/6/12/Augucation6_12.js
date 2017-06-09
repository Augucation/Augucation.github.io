var time = 100,
	left_point = document.getElementById("left_point"),
	right_point = document.getElementById("right_point"),
	time_value_span = document.getElementById("time_value_span"),
	startstop_btn = document.getElementById("startstop_btn"),
	blinkerval,
	blinking = false;

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
	if(left_point.style.visibility == 'hidden'){
		left_point.style.visibility = 'visible';
		right_point.style.visibility = 'hidden';
	}
	else{
		left_point.style.visibility = 'hidden';
		right_point.style.visibility = 'visible';
	}
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