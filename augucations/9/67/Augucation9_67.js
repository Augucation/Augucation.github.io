var lineHeight = 24; //height of a line in the textarea in px

readTextFile("dtd.txt");

function writeDTDInDiv(dtdText) {
    $("#dtd").text(dtdText.toString());
}

function displayResultValidity(isValid) {

    $("#valid").text(isValid ? "gültig" : "nicht gültig");
    $("#valid").attr("class", isValid ? "right" : "wrong");
}

function displayResultWellformness(err) {

    // wellformed if there is no error
    var isWellformed = (err == null);

    // give text feedback
    $("#wellformed").text(isWellformed ? "wohlgeformt" : "nicht wohlgeformt");
    $("#wellformed").attr("class", isWellformed ? "right" : "wrong");

    // give editor highlight feedback
    if (isWellformed)
        colorLine($("#input"), null, null);
    else
        colorLine($("#input"), err.line, err.type);
}

function colorLine(textarea, number, errorType)
{
    // for certain errors: highlight the line above the given line
    //if (errorType != null && errorType.localeCompare("not well-formed"))
        //number--;

    // no background if there is no error
    textarea.attr("class", number == 0 ? "noError" : "");

    var yPos = lineHeight * (number - 1); // - 1 because line count starts at 1
    textarea.css("background-position", "0px " + yPos);
}
