var rot = function() {
    trans.setRotations({
        x: Math.round(parseFloat(angle_man.sliders[5].value) * 100) / 100,
        y: Math.round(parseFloat(angle_man.sliders[4].value) * 100) / 100,
        z: Math.round(parseFloat(angle_man.sliders[3].value) * 100) / 100
    });
    trans.applyComposition();
}

var scale = function() {
    // The sliders have values between -8 and 10.
    // This function converts the slider's values to values between 0.1 and 10.
    var convert_scale = function(v) {
        return (v >= 1 ? v : (0.9 + (v * 0.1)));
    }

    trans.setScale({
        x: Math.round(convert_scale(parseFloat(angle_man.sliders[6].value)) * 100) / 100,
        y: Math.round(convert_scale(parseFloat(angle_man.sliders[7].value)) * 100) / 100,
        z: Math.round(convert_scale(parseFloat(angle_man.sliders[8].value)) * 100) / 100
    });
    trans.applyComposition();
}

var translate = function() {

    trans.setTranslation({
        x: Math.round(parseFloat(angle_man.sliders[0].value) * 100) / 100,
        y: Math.round(parseFloat(angle_man.sliders[1].value) * 100) / 100,
        z: Math.round(parseFloat(angle_man.sliders[2].value) * 100) / 100
    });
    trans.applyComposition();
}

var resetSliders = function() {
    // translation and rotation sliders
    for (var i = 0; i < 6; i++)
        angle_man.sliders[i].value = 0;

    // scale sliders
    for (var i = 6; i < 9; i++)
        angle_man.sliders[i].value = 1;
}

angle_man.sliders[3].addEventListener("input", function(){rot();}, false);
angle_man.sliders[4].addEventListener("input", function(){rot();}, false);
angle_man.sliders[5].addEventListener("input", function(){rot();}, false);

angle_man.sliders[6].addEventListener("input", function(){scale();}, false);
angle_man.sliders[7].addEventListener("input", function(){scale();}, false);
angle_man.sliders[8].addEventListener("input", function(){scale();}, false);

angle_man.sliders[0].addEventListener("input", function(){translate();}, false);
angle_man.sliders[1].addEventListener("input", function(){translate();}, false);
angle_man.sliders[2].addEventListener("input", function(){translate();}, false);
