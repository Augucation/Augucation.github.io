var cs;

var coordinate_system = function(scene, pos, size, colored){

    this.scene = scene;

    this.pos = pos;
    this.size = size;

    this.min = -this.size;
    this.max = this.size;

    this.gray = 0x555e67;
    this.red = colored ? 0xB52121 : this.gray;
    this.green = colored ? 0x70cc3f : this.gray;
    this.blue = colored ? 0x0f24c4 : this.gray;
    this.axisWidth = colored ? 50 : 3;
    this.lineWidth = colored ? 50 : 1;

    this.xaxisMaterial = new THREE.LineBasicMaterial({ color: this.red, linewidth: this.axisWidth });
    this.yaxisMaterial = new THREE.LineBasicMaterial({ color: this.green, linewidth: this.axisWidth });
    this.zaxisMaterial = new THREE.LineBasicMaterial({ color: this.blue, linewidth: this.axisWidth });
    this.cylinderGeom = new THREE.CylinderGeometry(2, 2, this.size * 2, 30);

    this.axes = {};
    this.arrowheads = {};

    that = this;

    this.init = function(){
        //this.draw();
        this.create();
    }

    this.create = function(){
        this.axes.x = this.createAxis(this.xaxisMaterial, vec(0, 0, 90));
        this.axes.y = this.createAxis(this.yaxisMaterial, vec(0, 0, 0));
        this.axes.z = this.createAxis(this.zaxisMaterial, vec(90, 0, 0));
    }

    this.createAxis = function(material, rotation){
        var axis = new THREE.Mesh(this.cylinderGeom, material);
        axis.position.set(this.pos.x, this.pos.y, this.pos.z);
        axis.rotation.set(d2r(rotation.x), d2r(rotation.y), d2r(rotation.z));
        scene.add(axis);
        return axis;
    }

    this.draw = function(){

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

    this.drawCone = function(pos, radius, height, material, axis){

        var geometry = new THREE.ConeGeometry( radius, height, 20 );
        var cone = new THREE.Mesh( geometry, material );

        cone.position.set(pos.x, pos.y, pos.z);
        scene.add( cone );

        return cone;
    }

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

    this.correctConeRotation = function(){
        this.arrowheads.x.rotateZ(d2r(-90));
        this.arrowheads.z.rotateX(d2r(90));
    }

    this.addToGroup = function(group) {
        for (var a in this.axes) {
            group.add(this.axes[a]);
        }
    }

    this.init();
}
