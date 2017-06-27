var slider_min = document.getElementById("histo_slider_min");
var slider_max = document.getElementById("histo_slider_max");

var left_pos = slider_min.getBoundingClientRect().left;
var right_pos = slider_min.getBoundingClientRect().right;

var width = right_pos - left_pos;

function highlightSlider (highlightMin) {
    slider_min.style.zIndex = highlightMin ? "2" : "1";
    slider_max.style.zIndex = highlightMin ? "1" : "2";
}

function MouseMove (slider, evt) {
    // get the x coordinate of the mouse
    var mouseX = evt.clientX;

    // calculate the mouse' x coordinate relative to the slider's value (0 - 255 in this case)
    var relativeMouseX = Math.abs((mouseX - left_pos) / width) * slider_min.max;

    // decide wich slider thumb is closer to the mouse and bring this one to the front
    if (Math.abs(relativeMouseX - slider_min.value) < Math.abs(relativeMouseX - slider_max.value))
        highlightSlider(true);
    else
        highlightSlider(false);
}

slider_min.onmousemove = function(e) {
    MouseMove(slider_min, e);
}

slider_max.onmousemove = function(e) {
    MouseMove(slider_max, e);
}
