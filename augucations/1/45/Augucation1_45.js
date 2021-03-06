var bitCodeList = document.getElementById("bitCodeList");
var c = document.getElementById("myCanvas");		
var ctx = c.getContext("2d");

////////////////////////////////////////////////////////DRAW///////////////////////////////////////////////////////////////////

// get colors from css
var bodyStyles = window.getComputedStyle(document.body);
var dark_red = bodyStyles.getPropertyValue('--dark_red');
var blue = bodyStyles.getPropertyValue('--blue');

		var toppel = 251; 
var bottom = 657; 
var leftestLine = 150;
var rightestLine = 940;

var discOffset = 10;
var quantOffset = 35;

var discWidth = rightestLine - leftestLine;
var quantHeight = bottom - toppel;

// discretisisation and quantization
var disc = 10; // 5-15
var quant = 4; // 2, 4, 8	// Note: this variable contains the number of quant steps, not of bits

var disc_min = 5;
var disc_max = 15;
var quant_min = 1; //Note: this time, the number of bits is stored
var quant_max = 3;


// stores all possible digital codes of the signal, depending von disc and quant
var digitalSignals;

var digitalSpan = document.getElementById("digital_signal");

addListeners();
initializeDigitalSignals();
drawNew();
showDigitalSignal();
	
function initializeDigitalSignals(){
	
	//digitalSignals[discIdx][quantIdx] = signal as array
	digitalSignals = new Array(11);	// 11 disc possibilities
	for(var i = 0; i < digitalSignals.length; i++){
		digitalSignals[i] = new Array(3); // 3 bit possibilities
	}
	
	// all disc possibilities, 1 bit
	digitalSignals[0][0]  = ["1", "1", "1", "0", "0"];
	digitalSignals[1][0]  = ["1", "1", "1", "1", "0", "0"];
	digitalSignals[2][0]  = ["1", "1", "1", "1", "0", "0", "0"];
	digitalSignals[3][0]  = ["1", "1", "1", "1", "0", "0", "0", "0"];
	digitalSignals[4][0]  = ["1", "1", "1", "1", "1", "0", "0", "0", "0"];
	digitalSignals[5][0]  = ["1", "1", "1", "1", "1", "0", "0", "0", "0", "0"];
	digitalSignals[6][0]  = ["1", "1", "1", "1", "1", "1", "0", "0", "0", "0", "0"];
	digitalSignals[7][0]  = ["1", "1", "1", "1", "1", "1", "0", "0", "0", "0", "0", "0"];
	digitalSignals[8][0]  = ["1", "1", "1", "1", "1", "1", "1", "0", "0", "0", "0", "0", "0"];
	digitalSignals[9][0]  = ["1", "1", "1", "1", "1", "1", "1", "0", "0", "0", "0", "0", "0", "0"];
	digitalSignals[10][0] = ["1", "1", "1", "1", "1", "1", "1", "1", "0", "0", "0", "0", "0", "0", "0"];
	
	// all disc possibilities, 2 bits
	digitalSignals[0][1]  = ["10", "11", "11", "00", "00"];
	digitalSignals[1][1]  = ["10", "11", "11", "10", "00", "00"];
	digitalSignals[2][1]  = ["10", "11", "11", "11", "00", "00", "00"];
	digitalSignals[3][1]  = ["10", "11", "11", "11", "01", "00", "00", "00"];
	digitalSignals[4][1]  = ["10", "11", "11", "11", "10", "00", "00", "00", "00"];
	digitalSignals[5][1]  = ["10", "11", "11", "11", "11", "01", "00", "00", "00", "00"];
	digitalSignals[6][1]  = ["10", "11", "11", "11", "11", "10", "00", "00", "00", "00", "01"];
	digitalSignals[7][1]  = ["10", "11", "11", "11", "11", "10", "01", "00", "00", "00", "00", "01"];
	digitalSignals[8][1]  = ["10", "11", "11", "11", "11", "11", "10", "00", "00", "00", "00", "00", "01"];
	digitalSignals[9][1]  = ["10", "11", "11", "11", "11", "11", "10", "01", "00", "00", "00", "00", "00", "01"];
	digitalSignals[10][1] = ["10", "11", "11", "11", "11", "11", "10", "10", "00", "00", "00", "00", "00", "00", "01"];
	
	// all disc possibilities, 3 bits
	digitalSignals[0][2]  = ["100", "111", "110", "001", "000"];
	digitalSignals[1][2]  = ["100", "111", "111", "100", "000", "000"];
	digitalSignals[2][2]  = ["100", "111", "111", "110", "001", "000", "000"];
	digitalSignals[3][2]  = ["100", "110", "111", "110", "001", "000", "000", "001"];
	digitalSignals[4][2]  = ["100", "110", "111", "111", "101", "001", "000", "000", "001"];
	digitalSignals[5][2]  = ["100", "110", "111", "111", "110", "011", "001", "000", "000", "001"];
	digitalSignals[6][2]  = ["100", "110", "111", "111", "110", "101", "001", "000", "000", "000", "010"];
	digitalSignals[7][2]  = ["100", "110", "111", "111", "111", "101", "010", "001", "000", "000", "001", "010"];
	digitalSignals[8][2]  = ["100", "110", "111", "111", "111", "110", "100", "001", "000", "000", "000", "001", "011"];
	digitalSignals[9][2]  = ["100", "110", "111", "111", "111", "110", "101", "010", "001", "000", "000", "000", "001", "011"];
	digitalSignals[10][2] = ["100", "110", "111", "111", "111", "111", "110", "100", "001", "000", "000", "000", "000", "001", "011"];
}	
	
function drawDiscLines(){
	
	var discSpace = discWidth / (disc + 1); 
	
	ctx.beginPath();
	for(i = 1; i < disc + 1; i++)
	{
		ctx.moveTo(leftestLine + discSpace * i, toppel - discOffset * 1.1); // offset and offset * 1.1 is just pi times thumb
		ctx.lineTo(leftestLine + discSpace * i, bottom + discOffset);		// to draw the lines a bit longer
	}
	ctx.strokeStyle = dark_red;
	ctx.stroke();
}
	
function drawQuantLines(){
	var quantSpace = quantHeight / quant;
	
	var quantLines = quant + 1; //== 2 ? 0 : quant + 1; // draw one more line, because the middle line is on the x-axis
	
	ctx.beginPath();
	for(i = 0; i < quantLines; i++)
	{
		ctx.moveTo(leftestLine, toppel + quantSpace * i);
		ctx.lineTo(rightestLine - quantOffset, toppel + quantSpace * i); //offset is just pi times thumb
	}
	ctx.strokeStyle = blue;
	ctx.stroke();
	
	createQuantBitcodes();
}

function drawNew(){
	ctx.clearRect(0, 0, c.width, c.height);
	drawDiscLines();
	drawQuantLines();
}
		
////////////////////////////////////////////////////////SLIDER///////////////////////////////////////////////////////////////////

function addListeners(){
	slider_disc = document.getElementById("rA");
	slider_disc.addEventListener("input", function(e){slider_input("disc", "slider", this.value);});
	slider_quant = document.getElementById("rB");
	slider_quant.addEventListener("input", function(e){slider_input("quant", "slider", Math.pow(2, this.value));});
	
	text_disc = document.getElementById("sA");
	text_disc.addEventListener("keypress", function(e){slider_input("disc", "text", this.value, e);});
	text_quant = document.getElementById("sB");
	text_quant.addEventListener("keypress", function(e){slider_input("quant", "text", Math.pow(2, this.value), e);});

	text_disc.addEventListener("keydown", function(e){validateInput(e);});
	text_quant.addEventListener("keydown", function(e){validateInput(e);});
	
	slider_disc.value = disc;
	slider_quant.value = Math.log2(quant);
	
	text_disc.value = disc;
	text_quant.value = Math.log2(quant);
}

function validateInput(e){
	if((e.keyCode < 48 || e.keyCode > 57) && e.keyCode != 13 && e.keyCode != 8 && e.keyCode != 46 && e.keyCode != 37 && e.keyCode != 39)
	{
		e.preventDefault();      // firefox
		e.returnValue = false;   // chrome
	}
}

function slider_input(discOrQuant, sliderOrText, val, e){
	
	var valu = parseInt(val);
	
	// update text value
	if(sliderOrText == "slider")
	{
		window["text_" + discOrQuant].value = discOrQuant == "disc" ? val : Math.log2(val);
		window[discOrQuant] = parseInt(val);
	}
	else if(sliderOrText == "text")
	{
		if(e.keyCode != 13) // enter key
		{ 
			return;
		}
				
		var v = parseInt(window["text_" + discOrQuant].value);
		console.log("v: ", v);
		
		// check for invalid values
		if(isNaN(v) 
			|| v < window[discOrQuant + "_min"] 
			|| v > window[discOrQuant + "_max"]
			|| (val + "").includes(',')
			|| (val + "").includes('.')){
			window["text_" + discOrQuant].value = window["slider_" + discOrQuant].value;
			window[discOrQuant]  = window["slider_" + discOrQuant].value;
			return;
		}
		
		window[discOrQuant] = valu; 
		window["slider_" + discOrQuant].value = discOrQuant == "disc" ? valu : Math.log2(valu);
	}
	
	drawNew();
	showDigitalSignal();
}
		
function createQuantBitcodes(){
	
	// delete old bitCodes
	bitCodeList.innerHTML = '';
				
	// create new ones
	bitCodes = new Array(quant);
	for(var i = 0; i < quant; i++){
		bitCodes[i] = document.createElement("li");
		bitCodes[i].className = "bitCode _" + quant;
		var bitCode = calcBitcode(i);
		//bitCode = addLeadingZeros(bitCode);
		bitCodes[i].textContent = bitCode;
		bitCodeList.appendChild(bitCodes[i]);
	}			
}

function calcBitcode(i){
	
	/* old: calculation
	var bit;
	if(i < quant / 2)
		bit = quant / 2 - i - 1;
	else
		bit = quant - i + (quant / 2 - 1); // it just works. nobody knows why...
	return bit.toString(2);
	*/
	
	// new: changed signs, hardcoded
	console.log("i: ", i);
	var codes = new Array(new Array());
	codes[0] = ["1", "0"];
	codes[1] = ["11", "10", "01", "00"]
	codes[2] = ["111", "110", "101", "100", "011", "010", "001", "000"];
	
	return codes[Math.log2(quant) - 1][i];
}

function addLeadingZeros(b){
	
	var bit = b.toString();
	bitNum = Math.log2(quant); // calculate number of bits
	limit = bitNum - bit.length;
	for(var i = 0; i < limit; i++){
		bit = "0" + bit;
	}
	return bit;
}

function showDigitalSignal(){
		
	// delete old digits
	digitalSpan.innerHTML = '';
	
	var digits = new Array(disc);
	for(var i = 0; i < digits.length; i++){
		digits[i] = document.createElement("span");
		digits[i].className = i == 0 ? "digital first" : "digital _" + disc;
		digits[i].textContent = digitalSignals[disc - 5][Math.log2(quant) - 1][i];
		digitalSpan.appendChild(digits[i]);
	}
}