
var container;
var camera, scene, renderer, teapot;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var teapotInitScale = 4;
var initMatrix;

var old_matrix;

function init() {
	container = document.getElementById("teapotContainer");

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.z = 350;
	camera.position.y = 75;
	camera.lookAt(new THREE.Vector3(0, 20, 0));

    // scene
	scene = new THREE.Scene();
	var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
	scene.add( ambientLight );

    var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
	camera.add( pointLight );
	scene.add( camera );

	// create coordinate_system
	cs = new coordinate_system(scene);

    // texture
	var manager = new THREE.LoadingManager();
	manager.onProgress = function ( item, loaded, total ) {
		//console.log( item, loaded, total );
	};

    var textureLoader = new THREE.TextureLoader( manager );
	var texture = textureLoader.load( 'textures/UV_Grid_Sm.jpg' );

    // model
	var onProgress = function ( xhr ) {
		if ( xhr.lengthComputable ) {
			var percentComplete = xhr.loaded / xhr.total * 100;
		}
	};

    var onError = function ( xhr ) {
	};

    var loader = new THREE.OBJLoader( manager );
	loader.load( 'utah-teapot.obj', function ( object ) {
		object.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
                var material = new THREE.MeshLambertMaterial({
					color: 0xdc0b15,
					transparent: false,
					opacity: 1
				});

                child.material = material;
			}
		} );

        object.scale.set(teapotInitScale, teapotInitScale, teapotInitScale);

        // store the object globally to modify it later
        teapot = object;
		scene.add( object );
	}, onProgress, onError );


	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( container.clientWidth, container.clientHeight );
    renderer.setClearColor (0xffffff);
	container.appendChild( renderer.domElement );
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
    renderer.setSize( container.clientWidth, container.clientHeight );
}

function onDocumentMouseMove( event ) {
	mouseX = ( event.clientX - windowHalfX ) / 2;
	mouseY = ( event.clientY - windowHalfY ) / 2;
}

function animate() {
	requestAnimationFrame( animate );
	render();
}

function render() {
	renderer.render( scene, camera );
}

function setScalation(scale) {
	teapot.scale.x = scale.x * teapotInitScale;
	teapot.scale.y = scale.y * teapotInitScale;
	teapot.scale.z = scale.z * teapotInitScale;
}

function setRotationDegree(rotation) {

    teapot.rotation.x = teapot.rotation.y = teapot.rotation.z = 0;

    teapot.rotation.x = rotation.x * d2r;
    teapot.rotation.y = rotation.y * d2r;
    teapot.rotation.z = rotation.z * d2r;
}

function setTranslation(translation) {
	teapot.position.x = translation.x;
	teapot.position.y = translation.y;
	teapot.position.z = translation.z;

}

function applyCompositionMatrix() {

	/* Before applying the composition matrix, reset the teapot's last
	 * transformation by applying the inverse of the matrix applied the last
	 * time.
	 */

	//if (old_matrix)
	//	teapot.applyMatrix(old_matrix.getInverse(old_matrix));

	// Change: instead of applying the inverse matrix, I manually reset position, rotation and scale
	// Now the visualization of the teapot looks correct
	teapot.position.set(0, 0, 0);
	teapot.rotation.set(0, 0, 0);
	teapot.scale.set(teapotInitScale, teapotInitScale, teapotInitScale);

	m = trans.A2T(data.composition);


	teapot.applyMatrix(m);
	old_matrix = m;
	console.log(m);
	//teapot.updateMatrixWorld();
}

function getMatrix() {
	return teapot.matrix;
}

function stopAnimation(){
	// stop highlighting and animation
	angle_man.highLightAxis(false);
	cs.highlightAxis(false);
	clearInterval(interval);
}
