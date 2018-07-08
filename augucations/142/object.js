var pickableObjects = [];

var object = function(scene, modelPath, pos, scale, csSize, normalColor, highlightColor, coloredCS){

    this.scene = scene;
    this.modelPath = modelPath;
    this.pos = pos;
    this.scale = scale;
    this.csSize = csSize;
    this.normalColor = normalColor;
    this.highlightColor = highlightColor;
    this.coloredCS = coloredCS;

    this.obj;
    this.coordinate_system;
    this.transform;

    var that = this;

    this.init = function(){
        if (this.modelPath)
            this.addModel();
        else
            this.addCoordinateSystem();
    }

    // load model from file, set scale and position and add object to its own
    // group and this group to the scene
    this.addModel = function(){
        var manager = new THREE.LoadingManager();
        var textureLoader = new THREE.TextureLoader( manager );
    	var texture = textureLoader.load( 'textures/UV_Grid_Sm.jpg' );

        var loader = new THREE.OBJLoader( manager );
    	loader.load( this.modelPath, function ( object ) {
    		object.traverse( function ( child ) {
    			if ( child instanceof THREE.Mesh ) {
                    var material = new THREE.MeshLambertMaterial({
                        color: that.normalColor,
                        transparent: false,
                        opacity: 1
                    });
                    child.material = material;
    			}
    		} );

            object.scale.set(that.scale.x, that.scale.y, that.scale.z);
            object.position.set(0, 0, 0);
            that.transform = object;

    		scene.add(object);
            that.obj = object;
            /*
            object.children[0].transform = that.transform;
            pickableObjects.push(object.children[0]);

            // group
            that.group = new THREE.Group();
            that.group.position.set(that.pos.x, that.pos.y, that.pos.z);
            parent.add(that.group);
            that.group.add(object);
            */

            that.addCoordinateSystem();
        });
    }

    this.addCoordinateSystem = function(){
        this.coordinate_system = new coordinate_system(this.scene, {x: 0, y: 0, z: 0}, this.csSize, this.coloredCS);

        if (this.group){
            this.coordinate_system.addToGroup(this.group);
        }
    }

    this.init();

    this.highlight = function(highlight = true){
        highlight ? that.obj.material.color.setHex(that.highlightColor)
                  : that.obj.material.color.setHex(that.normalColor);
    }

    this.pickedMsgHandler = function(e){
        if (!that.modelPath)
            return;

        // if this object is the picked one, call highlight(true), else false
        that.highlight(e.detail.object_id == that.obj.id);

        // if this object is the picked one, set this object and as the current_obj
        if (e.detail.object_id == that.obj.id)
            current_obj = {obj: that, cs: that.coordinate_system};
    }
    addEventListener("picked_object", this.pickedMsgHandler, false);

    this.unpickedMsgHandler = function(e){
        if (!that.modelPath)
            return;

        that.highlight(false);
    }
    addEventListener("unpicked_object", this.unpickedMsgHandler, false);

    this.rotate = function(radians){
        /*
        // If the mode is local, rotate the object itself,
        // if the mode is global, rotate the object's group
        var thing = (transformation_manager.mode == "local") ? that.group
                                                             : that.obj;

        thing.rotation.x = radians.x;
        thing.rotation.y = radians.y;
        thing.rotation.z = radians.z;
        */

        console.log(matrix_rotX(radians.x));
    }

    this.rotateX = function(radians)
    {
        var obj_m = that.obj.matrix;
        var rot_m = matrix_rotX(radians);

        var new_m = new THREE.Matrix4();

        // local -> left handed multiplication
        if (transformation_manager.mode == "local")
        {
            new_m = rot_m.multiply(obj_m);
            //console.log("local. new_m: ", new_m.elements);
        }
        else
        {
            new_m = obj_m.multiply(rot_m);
            //console.log("global. new_m: ", new_m);
        }

        that.obj.applyMatrix(new_m);
        console.log("obj_m:\n", M4toStr(that.obj.matrix));
        //console.log(that.obj.matrix.elements);
    }

    this.translate = function(translation){

        // If the mode is local, rotate the object itself,
        // if the mode is global, rotate the object's group
        var thing = (transformation_manager.mode == "local") ? that.group
                                                             : that.obj;
        thing.position.x = translation.x;
        thing.position.y = translation.y;
        thing.position.z = translation.z;
    }

    this.scalee = function(scale){
        // If the mode is local, rotate the object itself,
        // if the mode is global, rotate the object's group
        var thing = (transformation_manager.mode == "local") ? that.group
                                                             : that.obj;
        thing.scale.x = scale.x;
        thing.scale.y = scale.y;
        thing.scale.z = scale.z;
    }

    this.transformationMsgHandler = function(e, type){
        // if object does not contains a model or object is not the current object, return
        if (!that.modelPath || current_obj.obj != that)
            return;

        if (type == "rotationX")
            that.rotateX(e.detail.rotRadians);
        if (type == "rotationY")
            that.rotateY(e.detail.rotRadians);
        if (type == "rotationZ")
            that.rotateZ(e.detail.rotRadians);
        else if (type == "translation")
            that.translate(e.detail.translation);
        else if (type == "scale")
            that.scalee(e.detail.scale);
    }

    addEventListener("rotateX_object",
                     function(event) {
                         that.transformationMsgHandler(event, "rotationX");
                     },
                     false);

    addEventListener("rotateY_object",
                     function(event) {
                         that.transformationMsgHandler(event, "rotationY");
                     },
                     false);

    addEventListener("rotateZ_object",
                     function(event) {
                         that.transformationMsgHandler(event, "rotationZ");
                     },
                     false);

     addEventListener("translate_object",
                      function(event) {
                          that.transformationMsgHandler(event, "translation");
                      },
                      false);

      addEventListener("scale_object",
                       function(event) {
                           that.transformationMsgHandler(event, "scale");
                       },
                       false);

    return {
        obj: this,
        cs: this.coordinate_system
    };
}
