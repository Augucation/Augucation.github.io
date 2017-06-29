function compile()
{
    // get html code from html editor
    var html = $($("#editor_html").val());

    // get js code from js editor
    //var js = $($("#editor_js").val().toString()); //jquery not working??
    var js = document.getElementById("editor_js").value;

    // fill result div with html
    $("#result").empty().append(html);

    // add js code as script
    addScript(js);
}

function addScript(script)
{
    var s = document.createElement("script");
    s.innerHTML = script;
    document.body.appendChild(s);
}

$("#task").text("Füge das Bild \"kaese.jpg\" ein.");
