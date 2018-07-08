var gui_manager = function()
{
    /*
    that = this;

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
    */

    throwTransformationSliderEvent = function(slider){

        // get type and axis from the slider's id (e.g. "rotateX")
        var type = slider.id.slice(0, -1);
        var axis = slider.id.slice(-1).toLowerCase();

        var value = slider.value;

        var event = new CustomEvent("slider_input", {
            detail:{
                type: type,
                axis: axis,
                value: value
                }
            });
        dispatchEvent(event);
    }

    throwModeRadioButtonEvent = function(button){

        var name = button.id;
        var number = button.value;

        var event = new CustomEvent("radiobutton_input", {
            detail: {
                name: name,
                number: number
            }
        });
        dispatchEvent(event);
    }

    $(".slider").on("input", function() {throwTransformationSliderEvent(this)});
    $(".radio").on("click", function() {throwModeRadioButtonEvent(this)});

    /*
    for (i in this.slider_rot){
        this.slider_rot[i].addEventListener("input", this.throwRotationEvent, false);
        console.log("slider: ", this.slider_rot[i]);
    }
    document.getElementById("rotateX").addEventListener("input", that.throwRotationEvent, false);

    for (slider in this.slider_trans)
        this.slider_trans[slider].addEventListener("input", this.throwTranslationEvent, false);

    for (slider in this.slider_scale)
        this.slider_scale[slider].addEventListener("input", this.throwScaleEvent, false);
    */

}

var gui_manager = new gui_manager();
