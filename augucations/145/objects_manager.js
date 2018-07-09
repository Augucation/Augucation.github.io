var teapot_path = 'utah-teapot.obj';
var teapot_color = 0xdc0b15;
var teapot_scale = 2;

var t = new teapot(teapot_path, teapot_color, new THREE.Vector3(0, 0, 0), teapot_scale);
// var cs = new coordinate_system({x: 0, y: 0, z: 0}, 50 * teapot_scale, true);

var objects =
{
    teapot: t,
    //c_system: cs
};
