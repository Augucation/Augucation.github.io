function Img(canvas){
	
	var ctx = canvas.getContext("2d");
	
	this.whole_data = ctx.getImageData(0, 0, canvas.width, canvas.height);
		
	this.rgba = this.whole_data.data;
	this.width = this.whole_data.width;
	this.height = this.whole_data.height;
	
	this.gray = RGBA2Gray(this.rgba);
	
	this.rgb_histo = RGBA2Histo(this.rgba);
	this.gray_histo = Gray2Histo(this.gray);
		
	this.plot_r =  { data: this.rgb_histo[0], bars:{ show: true, barWidth: 0.1, align: "center", order: 1}, color: "red"};
	this.plot_g =  { data: this.rgb_histo[1], bars:{ show: true, barWidth: 0.1, align: "center", order: 2}, color: "green"};
	this.plot_b =  { data: this.rgb_histo[2], bars:{ show: true, barWidth: 0.1, align: "center", order: 3}, color: "blue"};
	this.plot_gray = { data: this.gray_histo, bars:{ show: true, barWidth: 0.1, align: "center", order: 3}, color: "gray"};
	
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

function drawImageNew(d, ctx){
		
	var new_data = ctx.createImageData(image.width, image.height);
	
	for (var i = 0; i < d.length; i++){
		new_data.data[i] = d[i];
	}
		
	ctx.putImageData(new_data, 0, 0);
}

var image;
