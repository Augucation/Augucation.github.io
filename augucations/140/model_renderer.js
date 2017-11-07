
var container;
var camera, scene, renderer, teapot;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

function init() {
	container = document.getElementById("teapotContainer");

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.z = 250;

    // scene
	scene = new THREE.Scene();
	var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
	scene.add( ambientLight );

    var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
	camera.add( pointLight );
	scene.add( camera );

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
			//console.log( Math.round(percentComplete, 2) + '% downloaded' );
		}
	};

    var onError = function ( xhr ) {
	};

    var loader = new THREE.OBJLoader( manager );
	loader.load( 'utah-teapot.obj', function ( object ) {
		object.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
                var material = new THREE.MeshLambertMaterial({color: 0xdc0b15, transparent: false, opacity: 1});

                child.material = material;
			}
		} );

        object.scale.set(4, 4, 4);

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
	//camera.position.x += ( mouseX - camera.position.x ) * .05;
	//camera.position.y += ( - mouseY - camera.position.y ) * .05;
	//camera.lookAt( scene.position );
	renderer.render( scene, camera );
}

function setRotationDegree(x, y, z, order) {
    teapot.rotation.order = order;
    teapot.rotation.x = x * Math.PI / 180;
    teapot.rotation.y = y * Math.PI / 180;
    teapot.rotation.z = z * Math.PI / 180;

    render();
}
