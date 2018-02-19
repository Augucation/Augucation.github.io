var Gui = function() {

    this.mats = []

    this.init = function() {
        this.createMatrices();
    }

    this.createMatrices = function() {
        this.mats.push(new Matrix(angle_man.mats.all[0], 0, 4, "composition"));
        this.mats.push(new Matrix(angle_man.mats.all[1], 1, 4, "translation"));
        this.mats.push(new Matrix(angle_man.mats.all[2], 2, 4, "rotationZ"));
        this.mats.push(new Matrix(angle_man.mats.all[3], 3, 4, "rotationY"));
        this.mats.push(new Matrix(angle_man.mats.all[4], 4, 4, "rotationX"));
        this.mats.push(new Matrix(angle_man.mats.all[5], 5, 4, "scale"));
    }
}

var gui = new Gui();
gui.init();
