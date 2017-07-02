readTextFile("dtd.txt");

function writeDTDInDiv(dtdText) {
    $("#dtd").text(dtdText.toString());
}

function displayResult(isWellformed, isValid) {
    $("#wellformed").text(isWellformed ? "wohlgeformt" : "nicht wohlgeformt");
    $("#wellformed").attr("class", isWellformed ? "right" : "wrong");

    $("#valid").text(isValid ? "gültig" : "nicht gültig");
    $("#valid").attr("class", isValid ? "right" : "wrong");
}
