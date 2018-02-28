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


        /*
         * Put the "sin(x)" and "cos(x)" parts (except for "x") inside extra spans with an
         * extra class for small fonts,
         * The x gets also an unique class, this class has a medium sized font.
         */
        function addFontClasses(sin_cos, value) {

            var scfont_ = "<span class = \"sin_cos_font\">";
            var _scfont = "</span>";

            var xfont_ = "<span class = \"x_font\">";
            var _xfont = "</span>";

            return scfont_ + sin_cos + "(" + _scfont
                    + xfont_ + value + _xfont
                    + scfont_ + ")" + _scfont;
        }

        if (this.type == "rotationX") {
            var value = d[1][1];
            this.cells[5].innerHTML = addFontClasses("cos", value);
            this.cells[6].innerHTML = addFontClasses("-sin", value);
            this.cells[9].innerHTML = addFontClasses("sin", value);
            this.cells[10].innerHTML = addFontClasses("cos", value);
        }
        else if (this.type == "rotationY") {
            var value = d[0][0];
            this.cells[0].innerHTML = addFontClasses("cos", value);
            this.cells[2].innerHTML = addFontClasses("sin", value);
            this.cells[8].innerHTML = addFontClasses("-sin", value);
            this.cells[10].innerHTML = addFontClasses("cos", value);

        }
        else if (this.type == "rotationZ") {
            var value = d[0][0];
            this.cells[0].innerHTML = addFontClasses("cos", value);
            this.cells[1].innerHTML = addFontClasses("-sin", value);
            this.cells[4].innerHTML = addFontClasses("sin", value);
            this.cells[5].innerHTML = addFontClasses("cos", value);
        }
    }

    this.init();
}
