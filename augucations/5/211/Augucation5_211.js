var size = 8; // 8 x 8 pixel

var canvasData = img.e;
var qData = quant.g;

// create matrices
var wrapper_f = document.getElementById("f");
var matrix_f = new matrix(wrapper_f, size);

var wrapper_fprime = document.getElementById("fprime");
var matrix_fprime = new matrix(wrapper_fprime, size);

var wrapper_q = document.getElementById("q");
var matrix_q = new matrix(wrapper_q, size);

// create images
var canvas_orig = document.getElementById("img_orig");
var image_orig = new canvas_img(canvas_orig, canvasData, size);
var canvas_dct = document.getElementById("img_dct");
var image_dct = new canvas_img(canvas_dct, canvasData, size);

// create data
var data = new data(canvasData, size);

data.setQ(qData);
data.calculateEverything();

matrix_f.fillMatrix(data.getF());
matrix_fprime.fillMatrix(data.getFprime());
matrix_q.fillMatrix(data.getQ());

image_dct.fillCanvas(data.getDecoded());

