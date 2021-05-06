var bitCodeList = document.getElementById("bitCodeList");
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");


var radios = document.getElementsByName("type");

////////////////////////////////////////////////////////DRAW///////////////////////////////////////////////////////////////////

// get colors from css
var bodyStyles = window.getComputedStyle(document.body);
var dark_red = bodyStyles.getPropertyValue('--dark_red');
var blue = bodyStyles.getPropertyValue('--blue');
var green = bodyStyles.getPropertyValue('--green');

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
var quant = 16; // 2, 4, 8	// Note: this variable contains the number of quant steps, not of bits

var disc_min = 5;
var disc_max = 15;
var quant_min = 1; //Note: this time, the number of bits is stored
var quant_max = 3;

var mode = "pcm"; //"dpcm"

// stores all possible digital codes of the signal, depending von disc and quant
var digitalSignals;

//var greenDotsY = [425, 330, 275, 275, 330, 485, 582, 635, 635, 582]; // 3bits
//var dpcm_data = ["100", "10", "01", "00", "01", "11", "10", "01", "00", "01"]; // 3bits

var greenDotsY = [440, 314, 265, 265, 340, 492, 595, 645, 620, 567];
var pcm_data = ["1000", "1101", "1111", "1111", "1100", "0110", "0010", "0000", "0001", "0011"];
var dpcm_data = ["1000", "0101", "0010", "0000", "1011", "1110", "1100", "1010", "0001", "0010"];

var digitalSpan = document.getElementById("digital_signal");

//addListeners();
manageRadioButtons();
initializeDigitalSignals();
drawNew();
drawDeltaMax();
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
	digitalSignals[5][2]  = ["100", "110", "111", "111", "110", "011", "001", "000", "000", "001"]; //PCM
	digitalSignals[6][2]  = ["100", "110", "111", "111", "110", "101", "001", "000", "000", "000", "010"];
	digitalSignals[7][2]  = ["100", "110", "111", "111", "111", "101", "010", "001", "000", "000", "001", "010"];
	digitalSignals[8][2]  = ["100", "110", "111", "111", "111", "110", "100", "001", "000", "000", "000", "001", "011"];
	digitalSignals[9][2]  = ["100", "110", "111", "111", "111", "110", "101", "010", "001", "000", "000", "000", "001", "011"];
	digitalSignals[10][2] = ["100", "110", "111", "111", "111", "111", "110", "100", "001", "000", "000", "000", "000", "001", "011"];
}

function drawDiscLines(){

	var discSpace = discWidth / (disc + 1);

	for(i = 1; i < disc + 1; i++)
	{
		ctx.beginPath();
		ctx.moveTo(leftestLine + discSpace * i, toppel - discOffset * 1.1); // offset and offset * 1.1 is just pi times thumb
		ctx.lineTo(leftestLine + discSpace * i, bottom + discOffset);		// to draw the lines a bit longer
		ctx.strokeStyle = dark_red;
		ctx.lineWidth = 1;
		ctx.stroke();
		point(leftestLine + discSpace * (i-1), greenDotsY[i-1], 7, dark_red);
	}
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
	ctx.lineWidth = 1;
	ctx.stroke();

	createQuantBitcodes();
}

function drawNew(){
	ctx.clearRect(0, 0, c.width, c.height);
	drawQuantLines();
	drawDiscLines();
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

	// new: changed signs, hardcoded
	var codes = new Array(new Array());
	codes[0] = ["1", "0"];
	codes[1] = ["11", "10", "01", "00"]
	codes[2] = ["111", "110", "101", "100", "011", "010", "001", "000"];
	codes[3] = ["1111", "1110", "1101", "1100", "1011", "1010", "1001", "1000", "0111", "0110", "0101", "0100", "0011", "0010", "0001", "0000"];

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

	var data = mode == "pcm" ? pcm_data : dpcm_data;

	// delete old digits
	digitalSpan.innerHTML = '';

	var digits = new Array(disc);
	for(var i = 0; i < digits.length; i++){
		digits[i] = document.createElement("span");
		digits[i].className = i == 0 ? "digital first" : "digital _" + disc;
		//digits[i].textContent = digitalSignals[disc - 5][Math.log2(quant) - 1][i];
		digits[i].textContent = data[i];
		digitalSpan.appendChild(digits[i]);
	}
}

function drawDeltaMax(){
		if(mode == "pcm"){
			drawNew();
			return;
		}

		point(451, 340, 3.5, green);
		point(462, 340, 3.5, green);
		point(473, 340, 2.5, green);

		ctx.beginPath();
		ctx.moveTo(473, 340);
		ctx.lineTo(473, 492);
		ctx.strokeStyle = green;
		ctx.lineWidth = 5;
		ctx.stroke();

		point(473, 492, 2.5, green);
		point(484, 492, 3.5, green);
		point(495, 492, 3.5, green);

		ctx.font = "30px Arial";
		ctx.fillStyle = green;
		ctx.fillText("\u0394 max", 490, 400);
}

function point(x, y, r, c){
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI, true);
	ctx.fillStyle = c;
  ctx.fill();
}

function manageRadioButtons(){
	for(var i = 0; i < radios.length; i++){
		radios[i].onclick = function()
		{
			setType(this.id);
		}
	}
}

function setType(id){
	mode = id;
	showDigitalSignal();
	drawDeltaMax();
}
