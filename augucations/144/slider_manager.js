// sliders are stored in angle_man.sliders
/*
for (var i = 0; i < angle_man.sliders.length; i++)

    slider.addEventListener("input", function(ev){

        // update the data stored inside the trans manager
        trans.setRotation(self.currentAngle, parseFloat(this.value));

        // update gui
        self.updateGUIAngle(self.currentAngle, parseFloat(this.value));

    }, false);
*/

var rot = function(){
    trans.setRotations({
                        X: parseFloat(angle_man.sliders[5].value),
                        Y: parseFloat(angle_man.sliders[4].value),
                        Z: parseFloat(angle_man.sliders[3].value)
                       });
    trans.rotate();
}

var scale = function(){

    var convert_scale = function(v){
        return (v >= 1 ? v : (0.9 + (v * 0.1)));
    }


    trans.setScale({
                    X: convert_scale(parseFloat(angle_man.sliders[6].value)),
                    Y: convert_scale(parseFloat(angle_man.sliders[7].value)),
                    Z: convert_scale(parseFloat(angle_man.sliders[8].value))
                   });
    trans.scale();
}

angle_man.sliders[3].addEventListener("input", function(){rot();}, false);
angle_man.sliders[4].addEventListener("input", function(){rot();}, false);
angle_man.sliders[5].addEventListener("input", function(){rot();}, false);

angle_man.sliders[6].addEventListener("input", function(){scale();}, false);
angle_man.sliders[7].addEventListener("input", function(){scale();}, false);
angle_man.sliders[8].addEventListener("input", function(){scale();}, false);
