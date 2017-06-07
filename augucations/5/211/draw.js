var mouseIsDown;
var color = 128;

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
		
	return {
	  x: Math.floor((evt.clientX - rect.left) / rect.width * size),
	  y: Math.floor((evt.clientY - rect.top) / rect.height * size)
	};
}

canvas_orig.addEventListener('mousemove', function(evt) {
	var mousePos = getMousePos(canvas_orig, evt);
	if(mouseIsDown){
		image_orig.setPixel(mousePos.x, mousePos.y, color);
		data.changePixel(mousePos.x, mousePos.y, color);

		matrix_f.fillMatrix(data.getF());
		matrix_fprime.fillMatrix(data.getFprime());
		matrix_q.fillMatrix(data.getQ());

		image_dct.fillCanvas(data.getDecoded());
	}
}, false);

canvas_orig.addEventListener('mousedown', function(evt) {
	var mousePos = getMousePos(canvas_orig, evt);
	if(mouseIsDown){
		image_orig.setPixel(mousePos.x, mousePos.y, color);
		data.changePixel(mousePos.x, mousePos.y, color);

		matrix_f.fillMatrix(data.getF());
		matrix_fprime.fillMatrix(data.getFprime());
		matrix_q.fillMatrix(data.getQ());

		image_dct.fillCanvas(data.getDecoded());
	}
}, false);

function mouseDown(){
	mouseIsDown = true;
}

function mouseUp(){
	mouseIsDown = false;
}

function setColor(c){
	color = 255 - c;
}