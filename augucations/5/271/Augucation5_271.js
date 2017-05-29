var histo_data,
	plotFunc = null,
	checks,
	channels = [1, 1, 1],
	plot,
	data,
	data_gray,
	is_grayscale,
	button_gray,
	pic_img,
	//pic_canvas,
	img_data_orig,
	img_ctx,
	//canvas_ctx,
	img_data_orig_alles,
	img_data_gray_histo;

function main(){
	findElements();
	checkAllCheckBoxes();
	
	buildImage();
	analyse(document.getElementById("pic"));
	
	//calcHistoData();
	//RGBtoGray();
	
	//calcHistoDataGray();
	
}

function findElements(){
	checks = document.getElementsByName("check_channel");
	button_gray = document.getElementById("button_gray");
	//pic_canvas = document.getElementById("pic_canvas");
	pic_img = document.getElementById("pic");
	//img_ctx = pic_img.getContext("2d");
	//canvas_ctx = pic_canvas.getContext("2d");
}

function checkAllCheckBoxes(){
	for (var i = 0; i < checks.length; i++){
		checks[i].checked = true;
	}
}
	
function calcHistoData(){
	
	// duplicate image from img to canvas
	canvas_ctx.drawImage(pic_img, 0, 0, pic_img.width, pic_img.height);
	
	// get image data
	img_data_orig_alles = canvas_ctx.getImageData(0, 0, pic_canvas.width, pic_canvas.height);
	img_data_orig = img_data_orig_alles.data;
}
	
function calcHistoDataGray(){
	img_data_gray_histo = new Array(256);
	
	// initialize with zeros
	for (var i = 0; i < img_data_gray_histo.length; i++){
		img_data_gray_histo[i] = [i, 0];
	}
		
	// add data
	for (var i = 0; i < img_data_gray.length; i += 4){
		img_data_gray_histo[img_data_gray[i]][1]++;
	}
	
	console.log(img_data_gray_histo);
	
}	
	
function RGBtoGray(){
		
	img_data_gray = new Array(img_data_orig.length);
	
	for (var i = 0; i < img_data_gray.length; i += 4){
		
		// weighted avarage
		avg = Math.round(img_data_orig[i]     * 0.2126
					   + img_data_orig[i + 1] * 0.7152
					   + img_data_orig[i + 2] * 0.0722);
		
		img_data_gray[i] 	 = avg;
		img_data_gray[i + 1] = avg;
		img_data_gray[i + 2] = avg;
		img_data_gray[i + 3] = img_data_orig[i + 3];
	}
	
	
	var img_data_gray_bla = canvas_ctx.createImageData(img_data_orig_alles.width, img_data_orig_alles.height);
	

	for (var i = 0; i < img_data_gray_bla.data.length; i++){
		img_data_gray_bla.data[i] = img_data_gray[i];
	}
	
	canvas_ctx.putImageData(img_data_gray_bla, 0, 0);
}	
	
function buildImage() {
	var img = new Image();
	//var img = document.getElementById("pic");
	var div = document.createElement("div");
	//document.body.appendChild(div);
	div.appendChild(img);
	img.onload = function(evt) {
	  var img = evt.target;
	  setTimeout(function() { 
		analyse(img);
	  }, 100);
	};
	img.src = "../../../resources/img/5_271_haus_2.jpg";
}

function analyse(img) {
		RGBAnalyse.analyse(img, { neutrals: 20, smoothing: 25, distance: 20 }, function(err, data) {
			  
			histo_data = data.analysis.rgb;
			plotFunc();
	});
};

var new_histo_data = new Array(3);
function convertHistoDataStructure(){
	
	
	var temp = new Array(histo_data.r.length);
	new_histo_data[0] = new Array(histo_data.r.length);
	new_histo_data[1] = new Array(histo_data.g.length);
	new_histo_data[2] = new Array(histo_data.b.length);
		
	for(var i = 0; i < histo_data.r.length; i++){
		new_histo_data[0][i] = [i, histo_data.r[i]];
	}
		
	for(var i = 0; i < histo_data.g.length; i++){
		new_histo_data[1][i] = [i, histo_data.g[i]];
	}
		
	for(var i = 0; i < histo_data.b.length; i++){
		new_histo_data[2][i] = [i, histo_data.b[i]];
	}
	
	// cheat
	new_histo_data[2][0][1] = 0;
	new_histo_data[0][255][1] = new_histo_data[0][254][1];
	
	calcDataGray();
}

function getMax(){
	var max = 0;
	var max_i = 0, max_j = 0;
	for (var i = 0; i < new_histo_data.length; i++){
		for (var j = 0; j < new_histo_data[i].length; j++){
				if (new_histo_data[i][j][1] > max){
					max = new_histo_data[i][j][1];
					max_i = i;
					max_j = j;
				}
		}
	}
	return max;
}

$(function(){
		
	function plotIt()
	{
			
			
		convertHistoDataStructure();
						
		data = [{ data: new_histo_data[0], bars:{ show: true, barWidth: 0.1, align: "center", order: 1}, color: "red"},
				{ data: new_histo_data[1], bars:{ show: true, barWidth: 0.1, align: "center", order: 2}, color: "green"},
				{ data: new_histo_data[2], bars:{ show: true, barWidth: 0.1, align: "center", order: 3}, color: "blue"},
			   ];
			   
		data_gray = { data: new_histo_data[3], bars:{ show: true, barWidth: 0.1, align: "center", order: 3}, color: "gray"};
		//data_gray = { data: img_data_gray_histo, bars:{ show: true, barWidth: 0.1, align: "center", order: 3}, color: "gray"};
		
			
		var options = {
			series: {
				bars: {
					show: true,
					lineWidth: 0.2,
				}
			},
			xaxis: 
			{
				mode: "time",
				ticks: [[0, "0"], [255, "255"]],
				min: 0,
				max: 255,
				font: {
					family: 'uhh',
					color: color_gray,
				}
			},
			yaxis: {
				ticks: []
			},
			legend: {
				show: false,
			},
			  grid: { 
				borderColor: color_gray,
				borderWidth: 1,
			  },
		};
		
		plot = $.plot($("#mydiv"), data, options);
	}
	plotIt();
	plotFunc = plotIt;
	
});

function setChannel(grayscale){
		
	if (!is_grayscale && grayscale)
	{
		plot.setData([]);
		addData(data_gray);
		//addData(img_data_gray_histo);
		
		is_grayscale = true;
		button_gray.value = "RGB";
	}
	
	else if (is_grayscale || !grayscale)
	{
		plot.setData([]);
		
		for (var i = 0; i < checks.length; i++)
		{
			if (checks[i].checked == true)
				addData(data[i]);
		}
		
		is_grayscale = false;
		button_gray.value = "Grauwert";
	}
	
	plot.draw();
}

function addData(d)
{
	var data = plot.getData();
	data.push(d);
	plot.setData(data);
}

function calcDataGray(){
	
	var arr = new Array(255);
	new_histo_data.push(arr);
	
	for (var i = 0; i < new_histo_data[3].length; i++){
		avg = (new_histo_data[0][i][1] + new_histo_data[1][i][1] + new_histo_data[2][i][1]) * 0.3;
		new_histo_data[3][i] = [i, avg];
	}
}

function equalizeHistogram(val){
	var range = 2.55 * val;
	var min = (255 - range) * 0.5;
	var max = min + range;
	
	// gray
	temp = new Array(255);
	
	
	for (var i = 0; i < 255; i++){
		temp[i] = new Array(2);
		temp[i] = [i, ((data_gray.data[i][1] - min) / (max - min)) * 255];
	}
	data_gray.data = temp;
	
	plot.setData([]);
	addData(data_gray);
	plot.draw();
}

main();