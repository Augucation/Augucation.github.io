var bits = 2; // 2-4
var pairs, stream, memory = new Array(3);
var radios = document.getElementsByName("bit");

var code_pairs, code_stream, code_memory;

pairs = [
		"{1,10}, {0,11}, {0,11}, {0,01}, {1,11}, {1,11}, {1,10}, {0,11}, {0,10}, {1,11}, {1,01}",
		"{1,010}, {0,111}, {1,111}, {1,001}, {0,101}, {1,100}",
		"{1,0010}, {0,0111}, {1,1000}, {0,0101}, {1,0100}"
		];

stream = [
		"110011011001111111110011010111101",
		"101001111111100101011100",
		"1001000111110000010110100",
		];
		
memory = [33, 24, 25];

function findElements()
{
	code_pairs = document.getElementById("code_pairs");
	code_stream = document.getElementById("code_stream");
	code_memory = document.getElementById("code_memory");
}

function update()
{
	code_pairs.innerHTML = "Codierung (als Wertpaare)<br>" + pairs[bits-2];
	code_stream.innerHTML = "Codierung (als Bitstrom)<br>" + stream[bits-2];
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
manageRadioButtons();
