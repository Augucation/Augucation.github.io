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
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ];

    this.rotationY = [
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 1]
    ];

    this.rotationZ = [
        [1, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 1]
    ];

    this.scale = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ];

    ///// Translation /////

    this.setTranslationX = function(x) {
        this.translation[0][0] = x;
    }

    this.setTranslationY = function(y) {
        this.translation[1][1] = y;
    }

    this.setTranslationZ = function(z) {
        this.translation[2][2] = z;
    }

    this.setTranslationXYZ = function(translations) {
        this.setTranslationX(translations.x);
        this.setTranslationY(translations.y);
        this.setTranslationZ(translations.z);
    }

    this.getTranslationXYZ = function() {
        return {
            x: this.translation[0][0],
            y: this.translation[1][1],
            z: this.translation[2][2]
        }
    }

    ///// Rotation /////

    this.setRotationX = function(x) {
        this.rotationX[1][1] = x;
        this.rotationX[1][2] = x;
        this.rotationX[2][1] = x;
        this.rotationX[2][2] = x;
    }

    this.setRotationY = function(y) {
        this.rotationY[0][0] = y;
        this.rotationY[0][2] = y;
        this.rotationY[2][0] = y;
        this.rotationY[2][2] = y;
    }

    this.setRotationZ = function(z) {
        this.rotationZ[0][0] = z;
        this.rotationZ[1][1] = z;
        this.rotationZ[1][0] = z;
        this.rotationZ[1][1] = z;
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

    ///// Scale /////

    this.setScaleX = function(x) {
        this.scale[0][0] = x;
    }

    this.setScaleY = function(y) {
        this.scale[1][1] = y;
    }

    this.setScaleZ = function(z) {
        this.scale[2][2] = z;
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
