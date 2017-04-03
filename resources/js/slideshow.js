// URL of PDF document
//var url = "resources/slides/dummy_slides.pdf";

var pdfDoc = null,
	pageNum = 1,
	pageRendering = false,
	pageNumPending = null,
	scale = 1; //10; //0.8,
	canvas = document.getElementById('the-canvas'),
	prevBtn = document.getElementById("prev"),
	nextBtn = document.getElementById("next"),
	pageNumText = document.getElementById("page_num");
	augBtn = document.getElementById("augBtn"),
	pageCounter = document.getElementById("page_num_count"),
	loadingText = document.getElementById("loading"),
	ctx = canvas.getContext('2d'),
	topic = 1;

// array that stores which slides per topic are augmented
var augucations = [
	[31, 46, 56, 57],
	[0],
	[0],
	[0],
	[0],
	[0]
];	
	
loadAndRenderPDF();
manageMenuButtons();

function setPageNum(num){
	pageNum = num;
}

function renderPage(num){
	
	//resizeCanvas();
	
	pageRendering = true;

	pdfDoc.getPage(num).then(function(page){
		var viewport = page.getViewport(scale);
			// Set dimensions to Canvas
			canvas.height = viewport.height;
			canvas.width = viewport.width;
			//canvas.height = window.innerHeight;
			//canvas.width = window.innerWidth;


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
	
	console.log("onNextPage pageNum: ", pageNum);
	
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
	
	console.log("p: ", p, "\n pageNum: ", pageNum);
	
	update();
	queueRenderPage(pageNum);
}


function loadAndRenderPDF(){
	enableGUIElement(loadingText, true);
	getTopicFromURL();
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
	//showSlides(false);
	
	console.log("Show Augucation!");

	url = "augucations/" + topic + "/" + pageNum + "/Augucation" + topic + "_" + pageNum + ".html";
	//if(fileExists(url))
		window.location = url;
}

function CloseAugucation(top, page){
	
	window.location="../../../index.html?" + top;
	
	topic = top;
	pageNum = page;
	
	//onNextPage();
	//showSlides(true);
}

function getTopicFromURL(){
   topic = window.location.search.substring(1);
   url = "resources/slides/im-0" + topic + ".pdf";
}

// checks for available augucations 
function update(){
	if (augucations[topic-1].includes(pageNum))
		enableGUIElement(augBtn, true);
	else
		enableGUIElement(augBtn, false);
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

function showMenu(){
    document.getElementById("menu").style.width = "20%";
	enableGUIElement(document.getElementById("menuCloseBtn"), true);
	enableGUIElement(document.getElementById("menuBtn"), false);
	enableGUIElement(document.getElementById("menuAugBtn0"), true);
	enableGUIElement(document.getElementById("menuAugBtn1"), true);
	enableGUIElement(document.getElementById("menuAugBtn2"), true);
}

function hideMenu(){
    document.getElementById("menu").style.width = "0%";
	enableGUIElement(document.getElementById("menuCloseBtn"), false);
	enableGUIElement(document.getElementById("menuBtn"), true);
	enableGUIElement(document.getElementById("menuAugBtn0"), false);
	enableGUIElement(document.getElementById("menuAugBtn1"), false);
	enableGUIElement(document.getElementById("menuAugBtn2"), false);
}

function manageMenuButtons(){
	document.getElementById("menuAugBtn0").addEventListener("click", function() {StartAugucationFromMenu(0);});
	document.getElementById("menuAugBtn1").addEventListener("click", function() {StartAugucationFromMenu(1);});
	document.getElementById("menuAugBtn2").addEventListener("click", function() {StartAugucationFromMenu(2);});
}

function StartAugucationFromMenu(index){
	pageNum = augucations[topic-1][index];
	StartAugucation();
}