var cs;

var coordinate_system = function(scene){

    this.scene = scene;

    this.min = -135;
    this.max = 135;
    this.step = 100;

    this.color = 0x555e67;
    this.axisWidth = 3;
    this.lineWidth = 1;
    this.axisMaterial = new THREE.LineBasicMaterial({ color: this.color, linewidth: this.axisWidth });
    this.lineMaterial = new THREE.LineBasicMaterial({ color: this.color, linewidth: this.lineWidth });

    this.init = function(){
        this.draw();
    }

    this.draw = function(){

        // axes
        this.drawLine(this.vec(this.min, 0, 0), this.vec(this.max, 0, 0), this.axisMaterial);
        this.drawLine(this.vec(0, this.min, 0), this.vec(0, this.max, 0), this.axisMaterial);
        this.drawLine(this.vec(0, 0, this.min), this.vec(0, 0, this.max), this.axisMaterial);

        // arrow heads
        this.drawCone(this.vec(this.max, 0, 0), 10, 20, this.axisMaterial, "X");
        this.drawCone(this.vec(0, this.max, 0), 10, 20, this.axisMaterial, "Y");
        this.drawCone(this.vec(0, 0, this.max), 5, 10, this.axisMaterial, "Z");

        /* grid
        for (x = this.min; x < Math.abs(this.max - this.min); x += this.step){
            for (y = this.min; y < Math.abs(this.max - this.min); y += this.step){
                this.drawLine(this.vec(x, y, this.min), this.vec(x, y, this.max), this.lineMaterial);
            }
        }

        for (z = this.min; z < Math.abs(this.max - this.min); z += this.step){
            for (y = this.min; y < Math.abs(this.max - this.min); y += this.step){
                this.drawLine(this.vec(this.min, y, z), this.vec(this.max, y, z), this.lineMaterial);
            }
        }

        for (x = this.min; x < Math.abs(this.max - this.min); x += this.step){
            for (z = this.min; z < Math.abs(this.max - this.min); z += this.step){
                this.drawLine(this.vec(x, this.min, z), this.vec(x, this.max, z), this.lineMaterial);
            }
        }
        */
    }

    this.drawLine = function(start, end, material){

		var geometry = new THREE.Geometry();
		geometry.vertices.push( new THREE.Vector3( start.x, start.y, start.z) );
		geometry.vertices.push( new THREE.Vector3( end.x, end.y, end.z) );
		var line = new THREE.Line( geometry, material );
        scene.add(line);
    }

    this.drawCone = function(pos, radius, height, material, axis){

        var geometry = new THREE.ConeGeometry( radius, height, 20 );
        var cone = new THREE.Mesh( geometry, material );

        cone.position.set(pos.x, pos.y, pos.z);

        if(axis == "X"){
            cone.rotation.z = d2r(-90);
        }

        if (axis == "Z"){
            cone.rotation.x = d2r(90);
        }

        scene.add( cone );
    }

    this.vec = function(x, y, z){
        return new THREE.Vector3(x, y, z);
    }

    this.init();
}
