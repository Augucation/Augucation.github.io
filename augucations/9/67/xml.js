/*
var xt = "",
    h3OK = 1
function checkErrorXML(x)
{
    xt = ""
    h3OK = 1
    checkXML(x)
}

function checkXML(n)
{
    var l, i, nam
    nam = n.nodeName
    if (nam == "h3")
    {
        if (h3OK == 0)
    {
        return;
    }
    h3OK = 0
    }
    if (nam == "#text")
    {
        xt = xt + n.nodeValue + "\n"
        //console.log("nodeValue: ", n);
    }
    l = n.childNodes.length
    for (i = 0; i < l;i++)
    {
     checkXML(n.childNodes[i])
    }
}
*/

function XMLError (errorObj) {

    this.errString = errorObj.textContent;

    this.extractType = function() {

        // cut beginning
        var type = this.errString.substr(19);

        // cut ending
        type = type.split(".")[0];
        type = type.split("Location")[0];

        return type;
    }

    this.extractLine = function() {

        // cut beginning until after "number"
        var line = this.errString.split("Number ")[1];

        // cut ending
        line = line.split(",")[0];

        return line;
    }

    this.type = this.extractType();
    this.line = this.extractLine();

    console.log("type: ", this.type);
    console.log("line: ", this.line);
}

function checkWellformed() {
    var text, parser, xmlDoc;

    text =  $("#input").val();

    parser = new DOMParser();
    xmlDoc = parser.parseFromString(text,"text/xml");

    if (xmlDoc.getElementsByTagName("parsererror").length > 0) { // if there are any errors
        var err = XMLError(xmlDoc.getElementsByTagName("parsererror")[0]);
        displayResult(false, true);
    }
    else {
        //console.log("No errors");
        displayResult(true, true);
    }
}
