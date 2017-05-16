var colorpicker,
	current_colorpicker_elem,
	hovering_element,
	hovering_colorpicker,
	color_names = 
	{
		"red" : "Rot",
		"blue" : "Blau",
		"green" : "Gr%FCn",
		"cyan" : "Cyan" ,
		"magenta" : "Magenta",
		"yellow" : "Gelb",
		"black" : "Schwarz",
		"white" : "Wei%DF"
	};

function init(){
	findElements();
}

function findElements(){
	colorpicker = document.getElementById("colorpicker");
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
}

init();
