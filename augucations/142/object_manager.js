var model_teapot = 'utah-teapot.obj'
var normalColor_teapot = 0xdc0b15;
var highlightColor_teapot = 0x9b1118;
var current_obj, teapot0, teapot1, world;
var teapots = [];
var parent;

var createModelsAndCoordinateSystems = function(){

    // static parent to access the teapots' world rotation and translation
    parent = new THREE.Group();
    scene.add(parent);


    teapots.push(new object(scene,
                         model_teapot,
                         vec(0, 0, 0),
                         vec(2, 2, 2),
                         60,
                         normalColor_teapot,
                         highlightColor_teapot,
                         true));

    /*
    teapots.push(new object(scene,
                         model_teapot,
                         vec(75, 75, 75),
                         vec(2, 2, 2),
                         60,
                         normalColor_teapot,
                         highlightColor_teapot));
    */

    world = new object(scene, false, vec(0, 0, 0), vec(1, 1, 1), 150, coloredCS = false);

    current_obj = teapots[0];
}
