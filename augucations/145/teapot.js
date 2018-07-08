var teapot = function(path, color, scale) {
    var that = this;

    this.path = path;
    this.color = color;
    this.scale = scale;
    this.obj;


    this.loadModel = function(){
        var manager = new THREE.LoadingManager();
        var textureLoader = new THREE.TextureLoader( manager );
        var texture = textureLoader.load( 'textures/UV_Grid_Sm.jpg' );

        var loader = new THREE.OBJLoader( manager );
        loader.load(that.path, function (object)
        {
            object.traverse( function (child) {
                if (child instanceof THREE.Mesh)
                {
                    var material = new THREE.MeshLambertMaterial(
                        {
                            color: that.color,
                            transparent: false,
                            opacity: 1
                        });
                        child.material = material;
                    }
                } );

                //console.log("teapot scene: ", scene);
                object.scale.set(that.scale, that.scale, that.scale);
                object.position.set(100, 100, 100);
                scene.add(object);
                that.obj = object;
        });
    }


    this.create_axis = function(axis_name) {
        // gets an axis name (x, y or z) and returns a vector3

        switch(axis_name) {
            case "x":
                return new THREE.Vector3(1, 0, 0);
            case "y":
                return new THREE.Vector3(0, 1, 0);
            case "z":
                return new THREE.Vector3(0, 0, 1);
        }
    }


    this.rotate_local = function(axis, value) {

        //that.obj.rotateOnAxis(axis, value * D2R - that.obj.rotation.x);

        if (axis.x == 1)
            that.obj.rotation.x = value * D2R;
        if (axis.y == 1)
            that.obj.rotation.y = value * D2R;
        if (axis.z == 1)
            that.obj.rotation.z = value * D2R;
        /*
        var rotMatLoc = new THREE.Matrix4();
        that.obj.applyMatrix(rotMatLoc);
        rotMatLoc.makeRotationAxis(axis.normalize(), value * D2R);
        printMatrix(rotMatLoc);
        that.obj.matrix.multiply(rotMatLoc);
        //that.obj.applyMatrix(that.obj.matrix);
        that.obj.applyMatrix(rotMatLoc);
        */
    }


    this.rotate_global = function(axis, value) {
        console.log("global");
    }


    this.apply_rotation = function(axis, value, mode){
        mode == Mode.LOCAL ? this.rotate_local(axis, value, mode) : this.rotate_global(axis, value, mode);
    }


    this.apply_translation = function(axis, value, mode){
        console.log("translation", axis, value, mode);
    }


    this.apply_scale = function(axis, value, mode){
        console.log("scalation", axis, value, mode);
    }


    this.transform = function(e, mode){

        axis = that.create_axis(e.detail.axis);

        switch(e.detail.type) {
            case "rotate":
                that.apply_rotation(axis, e.detail.value, mode);
                break;
            case "translate":
                that.apply_translation(axis, e.detail.value, mode);
                break;
            case "scale":
                that.apply_scale(axis, e.detail.value, mode);
                break;
        }
    }


    this.loadModel();
}
