var bitCodeList = document.getElementById("bitCodeList");
var c = document.getElementById("myCanvas");		
var ctx = c.getContext("2d");

////////////////////////////////////////////////////////DRAW///////////////////////////////////////////////////////////////////

// get colors from css
var bodyStyles = window.getComputedStyle(document.body);
var dark_red = bodyStyles.getPropertyValue('--dark_red');
var blue = bodyStyles.getPropertyValue('--blue');

var toppel = 287; 
var bottom = 603; 
var leftestLine = 226;
var rightestLine = 860;

var discOffset = 10;
var quantOffset = 30;

var discWidth = rightestLine - leftestLine;
var quantHeight = bottom - toppel;

// discretisisation and quantization
var disc = 1//;10; // 5-15
var quant = 4; // 2, 4, 8	// Note: this variable contains the number of quant steps, not of bits

var disc_min = 5;
var disc_max = 15;
var quant_min = 1; //Note: this time, the number of bits is stored
var quant_max = 3;


// stores all possible digital codes of the signal, depending von disc and quant
var digitalSignals;

var digitalSpan = document.getElementById("digital_signal");

addListeners();
//initializeDigitalSignals();
drawNew();
//showDigitalSignal();
	
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
	
function drawNew(){
	ctx.clearRect(0, 0, c.width, c.height);
	//drawDiscLines();
}
		
////////////////////////////////////////////////////////SLIDER///////////////////////////////////////////////////////////////////

function addListeners(){
	slider_disc = document.getElementById("rA");
	slider_disc.addEventListener("input", function(e){slider_input("disc", "slider", this.value);});
	
	text_disc = document.getElementById("sA");
	text_disc.addEventListener("keypress", function(e){slider_input("disc", "text", this.value, e);});
	text_quant = document.getElementById("sB");
	
	text_disc.addEventListener("keydown", function(e){validateInput(e);});
	
	slider_disc.value = disc;
	
	text_disc.value = disc;
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
	
	if(discOrQuant == "disc" && (val == 2 || val == 4 || val == 8 || val == 12 || val == 13 || val == 16)){
		window["text_disc"].value = val;
		sample_rate = parseInt(val);
		sampleFunction();
	}
	
	/*
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
	*/
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


///////////////////////////////////////////////////// 1_57 specific /////////////////////////////////////////////////////////////	
// manually collected data points:
var sample_data = new Array(16); // 2, 1, 0.5, 0.25 * f_max
var sample_points = new Array(4); // actually nearly the same as sample_data but a bit different because the smoothing function goes crazy and needs slightly other points than the real ones to look good
var sample_rate = 16; //2-17 //0; // index in sample_data

var sample_points_new = new Array(16); //2-17

// curve's distance: 796 - 228 = 568;

for(var i = 0; i <= sample_rate; i++)
{
	//console.log((228) + ((796 - 228) / sample_rate * i), "\n");
	// 2, 4, 8, 12, 13, 16
}

// 2
sample_points_new[0] = [
	
	[228, 445],
	[512, 445],
	[796, 445],
];

// 3
sample_points_new[1] = [
	
	[228, 445],
	[417, 590],
	[607, 299],
	[796, 445],
];

// 4
sample_points_new[2] = [

	[228, 445],
	[370, 445],
	[512, 445],
	[654, 445],
	[796, 445],

];

// 5
sample_points_new[3] = [

	[228, 445],
	[342, 302],
	[455, 556],
	[569, 330],
	[682, 580],
	[796, 455],

];

// 6
sample_points_new[4] = [
	
	[228, 445],
	[323, 298],
	[417, 590],
	[512, 445],
	[607, 299],
	[701, 590],
	[796, 445],
];
 
// 7
sample_points_new[5] = [
	
	[228, 445],
	[309, 343],
	[390, 560],
	[471, 598],
	[553, 292],
	[634, 324],
	[715, 546],
	[796, 445],

]; 
 
// 8 
sample_points_new[6] = [

	[228, 445],
	[299, 352],
	[370, 445],
	[441, 535],
	[512, 445],
	[583, 352],
	[654, 445],
	[725, 535],
	[796, 445],

];

// 9
sample_points_new[7] = [
	
	[228, 445],
	[291, 348],
	[354, 346],
	[417, 590],
	[480, 594],
	[544, 298],
	[607, 300],
	[670, 536],
	[733, 538],
	[796, 445],
];

// 10
sample_points_new[8] = [

	[228, 445],
	[285, 334],
	[342, 304],
	[398, 584],
	[455, 558],
	[512, 445],
	[569, 332],
	[626, 302],
	[682, 580],
	[739, 552],
	[796, 445],
	
];

// 11
sample_points_new[9] = [

	[228, 445],
	[280, 312],
	[331, 292],
	[383, 530],
	[434, 540],
	[486, 582],
	[538, 312],
	[589, 350],
	[641, 356],
	[693, 595],
	[744, 572],
	[796, 445],

]; 

// 12
sample_points_new[10] = [

	
	[228, 445],
	[275, 298],
	[323, 298],
	[370, 445],
	[417, 592],
	[465, 590],
	[512, 445],
	[559, 298],
	[607, 298],
	[654, 445],
	[701, 592],
	[749, 586],
	[796, 445]
	
];

// 13
sample_points_new[11] = [
	[228, 445],
	[272, 295],
	[315, 320],
	[359, 370],
	[403, 593],
	[446, 539],
	[490, 571],
	[534, 325],
	[578, 350],
	[621, 293],
	[665, 510],
	[708, 575],
	[752, 591],
	[796, 445]
];

// 14
sample_points_new[12] = [

	[228, 445],
	[269, 292],
	[309, 344],
	[350, 326],
	[390, 560],
	[431, 546],
	[471, 598],
	[512, 445],
	[553, 292],
	[593, 344],
	[634, 322],
	[674, 556],
	[715, 546],
	[755, 596],
	[796, 445],

];

// 15
sample_points_new[13] = [

	[228, 445],
	[266, 292],
	[304, 350],
	[342, 302],
	[379, 510],
	[417, 592],
	[455, 558],
	[494, 558],
	[531, 336],
	[569, 328],
	[607, 300],
	[645, 376],
	[682, 580],
	[720, 538],
	[758, 596],
	[796, 445],

];

// 16
sample_points_new[14] = [
	
	[228, 445],
	[264, 292],
	[299, 352],
	[335, 292],
	[370, 445],
	[406, 596],
	[441, 537],
	[477, 596],
	[512, 445],
	[548, 292],
	[583, 352],
	[619, 292],
	[654, 445],
	[690, 596],
	[725, 537],
	[761, 596],
	[796, 445]
	
];

// 17
sample_points_new[15] = [
	
	[228, 445],
	[261, 294],
	[295, 352],
	[328, 292],
	[362, 390],
	[395, 578],
	[428, 555],
	[462, 584],
	[495, 552],
	[529, 346],
	[562, 304],
	[596, 339],
	[629, 308],
	[662, 494],
	[696, 596],
	[729, 535],
	[763, 595],
	[796, 445],

];

// 17 DEPRECATED einer zu wenig
/*
sample_points_new[15] = [

	[228, 445],
	[267, 293],
	[298, 352],
	[332, 293],
	[375, 445],
	[410, 596],
	[441, 537],
	[474, 596],
	[514, 445],
	[552, 293],
	[583, 352],
	[617, 293],
	[655, 445],
	[694, 596],
	[726, 537],
	[759, 596],
	[796, 445],
];
*/

sample_points[0] = [

	[230, 445],
	[267, 293],
	[298, 352],
	[332, 293],
	[375, 445],
	[410, 596],
	[441, 537],
	[474, 596],
	[514, 445],
	[552, 293],
	[583, 352],
	[617, 293],
	[655, 445],
	[694, 596],
	[726, 537],
	[759, 596],
	[798, 445],
];

sample_points[1] = [

	[230, 445],
	[298, 352],
	[375, 445],
	[441, 537],
	[514, 445],
	[583, 352],
	[655, 445],
	[726, 537],
	[798, 445],
];

sample_points[2] = [

	[298, 352],
	[583, 352],
]

// 2 * f_max
sample_data[0] = [

	[230, 445],
	[255, 310],
	[294, 347],
	[328, 298],
	[370, 445],
	[415, 596],
	[444, 538],
	[476, 596],
	[514, 445],
	[550, 295],
	[581, 352],
	[610, 295],
	[655, 445],
	[700, 593],
	[732, 540],
	[770, 583],
	[798, 445],
];

// 1 * f_max
sample_data[1] = [

	[230, 445],
	[288, 354],
	[370, 445],
	[447, 537],
	[514, 445],
	[578, 352],
	[655, 445],
	[735, 535],
	[795, 455],
];

// 0.5 * f_max, um f_max verschoben (p. 60)
sample_data[2] = [

	[230, 354],
	[288, 354],
	[578, 354],
	[800, 354]
];


sample_data[11] = [
	[228, 445],
	[272, 295],
	[315, 320],
	[359, 370],
	[403, 593],
	[446, 539],
	[490, 571],
	[534, 325],
	[578, 350],
	[621, 293],
	[665, 510],
	[708, 575],
	[752, 591],
	[796, 445]
];

var smooth_data;
var smoothed_data = new Array();
//calcSmoothData();
sampleFunction();

function calcSmoothData(){
	
	var steps = 10;
	
	for(var i = 0; i < sample_points_new.length; i++)
	{
		for(var j = 0; j < steps; j++)
		{
			smoothed_data[i][j] = smooth_data(j * 1/steps);
		}
	}
}

function sampleFunction(){
	
	ctx.clearRect(0, 0, c.width, c.height);
	
	smoothFunction();
	
	drawSamplingPoints();
	drawFunction();
}

function smoothFunction(){
	smoothConfig = {
		method: 'lanczos',
		clip: 'mirror',
		lanczosFilterSize: 10,
		cubicTension: 0.1,
		sincFilterSize: 4000,
		sincWindow: function(x) { return 1; }
	};
	
	//smooth_data = Smooth(sample_data[sample_rate + 2 ], smoothConfig);
	if(sample_rate < 16)
		smooth_data = Smooth(sample_points_new[sample_rate - 2 ], smoothConfig);
	else
		smooth_data = Smooth(sample_data[0], smoothConfig);	// draw perfect curve
}

function drawFunction(){
	
	ctx.beginPath();
	ctx.moveTo(smooth_data(0)[0], smooth_data(0)[1]);
	//ctx.moveTo(smooth_data(0)[0], smoothed_data[[1]);
	for (var i = 0; i < sample_data[0].length * 10; i++){
			ctx.lineTo(smooth_data(i * 0.1)[0], smooth_data(i * 0.1)[1]);
	}
	ctx.lineWidth = 5;
	ctx.strokeStyle = "blue";
	ctx.stroke();
}

function drawSamplingPoints(){
	
	ctx.beginPath();
	for (var i = 0; i < sample_points_new[sample_rate - 2].length; i++)
	{
		ctx.moveTo(sample_points_new[sample_rate-2][i][0], sample_points_new[sample_rate-2][i][1]);
		ctx.lineTo(sample_points_new[sample_rate-2][i][0], 445);
	}
	ctx.lineWidth = 3;
	ctx.strokeStyle = "black";
	ctx.stroke();
}
		
function samplingTheorem(){
	sampleFunction();
	
}