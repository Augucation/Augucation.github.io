var cs;

var coordinate_system = function(scene, pos, size){

    this.scene = scene;

    this.pos = pos;
    this.size = size;

    this.min = -this.size;
    this.max = this.size;

    this.gray = 0x555e67;
    this.red = 0xB52121;
    this.green = 0x70cc3f;
    this.blue = 0x0f24c4;
    this.axisWidth = 3;
    this.lineWidth = 1;

    this.xaxisMaterial = new THREE.LineBasicMaterial({ color: this.red, linewidth: this.axisWidth });
    this.yaxisMaterial = new THREE.LineBasicMaterial({ color: this.green, linewidth: this.axisWidth });
    this.zaxisMaterial = new THREE.LineBasicMaterial({ color: this.blue, linewidth: this.axisWidth });
    // this.lineMaterial = new THREE.LineBasicMaterial({ color: this.gray, linewidth: this.lineWidth });
    // this.highlightMaterial = new THREE.LineBasicMaterial({ color: this.red, linewidth: this.lineWidth });

    this.axes = {};
    this.arrowheads = {};

    this.init = function(){
        this.draw();
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

    this.drawLine = function(start, end, material){
		var geometry = new THREE.Geometry();
		geometry.vertices.push( new THREE.Vector3( start.x, start.y, start.z) );
		geometry.vertices.push( new THREE.Vector3( end.x, end.y, end.z) );
		var line = new THREE.Line( geometry, material );
        scene.add(line);
        return line;
    }

    this.drawCone = function(pos, radius, height, material, axis){

        var geometry = new THREE.ConeGeometry( radius, height, 20 );
        var cone = new THREE.Mesh( geometry, material );

        /*
        if(axis == "X"){
            cone.rotateZ(d2r(-90));
        }

        if (axis == "Z"){
            cone.rotateX(d2r(90));
        }
        */
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

    this.translate = function(x, y, z){
        for (axis in this.axes){
            this.axes[axis].geometry.translate(x, y, z);
        }
        for (ar in this.arrowheads){
            this.arrowheads[ar].rotation = new THREE.Vector3(0, 0, 0);
            this.arrowheads[ar].geometry.translate(x, y, z);
            this.correctConeRotation();
        }
    }

    this.rotate = function(x, y, z){
        for (axis in this.axes){
            this.axes[axis].geometry.rotation = new THREE.Vector3(x, y, z);
        }
        for (ar in this.arrowheads){
            this.arrowheads[ar].rotation = new THREE.Vector3(x, y, z);
            //this.arrowheads[ar].geometry.rotate(x, y, z);
            this.correctConeRotation();
        }
    }

    this.correctConeRotation = function(){
        this.arrowheads.x.rotateZ(d2r(-90));
        this.arrowheads.z.rotateX(d2r(90));
    }

    this.init();
}

function vec(x, y, z){
    return new THREE.Vector3(x, y, z);
}

function d2r(d){
    return d * Math.PI / 180;
}

function r2d(r){
    return r * 180 / Math.PI;
}
