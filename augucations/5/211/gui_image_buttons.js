var count = img.images.length;

var wrapper = document.getElementById("image_button_wrapper");


for (var i = 0; i < count; i++){
	var btn = document.createElement('canvas');
	btn.className = "imagebutton";
	
	fillCanvas(btn, img.images[i], true);
	addEL(btn, i);
	
	wrapper.appendChild(btn);
}

function fillCanvas(canvas, data, scale){
	
	var ctx = canvas.getContext('2d');
	if (scale) ctx.scale(38, 19);
	
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
		data.data = Array.from(img.images[i]);
		updateCalculations();
		
		if (i == count - 1){
			randomizeLastImage();
			fillCanvas(btn, img.images[i], false);
		}
		
	}, false);
}


function setQuant(val){
	qData = quant.quants[val];
	
	data.setQ(qData);
	updateCalculations();
}

function addRandomizeListener(btn, i){
	btn.addEventListener("mousedown", function(e){
		fillCanvas(btn, img.images[i], false);
		randomizeLastImage();
	}, false);
}