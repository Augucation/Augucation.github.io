var gui = function(){

    that = this;

    this.slider_trans = {};
    this.slider_trans.y = document.getElementById("translateY");
    this.slider_trans.z = document.getElementById("translateZ");
    this.slider_trans.x = document.getElementById("translateX");

    this.slider_rot = {};
    this.slider_rot.x = document.getElementById("rotateX");
    this.slider_rot.y = document.getElementById("rotateY");
    this.slider_rot.z = document.getElementById("rotateZ");

    for (slider in this.slider_trans){
        this.slider_trans[slider].addEventListener("input", function(value){
            current_obj.obj.translateRel(x=value);
        })
    }

    this.throwRotationEvent = function(){
        var event = new CustomEvent("rotate_object", {
            detail:{
                obj: current_obj,
                rotRadians: vec(d2r(that.slider_rot.x.value),
                                d2r(that.slider_rot.y.value),
                                d2r(that.slider_rot.z.value))
            }
        });
        dispatchEvent(event);
    }
    for (slider in this.slider_rot){
        this.slider_rot[slider].addEventListener("input", this.throwRotationEvent, false);
    }

    this.pickedMsgHandler = function(e){
        that.slider_rot.x.value = r2d(e.detail.object_transform.rotation.x);
        that.slider_rot.y.value = r2d(e.detail.object_transform.rotation.y);
        that.slider_rot.z.value = r2d(e.detail.object_transform.rotation.z);
    }
    addEventListener("picked_object", this.pickedMsgHandler, false);
}

var gui = new gui();
