var topic = 1,
	pageNum = 1,
	questions = new Array()
	questURL = "/mc_questions.csv";
	
	
function init(){
	getTopicAndPageNumFromURL();
	loadQuestionsFromURL();
}
	
function getTopicAndPageNumFromURL(){
	var params = window.location.search.substring(1).split("&");
	
	topic = params[0] != "" ? params[0] : 1;
   
	var n = parseInt(params[1]);
	if(n > 0)
		pageNum = n;
}

function loadQuestionsFromURL(){
	var data = Papa.parse(questURL, 
		{
			download: true
		});
	console.log(data);
}

init();