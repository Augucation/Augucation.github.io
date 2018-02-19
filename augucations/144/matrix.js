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

    this.fillMatrix = function() {

        // get data from the data object depending on the matrix type
        d = data[self.type];

        // iterate over matrix cells and fill these with the data
        for (var x = 0; x < self.size; x++) {
            for (var y = 0; y < self.size; y++) {
                self.cells[self.size * x + y].innerHTML = d[x][y];
            }
        }

        // exception: add cos() and sin() to some rotation matrix cells,
        // do nothing and return for all other matrix types
        if (!self.type.includes("rotation"))
            return;

        if (self.type == "rotationX") {
            self.cells[5].innerHTML = "cos(" + d[1][1] + ")";
            self.cells[6].innerHTML = "-sin(" + d[1][2] + ")";
            self.cells[9].innerHTML = "sin(" + d[2][1] + ")";
            self.cells[10].innerHTML = "cos(" + d[2][2] + ")";
        }
        else if (self.type == "rotationY") {
            self.cells[0].innerHTML = "cos(" + d[0][0] + ")";
            self.cells[2].innerHTML = "sin(" + d[0][2] + ")";
            self.cells[8].innerHTML = "-sin(" + d[2][0] + ")";
            self.cells[10].innerHTML = "cos(" + d[2][2] + ")";

        }
        else if (self.type == "rotationZ") {
            self.cells[0].innerHTML = "cos(" + d[0][0] + ")";
            self.cells[1].innerHTML = "-sin(" + d[0][1] + ")";
            self.cells[4].innerHTML = "sin(" + d[1][0] + ")";
            self.cells[5].innerHTML = "cos(" + d[1][1] + ")";

        }
    }

    this.init();
}
