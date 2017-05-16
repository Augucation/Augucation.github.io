var colorpicker,
	current_colorpicker_elem,
	hovering_element,
	hovering_colorpicker,
	arrows,
	
	color_names = {
		"red" 		: "Rot",
		"blue" 		: "Blau",
		"green" 	: "Gr%FCn",
		"cyan" 		: "Cyan" ,
		"magenta" 	: "Magenta",
		"yellow" 	: "Gelb",
		"black" 	: "Schwarz",
		"white" 	: "Wei%DF"
	},
	
	color_codes = {
		"red" 		: [1, 0, 0],
		"blue" 		: [0, 0, 1],
		"green" 	: [0, 1, 0],
		"cyan" 		: [0, 1, 1],
		"magenta" 	: [1, 0, 1],
		"yellow" 	: [1, 1, 0],
		"black" 	: [0, 0, 0],
		"white" 	: [1, 1, 1]
	},
	
	light = [
		[1, 1, 1], // 0 between filter 0 and paper
		[1, 1, 1], // 1 between filter 1 and paper
		[1, 1, 1], // 2 between paper and filter 2
		[1, 1, 1], // 3 after filter 2
	],
	
	filterColors = [ // rgb
		[1, 1, 1], // filter 0
		[1, 1, 1], // filter 1
		[1, 1, 1], // paper
		[1, 1, 1], // filter 2
	];

function init(){
	findElements();
}

function findElements(){
	colorpicker = document.getElementById("colorpicker");
	arrows = document.getElementsByClassName("absorp");
}

function setFilterColor(id, color){
	switch (id){
		case "filter0":
			filterColors[0] = color_codes[color];
			break;
		case "filter1":
			filterColors[1] = color_codes[color];
			break;
		case "paper":
			filterColors[2] = color_codes[color];
			break;
		case "filter2":
			filterColors[3] = color_codes[color];
			break;
	}
}

function calculateAbsorption(color){
	
	light[0] = filterColors[0];
	
	light[1] = filterColors[1];
				
	light[2][0] = (filterColors[2][0] && (light[0][0] || light[1][0])) ? 1 : 0;
	light[2][1] = (filterColors[2][1] && (light[0][1] || light[1][1])) ? 1 : 0;
	light[2][2] = (filterColors[2][2] && (light[0][2] || light[1][2])) ? 1 : 0;
	
	light[3][0] = filterColors[3][0] && light[2][0] ? 1 : 0;
	light[3][1] = filterColors[3][1] && light[2][1] ? 1 : 0;
	light[3][2] = filterColors[3][2] && light[2][2] ? 1 : 0;
}

function visualizeAbsorption(){
	for (var i = 0; i < light.length; i++){
		for (var j = 0; j < 3; j++){
			arrows[i * 3 + j].style.visibility = light[i][j] ? "visible" : "hidden";
		}
	}
}

function openColorpicker(id){
	current_colorpicker_elem = document.getElementById(id);
	current_colorpicker_elem.appendChild(colorpicker);
	colorpicker.style.visibility = "visible";
}

function closeColorpicker(){
	colorpicker.style.visibility = "hidden";
}

function hoverElement(hover, id){
	hovering_element = hover;
	
	if(hovering_element)
		openColorpicker(id);
	
	if(!hovering_element && !hovering_colorpicker)
		closeColorpicker();
}

function hoverColorpicker(hover){
	hovering_colorpicker = hover;
	
}

function changeColor(color){
	current_colorpicker_elem.className = "filter " + color;
	current_colorpicker_elem.innerHTML = unescape(color_names[color]);
	
	// small hack, because the color picker is closed when a color is picked
	openColorpicker(current_colorpicker_elem.id);
	
	setFilterColor(current_colorpicker_elem.id, color);
	
	calculateAbsorption(color);
	visualizeAbsorption();
}

init();
