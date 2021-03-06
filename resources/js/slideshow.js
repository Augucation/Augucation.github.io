var pdfDoc = null,
	pageNum = 1,
	pageRendering = false,
	pageNumPending = null,
	scale = 1.5; //10; //0.8,
	canvas = document.getElementById('the-canvas'),
	prevBtn = document.getElementById("prev"),
	nextBtn = document.getElementById("next"),
	pageNumText = document.getElementById("page_num");
	augBtn = document.getElementById("augBtn"),
	pageCounter = document.getElementById("page_num_count"),
	loadingText = document.getElementById("loading"),
	menu = document.getElementById("menu");
	menuBtnContainer = document.getElementById("menuBtnContainer");
	ctx = canvas.getContext('2d'),
	topic = 1;

// array that stores page numbers and titles of augmented slides sorted by topic
var augucations = [

	// 1 - 6: lectures

	// topic 1: signals
	[
		[30, "Analoge Signale"],
		[45, "Diskretisierung und Quantisierung"],
		[55, "Fouriertransformation"],
		[56, "Abtasttheorem"],
		[135, "Lauflängenkodierung"],
		[142, "Lempel Ziv Welch"]
	],

	// topic 2: audio
	[
		[10, "Video: Audio-Experiment mit Wasser"],
		[25, "Video: Hörbares Spektrum"],
		[27, "Lautstärke"],
		[47, "Psychoakustik"],
		[58, "Video: Der Prozess des Hörens"],
		[64, "Video: Virtual Barber Shop"],
		[89, "Maskierung"],
		[162, "Frequenz-Filter"],
		[177, "Interferenzen: Konstruktiv und Dekonstruktiv"],
		[180, "Interferenzen: Schwebung"],
		[181, "Phasenverschiebung"]
	],

	// topic 3
	[
		[],
	],

	// topic 4
	[
		[],
	],

	// topic 5
	[
		[19, "Absorption"],
		[211, "DCT"],
		[247, "Histogrammausgleich"],
		[256, "Filter"]
	],

	// topic 6
	[
		[3, "Video: The Muybridge Movement Movie"],
		[11, "Scheinbewegung"],
		[16, "video: Bewegungsillusion"],
		[25, "Video: Zeilensprungverfahren"],
		[75, "Video: Kontinuitätsfehler"],
		[78, "Video: Räumliche Kontinuität"],
		[95, "Video: L-Schnitt und J-Schnitt"],
		[99, "Video: Effekte"],
	],


	// 7++: excercises

	// topic 7: audio excercise
	[
		[21, "Video: Autotune Remix"],
		[22, "Video: No Autotune"],
		[23, "Video: Loudness War"],
		[25, "Video: Hall"],
	],

	// topic 8
	[
		[11, "Absorption"],
	],

	// topic 9: internet 1
	[
		[52, "XML"],
	],

	// topic 10: internet 2
	[
		[9, "CSS"],
		[30, "HTML und JS"]
	]
];

var augucationButtons = new Array();

loadAndRenderPDF();
manageMenuButtons();
addPrevNextPageInput();

function setPageNum(num){
	pageNum = num;
}

function renderPage(num){

	pageRendering = true;

	pdfDoc.getPage(num).then(function(page){
		var viewport = page.getViewport(scale);
			// Set dimensions to Canvas
			canvas.height = viewport.height;
			canvas.width = viewport.width;

		// Prepare object needed by render method
		var renderContext = {
			canvasContext: ctx,
			viewport: viewport
		};
		var renderTask = page.render(renderContext);

		//Wait for rendering to finish
		renderTask.promise.then(function(){
			pageRendering = false;
			if(pageNumPending !== null){
				//New page rendering is pending
				renderPage(pageNumPending);
				pageNumPending = null;
			}
		});
	});

	//Upadate page counters
	pageNumText.value = pageNum;

	enableGUIElement(loadingText, false);
}

/*
 * If another page rendering in progress, waits until the rendering is finished.
 * Otherwise, executes rendering immediately.
 */
function queueRenderPage(num){
	if(pageRendering){
		pageNumPending = num;
		console.log("pageRendering");
	}
	else{
		renderPage(num);
	}
}

/*
 * Displays previous page
 */
function onPrevPage(){
	if(pageNum <= 1){
		return;
	}
	pageNum--;
	update();
	queueRenderPage(pageNum);
}
document.getElementById('prev').addEventListener('click', onPrevPage);


/*
 * Displays previous page
 */
function onNextPage(){

	if(pageNum >= pdfDoc.numPages){
		return;
	}
	pageNum++;
	update();
	queueRenderPage(pageNum);
}
document.getElementById('next').addEventListener('click', onNextPage);


/*
 * Is called when a page number is written in the number text field
 * Go to the wished page
 */
function newPage(e){
	if(e.keyCode != 13) { //enter key
		return;
	}

	p = parseInt(pageNumText.value, 10);

	// if the input is invalid, reset field to current page number
	if(isNaN(p) || p < 1 || p > pdfDoc.numPages){
		pageNumText.value = pageNum;
		return;
	}

	pageNum = p;

	update();
	queueRenderPage(pageNum);
}


function loadAndRenderPDF(){
	enableGUIElement(loadingText, true);
	getTopicAndPageNumFromURL();
	/*
	 * Asynchronously downloads PDF
	 */
	PDFJS.getDocument(url).then(function(pdfDoc_){
		pdfDoc = pdfDoc_;
		document.getElementById('page_count').textContent = pdfDoc.numPages;

		// Initial/first page rendering
		renderPage(pageNum);
	});
}

function enableGUIElement(elem, enable){
	if(elem == null)
		return;
	elem.style.visibility = enable ? "initial" : "hidden";
	// Jul, wenn Element ganz weg sein soll und kein blank space gelassen werden soll, dann nimm display statt visibility!
}

function showSlides(show){

	//enable/disable GUI elements
	enableGUIElement(prevBtn, show);
	enableGUIElement(nextBtn, show);
	enableGUIElement(pageCounter, show);
	enableGUIElement(canvas, show);

	if(!show)
		return;

	//if pdf is not loaded yet, load it
	if(pdfDoc == null){
		loadAndRenderPDF();
	}
	else{
		renderPage(pageNum);
	}
}

function StartAugucation(){

	url = "augucations/" + topic + "/" + pageNum + "/Augucation" + topic + "_" + pageNum + ".html";
	//if(fileExists(url))
		window.location = url;
}

/*
 * !!!!! UPDATE !!!!!
 *
 * This function is now implemented in augucation_list.js and opens the
 * interaction list instead of the slide show.
 *

 * old:
	called from augucation htmls
	open index.html with topic and page encoded as url parameters
function CloseAugucation(top, page){

	window.location="../../../index.html?" + top + "&" + page;

	topic = top;
	pageNum = page;
}
*/

function getTopicAndPageNumFromURL(){

	var params = window.location.search.substring(1).split("&");

	topic = params[0] != "" ? params[0] : 1;
	url = "resources/slides/im-0" + topic + ".pdf";

	var n = parseInt(params[1]);
	if(n > 0)
		pageNum = n;

	update();
}

// checks for available augucations
function update(){

	enableGUIElement(augBtn, false);

	// check if there are any augucations for the current topic
	if(!augucations[topic-1])
		return;

	for(var i = 0; i < augucations[topic-1].length; i++){
		if(augucations[topic-1][i].includes(pageNum))
			enableGUIElement(augBtn, true);
	}
}

function fileExists(url) {
    if(url){
        var req = new XMLHttpRequest();
        req.open('GET', url, false);
        req.send();
        return req.status==200;
    } else {
        return false;
    }
}

// adds a button for each available augucation to the menu
function fillMenuWithButtons(){

	// create button template
	var btn = document.createElement("input");
	btn.type = "submit";
	btn.className = "menuAugBtn";

	// create br template
	var br = document.createElement("br");

	augucationButtons = new Array(augucations[topic-1].length);

	for(var i = 0; i < augucationButtons.length; i++)
	{
		augucationButtons[i] = btn.cloneNode(true);
		augucationButtons[i].id = "menuAugBtn" + i;
		augucationButtons[i].value = augucations[topic-1][i][1];
		menuBtnContainer.appendChild(augucationButtons[i]);
		menuBtnContainer.appendChild(br.cloneNode(true));
	}
}

function showMenu(){
    menu.style.width = "20%";
	enableGUIElement(document.getElementById("menuCloseBtn"), true);
	enableGUIElement(document.getElementById("menuBtn"), false);
	enableGUIElement(menuBtnContainer, true);
}

function hideMenu(){
    menu.style.width = "0%";
	enableGUIElement(document.getElementById("menuCloseBtn"), false);
	enableGUIElement(document.getElementById("menuBtn"), true);
	enableGUIElement(menuBtnContainer, false);
}

function manageMenuButtons(){

	hideMenu();
	fillMenuWithButtons();

	for(var i = 0; i < augucationButtons.length; i++)
	{
		augucationButtons[i].addEventListener("click", StartAugucationFromMenu, false);
		augucationButtons[i].index = i;
	}

	// add Eventlistener to hide menu when an outside click is detected
	document.body.onclick = function(e)
	{
		if(e.target != menu && e.target != menuBtn)
			hideMenu();
	}
}

function StartAugucationFromMenu(evt){

	var index = evt.target.index;

	pageNum = augucations[topic-1][index][0];
	StartAugucation();
}

function addPrevNextPageInput(){

	document.addEventListener('keydown', function(event)
	{
		if(pageNumText == document.activeElement)
			return;

		if(event.keyCode == 37) {
			onPrevPage();
		}
		else if(event.keyCode == 39) {
			onNextPage();
    }
});}
