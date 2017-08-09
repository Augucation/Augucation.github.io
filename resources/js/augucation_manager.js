/*
* URL looks like this: augucation.github.io/list.html?10
* extracts number after "?" and opens corresponding interaction via url
*/
function createAndOpenInteractionUrl()
{
    var url = window.location.search;
    var param = parseInt(url.split("?")[1]);

	if (isNaN(param))
        return;

	param += 100; // hacky dacky facky macky

    window.location.href = "augucations/" + param + "/" + "interaction.html";
}

createAndOpenInteractionUrl();
