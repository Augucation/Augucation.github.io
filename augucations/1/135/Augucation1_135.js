var bits = 2; // 2-4
var codes, pairs, stream, memory = new Array(3);
var radios = document.getElementsByName("bit");

var code_bits, code_pairs, code_stream, code_memory;

codes = [
		["11", "000", "000", "0", "111", "111", "11", "000", "00", "111", "1"],
		["11", "0000000", "1111111", "1", "00000", "1111"],
		["11", "0000000", "11111111", "00000", "1111"]
		];

pairs = [
		["1", "10", "0", "11", "0", "11", "0", "01", "1", "11", "1", "11", "1", "10", "0", "11", "0", "10", "1", "11", "1", "01"],
		["1", "010", "0", "111", "1" ,"111", "1", "001", "0", "101", "1", "100"],
		["1", "0010", "0", "0111", "1", "1000", "0", "0101", "1", "0100"]
		];

stream = [
		["110", "011", "011", "001", "111", "111", "110", "011", "010", "111", "101"],
		["1010", "0111", "1111", "1001", "0101", "1100"],
		["10010", "00111", "11000", "00101", "10100"]
		];
		
memory = [33, 24, 25];

function findElements()
{
	code_bits = document.getElementById("code_bits");
	code_pairs = document.getElementById("code_pairs");
	code_stream = document.getElementById("code_stream");
	code_memory = document.getElementById("code_memory");
}

function update()
{
	// fill code_bits
	var code_spans = new Array();
	code_bits.innerHTML = "<br>";
	for(var i = 0; i < codes[bits-2].length; i++)
	{
		code_spans[i] = document.createElement("SPAN");
		code_spans[i].innerHTML = codes[bits-2][i];
		code_bits.appendChild(code_spans[i]);
	}
	
	// fill code_pairs
	var pairs_spans = new Array();
	code_pairs.innerHTML = "Codierung (als Wertpaare)<br>";
		
		// create brackets and comma
		var bracket_left = document.createElement("SPAN");
		bracket_left.innerHTML = "{";
		var bracket_right = document.createElement("SPAN");
		bracket_right.innerHTML = "}";
		var comma = document.createElement("SPAN");
		comma.innerHTML = ", ";
	
	for(var i = 0; i < codes[bits-2].length; i++)
	{
		pairs_spans[2 * i] = document.createElement("SPAN");
		pairs_spans[2 * i].innerHTML = pairs[bits-2][2 * i];
		pairs_spans[2 * i + 1] = document.createElement("SPAN");
		pairs_spans[2 * i + 1].innerHTML = pairs[bits-2][2 * i + 1];
		code_pairs.appendChild(bracket_left.cloneNode(true));
		code_pairs.appendChild(pairs_spans[2 * i]);
		code_pairs.appendChild(comma.cloneNode(true));
		code_pairs.appendChild(pairs_spans[2 * i + 1]);
		code_pairs.appendChild(bracket_right.cloneNode(true));
		if(i < codes[bits-2].length - 1) // no comma after the last one
			code_pairs.appendChild(comma.cloneNode(true));
	}
	
	// fill code_stream
	var stream_spans = new Array();
	code_stream.innerHTML = "Codierung (als Bitstrom)<br>";
		for(var i = 0; i < codes[bits-2].length; i++)
	{
		stream_spans[i] = document.createElement("SPAN");
		stream_spans[i].innerHTML = stream[bits-2][i];
		code_stream.appendChild(stream_spans[i]);
	}
	
	//fill code_memory
	code_memory.innerHTML = "Gesamtspeicherbedarf<br>" + memory[bits-2] + " Bit";
}

function manageRadioButtons()
{
	for(var i = 0; i < radios.length; i++){
		radios[i].onclick = function()
		{
			bits = parseInt(this.value);
			update();
		}
	}
		
}

findElements();
update();
manageRadioButtons();
