var lineHeight = 24; //height of a line in the textarea in px
var errLine = new errorLine($("#input"), lineHeight);

readTextFile("dtd.txt", $("#dtd"));
readTextFile("example2.xml", $("#input"));


allowTabInTextarea("input");

function writeDTDInDiv (text, dest) {
    dest.text(text.toString());
}

function displayResultValidity (err) {

    $("#valid").text(err == null ? "gültig" : "nicht gültig");
    $("#valid").attr("class", err == null ? "right" : "wrong");

    // display error message

    $("#validMsg").html(err ? err : "");
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

        // if not well-formed, don't show validity feedback
        $("#valid").text("");
    }
}

function correctLineNumber (text, err) {

    var lines = text.split("\n");
    console.log("err: ", err);
    /////////////////////////////////////////////////////
    // if the line above misses a >, the error should be there
    console.log("lines[err.line - 2]: ", lines[err.line - 2]);
    if (lines[err.line - 2] != null && lines[err.line - 2].slice(-1) != ">") { // - 2 because line count starts as 1
        return err.line - 1;
    }
    else {
        return err.line;
    }
}

function updateInputScroll () {
    errLine.update();
}

// remove error line when input is changed
$("#input").on("keydown", function () {
    errLine.show(false);
});
