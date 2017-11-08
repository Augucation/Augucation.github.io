var transformation = function (rotations, order){

    this.rotations = rotations;
    this.order = order;

    this.getRotations = function(){
        return this.rotations;
    }

    this.getRotation = function(axis){
        return this.rotations[axis];
    }

    this.setRotations = function(rotations){
        this.rotations = rotations;
    }

    this.setRotation = function(axis, value){
        this.rotations[axis] = value;
    }

    this.getOrder = function(){
        return this.order;
    }

    this.setOrder = function(order){
        this.order = order;
    }

    this.rotate = function(animated){
        setRotationDegree(this.rotations.X, this.rotations.Y, this.rotations.Z, this.order, animated);
    }

    this.resetRotation = function(){
        setRotationDegree(0, 0, 0, this.order);
    }
}


trans = new transformation({X: 0, Y: 0, Z: 0}, "XYZ");
