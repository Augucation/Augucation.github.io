
var container;
var camera, scene, renderer;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var isMouseDown, onMouseDownPosition;

function initScene() {
	container = document.getElementById("teapotContainer");

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.x = 35;
    camera.position.y = 75;
	camera.position.z = 450;
	camera.lookAt(new THREE.Vector3(0, 20, 0));

    // scene
	scene = new THREE.Scene();
	var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
	scene.add( ambientLight );

	// light
    var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
	camera.add( pointLight );
	scene.add( camera );

    //var controls = new THREE.OrbitControls(camera);

    var manager = new THREE.LoadingManager();
    var textureLoader = new THREE.TextureLoader( manager );
	var texture = textureLoader.load( 'textures/UV_Grid_Sm.jpg' );

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( container.clientWidth, container.clientHeight );
    renderer.setClearColor (0xffffff);
	container.appendChild( renderer.domElement );
	document.addEventListener('mousemove', onDocumentMouseMove, false);

	window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
    renderer.setSize( container.clientWidth, container.clientHeight );
}

function onDocumentMouseMove(event) {
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

function stopAnimation(){
	clearInterval(interval);
}
