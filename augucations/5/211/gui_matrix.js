function matrix(wrapper, size){

	this.wrapper = wrapper;
	this.size = size;
	
	var cells = [];
	
	var validateCellKeyPress = function(charCode){
		
		return ( charCode >= 48 && charCode <= 57 	// numbers
			  //|| charCode >= 96 && charCode <= 105 	// numpad   interferiert mit Buchstaben! :(
			  || charCode == 8 						// backspace
			  || charCode == 9						// tab
			  || charCode == 0						// tab
			  || charCode == 45						// minus
			  );
			 
	};

	this.addRow = function (size){
		var row = document.createElement("div");
		row.className = "matrix_row";
		
		for (var i = 0; i < size; i++){
			row.appendChild(this.addCell());
		}
		
		return row;
	};

	this.addCell = function(){
		var cell = document.createElement("input");
		cell.type = "text";
		cell.readOnly = true;
		cell.step = 1;
		cell.className = "cell no-spin textfield";
		cell.onkeypress = function(event) {return validateCellKeyPress(event.charCode);};
		
		cells.push(cell);
		
		return cell;
	};

	this.createGUIMatrix = function(parent, size){
		for (var i = 0; i < size; i++){
			this.wrapper.appendChild(this.addRow(size));
		}
	};

	this.fillMatrix = function(data){
		for (var i = 0; i < cells.length; i++){
			cells[i].value = data[i];
		}
	};

	this.readMatrix = function(){
		var data = [];
		for (var i = 0; i < cells.length; i++){
			data.push(cells[i].value);
		}
		
		var scale = input_scale.value;
		Filters.User = new Filter("user", data, scale);
		
		return Filters.User;
	};
	
	this.createGUIMatrix(this.wrapper, this.size);
}