var lineHeight = 24; //height of a line in the textarea in px
var errLine = new errorLine($("#input"), lineHeight);

readTextFile("dtd.txt");

allowTabInTextarea("input");

function writeDTDInDiv (dtdText) {
    $("#dtd").text(dtdText.toString());
}

function displayResultValidity (isValid) {

    $("#valid").text(isValid ? "gültig" : "nicht gültig");
    $("#valid").attr("class", isValid ? "right" : "wrong");
}

function displayResultWellformness (err) {

    currentError = err;

    // wellformed if there is no error
    var isWellformed = (err == null);

    // give text feedback
    $("#wellformed").text(isWellformed ? "wohlgeformt" : "nicht wohlgeformt");
    $("#wellformed").attr("class", isWellformed ? "right" : "wrong");

    // give editor highlight feedback
    if (isWellformed)
        errLine.show(false);
    else
    {
        errLine.setLineNumber(correctLineNumber($("#input").val(), err));
        errLine.update();
        errLine.show(true);
    }
}

function correctLineNumber (text, err) {

    var lines = text.split("\n");

    // if the line above misses a >, the error should be there
    if (lines[err.line - 2].slice(-1) != ">") { // - 2 because line count starts as 1
        return err.line - 1;
    }
    else {
        return err.line;
    }
}

function updateInputScroll () {
    errLine.update();
}
