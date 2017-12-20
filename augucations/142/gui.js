var slider_trans = {};
slider_trans.x = document.getElementById("translateX");
slider_trans.y = document.getElementById("translateY");
slider_trans.z = document.getElementById("translateZ");

var slider_rot = {};
slider_rot.x = document.getElementById("rotateX");
slider_rot.y = document.getElementById("rotateY");
slider_rot.z = document.getElementById("rotateZ");

for (slider in slider_trans){
    slider_trans[slider].addEventListener("input", function(value){
        current_obj.obj.translateRel(x=value);
    })
}

for (slider in slider_rot){
    slider_rot[slider].addEventListener("input", function(value){
        current_obj.obj.rotateAbs(x=value);
    })
}
