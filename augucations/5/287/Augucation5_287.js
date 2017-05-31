var pic_img,
	pic_canvas,
	canvas_ctx,
	img_data_orig_alles,
	img_data_orig,
	newImg,
	img_data_orig_padded,
	w,
	h,
	color_depth,
	filters,
	scales;

function main(){
	findElements();	
	
	resizeCanvas();
	
	readImageData(pic_img);
	
	applyFilter(Filters.EdgeV);
}

function findElements(){
	pic_img = document.getElementById("pic");
	pic_canvas = document.getElementById("pic_canvas");
	canvas_ctx = pic_canvas.getContext("2d");	
}

function resizeCanvas(){
	pic_canvas.width = 42; //pic_img.width;
	pic_canvas.height = 70; //pic_img.height;
}

function readImageData(image){
	
	// duplicate image from img to canvas
	canvas_ctx.drawImage(image, 0, 0, 42, 70);
	
	// get image data
	img_data_orig_alles = canvas_ctx.getImageData(0, 0, pic_canvas.width, pic_canvas.height);
	img_data_orig = img_data_orig_alles.data;
	
	w = img_data_orig_alles.width;
	h = img_data_orig_alles.height;
	color_depth = 4;
}
		
function drawNewImage(new_data){
				
	var big_data = canvas_ctx.createImageData(img_data_orig_alles.width, img_data_orig_alles.height);

	for (var i = 0; i < big_data.data.length; i++){
		big_data.data[i] = new_data[i]; //img_data_orig[i];
	}
	
	canvas_ctx.putImageData(big_data, 0, 0);
}	

function applyFilter(filter){
	
	var mask = filter.mask;
	var scale = filter.scale;
		
	var new_data = [];
	
	for (var y = 0; y < h; y++){
		for (var x = 0; x < w; x++){
			
			// Ignore alpha (c == 3)
			for (var c = 0; c < 3; c++){
				
				new_data.push( 
					( 
						  mask[0] * getPixelValue(img_data_orig, x - 2, y - 2, c)
						+ mask[1] * getPixelValue(img_data_orig, x - 1, y - 2, c)
						+ mask[2] * getPixelValue(img_data_orig, x    , y - 2, c)
						+ mask[3] * getPixelValue(img_data_orig, x + 1, y - 2, c)
						+ mask[4] * getPixelValue(img_data_orig, x + 2, y - 2, c)					
						
						+ mask[5] * getPixelValue(img_data_orig, x - 2, y - 1, c)
						+ mask[6] * getPixelValue(img_data_orig, x - 1, y - 1, c)
						+ mask[7] * getPixelValue(img_data_orig, x    , y - 1, c)
						+ mask[8] * getPixelValue(img_data_orig, x + 1, y - 1, c)
						+ mask[9] * getPixelValue(img_data_orig, x + 2, y - 1, c)
						
						+ mask[10] * getPixelValue(img_data_orig, x - 2, y    , c)
						+ mask[11] * getPixelValue(img_data_orig, x - 1, y    , c)
						+ mask[12] * getPixelValue(img_data_orig, x    , y    , c)
						+ mask[13] * getPixelValue(img_data_orig, x + 1, y    , c)
						+ mask[14] * getPixelValue(img_data_orig, x + 2, y    , c)
						
						+ mask[15] * getPixelValue(img_data_orig, x - 2, y + 1, c)
						+ mask[16] * getPixelValue(img_data_orig, x - 1, y + 1, c)
						+ mask[17] * getPixelValue(img_data_orig, x    , y + 1, c) 
						+ mask[18] * getPixelValue(img_data_orig, x + 1, y + 1, c) 
						+ mask[19] * getPixelValue(img_data_orig, x + 2, y + 1, c) 
						
						+ mask[20] * getPixelValue(img_data_orig, x - 2, y + 2, c)
						+ mask[21] * getPixelValue(img_data_orig, x - 1, y + 2, c)
						+ mask[22] * getPixelValue(img_data_orig, x    , y + 2, c) 
						+ mask[23] * getPixelValue(img_data_orig, x + 1, y + 2, c) 
						+ mask[24] * getPixelValue(img_data_orig, x + 2, y + 2, c) 
					)
					/ scale
				);
			}
			
			// Set alpha to 255
			new_data.push(255);
		}
	}
	
	new_data = interpretEdgeData(new_data);
					
	drawNewImage(new_data);
	
	//testImage(new_data);
}

function getMappedIndex(x, y, color){
	
	return (y * w + x) * color_depth + color;
}

function getPixelValue(img_data, x, y, color){
	
	var x_extended = x;
	var y_extended = y;
	
	if (x < 0)
		x_extended = 0;
	else if (x >= w)
		x_extended = w - 1;
		
	if (y < 0)
		y_extended = 0;
	else if (y >= h)
		y_extended = h - 1;
	
	return img_data[getMappedIndex(x_extended, y_extended, color)];
}

function interpretEdgeData(img_data){
	for (var i = 0; i < img_data.length; i++){
		
		// make it positive -> both directions
		// img_data[i] = Math.abs(img_data[i]);
		
		// clamp
		img_data[i] = Math.min(255, img_data[i]);
		
		// handle NaNs
		if (isNaN(img_data[i]))
			img_data[i] = 0;
	}
	
	return img_data;
}

function testImage(img_data){
	for (var i = 0; i < img_data.length; i++){
		
		if (isNaN(img_data[i]))
			console.log("NaN: ", i);
		
		if (img_data[i] <= 0)
			console.log("<=0: ", img_data[i]);
		
		if (img_data[i] > 255)
			console.log(">255: ", img_data[i]);
	}
}

function setFilter(filtername){
	applyFilter(Filters[filtername]);
}

main();