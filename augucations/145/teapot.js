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

                var cs1_size = 50 * teapot_scale;
                var cs1 = new coordinate_system({x: 0, y: 0, z: 0}, {x: cs1_size, y: cs1_size, z: cs1_size}, true);

                that.global_cs = new THREE.Group();
                scene.add(that.global_cs);

                that.local_cs = new THREE.Group();
                that.real_local_cs = cs1;
                that.local_cs.add(cs1.obj);
                that.global_cs.add(that.local_cs);

                that.teapot_cs = new THREE.Group();
                that.local_cs.add(that.teapot_cs);

                object.scale.set(that.scale, that.scale, that.scale);
                object.position.set(that.position.x, that.position.y, that.position.z);
                //scene.add(object);

                that.teapot_cs.add(object);

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
        if (axis.x == 1)
            that.teapot_cs.rotation.x = value * D2R;
        if (axis.y == 1)
            that.teapot_cs.rotation.y = value * D2R;
        if (axis.z == 1)
            that.teapot_cs.rotation.z = value * D2R;
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


    this.scale_local = function(axis, value) {
        if (axis.x == 1)
            that.obj.scale.x = value;
        if (axis.y == 1)
            that.obj.scale.y = value;
        if (axis.z == 1)
            that.obj.scale.z = value;
    }


    this.scale_global = function(axis, value) {

        var axis_name = "";

        if (axis.x == 1){
            that.obj.scale.x = value;
            axis_name = "x";
        }
        if (axis.y == 1){
            that.obj.scale.y = value;
            axis_name = "y";
        }
        if (axis.z == 1){
            that.obj.scale.z = value;
            axis_name = "z";
        }

        cs_set_size(axis_name, that, that.real_local_cs, that.local_cs, value * 50 * that.scale);
    }


    this.apply_scale = function(axis, value, mode){
        value = value >= 1 ? value : (0.9 + (value * 0.1));
        mode == Mode.LOCAL ? this.scale_local(axis, value, mode) : this.scale_global(axis, value, mode);
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
