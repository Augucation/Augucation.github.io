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
        if (line != null)
            line = line.split(",")[0];


        // Chrome:
        if (line == undefined) {

            // cut beginning
            line = this.errString.split("error on line ")[1];

            // cut ending
            line = line.split(" ")[0];
        }

        return line;
    }

    this.type = this.extractType();
    this.line = this.extractLine();
}

function checkWellformed() {
    var text, parser, xmlDoc;

    text =  $("#input").val();

    parser = new DOMParser();
    xmlDoc = parser.parseFromString(text,"text/xml");

    if (xmlDoc.getElementsByTagName("parsererror").length > 0) { // if there are any errors
        var xmlErr = new XMLError(xmlDoc.getElementsByTagName("parsererror")[0]);
        displayResultWellformness(xmlErr);
    }
    else {
        displayResultWellformness(null);

        //if well-formed, check for validity
        checkValidity(xmlDoc);
    }
}
