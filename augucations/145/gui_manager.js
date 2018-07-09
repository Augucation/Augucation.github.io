var gui_manager = function()
{
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
}

var gui_manager = new gui_manager();
