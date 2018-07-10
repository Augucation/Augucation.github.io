var cs;

var coordinate_system = function(pos, size, cone_size_factor, colored){

    this.pos = pos;
    this.size = size;
    this.cone_size_factor = cone_size_factor; // size in relation to the axis size

    //console.log("cs scene: ", scene);

    this.min = {};
    this.min.x = -this.size.x;
    this.min.y = -this.size.y;
    this.min.z = -this.size.z;

    this.max = {};
    this.max.x = this.size.x;
    this.max.y = this.size.y;
    this.max.z = this.size.z;

    this.colored = colored;

    this.gray = 0x555e67;
    this.red = this.colored ? 0xB52121 : this.gray;
    this.green = this.colored ? 0x70cc3f : this.gray;
    this.blue = this.colored ? 0x0f24c4 : this.gray;
    this.axisWidth = this.colored ? 50 : 3;
    this.lineWidth = this.colored ? 50 : 1;

    this.xaxisMaterial = new THREE.LineBasicMaterial({ color: this.red, linewidth: this.axisWidth });
    this.yaxisMaterial = new THREE.LineBasicMaterial({ color: this.green, linewidth: this.axisWidth });
    this.zaxisMaterial = new THREE.LineBasicMaterial({ color: this.blue, linewidth: this.axisWidth });

    this.cylinderGeom = {};
    this.cylinderGeom.x = new THREE.CylinderGeometry(2, 2, this.size.x * 2, 30);
    this.cylinderGeom.y = new THREE.CylinderGeometry(2, 2, this.size.y * 2, 30);
    this.cylinderGeom.z = new THREE.CylinderGeometry(2, 2, this.size.z * 2, 30);

    this.axes = {};
    this.arrowheads = {};

    // This group is an empty that will parent all axes and arrowheads.
    this.obj = new THREE.Group();

    that = this;

    this.init = function(){
        this.create();          // fill this.obj with axes and arrowheads
        scene.add(this.obj);    // add this.obj to the global main scene
    }

    this.create = function(){
        this.axes.x = this.createAxis("x", this.xaxisMaterial, vec(0, 0, 90));
        this.axes.y = this.createAxis("y", this.yaxisMaterial, vec(0, 0, 0));
        this.axes.z = this.createAxis("z", this.zaxisMaterial, vec(90, 0, 0));
    }

    this.createAxis = function(axis_name, material, rotation){
        var axis = new THREE.Mesh(this.cylinderGeom[axis_name], material);
        axis.position.set(this.pos.x, this.pos.y, this.pos.z);
        axis.rotation.set(rotation.x * D2R, rotation.y * D2R, rotation.z * D2R);
        this.obj.add(axis);

        var cone = this.createCone(axis_name, material, rotation);
        axis.add(cone);

        return axis;
    }

    this.createCone = function(axis_name, material, rotation){

        var cone_size = this.size[axis_name] * this.cone_size_factor;
        var geometry = new THREE.ConeGeometry(cone_size, cone_size, 20);
        var cone = new THREE.Mesh( geometry, material );

        // hacky hack:
        // The axes seem to be switched / rotated. Therefore the postion is
        // determined manually.
        switch (axis_name){
            case "x":
                cone.position.set(0, -this.size[axis_name], 0);
                cone.rotation.set(Math.PI, 0, 0);
                break;
            case "y":
                cone.position.set(0, this.size[axis_name], 0);
                break;
            case "z":
                cone.position.set(0, this.size[axis_name], 0);
                break;

        }

        /*

        If the axes would be as expected, this would be the way to set the
        position:

        var local_pos = vec(0, 0, 0);
        // add the axis's size to the corresponding position value
        // (cone for the x-axis: local_pos = (this.size.x, 0, 0))
        local_pos[axis_name] = this.size[axis_name];
        var global_pos = local_pos.add(this.pos);
        cone.position.set(global_pos.x, global_pos.y, global_pos.z);
        */

        return cone;
    }


    this.init();
}

function cs_set_size(axis, teapot, cs, parent, size) {

    // create a new cs and remove the old one

    // get the current size and only replace the size value of that one axis
    var new_size = cs.size;
    new_size[axis] = size;
    var new_cs = new coordinate_system(cs.pos, new_size, cs.colored)

    teapot.real_local_cs = new_cs;
    parent.add(new_cs.obj);
    parent.remove(cs.obj);
}
