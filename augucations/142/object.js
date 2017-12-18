var object = function(scene, modelPath, pos, scale, csSize){

    this.scene = scene;
    this.modelPath = modelPath;
    this.pos = pos;
    this.scale = scale;
    this.csSize = csSize;
    
    this.coordinate_system;

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

        var obj;

        var loader = new THREE.OBJLoader( manager );
    	loader.load( this.modelPath, function ( object ) {
    		object.traverse( function ( child ) {
    			if ( child instanceof THREE.Mesh ) {
                    var material = new THREE.MeshLambertMaterial({color: 0xdc0b15, transparent: false, opacity: 1});

                    child.material = material;
    			}
    		} );

            object.scale.set(that.scale.x, that.scale.y, that.scale.z);
            object.position.set(that.pos.x, that.pos.y, that.pos.z);

    		scene.add( object );
    	});
    }

    this.addCoordinateSystem = function(){
        this.coordinate_system = new coordinate_system(this.scene, this.pos, this.csSize);
        this.coordinate_system.init();
    }

    this.init();

    return {
        obj: this,
        cs: this.coordinate_system
    };
}
