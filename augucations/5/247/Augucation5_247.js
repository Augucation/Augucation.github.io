// image url
var src_url = "../../../resources/img/haus_slideimg.png";

// get min and max value from sliders
var min = $('#histo_slider_min').val();
var max = $('#histo_slider_max').val();

// create image
var my_image = new img(src_url, document.getElementById("pic_canvas"));

function sliderInput(isMin, val) {

    // update min/max, according to which slider called this function
    if (isMin)
        min = val;
    else
        max = val;

    // equalize the image according to the new values and redraw the image
    my_image.equalize(min, max);
    my_image.drawNewOnCanvas();
}
