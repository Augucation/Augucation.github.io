
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
	renderer.render( scene, camera );
}

function setRotationDegree(x, y, z, order, animated = false) {

    v = {x: x, y: y, z: z};
    var o = order.toLowerCase();
    teapot.rotation.order = order;
    teapot.rotation.x = teapot.rotation.y = teapot.rotation.z = 0;

    if(animated){

        var interval = setInterval(update, 1000 / 300);
        var step = 0.005;
        var range = 0.75;

        var i = 0;
        function update(){

            // iterate over all axes
            if (i < o.length){
                // calculate direction
                d = teapot.rotation[o[i]] < d2r(v[o[i]]) ? 1 : -1;
                // while goal is not reached
                if (Math.abs(r2d(teapot.rotation[o[i]]) - (v[o[i]])) > range){
                    // rotate by a step
                    teapot.rotation[o[i]] += step * d;
                    render();
                }
                // if goal is reached, go to the next axis
                else {
                    i++;
                }
            }
            else {
                clearInterval(interval);
            }
        }
    }
    else{
        teapot.rotation.x = d2r(x);
        teapot.rotation.y = d2r(y);
        teapot.rotation.z = d2r(z);
				render();
    }
}

function d2r(d){
    return d * Math.PI / 180;
}

function r2d(r){
    return r * 180 / Math.PI;
}
