var slider_manager = function()
{
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

    for (slider in this.slider_rot)
        this.slider_rot[slider].addEventListener("input", this.throwRotationEvent, false);

    for (slider in this.slider_trans)
        this.slider_trans[slider].addEventListener("input", this.throwTranslationEvent, false);

    for (slider in this.slider_scale)
        this.slider_scale[slider].addEventListener("input", this.throwScaleEvent, false);

    this.throwRotationEvent = function(){
        var event = new CustomEvent("rotate_object", {
            detail:{
                obj: current_obj,
                translation: vec(thatt.slider_rot.x.value * D2R,
                                thatt.slider_rot.y.value * D2R,
                                thatt.slider_rot.z.value * D2R)
            }
        });
        dispatchEvent(event);
    }
}
