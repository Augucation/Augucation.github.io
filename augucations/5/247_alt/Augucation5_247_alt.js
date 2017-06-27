var checks,
	button_gray,
	pic_img,
	pic_canvas,
	canvas_ctx,
	src_url = "../../../resources/img/haus_slideimg.png",
	plot,
	is_grayscale = true,
	check_wrapper,
	y_max;

function main(){
	findElements();
	checkAllCheckBoxes();
	
	drawAndReadImageOnCanvas(src_url, pic_canvas, canvas_ctx);
		
}

function findElements(){
	checks = document.getElementsByName("check_channel");
	button_gray = document.getElementById("button_gray");
	pic_canvas = document.getElementById("pic_canvas");
	pic_img = document.getElementById("pic");
	canvas_ctx = pic_canvas.getContext("2d");
	check_wrapper = document.getElementById("check_wrapper");
}

function checkAllCheckBoxes(){
	for (var i = 0; i < checks.length; i++){
		checks[i].checked = true;
	}
}
	
function drawAndReadImageOnCanvas(source, canvas, ctx){
	
	var img = new Image;
	img.onload = function(){
		ctx.drawImage(img, 0, 0);
		image = new Img(canvas);
		drawImageNew(image.gray, canvas_ctx);
	};
	img.src = source;
	
}

function setChannel(grayscale){
	
	if (!is_grayscale && grayscale)
	{
		plot.setData([image.plot_gray]);
		
		is_grayscale = true;
		button_gray.value = "RGB";
		check_wrapper.style.visibility = "hidden";
		drawImageNew(image.gray, canvas_ctx);
	}
	
	else if (is_grayscale || !grayscale)
	{
		if (checks[0].checked && checks[1].checked && checks[2].checked)	// RGB
			plot.setData([image.plot_r, image.plot_g, image.plot_b]);
		
		if (!checks[0].checked && !checks[1].checked && !checks[2].checked) // 0
			plot.setData([]);
		
		if (checks[0].checked && !checks[1].checked && !checks[2].checked)	// R
			plot.setData([image.plot_r]);
		
		if (!checks[0].checked && checks[1].checked && !checks[2].checked)	// G
			plot.setData([image.plot_g]);
		
		if (!checks[0].checked && !checks[1].checked && checks[2].checked)	// B
			plot.setData([image.plot_b]);
		
		if (checks[0].checked && checks[1].checked && !checks[2].checked)	// RG
			plot.setData([image.plot_r, image.plot_g]);
		
		if (checks[0].checked && !checks[1].checked && checks[2].checked)	// RB
			plot.setData([image.plot_r, image.plot_b]);
		
		if (!checks[0].checked && checks[1].checked && checks[2].checked) 	//GB
			plot.setData([image.plot_g, image.plot_b]);
				
		is_grayscale = false;
		button_gray.value = "Grauwert";
		check_wrapper.style.visibility = "visible";
		drawImageNew(image.rgba, canvas_ctx);
	}
	
	plot.draw();
				
		setChannel(true);
}

function equalizeHistogram(val){
	
	drawImageNew(equalize(is_grayscale, val), canvas_ctx);
	//drawImageNew(image.gray, canvas_ctx);
	plot.setData([image.plot_gray]);
	plot.draw();
}

$(function(){
		
	function plotIt()
	{
									
		data_rgb = [image.plot_r, image.plot_g, image.plot_b];
		data_gray = [image.plot_gray];
		
			
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
		
		plot = $.plot($("#mydiv"), data_gray, options);
		//plot.setData(data_rgb); // stupid hack for better y-axis scaling
		plot.draw();		
	}
	plotIt();
	
});

main();