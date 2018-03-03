var cs;

var coordinate_system = function(scene){

    this.scene = scene;

    this.min = -135;
    this.max = 135;
    this.step = 100;

    this.gray = 0x555e67;
    this.red = 0xB52121;
    this.axisWidth = 3;
    this.lineWidth = 1;
    this.axisMaterial = new THREE.LineBasicMaterial({ color: this.gray, linewidth: this.axisWidth });
    this.lineMaterial = new THREE.LineBasicMaterial({ color: this.gray, linewidth: this.lineWidth });
    this.highlightMaterial = new THREE.LineBasicMaterial({ color: this.red, linewidth: this.lineWidth });

    this.axes = {};
    this.arrowheads = {};

    this.init = function(){
        this.draw();
    }

    this.draw = function(){

        // axes
        this.axes.x = this.drawLine(this.vec(this.min, 0, 0), this.vec(this.max, 0, 0), this.axisMaterial);
        this.axes.y = this.drawLine(this.vec(0, this.min, 0), this.vec(0, this.max, 0), this.axisMaterial);
        this.axes.z = this.drawLine(this.vec(0, 0, this.min), this.vec(0, 0, this.max), this.axisMaterial);

        // arrow heads
        this.arrowheads.x = this.drawCone(this.vec(this.max, 0, 0), 10, 20, this.axisMaterial, "X");
        this.arrowheads.y = this.drawCone(this.vec(0, this.max, 0), 10, 20, this.axisMaterial, "Y");
        this.arrowheads.z = this.drawCone(this.vec(0, 0, this.max), 5, 10, this.axisMaterial, "Z");
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

        cone.position.set(pos.x, pos.y, pos.z);

        if(axis == "X"){
            cone.rotation.z = -90 * d2r;
        }

        if (axis == "Z"){
            cone.rotation.x = 90 * d2r;
        }

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

    this.vec = function(x, y, z){
        return new THREE.Vector3(x, y, z);
    }

    this.init();
}
