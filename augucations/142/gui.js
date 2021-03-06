var gui = function(){

    thatt = this;


    ///////////////////////////////// SLIDER ///////////////////////////////////
    this.slider_trans = {};
    this.slider_trans.y = document.getElementById("translateY");
    this.slider_trans.z = document.getElementById("translateZ");
    this.slider_trans.x = document.getElementById("translateX");

    this.slider_rot = {};
    this.slider_rot.x = document.getElementById("rotateX");
    this.slider_rot.y = document.getElementById("rotateY");
    this.slider_rot.z = document.getElementById("rotateZ");

    this.slider_scale = {};
    this.slider_scale.x = document.getElementById("scaleX");
    this.slider_scale.y = document.getElementById("scaleY");
    this.slider_scale.z = document.getElementById("scaleZ");

    this.throwRotationEvent = function(){
        var event = new CustomEvent("rotate_object", {
            detail:{
                obj: current_obj,
                rotRadians: vec(d2r(thatt.slider_rot.x.value),
                                d2r(thatt.slider_rot.y.value),
                                d2r(thatt.slider_rot.z.value))
            }
        });
        dispatchEvent(event);

        var mode = transformation_manager.mode;
        var span_x = document.getElementById("span_" + mode + "_rot_x");
        var span_y = document.getElementById("span_" + mode + "_rot_y");
        var span_z = document.getElementById("span_" + mode + "_rot_z");
        span_x.innerHTML = "X: " + thatt.slider_rot.x.value;
        span_y.innerHTML = "Y: " + thatt.slider_rot.y.value;
        span_z.innerHTML = "Z: " + thatt.slider_rot.z.value;
    }
    this.throwTranslationEvent = function(){
        var event = new CustomEvent("translate_object", {
            detail:{
                obj: current_obj,
                translation: vec(thatt.slider_trans.x.value * 10,
                                thatt.slider_trans.y.value * 10,
                                thatt.slider_trans.z.value * 10)
            }
        });
        dispatchEvent(event);

        var mode = transformation_manager.mode;
        var span_x = document.getElementById("span_" + mode + "_trans_x");
        var span_y = document.getElementById("span_" + mode + "_trans_y");
        var span_z = document.getElementById("span_" + mode + "_trans_z");
        span_x.innerHTML = "X: " + thatt.slider_trans.x.value * 10;
        span_y.innerHTML = "Y: " + thatt.slider_trans.y.value * 10;
        span_z.innerHTML = "Z: " + thatt.slider_trans.z.value * 10;
    }

    this.throwScaleEvent = function(){
        var convert_scale = function(v) {
            return (v >= 1 ? v : (0.9 + (v * 0.1)));
        }

        var event = new CustomEvent("scale_object", {
            detail:{
                obj: current_obj,
                scale: vec(convert_scale(thatt.slider_scale.x.value),
                                convert_scale(thatt.slider_scale.y.value),
                                convert_scale(thatt.slider_scale.z.value))
            }
        });
        dispatchEvent(event);

        var mode = transformation_manager.mode;
        var span_x = document.getElementById("span_" + mode + "_scale_x");
        var span_y = document.getElementById("span_" + mode + "_scale_y");
        var span_z = document.getElementById("span_" + mode + "_scale_z");
        span_x.innerHTML = "X: " + convert_scale(thatt.slider_scale.x.value);
        span_y.innerHTML = "Y: " + convert_scale(thatt.slider_scale.y.value);
        span_z.innerHTML = "Z: " + convert_scale(thatt.slider_scale.z.value);
    }


    for (slider in this.slider_rot)
        this.slider_rot[slider].addEventListener("input", this.throwRotationEvent, false);

    for (slider in this.slider_trans)
        this.slider_trans[slider].addEventListener("input", this.throwTranslationEvent, false);

    for (slider in this.slider_scale)
        this.slider_scale[slider].addEventListener("input", this.throwScaleEvent, false);


    this.pickedMsgHandler = function(e){
        // update slider values to the picket object's valus
        thatt.slider_rot.x.value = r2d(e.detail.object_transform.rotation.x);
        thatt.slider_rot.y.value = r2d(e.detail.object_transform.rotation.y);
        thatt.slider_rot.z.value = r2d(e.detail.object_transform.rotation.z);
    }
    addEventListener("picked_object", this.pickedMsgHandler, false);


    ////////////////////////////// RADIO BUTTONS ///////////////////////////////

    this.radio_local = document.getElementById("radio_local");
    this.radio_global = document.getElementById("radio_global");

}

var gui = new gui();
