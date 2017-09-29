var c = document.getElementById("myCanvas");
var dsw = document.getElementById("digital_signal_wrapper");

var startWidth = 700;
var scale;

function getCSS(property) {

  var css = null;

  if(dsw.currentStyle) {

    css = dsw.currentStyle[property];


  } else if(window.getComputedStyle) {


     css = document.defaultView.getComputedStyle(dsw, null).
           getPropertyValue(property);

  }

  return css;
}

var dsw_width = parseFloat(getCSS("width"));
var dsw_height = parseFloat(getCSS("height"));
var dsw_bottom = parseFloat(getCSS("bottom"));
var dsw_left = parseFloat(getCSS("left"));

window.onresize = function(event) {
    scale = parseFloat(c.clientWidth / startWidth);

    dsw.style.width = (dsw_width * scale);
    dsw.style.height = (dsw_height * scale);
    dsw.style.bottom = (dsw_bottom * scale);
    dsw.style.left = (dsw_left * scale);
};
