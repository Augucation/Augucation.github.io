var teapot = function(path, color, position, scale) {
    var that = this;

    this.path = path;
    this.color = color;
    this.position = position;
    this.scale = scale;
    this.obj;
    this.global_cs;
    this.local_cs;


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

                var geometry = new THREE.BoxBufferGeometry( 25, 25, 25 );
                var material1 = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
                var material2 = new THREE.MeshBasicMaterial( {color: 0x0000ff} );

                var cube1 = new THREE.Mesh(geometry, material1);
                var cube2 = new THREE.Mesh(geometry, material2);

                var cs1 = new coordinate_system({x: 0, y: 0, z: 0}, 50 * teapot_scale, true);

                that.global_cs = new THREE.Group();
                //that.global_cs.add(cube1);
                scene.add(that.global_cs);

                that.local_cs = new THREE.Group();
                //that.local_cs.add(cube2);
                that.local_cs.add(cs1.obj);
                that.global_cs.add(that.local_cs);


                object.scale.set(that.scale, that.scale, that.scale);
                object.position.set(that.position.x, that.position.y, that.position.z);
                //scene.add(object);

                that.local_cs.add(object);

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

        // TODO: Um buntes CS drehen, CS selbst aber nicht mitdrehen
        
        //that.obj.rotateOnAxis(axis, value * D2R - that.obj.rotation.x);

        if (axis.x == 1)
            that.local_cs.rotation.x = value * D2R;
        if (axis.y == 1)
            that.local_cs.rotation.y = value * D2R;
        if (axis.z == 1)
            that.local_cs.rotation.z = value * D2R;
    }


    this.rotate_global = function(axis, value) {
        if (axis.x == 1)
            that.global_cs.rotation.x = value * D2R;
        if (axis.y == 1)
            that.global_cs.rotation.y = value * D2R;
        if (axis.z == 1)
            that.global_cs.rotation.z = value * D2R;
    }


    this.apply_rotation = function(axis, value, mode){
        mode == Mode.LOCAL ? this.rotate_local(axis, value, mode) : this.rotate_global(axis, value, mode);
    }


    this.translate_local = function(axis, value) {
        if (axis.x == 1)
            that.obj.position.x = value;
        if (axis.y == 1)
            that.obj.position.y = value;
        if (axis.z == 1)
            that.obj.position.z = value;
    }


    this.translate_global = function(axis, value) {
        if (axis.x == 1)
            that.local_cs.position.x = value;
        if (axis.y == 1)
            that.local_cs.position.y = value;
        if (axis.z == 1)
            that.local_cs.position.z = value;
    }


    this.apply_translation = function(axis, value, mode){
        mode == Mode.LOCAL ? this.translate_local(axis, value, mode) : this.translate_global(axis, value, mode);
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
