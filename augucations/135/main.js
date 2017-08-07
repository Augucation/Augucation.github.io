var lineHeight = calculateLineHeight($('#input')); //24; //height of a line in the textarea in px

var errLine = new errorLine($("#input"), lineHeight);

var errTipp = "";

var xmls = ["", ""]; // stores xml1 and xml2

var currentXML = 1;

var solved = [false, false]; // stores if xml1 and xml2 were solved already

readTextFile("dtd.txt", $("#dtd"), null);

readTextFile("example1.xml", $("#input"), 0);
readTextFile("example2.xml", null, 1);

allowTabInTextarea("input");

function calculateLineHeight(textarea) {

    var lineHeight;

    // firefox
    lineHeight = parseFloat($('#input').css('line-height'));

    // Chrome
    if (isNaN(lineHeight)){
        var magicNumber = 1.16;
        lineHeight = magicNumber * parseFloat($('#input').css('font-size'));
    }

    return lineHeight;
}

function writeToDiv (text, dest) {
    dest.text(text.toString());
}

function displayResultValidity (err) {

    $("#valid").text(err == null ? "gültig" : "nicht gültig");
    $("#valid").attr("class", err == null ? "right" : "wrong");

    // display tipp button, if tipp is available;
    errTipp = err;
    showTippButton(err);
    //$("#validMsg").html(err && tippShowing ? err : "");


    if (!err)
        solvedXML();
}

function showTipp (show) {

    $("#validMsg").html(errTipp && show ? errTipp : "");
}

function showTippButton (show) {
    $("#tipp").css("visibility", show ? "visible" : "hidden");
}

function solvedXML() {

    var otherXML = currentXML % 2 + 1;

    // if the current XML was solved already, do nothing
    if (solved[currentXML - 1])
        return;

    // mark the current XML as solved
    solved[currentXML - 1] = true;

    // show check mark
    console.log("check mark: ", $("#" + currentXML + "_solved"));
    $("#" + currentXML + "_solved").css('visibility', 'visible'); //visibility = "visible";

    // if other xml was not solved already, ask to switch to next one
    // alert if both were solved
    if (!solved[otherXML - 1]) {
        if (confirm("Diese XML ist korrekt! Weiter zum nächsten Beispiel?"))
            changeXML(otherXML);
    }
    else {
        alert("Herzlichen Glückwunsch, du hast beide Beispiele gelöst!");
    }
}

function displayResultWellformness (err) {

    currentError = err;

    // wellformed if there is no error
    var isWellformed = (err == null);

    // give text feedback
    $("#wellformed").text(isWellformed ? "wohlgeformt" : "nicht wohlgeformt");
    $("#wellformed").attr("class", isWellformed ? "right" : "wrong");

    // give editor highlight feedback
    /*
    if (isWellformed)
        errLine.show(false);
    else
    {
        errLine.setLineNumber(correctLineNumber($("#input").val(), err));
        errLine.update();
        errLine.show(true);

        // if not well-formed, don't show validity feedback and hide the tipp button
        $("#valid").text("");
        showTippButton(false);
    }
    */

    if (!isWellformed) {
        $("#valid").text("");
        showTippButton(false);
    }

    // if the error line could not be extracted correctly, don't show the line
    if (err != null && err.line == undefined) {
        //errLine.show(false);
    }
}

function correctLineNumber (text, err) {

    var lines = text.split("\n");

    // if the line above misses a >, the error should be there
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



function changeXML (num) {

    // if current xml is clicked, do nothing
    if (num == currentXML)
        return;

    // hightlight the current xml tab (visual feedback)
    hightLightXMLTab(num);

    // don't display any feedback (until next check)
    resetFeedBack();

    // store current XML (including user's changes) to display it later again
    storeCurrentXML ();

    // write new xml into the input text area
    $("#input").val(xmls[num - 1]);

    currentXML = num;
}

function hightLightXMLTab (num) {

    var active_num = num;
    var inactive_num = num % 2 + 1;

    $("#labelXML" + active_num).toggleClass("inactive");
    $("#labelXML" + inactive_num).toggleClass("inactive");
}

function resetFeedBack() {

    $("#wellformed").text("");
    $("#valid").text("");
    $("#validMsg").html("");
    showTippButton(false);

    console.log("reseeeeeeeeeeeeeeeet");
}

function storeCurrentXML () {

    // save current xml's text
    xmls[currentXML - 1] = $("#input").val();
}
