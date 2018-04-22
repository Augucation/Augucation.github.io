var teapot = function()
{
    this.model_path = 'utah-teapot.obj';
    this.color = 0xdc0b15;

    this.loadModel = function(path)
    {
        var manager = new THREE.LoadingManager();
        var textureLoader = new THREE.TextureLoader( manager );
        var texture = textureLoader.load( 'textures/UV_Grid_Sm.jpg' );

        var loader = new THREE.OBJLoader( manager );
        loader.load(this.model_path, function (object)
        {
            object.traverse( function (child) {
                if (child instanceof THREE.Mesh)
                {
                    var material = new THREE.MeshLambertMaterial(
                        {
                            color: this.color,
                            transparent: false,
                            opacity: 1
                        });
                        child.material = material;
                    }
                } );
                scene.add(object);
            }
        );
    }

    this.loadModel();
}
