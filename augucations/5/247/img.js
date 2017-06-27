// image class constructed with the image containing canvas
function img (source, container_canvas) {

    var self = this;

	this.canvas = container_canvas;
	this.context = this.canvas.getContext('2d');

	this.width = container_canvas.width;
	this.height = this.canvas.height;

    this.data = [];
    this.origData = [];
	this.histogram = new Array(256).fill(0);

    this.hMin;
    this.hMax;

    this.getMin = function() {
        var min = this.origData[0];
        for (var i = 0; i < this.origData.length; i += 4) {
            min = min < this.origData[i] ? min : this.origData[i];
        }
        return min;
    };

    this.getMax = function() {
        var max = this.origData[0];
        for (var i = 0; i < this.origData.length; i += 4) {
            max = max > this.origData[i] ? max : this.origData[i];
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

    // equalize the image acoording to the given range
    this.equalize = function(w_min, w_max) {

        for (var i = 0; i < this.origData.length; i += 4) {
            var f_prime = parseInt(((this.origData[i] - this.hMin) / (this.hMax - this.hMin)) * Math.abs(w_max - w_min) + Math.min(w_min, w_max));

            this.data[i] = f_prime;
            this.data[i + 1] = f_prime;
            this.data[i + 2] = f_prime;
        }

        // after image data changed, calculate new histogram
        this.calculateHistogram();
    };

    // called when image data was modified, draws the new image onto the canvas
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


    // initial: draws the image onto the canvas, stores image data and calls first equalization and drawing
    this.drawOnCanvasAndSaveData = function()
    {
        var imageToDraw = new Image;
        imageToDraw.onload = function() {

            // draw image
            self.context.drawImage(imageToDraw, 0, 0, imageToDraw.width, imageToDraw.height, 0, 0, self.canvas.width, self.canvas.height);

            // store pixel values
            self.data = self.context.getImageData(0, 0, self.width, self.height).data;
            self.alignRGBChannels();

            // store this data as origData
            for (var i = 0; i < self.data.length; i++) {
                self.origData[i] = self.data[i];
            }

            // calculate min and max once (later used for histogram equalization)
            self.hMin = self.getMin();
            self.hMax = self.getMax();

            // initial image and histogram creation
            self.equalize($('#histo_slider_min').val(), $('#histo_slider_max').val());
            self.drawNewOnCanvas();
        };
        imageToDraw.src = source;
	};

	this.calculateHistogram = function() {
        this.histogram.fill(0);

        // iterate over image and increase histogram bins
		for (var i = 0; i < this.data.length; i += 4) {
            this.histogram[this.data[i]]++;
        }

        // throw event (plotter reacts and plots new histogram)
        var event = new CustomEvent("calculatedHistogram");
        document.dispatchEvent(event);
	};

    this.drawOnCanvasAndSaveData();
	this.calculateHistogram();
}
