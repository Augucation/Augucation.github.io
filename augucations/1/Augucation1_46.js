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

// stores all possible digital codes of the signal, depending von disc and quant
var digitalSignals;

addListeners();
initializeDigitalSignals();
drawNew();
	
function initializeDigitalSignals(){
	
	//digitalSignals[discIdx][quantIdx] = signal as array
	digitalSignals = new Array(11);	// 11 disc possibilities
	for(var i = 0; i < digitalSignals.length; i++){
		digitalSignals[i] = new Array(3); // 3 bit possibilities
	}
	
	// all disc possibilities, 1 bit
	digitalSignals[0][0]  = ["0", "0", "0", "1", "1"];
	digitalSignals[1][0]  = ["0", "0", "0", "0", "1", "1"];
	digitalSignals[2][0]  = ["0", "0", "0", "0", "1", "1", "1"];
	digitalSignals[3][0]  = ["0", "0", "0", "0", "1", "1", "1", "1"];
	digitalSignals[4][0]  = ["0", "0", "0", "0", "0", "1", "1", "1", "1"];
	digitalSignals[5][0]  = ["0", "0", "0", "0", "0", "1", "1", "1", "1", "1"];
	digitalSignals[6][0]  = ["0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1"];
	digitalSignals[7][0]  = ["0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1"];
	digitalSignals[8][0]  = ["0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1"];
	digitalSignals[9][0]  = ["0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1"];
	digitalSignals[10][0] = ["0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1"];
	
	// all disc possibilities, 2 bits
	digitalSignals[0][1]  = ["00", "01", "01", "10", "10"];
	digitalSignals[1][1]  = ["00", "01", "01", "00", "10", "10"];
	digitalSignals[2][1]  = ["00", "01", "01", "01", "10", "10", "10"];
	digitalSignals[3][1]  = ["00", "01", "01", "01", "11", "10", "10", "10"];
	digitalSignals[4][1]  = ["00", "01", "01", "01", "00", "10", "10", "10", "10"];
	digitalSignals[5][1]  = ["00", "01", "01", "01", "01", "11", "10", "10", "10", "10"];
	digitalSignals[6][1]  = ["00", "01", "01", "01", "01", "00", "10", "10", "10", "10", "11"];
	digitalSignals[7][1]  = ["00", "01", "01", "01", "01", "00", "11", "10", "10", "10", "10", "11"];
	digitalSignals[8][1]  = ["00", "01", "01", "01", "01", "01", "00", "10", "10", "10", "10", "10", "11"];
	digitalSignals[9][1]  = ["00", "01", "01", "01", "01", "01", "00", "11", "10", "10", "10", "10", "10", "11"];
	digitalSignals[10][1] = ["00", "01", "01", "01", "01", "01", "10", "00", "10", "10", "10", "10", "10", "10", "11"];
	
	// all disc possibilities, 3 bits
	digitalSignals[0][2]  = ["000", "011", "010", "101", "100"];
	digitalSignals[1][2]  = ["000", "011", "011", "000", "100", "100"];
	digitalSignals[2][2]  = ["000", "011", "011", "010", "101", "100", "100"];
	digitalSignals[3][2]  = ["000", "010", "011", "001", "101", "100", "100", "101"];
	digitalSignals[4][2]  = ["000", "010", "010", "010", "001", "101", "100", "100", "101"];
	digitalSignals[5][2]  = ["000", "010", "011", "011", "010", "111", "101", "100", "100", "101"];
	digitalSignals[6][2]  = ["000", "010", "011", "011", "010", "001", "101", "100", "100", "100", "110"];
	digitalSignals[7][2]  = ["000", "010", "011", "011", "011", "001", "110", "101", "100", "100", "101", "110"];
	digitalSignals[8][2]  = ["000", "010", "011", "011", "011", "010", "000", "101", "100", "100", "100", "101", "111"];
	digitalSignals[9][2]  = ["000", "010", "011", "011", "011", "010", "001", "110", "101", "100", "100", "100", "101", "111"];
	digitalSignals[10][2] = ["000", "010", "011", "011", "011", "011", "010", "000", "101", "100", "100", "100", "100", "101", "111"];
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
slider_disc.addEventListener("input", function(e){slider_input("disc", this.value);});
slider_disc = document.getElementById("rB");
slider_disc.addEventListener("input", function(e){slider_input("quant", Math.pow(2, this.value));});
}

function slider_input(discOrQuant, val){
	window[discOrQuant] = parseInt(val);
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
		//var bitCode = i.toString(2); // convert to binary
		var bitCode = calcBitcode(i);
		bitCode = addLeadingZeros(bitCode);
		bitCodes[i].textContent = bitCode;
		bitCodeList.appendChild(bitCodes[i]);
	}			
}

function calcBitcode(i){
	var bit;
	if(i < quant / 2)
		bit = quant / 2 - i - 1;
	else
		bit = quant - i + (quant / 2 - 1); // it just works. nobody knows why...
	return bit.toString(2);
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
	//console.log(digitalSignals[disc - 5][Math.log2(quant) - 1]);
}