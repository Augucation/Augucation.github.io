var model_teapot = 'utah-teapot.obj'
var normalColor_teapot = 0xdc0b15;
var highlightColor_teapot = 0x9b1118;
var current_obj, teapot0, teapot1, world;

var createModelsAndCoordinateSystems = function(){

    teapot0 = new object(scene,
                         model_teapot,
                         vec(-75, -85, -75),
                         vec(2, 2, 2),
                         60,
                         normalColor_teapot,
                         highlightColor_teapot);

    teapot1 = new object(scene,
                         model_teapot,
                         vec(75, 75, 75),
                         vec(2, 2, 2),
                         60,
                         normalColor_teapot,
                         highlightColor_teapot);

    world = new object(scene, false, vec(0, 0, 0), vec(1, 1, 1), 150);

    current_obj = teapot0;
}

vec = function(x, y, z){
    return new THREE.Vector3(x, y, z);
}
