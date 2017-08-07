function canvas_img(cnvs, data, size){

	this.canvas = cnvs;
	this.context = this.canvas.getContext('2d');
	this.context.scale(38, 19);
	this.data = data;
	this.size = size;

	this.fillCanvas = function(data) {
		
		if(data)
			this.data = data;
		
		for(var x = 0; x < this.size; x++) {
			for(var y = 0; y < this.size; y++) {
				this.setPixel(x, y, this.getPixel(x, y));
			}
		}
	};

	this.setPixel = function(x, y, color) {
		this.context.fillStyle = 'rgb(' + color + ',' + color + ',' + color + ')';
		this.context.fillRect(x, y, 1, 1);
	};

	this.getPixel = function(x,y) {
		return this.data[(y * this.size + x)]; // gray value from R channel (RGBA)
	};
	
	this.fillCanvas();
}