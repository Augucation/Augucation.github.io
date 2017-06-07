var count = img.images.length;

var wrapper = document.getElementById("image_button_wrapper");


for (var i = 0; i < count; i++){
	var btn = document.createElement('canvas');
	btn.className = "imagebutton";
	
	fillCanvas(btn, img.images[i]);
	addEL(btn, i);
	
	wrapper.appendChild(btn);
}

function fillCanvas(canvas, data){
	
	var ctx = canvas.getContext('2d');
	ctx.scale(37, 19);
	
	for(var x = 0; x < this.size; x++) {
		for(var y = 0; y < this.size; y++) {
				setPixel(ctx, x, y, data[y * 8 + x]);
		}
	}

	function setPixel(ctx, x, y, color) {
		ctx.fillStyle = 'rgb(' + color + ',' + color + ',' + color + ')';
		ctx.fillRect(x, y, 1, 1);
	}
}

function addEL(btn, i){
	
	btn.addEventListener("mousedown", function(e){
		image_orig.fillCanvas(img.images[i]);
		data.data = img.images[i];
		updateCalculations();
	}, false);
}
