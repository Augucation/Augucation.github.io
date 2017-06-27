var src_url = "../../../resources/img/haus_slideimg.png";
var min = 50;
var max = 255;

var my_image = new img(src_url, document.getElementById("pic_canvas"));

function sliderInput(isMin, val) {
    if (isMin)
        min = val;
    else
        max = val;

    //console.log("min: ", min);
    //console.log("max: ", max);
    my_image.equalize(min, max);
    my_image.drawNewOnCanvas();
}
