var Gui = function(){

    this.mats = []

    this.init = function(){
        this.createMatrices();
    }

    this.createMatrices = function(){
        /*
        for (var i = 0; i < angle_man.mats.all.length; i++){
            mat = new Matrix(angle_man.mats.all[i], i);
        }
        */
        this.mats.push(new Matrix(angle_man.mats.all[0], 0, "comp"));
        this.mats.push(new Matrix(angle_man.mats.all[1], 1, "trans"));
        this.mats.push(new Matrix(angle_man.mats.all[2], 2, "rotZ"));
        this.mats.push(new Matrix(angle_man.mats.all[3], 3, "rotY"));
        this.mats.push(new Matrix(angle_man.mats.all[4], 4, "rotX"));
        this.mats.push(new Matrix(angle_man.mats.all[5], 5, "scale"));
    }
}

var gui = new Gui();
gui.init();
