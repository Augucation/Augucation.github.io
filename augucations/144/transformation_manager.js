var transformation = function () {

    self = this;

    self.setRotations = function(rotations) {
        data.setRotationXYZ(rotations);
    }

    self.rotate = function() {
        setRotationDegree(data.getRotationXYZ());
    }

    self.setScale = function(scale) {
        data.setScaleXYZ(scale);
    }

    self.scale = function() {
        setScalation(data.getScaleXYZ());
    }

    self.setTranslation = function(translation) {
        data.setTranslationXYZ(translation);
    }

    this.translate = function() {
        setTranslation(data.getTranslationXYZ());
    }
}


trans = new transformation();
