function data(data, size){
	
	this.data = data;
	this.size = size;
	
	var f = [];
	var fprime = [];
	var decoded = [];
	
	var q = [];
		
	this.setQ = function(qdata){
		q = qdata;
	}

	this.calculateF = function(u, v) {
		var result = 0;
		for(var x = 0; x < this.size; x++) {
			for(var y = 0; y < this.size; y++) {
				result += (this.getNormalizedPixel(x,y) * Math.cos((2*x + 1) * u * Math.PI / 16) * Math.cos((2*y + 1) * v * Math.PI / 16));
			}
		}
		
		var cu = 1;
		if(u == 0) cu = 1 / Math.SQRT2;
		
		var cv = 1;
		if(v == 0) cv = 1 / Math.SQRT2;
		
		result = result * cu * cv / 4;
		
		return result;
	};
		
	this.requant = function(x, y){
			return this.getFprime(x, y) * this.getQ(x, y);
	}
	
	this.calculateInverseDCT = function(u, v){
		var result = 0;
		
		var cu = 1;
		if(u == 0) cu = 1 / Math.SQRT2;
		
		var cv = 1;
		if(v == 0) cv = 1 / Math.SQRT2;
		
		for(var x = 0; x < this.size; x++) {
			for(var y = 0; y < this.size; y++) {
				result += (cu * cv * this.getFprime(x, y) * Math.cos((2*x + 1) * u * Math.PI / 16) * Math.cos((2*y + 1) * v * Math.PI / 16));
			}
		}
		
		result = Math.round(result / 4 * this.getQ(u, v) + 128);
		
		return result;	
	}
		 
	this.getPixel = function(x,y) {
		return this.data[(y * this.size + x)]; // gray value from R channel (RGBA)
	};
	
	this.getNormalizedPixel = function(x, y) {
		return this.getPixel(x, y) - 128;
	};
	
	this.getQ = function(x, y) {
		
		// return value of q by index or whole q
		if(x != null && y != null)
			return q[x + y * this.size];
		else
			return q;
    };
	
	this.calculateEverything = function(){
		f = [];
		fprime = [];
		
		inverseDCT = [];
		decoded = [];
		
		// encode
		for (var x = 0; x < this.size; x++){
			for (var y = 0; y < this.size; y++){
				f.push(Math.round(this.calculateF(x, y) * 100) / 100);
				fprime.push(Math.round(this.calculateF(x, y) / this.getQ(x, y)));	
			}
		}
		
		// decode
		for (var x = 0; x < this.size; x++){
			for (var y = 0; y < this.size; y++){	
				decoded.push(this.calculateInverseDCT(x, y)); 
			}
		}
	};
	
	this.getF = function(x, y){
		
		// return value of q by index or whole q
		if(x != null && y != null)
			return f[x + y * this.size];
		else
			return f;
	};
	
	this.getFprime = function(x, y){
		
		// return value of q by index or whole q
		if(x != null && y != null)
			return fprime[x + y * this.size];
		else
			return fprime;
	};

	this.getDecoded = function(){
		return decoded;
	}

	this.changePixel = function(x, y, c){
		this.data[(y * this.size + x)] = c;
		this.calculateEverything();
	}
}