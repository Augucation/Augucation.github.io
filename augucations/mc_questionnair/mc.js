var topic = 1,
	pageNum = 1,
	questions = new Array(),
	questURL = "mc_questions.csv";
	
	
function init(){
	getTopicAndPageNumFromURL();
	parseData(questURL, useData);
}
	
function getTopicAndPageNumFromURL(){
	var params = window.location.search.substring(1).split("&");
	
	topic = params[0] != "" ? params[0] : 1;
   
	var n = parseInt(params[1]);
	if(n > 0)
		pageNum = n;
}

function useData(data) {
	
	pickCurrentQuestions(data);
	fillInQuestions();
	
}

function pickCurrentQuestions(data){
	
	// store current questions (current topic and pageNum in questions)
	
	for (var i = 0; i < data.length; i++)
	{
		if (data[i].Foliensatz == topic && data[i].Seitenzahl == pageNum)
			questions.push(data[i]);
	}
}

function fillInQuestions(){
	
	// get big container_div
	
	var mc_container = document.getElementById("mc_container");
	
	
	// create templates
	
	var container_div = document.createElement("div");
	container_div.className = "question_container";
	
	var question_span = document.createElement("span");
	question_span.className = "question";
	
	var answer_container_div = document.createElement("div");
	answer_container_div.className = "answer_container";
	
	var fieldset = document.createElement("fieldset");
	
	var answer_input = document.createElement("input");
	answer_input.type = "radio";
	
	var answer_label = document.createElement("label");
	
	var br = document.createElement("br");
	
	
	// add elements
	
	for (var i = 0; i < questions.length; i++)
	{
		
		// clone and append elements
		
		var c_d = container_div.cloneNode(true);
		mc_container.insertBefore(c_d, mc_container.childNodes[1]); // add container before check button
		
		var q_s = question_span.cloneNode(true);
		c_d.appendChild(q_s);
		
		var a_c = answer_container_div.cloneNode(true);
		c_d.appendChild(a_c);
		
		var f = fieldset.cloneNode(true);
		a_c.appendChild(f);
		
		var a_i = new Array(4);
		var a_l = new Array(4);
		
		for (var j = 0; j < a_i.length; j++)
		{
			a_i[j] = answer_input.cloneNode(true);
			f.appendChild(a_i[j]);
			a_l[j] = answer_label.cloneNode(true);
			f.appendChild(a_l[j]);
			
			f.appendChild(br.cloneNode(true));
			
		}
		
	
		// fill with data and connect fieldset components
		
		q_s.innerHTML = questions[i].Frage;
		
		for (var j = 0; j < a_i.length; j++)
		{
			a_i[j].id = i + "_" + j;
			a_i[j].name = "q" + i;
			a_i[j].value = j;
			
			a_l[j].innerHTML = questions[i]["Antwort" + j];
			a_l[j].htmlFor = a_i[j].id;			
		}
	
	}	
	
}

function parseData(url, callBack) {
    Papa.parse(url, {
        download: true,
        dynamicTyping: true,
		header: true,
		skipEmptyLines: true,
        complete: function(results) {
            callBack(results.data);
        }
    });
}

function check()
{
	
}

init();