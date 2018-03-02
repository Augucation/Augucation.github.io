var Gui = function() {

    this.mats = []

    this.init = function() {
        this.createMatrices();
    }

    this.createMatrices = function() {
        this.mats.push(new Matrix(0, 4, "composition"));
        this.mats.push(new Matrix(1, 4, "translation"));
        this.mats.push(new Matrix(2, 4, "rotationZ"));
        this.mats.push(new Matrix(3, 4, "rotationY"));
        this.mats.push(new Matrix(4, 4, "rotationX"));
        this.mats.push(new Matrix(5, 4, "scale"));
    }
}

var gui = new Gui();
gui.init();
