function Img(canvas){
	
	var ctx = canvas.getContext("2d");
	
	this.whole_data = ctx.getImageData(0, 0, canvas.width, canvas.height);
		
	this.rgba = this.whole_data.data;
	this.width = this.whole_data.width;
	this.height = this.whole_data.height;
	
	this.gray = RGBA2Gray(this.rgba);
	
	this.rgb_histo = RGBA2Histo(this.rgba);
	this.gray_histo = Gray2Histo(this.gray);
			
	setPlotData(this);
}

function RGBA2Gray(data){
	
	var gray_data = [];
	
	for (var i = 0; i < data.length; i += 4){
		
		var avg = parseInt((data[i] + data[i + 1] + data[i + 2]) / 3);
		
		gray_data[i] = avg;
		gray_data[i + 1] = avg;
		gray_data[i + 2] = avg;
		gray_data[i + 3] = 255; // alpha
	}
	
	return gray_data;
}

function RGBA2Histo(data){
	
	var histo = [];
	histo[0] =[];
	histo[1] = [];
	histo[2] = [];
	
	// initialize 
	for (var i = 0; i < histo.length; i++){
		for (var j = 0; j < 256; j++){
			histo[i][j] = [j, 0];
		}
	}
	
	// red
	for (var i = 0; i < data.length; i += 4){
		histo[0][data[i]][1]++;
	}
	
	// green
	for (var i = 1; i < data.length; i += 4){
		histo[1][data[i]][1]++;
	}
	
	// blue
	for (var i = 2; i < data.length; i += 4){
		histo[2][data[i]][1]++;
	}
	
	return histo;
}

function Gray2Histo(data){
	
	console.log("Gray2Histo data: ", data);
	
	var histo = [];
	
	// initialize
	for (var i = 0; i < 256; i++){
		histo[i] = [i, 0];
	}
	
	for (var i = 0; i < data.length; i += 4){
		histo[data[i]][1]++;
	}
	
	return histo;
}

function setPlotData(img){
	img.plot_r =  { data: img.rgb_histo[0], bars:{ show: true, barWidth: 0.1, align: "center", order: 1}, color: "red"};
	img.plot_g =  { data: img.rgb_histo[1], bars:{ show: true, barWidth: 0.1, align: "center", order: 2}, color: "green"};
	img.plot_b =  { data: img.rgb_histo[2], bars:{ show: true, barWidth: 0.1, align: "center", order: 3}, color: "blue"};
	img.plot_gray = { data: img.gray_histo, bars:{ show: true, barWidth: 0.1, align: "center", order: 3}, color: "gray"};		
}

function drawImageNew(d, ctx){
		
	var new_data = ctx.createImageData(image.width, image.height);
	
	for (var i = 0; i < d.length; i++){
		new_data.data[i] = d[i];
	}
		
	ctx.putImageData(new_data, 0, 0);
}

function equalize(is_gray, val, ctx){

		
	var orig_data = is_gray ? image.gray : image.rgba;
	var orig_histo = is_gray ? image.gray_histo : image.rgb_histo;
	
	var new_data = [];
	var new_image_data = [];
	
	var min = getMin(orig_data);
	var max = getMax(orig_data);	
	
	var range = 2.55 * val;
	var dest_min = (255 - range) * 0.5;
	var dest_max = dest_min + range;
	
	var pix_count = image.width * image.height;
	
	if (is_gray){
		
		var probabilities = [];
		for (var i = 0; i < orig_histo.length; i++){
			probabilities[i] = (orig_histo[i][1] / pix_count);
		}
		
		var cumulative_probabilities = [];
		cumulative_probabilities[0] = probabilities[0];
		for (var i = 1; i < probabilities.length; i++){
			cumulative_probabilities[i] = cumulative_probabilities[i - 1] + probabilities[i];
		}
	
		for (var i = 0; i < cumulative_probabilities.length; i++){
			cumulative_probabilities[i] = Math.floor(cumulative_probabilities[i] * range + dest_min);
		}
		
		for (var i = 0; i < orig_histo.length; i++){
			new_data[i] = [ cumulative_probabilities[i], orig_histo[i][1]];
		}
		
		for (var i = 0; i < orig_data.length; i += 4){
			var new_histo_value = new_data[orig_histo[orig_data[i]][0]][0];
						
			new_image_data[i] = new_histo_value;
			new_image_data[i + 1] = new_histo_value;
			new_image_data[i + 2] = new_histo_value;
			new_image_data[i + 3] = 255;
		}
	}
	
	/*
	if (!is_gray){
		return;
		for (var c = 0; c < 3; c++){
			var probabilities = [];
			for (var i = 0; i < orig_histo[c].length; i++){
				probabilities[i] = (orig_histo[c][i][1] / pix_count);
			}
			
			var cumulative_probabilities = [];
			cumulative_probabilities[0] = probabilities[0];
			for (var i = 1; i < probabilities.length; i++){
				cumulative_probabilities[i] = cumulative_probabilities[i - 1] + probabilities[i];
			}
		
			for (var i = 0; i < cumulative_probabilities.length; i++){
				cumulative_probabilities[i] = Math.floor(cumulative_probabilities[i] * range + dest_min);
			}
						
			for (var i = 0; i < orig_histo[c].length; i++){
				new_data[i] = [ cumulative_probabilities[i], orig_histo[c][i][1]];
			}
			
			for (var i = 0; i < orig_data.length; i += 4){
				var new_histo_value = new_data[orig_histo[c][orig_data[i]][0]][0];
							
				new_image_data[4 * i + c] = new_histo_value;
			}			
		}
	}
	*/
	
	image.gray_histo = new_data;
	setPlotData(image);	
	
	return new_image_data;
}

function getMin(d){
	
	var min = d[0];
	
	for (var i = 0; i < d.length; i++){
		min = Math.min(min, d[i]);
	}
	
	return min;
}

function getMax(d){
	
	var max = 0;
	
	for (var i = 0; i < d.length; i++){
		max = Math.max(max, d[i]);
	}
	
	return max;
}

var image;
