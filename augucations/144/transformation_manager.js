var transformation = function (rotations, scale, translation) {

    self.rotations = rotations;
    self.scale = scale;
    self.translation = translation;

    self = this;

    self.getRotations = function() {
        return self.rotations;
    }

    self.getRotation = function(axis) {
        return self.rotations[axis];
    }

    self.setRotations = function(rotations) {
        self.rotations = rotations;
    }

    self.setRotation = function(axis, value) {
        self.rotations[axis] = value;
    }

    self.rotate = function() {
        setRotationDegree(self.rotations.X, self.rotations.Y, self.rotations.Z);
    }

    self.resetRotation = function() {
        setRotationDegree(0, 0, 0);
    }

    self.setScale = function(scale) {
        self.scale = scale;
    }

    self.scale = function() {
        setScalation(self.scale.X, self.scale.Y, self.scale.Z);
    }

    self.resetScale = function() {
        setScalation(1, 1, 1);
    }

    self.setTranslation = function(translation) {
        self.translation = translation;
    }

    this.translate = function() {
        setTranslation(self.translation.X, self.translation.Y, self.translation.Z);
    }
}


trans = new transformation({X: 0, Y: 0, Z: 0}, {X: 1, Y: 1, Z: 1}, {X: 0, Y: 0, Z: 0});
