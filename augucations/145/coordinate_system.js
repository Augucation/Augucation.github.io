var cs;

var coordinate_system = function(pos, size, colored){

    this.pos = pos;
    this.size = size;

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
        return axis;
    }

    /*
    this.draw = function(){

        console.log("draw! ", this.min);
        // axes
        this.axes.x = this.drawLine(vec(this.min + this.pos.x, this.pos.y, this.pos.z), vec(this.max + this.pos.x, this.pos.y, this.pos.z), this.xaxisMaterial);
        this.axes.y = this.drawLine(vec(this.pos.x, this.min + this.pos.y, this.pos.z), vec(this.pos.x, this.max + this.pos.y, this.pos.z), this.yaxisMaterial);
        this.axes.z = this.drawLine(vec(this.pos.x, this.pos.y, this.min + this.pos.z), vec(this.pos.x, this.pos.y, this.max + this.pos.z), this.zaxisMaterial);

        // arrow heads
        this.arrowheads.x = this.drawCone(vec(this.max + this.pos.x, this.pos.y, this.pos.z), this.size * 0.1, this.size * 0.1, this.xaxisMaterial, "X");
        this.arrowheads.y = this.drawCone(vec(this.pos.x, this.max + this.pos.y, this.pos.z), this.size * 0.1, this.size * 0.1, this.yaxisMaterial, "Y");
        this.arrowheads.z = this.drawCone(vec(this.pos.x, this.pos.y, this.max + this.pos.z), this.size * 0.07, this.size * 0.07, this.zaxisMaterial, "Z");
        this.correctConeRotation();
    }
    */

    /*
    this.drawCone = function(pos, radius, height, material, axis){

        var geometry = new THREE.ConeGeometry( radius, height, 20 );
        var cone = new THREE.Mesh( geometry, material );

        cone.position.set(pos.x, pos.y, pos.z);
        this.obj.add( cone );

        return cone;
    }
    */

    /*
    this.highlightAxis = function(axis){

        // unhighlight all axes
        for (var a in this.axes)
            this.axes[a].material = this.axisMaterial;

        for(var h in this.arrowheads)
            this.arrowheads[h].material = this.axisMaterial;

        // if an axis is given, highlight this onError
        if (axis == false)
            return

        this.axes[axis].material = this.highlightMaterial;
        this.arrowheads[axis].material = this.highlightMaterial;
    }
    */

    /*
    this.correctConeRotation = function(){
        this.arrowheads.x.rotateZ(-90 * D2R);
        this.arrowheads.z.rotateX(90 * D2R);
    }

    this.init();
    */
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
