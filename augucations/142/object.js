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

    var that = this;

    this.init = function(){
        if (this.modelPath)
            this.addModel();

        this.addCoordinateSystem();
    }

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

    		scene.add( object );
            pickableObjects.push(object.children[0]);
            that.obj = object.children[0];
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
        that.highlight(e.detail.object_id == that.obj.id);
    }

    this.unpickedMsgHandler = function(e){
        if (!that.modelPath)
            return;
        that.highlight(false);
    }

    addEventListener("picked_object", this.pickedMsgHandler, false);
    addEventListener("unpicked_object", this.unpickedMsgHandler, false);

    return {
        obj: this,
        cs: this.coordinate_system
    };
}
