// image class constructed with the image containing canvas
function img (source, container_canvas) {

    var self = this;

	this.canvas = container_canvas;
	this.context = this.canvas.getContext('2d');

	this.width = container_canvas.width;
	this.height = this.canvas.height;

    this.data = [];
	this.histogramm = [];

    this.min;
    this.max;

    this.getMin = function() {
        var min = this.data[0];
        for (var i = 0; i < this.data.length; i += 4) {
            min = min < this.data[i] ? min : this.data[i];
        }
        return min;
    };

    this.getMax = function() {
        var max = this.data[0];
        for (var i = 0; i < this.data.length; i += 4) {
            max = max > this.data[i] ? max : this.data[i];
        }
        return max;
    };

    // set R, G and B channel for each pixel on it's average
    this.alignRGBChannels = function() {
        for (var i = 0; i < this.data.length; i += 4) {
            var r = this.data[i];
            var g = this.data[i + 1];
            var b = this.data[i + 2];

            var avg = parseInt((r + g + b) / 3);

            this.data[i] = avg;
            this.data[i + 1] = avg;
            this.data[i + 2] = avg;
        }
    };

    this.equalize = function(w_min, w_max) {
        var h_min = this.getMin();
        var h_max = this.getMax();

        for (var i = 0; i < this.data.length; i += 4) {
            var f_prime = parseInt(((this.data[i] - h_min) / (h_max - h_min)) * (w_max - w_min) + w_min);

            this.data[i] = f_prime;
            this.data[i + 1] = f_prime;
            this.data[i + 2] = f_prime;
        }
    };

    this.drawNewOnCanvas = function() {

        // create new ImageData object
        var new_imageData = this.context.createImageData(this.width, this.height);

        // copy the modified data to the ImageData's data
        for (var i = 0; i < this.data.length; i++) {
            new_imageData.data[i] = this.data[i];
        }

        // draw the ImageData on the canvas
        this.context.putImageData(new_imageData, 0, 0);
    };

    this.drawOnCanvasAndSaveData = function()
    {
        var imageToDraw = new Image;
        imageToDraw.onload = function() {

            // draw image
            self.context.drawImage(imageToDraw, 0, 0, imageToDraw.width, imageToDraw.height, 0, 0, self.canvas.width, self.canvas.height);

            // store pixel values
            self.data = self.context.getImageData(0, 0, self.width, self.height).data;
            self.alignRGBChannels();

            self.equalize(0, 55);

            self.drawNewOnCanvas();
        };
        imageToDraw.src = source;
	};

	this.calculateHistogram = function() {
		//for (var i = 0; i < this.)
	};

    this.drawOnCanvasAndSaveData();
	this.calculateHistogram();
}
