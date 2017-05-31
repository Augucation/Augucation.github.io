var wrapper = document.getElementById("matrix_wrapper");
var input_scale = document.getElementById("input_scale");

var cells = [];

function addRow(size){
	var row = document.createElement("div");
	row.className = "matrix_row";
	
	for (var i = 0; i < size; i++){
		row.appendChild(addCell());
	}
	
	return row;
}

function addCell(){
	var cell = document.createElement("input");
	cell.type = "text";
	cell.step = 1;
	cell.className = "cell no-spin textfield";
	cell.onkeypress = function(event) {return validateCellKeyPress(event.charCode);};
	
	cells.push(cell);
	
	return cell;
}

function createGUIMatrix(size, parent){
	for (var i = 0; i < size; i++){
		wrapper.appendChild(addRow(size));
	}
}

function validateCellKeyPress(charCode){
	
	return ( charCode >= 48 && charCode <= 57 	// numbers
		  //|| charCode >= 96 && charCode <= 105 	// numpad   interferiert mit Buchstaben! :(
		  || charCode == 8 						// backspace
		  || charCode == 9						// tab
		  || charCode == 0						// tab
		  || charCode == 45						// minus
		  );
		 
}

function fillMatrix(filter){
	for (var i = 0; i < cells.length; i++){
		cells[i].value = filter.mask[i];
	}
	
	input_scale.value = filter.scale;
}

function readMatrix(){
	var data = [];
	for (var i = 0; i < cells.length; i++){
		data.push(cells[i].value);
	}
	
	var scale = input_scale.value;
	Filters.User = new Filter("user", data, scale);
	
	return Filters.User;
}

function manageScaleField(){
	
	input_scale.type = "text";
	input_scale.step = 1;
	input_scale.className = "no-spin textfield";
	input_scale.onkeypress = function(event) {return validateCellKeyPress(event.charCode);};
	
	input_scale.offsetWidth = cells[0].offsetWidth;
	input_scale.height = cells[0].height;
	
	console.log(cells[0].offsetWidth);
}

createGUIMatrix(5, wrapper);
manageScaleField();