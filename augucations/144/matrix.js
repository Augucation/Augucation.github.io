var Matrix = function(div, id, size, type) {

    this.div = div;
    this.cells = [];
    this.id = id;
    this.size = size;
    this.type = type;

    self = this;

    this.init = function() {
        this.createMatrix();
        this.fillMatrix();
    }

    this.createMatrix = function() {
            // clear content
            div.innerHTML = "";

            // create cell element
            var addCell = function() {
                var cell = document.createElement("div");
                cell.className = "cell";
                self.cells.push(cell);
                return cell;
            }

            // create row with 4 cells
            var addRow = function() {
                var row = document.createElement("row");
                row.className = "row";
                for (var i = 0; i < self.size; i++){
                    row.appendChild(addCell());
                }
                return row;
            }

            // add 4 rows to matrix
            for (var i = 0; i < self.size; i++){
                div.appendChild(addRow());
            }
    }

    this.fillMatrix = function(matrix_data) {

        // get data from the data object depending on the matrix type
        // for rotation matrices get the data from the gui version
        var d;
        d = this.type.includes("rotation") ? data[this.type + "_gui"] : data[this.type];


        // iterate over matrix cells and fill them with the data
        for (var x = 0; x < this.size; x++) {
            for (var y = 0; y < this.size; y++) {
                this.cells[this.size * x + y].innerHTML = Math.round(d[x][y] * 100) / 100;
            }
        }

        // exception: add cos() and sin() to some rotation matrix cells,
        // do nothing and return for all other matrix types
        if (!this.type.includes("rotation"))
            return;

        if (this.type == "rotationX") {
            this.cells[5].innerHTML = "cos(" + d[1][1] + ")";
            this.cells[6].innerHTML = "-sin(" + d[1][2] + ")";
            this.cells[9].innerHTML = "sin(" + d[2][1] + ")";
            this.cells[10].innerHTML = "cos(" + d[2][2] + ")";
        }
        else if (this.type == "rotationY") {
            this.cells[0].innerHTML = "cos(" + d[0][0] + ")";
            this.cells[2].innerHTML = "sin(" + d[0][2] + ")";
            this.cells[8].innerHTML = "-sin(" + d[2][0] + ")";
            this.cells[10].innerHTML = "cos(" + d[2][2] + ")";

        }
        else if (this.type == "rotationZ") {
            this.cells[0].innerHTML = "cos(" + d[0][0] + ")";
            this.cells[1].innerHTML = "-sin(" + d[0][1] + ")";
            this.cells[4].innerHTML = "sin(" + d[1][0] + ")";
            this.cells[5].innerHTML = "cos(" + d[1][1] + ")";
        }
    }

    this.init();
}
