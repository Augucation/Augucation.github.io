var transformation = function () {

    // The following set functions alter the values inside the data object.

    // The following transformation functions call the model_renderer's
    // transformation functions, passing the data object's data.

    // The compose function does the mathematical part: it calculates the
    // composition matrix based on all the data object's matrices.

    this.setRotations = function(rotations) {
        data.setRotationXYZ(rotations);
        this.compose();
    }

    this.rotate = function() {
        //setRotationDegree(data.getRotationXYZ_gui());
    }

    this.setScale = function(scale) {
        data.setScaleXYZ(scale);
        this.compose();
    }

    this.scale = function() {
        //setScalation(data.getScaleXYZ());
    }

    this.setTranslation = function(translation) {
        data.setTranslationXYZ(translation);
        this.compose();
    }

    this.translate = function() {
        //setTranslation(data.getTranslationXYZ());
    }

    this.applyComposition = function() {
        applyCompositionMatrix();
    }

    this.compose = function(gui=true) {

        /* If gui is true, the gui values are used, i.e. degrees instead of
         * radians for rotations. Use this to calculate the gui matrix.
         * Else, the real values are used. Use this to calculate the real
         * transformation matrix that will be applied onto the teapot.
         */

         /*
         data.translation,
         data.rotationX,
         data.rotationY,
         data.rotationZ,
         data.scale
         */

        var composition_order = [];

        if(gui) {
            composition_order = [
                data.rotationX,
                data.scale,
                data.rotationZ,
                data.translation,
                data.rotationY
            ];
        } else {
            composition_order = [
                data.translation
            ];
        }

        // Identity matrix
        var composition = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];

        for (var i = 0; i < composition_order.length; i++) {
                composition = math.multiply(composition, composition_order[i]);
        }

        data.setCompositionArray(composition);
    }

    // Array matrix to Three.JS matrix
    this.A2T = function(m) {
        // create empty matrix
        var newMat = new THREE.Matrix4();

        // convert our matrix into an 1D column-major format
        var arr = [];
        for (y = 0; y < m.length; y++) {
            for (x = 0; x < m.length; x++) {
                arr.push(m[x][y]);
            }
        }

        // set the elements of the new matrix based on this array
        newMat.fromArray(arr);

        return newMat;
    }

    // Three.JS matrix to array matrix
    this.T2A = function(m) {

        // m.elements is an 1D column-major array but we need a row-major one.
        // So at first we get the matrix' inverse.
        elems = m.getInverse(m).elements;

        var size = Math.sqrt(elems.length);

        var newMat = new Array();

        // Converts this 1D array into a 2D array.
        for (var x = 0; x < size; x++) {
            var row = []
            for (var y = 0; y < size; y++) {
                row.push(elems[y * size + x]);
            }
            newMat.push(row);
        }

        return newMat
    }
}


trans = new transformation();
