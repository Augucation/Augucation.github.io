var Matrix = function(div, id, type){

    this.div = div;
    this.cells = [];
    this.id = id;
    this.type = type;

    self = this;

    this.init = function(){
        this.createMatrix();
        this.fillMatrix(data.d[this.id]);
    }

    this.createMatrix = function(){
            // clear content
            div.innerHTML = "";

            // create cell element
            var addCell = function(){
                var cell = document.createElement("div");
                cell.className = "cell";
                self.cells.push(cell);
                return cell;
            }

            // create row with 4 cells
            var addRow = function(){
                var row = document.createElement("row");
                row.className = "row";
                for (var i = 0; i < 4; i++){
                    row.appendChild(addCell());
                }
                return row;
            }

            // add 4 rows to matrix
            for (var i = 0; i < 4; i++){
                div.appendChild(addRow());
            }
    }

    this.fillMatrix = function(data){

        // non rotation matrices: fill with plain values
        if (!self.type.includes("rot")){
            for (var i = 0; i < self.cells.length; i++){
                self.cells[i].innerHTML = data[i];
            }
        }

        // rotation matrices: add sin and cos
        else if (self.type == "rotZ"){
            self.cells[0].innerHTML = "cos(" + data[0] + ")";
            self.cells[1].innerHTML = "-sin(" + data[1] + ")";
            self.cells[2].innerHTML = data[2];
            self.cells[3].innerHTML = data[3];

            self.cells[4].innerHTML = "sin(" + data[4] + ")";
            self.cells[5].innerHTML = "cos(" + data[5] + ")";
            self.cells[6].innerHTML = data[6];
            self.cells[7].innerHTML = data[7];

            self.cells[8].innerHTML = data[8];
            self.cells[9].innerHTML = data[9];
            self.cells[10].innerHTML = data[10];
            self.cells[11].innerHTML = data[11];

            self.cells[12].innerHTML = data[12];
            self.cells[13].innerHTML = data[13];
            self.cells[14].innerHTML = data[14];
            self.cells[15].innerHTML = data[15];
        }
        else if (self.type == "rotY"){
            self.cells[0].innerHTML = "cos(" + data[0] + ")";
            self.cells[1].innerHTML = data[1];
            self.cells[2].innerHTML = "sin(" + data[2] + ")";
            self.cells[3].innerHTML = data[3];

            self.cells[4].innerHTML = data[4];
            self.cells[5].innerHTML = data[5];
            self.cells[6].innerHTML = data[6];
            self.cells[7].innerHTML = data[7];

            self.cells[8].innerHTML = "-sin(" + data[8] + ")";
            self.cells[9].innerHTML = data[9];
            self.cells[10].innerHTML = "cos(" + data[10] + ")";
            self.cells[11].innerHTML = data[11];

            self.cells[12].innerHTML = data[12];
            self.cells[13].innerHTML = data[13];
            self.cells[14].innerHTML = data[14];
            self.cells[15].innerHTML = data[15];
        }
        else if (self.type == "rotX"){
            self.cells[0].innerHTML = data[0];
            self.cells[1].innerHTML = data[1];
            self.cells[2].innerHTML = data[2];
            self.cells[3].innerHTML = data[3];

            self.cells[4].innerHTML = data[4];
            self.cells[5].innerHTML = "cos(" + data[5] + ")";
            self.cells[6].innerHTML = "-sin(" + data[6] + ")";
            self.cells[7].innerHTML = data[7];

            self.cells[8].innerHTML = data[8];
            self.cells[9].innerHTML = "sin(" + data[9] + ")";
            self.cells[10].innerHTML = "cos(" + data[10] + ")";
            self.cells[11].innerHTML = data[11];

            self.cells[12].innerHTML = data[12];
            self.cells[13].innerHTML = data[13];
            self.cells[14].innerHTML = data[14];
            self.cells[15].innerHTML = data[15];
        }
    }

    this.init();
}
