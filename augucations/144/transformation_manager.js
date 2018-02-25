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
        setRotationDegree(data.getRotationXYZ_gui());
    }

    this.setScale = function(scale) {
        data.setScaleXYZ(scale);
        this.compose();
    }

    this.scale = function() {
        setScalation(data.getScaleXYZ());
    }

    this.setTranslation = function(translation) {
        data.setTranslationXYZ(translation);
        this.compose();
    }

    this.translate = function() {
        setTranslation(data.getTranslationXYZ());
    }

    this.compose = function() {

        var composition_order = [
            data.translation,
            data.rotationX,
            data.rotationY,
            data.rotationZ,
            data.scale
        ];

        var composition = math.multiply(data.translation, data.rotationX);
        composition = math.multiply(composition, data.rotationY);
        composition = math.multiply(composition, data.rotationZ);
        composition = math.multiply(composition, data.scale);
        data.setCompositionArray(composition);

        //data.setCompositionArray(math.multiply(data.translation, data.scale));

        // Three.JS has a built in matrix multiplication function
        // that we will use. Therefore we convert the data object's matrices
        // into Three.JS matrix objects.

        /*
        var composition = new THREE.Matrix4();

        composition.multiplyMatrices(this.A2T(data.scale), this.A2T(data.rotationZ));
        composition.multiplyMatrices(composition, this.A2T(data.rotationY));
        composition.multiplyMatrices(composition, this.A2T(data.rotationX));
        composition.multiplyMatrices(composition, this.A2T(data.translation));

        composition = this.A2T(data.scale).multiply(this.A2T(data.rotationZ));
        composition = composition.multiply(this.A2T(data.rotationY));
        composition = composition.multiply(this.A2T(data.rotationX));
        composition = composition.multiply(this.A2T(data.translation));

        // Convert the composition matrix back into a 2D array and set it.
        data.setCompositionArray(this.T2A(composition));

        // Because the teapot model is very small, the model_renderer renderes
        // it 4 (teapotInitScale) times bigger than the scale matrix says.
        // Therefore we have to divide the teapot' real scale by 4 to get values
        // that match the ones shown in the matrix.
        var scaleFix = new THREE.Matrix4();
        scaleFix.fromArray([0.25, 1, 1, 1, 1, 0.25, 1, 1, 1, 1, 0.25, 1, 1, 1, 1, 1]);

        data.setCompositionArray(this.T2A(getMatrix().multiply(scaleFix)));
        */
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
