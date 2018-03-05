var pickableObjects = [];

var object = function(scene, modelPath, pos, scale, csSize, normalColor, highlightColor){

    this.scene = scene;
    this.modelPath = modelPath;
    this.pos = pos;
    this.scale = scale;
    this.csSize = csSize;
    this.normalColor = normalColor;
    this.highlightColor = highlightColor;

    this.obj;
    this.coordinate_system;
    this.transform;
    this.group;

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
            object.position.set(that.pos.x, that.pos.y, that.pos.z);
            that.transform = object;

    		scene.add(object);
            object.children[0].transform = that.transform;
            pickableObjects.push(object.children[0]);
            that.obj = object.children[0];

            // group
            that.group = new THREE.Group();
            scene.add(that.group);
            that.group.add(object);
    	});
    }

    this.addCoordinateSystem = function(){
        this.coordinate_system = new coordinate_system(this.scene, this.pos, this.csSize);
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
        // If the mode is local, rotate the object itself,
        // if the mode is global, rotate the object's group
        var thing = (transformation_manager.mode == "local") ? that.transform
                                                             : that.group;
        thing.rotation.x = radians.x;
        thing.rotation.y = radians.y;
        thing.rotation.z = radians.z;
    }

    this.rotMsgHandler = function(e){
        // if object does not contains a model or object is not the current object, return
        if (!that.modelPath || current_obj.obj != that)
            return;

        that.rotate(e.detail.rotRadians);
    }
    addEventListener("rotate_object", this.rotMsgHandler, false);


    return {
        obj: this,
        cs: this.coordinate_system
    };
}
