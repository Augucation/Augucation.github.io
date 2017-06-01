var pic_img,
	pic_canvas,
	canvas_ctx,
	img_data_orig_alles,
	img_data_orig;

function main(){
	findElements();	
	
	resizeCanvas();
	
	readImageData();
	drawNewImage(img_data_orig);
	
	//applyFilter();
}

function findElements(){
	pic_img = document.getElementById("pic");
	pic_canvas = document.getElementById("pic_canvas");
	canvas_ctx = pic_canvas.getContext("2d");
}

function resizeCanvas(){
	pic_canvas.width = pic_img.width;
	pic_canvas.height = pic_img.height;
}

function readImageData(){
	
	// get image data
	img_data_orig_alles = canvas_ctx.getImageData(0, 0, pic_canvas.width, pic_canvas.height);
	img_data_orig = img_data_orig_alles.data;
}
		
function drawNewImage(new_data){
	
	// duplicate image from img to canvas
	canvas_ctx.drawImage(pic_img, 0, 0, pic_canvas.width, pic_canvas.height);
				
	var big_data = canvas_ctx.createImageData(img_data_orig_alles.width, img_data_orig_alles.height);

	for (var i = 0; i < big_data.data.length; i++){
		big_data.data[i] = new_data[i]; //img_data_orig[i];
	}
	
	canvas_ctx.putImageData(big_data, 0, 0);
}	

function applyFilter(filter){
	
	var new_data = img_data_orig;
	drawNewImage(new_data);
}

main();