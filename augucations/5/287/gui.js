var wrapper = document.getElementById("matrix_wrapper");

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
	cell.onkeypress = function(event) {return event.charCode >= 48 && event.charCode <= 57};
	
	return cell;
}

function createGUIMatrix(size, parent){
	for (var i = 0; i < size; i++){
		wrapper.appendChild(addRow(size));
	}
}

createGUIMatrix(5, wrapper);