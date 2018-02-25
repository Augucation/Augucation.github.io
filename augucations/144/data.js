// Degree to Radian and Radian to Degree constants
var d2r = Math.PI / 180;
var r2d = 180 / Math.PI;

var Data = function(){

    this.composition = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ];

    this.translation = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ];

    this.rotationX = [
        [1, 0, 0, 0],
        [0, Math.cos(0), -Math.sin(0), 0],
        [0, Math.sin(0), Math.cos(0), 0],
        [0, 0, 0, 1]
    ];

    this.rotationX_gui = [
        [1, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 1]
    ];

    this.rotationY = [
        [Math.cos(0), 0, Math.sin(0), 0],
        [0, 1, 0, 0],
        [-Math.sin(0), 0, Math.cos(0), 0],
        [0, 0, 0, 1]
    ];

    this.rotationY_gui = [
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 1]
    ];

    this.rotationZ = [
        [Math.cos(0), -Math.sin(0), 0, 0],
        [Math.sin(0), Math.cos(0), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ];

    this.rotationZ_gui = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ];

    this.scale = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ];

    ///// Composition /////

    this.setCompositionArray = function(compo) {
        // This function gets the whole composition array as parameter.
        this.composition = compo;
        gui.mats[0].fillMatrix();
    }

    ///// Translation /////

    this.setTranslationX = function(x) {
        this.translation[0][3] = x;
        gui.mats[1].fillMatrix();
    }

    this.setTranslationY = function(y) {
        this.translation[1][3] = y;
        gui.mats[1].fillMatrix();
    }

    this.setTranslationZ = function(z) {
        this.translation[2][3] = z;
        gui.mats[1].fillMatrix();
    }

    this.setTranslationXYZ = function(translations) {
        this.setTranslationX(translations.x);
        this.setTranslationY(translations.y);
        this.setTranslationZ(translations.z);
    }

    this.getTranslationXYZ = function() {
        return {
            x: this.translation[0][3],
            y: this.translation[1][3],
            z: this.translation[2][3]
        }
    }

    ///// Rotation /////

    this.setRotationX = function(x) {
        this.rotationX_gui[1][1] = x;
        this.rotationX_gui[1][2] = x;
        this.rotationX_gui[2][1] = x;
        this.rotationX_gui[2][2] = x;

        this.rotationX[1][1] = Math.cos(x * d2r);
        this.rotationX[1][2] = -Math.sin(x * d2r);
        this.rotationX[2][1] = Math.sin(x * d2r);
        this.rotationX[2][2] = Math.cos(x * d2r);

        gui.mats[4].fillMatrix();
    }

    this.setRotationY = function(y) {
        this.rotationY_gui[0][0] = y;
        this.rotationY_gui[0][2] = y;
        this.rotationY_gui[2][0] = y;
        this.rotationY_gui[2][2] = y;

        this.rotationY[0][0] = Math.cos(y * d2r);
        this.rotationY[0][2] = Math.sin(y * d2r);
        this.rotationY[2][0] = -Math.sin(y * d2r);
        this.rotationY[2][2] = Math.cos(y * d2r);

        gui.mats[3].fillMatrix();
    }

    this.setRotationZ = function(z) {
        this.rotationZ_gui[0][0] = z;
        this.rotationZ_gui[0][1] = z;
        this.rotationZ_gui[1][0] = z;
        this.rotationZ_gui[1][1] = z;

        this.rotationZ[0][0] = Math.cos(z * d2r);
        this.rotationZ[0][1] = -Math.sin(z * d2r);
        this.rotationZ[1][0] = Math.sin(z * d2r);
        this.rotationZ[1][1] = Math.cos(z * d2r);

        gui.mats[2].fillMatrix();
    }

    this.setRotationXYZ = function(rotations) {
        this.setRotationX(rotations.x);
        this.setRotationY(rotations.y);
        this.setRotationZ(rotations.z);
    }

    this.getRotationXYZ = function() {
        return {
            x: this.rotationX[1][1],
            y: this.rotationY[0][0],
            z: this.rotationZ[1][1]
        }
    }

    this.getRotationXYZ_gui = function() {
        return {
            x: this.rotationX_gui[1][1],
            y: this.rotationY_gui[0][0],
            z: this.rotationZ_gui[1][1]
        }
    }

    ///// Scale /////

    this.setScaleX = function(x) {
        this.scale[0][0] = x;
        gui.mats[5].fillMatrix();
    }

    this.setScaleY = function(y) {
        this.scale[1][1] = y;
        gui.mats[5].fillMatrix();
    }

    this.setScaleZ = function(z) {
        this.scale[2][2] = z;
        gui.mats[5].fillMatrix();
    }

    this.setScaleXYZ = function(scale) {
        this.setScaleX(scale.x);
        this.setScaleY(scale.y);
        this.setScaleZ(scale.z);
    }

    this.getScaleXYZ = function() {
        return {
            x: this.scale[0][0],
            y: this.scale[1][1],
            z: this.scale[2][2]
        }
    }
}

var data = new Data();
