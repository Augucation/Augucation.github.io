// set the scene size
var WIDTH = 1000,
    HEIGHT = 800;

// set some camera attributes
var VIEW_ANGLE = 90,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;

// get the DOM element to attach to
// - assume we've got jQuery to hand
var container = document.getElementById("container");

// create a WebGL renderer, camera
// and a scene
var renderer = new THREE.WebGLRenderer();
var camera = new THREE.PerspectiveCamera(
                   VIEW_ANGLE,
                   ASPECT,
                   NEAR,
                   FAR );

var scene = new THREE.Scene();

// start the renderer
renderer.setSize(WIDTH, HEIGHT);

// attach the render-supplied DOM element
container.append(renderer.domElement);
    
////////////////////////////////////////////// RGB Cube //////////////////////////////////////////////	
var geom = new THREE.BoxGeometry(1, 1, 1);
var faceIndices = ['a', 'b', 'c'];
var vertexIndex, point;
geom.faces.forEach(function(face) { // loop through faces
  for (var i = 0; i < 3; i++) {
    vertexIndex = face[ faceIndices[ i ] ]; // get the face's vertex's index
    point = geom.vertices[vertexIndex]; // knowing the index, find the vertex in array of vertices
    color = new THREE.Color( // create a color
      point.x + 0.5, //apply xyz as rgb
      point.y + 0.5,
      point.z + 0.5
    );
    face.vertexColors[ i ] = color; //store the color in the face's vertexColors array
  }
});

var mat = new THREE.MeshBasicMaterial({
  vertexColors: THREE.VertexColors
});

var cube = new THREE.Mesh(geom, mat);
cube.position.x = -2;
scene.add(cube);

////////////////////////////////////////////// CMY Thing ////////////////////////////////////////////
var verticesOfCube_cmy = [
    -0.5, -0.5, -0.5,   0.5, -0.5, 0.5,    0.5, 0.5, -0.5,    -0.5, 0.5, 0.5,    0.5, 0.5, 0.5,
	//k  0                      m 1                 y 2             c 3               w4
];

var indicesOfFaces_cmy = [

	0, 1, 2, 	0, 2, 1,
	0, 2, 3,	0, 3, 2,
	0, 1, 3,	0, 3, 1,
	
	1, 2, 4, 	1, 4, 2,
	1, 3, 4, 	1, 4, 3,
	2, 3, 4, 	2, 4, 3
	
];


var geom_cmy = new THREE.PolyhedronGeometry( verticesOfCube_cmy, indicesOfFaces_cmy, 1, 0 );



var faceIndices_cmy = ['a', 'b', 'c', 'd', 'e', 'f'];
var vertexIndex_cmy, point_cmy;

/**
geom_cmy.faces.forEach(function(face_cmy) { // loop through faces
  for (var i = 0; i < 3; i++) {
    vertexIndex_cmy = face_cmy[ faceIndices_cmy[ i ] ]; // get the face's vertex's index
    point_cmy = geom.vertices[vertexIndex_cmy]; // knowing the index, find the vertex in array of vertices
    
	color_cmy = new THREE.Color( // create a color
      point_cmy.x + 0.5, //apply xyz as rgb
      point_cmy.y + 0.5,
      point_cmy.z + 0.5
    );
    //face_cmy.vertexColors[ i ] = color_cmy; //store the color in the face's vertexColors array
    //face_cmy.vertexColors[ i ] = new THREE.Color (1, 1, 1);
  }
});
**/

for( faceIndex in geom_cmy.faces)
{
	var face = geom_cmy.faces[faceIndex];
	console.log(faceIndex);
	if (faceIndex < 3)
	{
		face.vertexColors[ 0 ] = new THREE.Color (0xff0000);
		face.vertexColors[ 1 ] = new THREE.Color (0x00ff00);
		face.vertexColors[ 2 ] = new THREE.Color (0x0000ff);
    }
	//face.vertexColors[ 3 ] = new THREE.Color (1, 1, 0);
    //face.vertexColors[ 4 ] = new THREE.Color (1, 1, 1);
}

var mat_cmy = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors });


var cube_cmy = new THREE.Mesh(geom_cmy, mat_cmy);
cube_cmy.position.x = 2;
cube_cmy.position.z = 0;
scene.add(cube_cmy);
/**
**/
//////////////////////////////////////////////////////////////////////////////////////////

camera.position.z = 5;
	
	// create a point light
var pointLight = new THREE.PointLight( 0xFFFFFF );

// set its position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

// add to the scene
scene.add(pointLight);

// draw!
var render = function () {
	requestAnimationFrame( render );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	//cube.rotation.z += 0.01;

	cube_cmy.rotation.x += 0.01;
	cube_cmy.rotation.y += 0.01;

	renderer.render(scene, camera);
};

render();