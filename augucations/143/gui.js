var div_bc = document.getElementById("bc");

var div_and = document.getElementById("ao_and");
var div_or = document.getElementById("ao_or");

var div_res_and = document.getElementById("ao_result_and");
var div_res_or = document.getElementById("ao_result_or");

var div_res = document.getElementById("resultContainer");

function fillDivs(b1, b2, res_and, res_or, res_and_b, res_or_b){

    // convert ints to binary and pad bitcodes with zeros
    b1 = b1.toString(2).lpad("0", 4);
    b2 = b2.toString(2).lpad("0", 4);

    // pad result bitcodes with zeros
    res_and = res_and.toString().lpad("0", 4);
    res_or = res_or.toString().lpad("0", 4);

    div_bc.innerHTML = "B1: " + color(b1, "dark_red") + "<br/>B2: " + color(b2, "blue");


    // equals or not equals, depending on the result
    var equals_and = res_and_b ? "&ne;" : "=";
    var equals_or = res_or_b ? "=" : "&ne;";

    div_and.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;" + color(b1, "dark_red") +
    					"<br/>AND " + color(b2, "blue") +
    					"<br/>&nbsp;&nbsp;&nbsp;&nbsp;----" +
    					"<br/>&nbsp;&nbsp;&nbsp;&nbsp;" + color(res_and, "dark_purple") +
    					"<br/>&nbsp;&nbsp;" +
                        "<br/>&nbsp;&nbsp;&nbsp;" + color(res_and, "dark_purple") + " " + equals_and + " 0000";

    div_or.innerHTML = "&nbsp;&nbsp;&nbsp;" + color(b1, "dark_red") +
    					"<br/>OR " + color(b2, "blue") +
    					"<br/>&nbsp;&nbsp;&nbsp;----" +
    					"<br/>&nbsp;&nbsp;&nbsp;" + color(res_or, "dark_purple") +
    					"<br/>&nbsp;&nbsp;" +
                        "<br/>&nbsp;&nbsp;&nbsp;" + color(res_or, "dark_purple") + " " + equals_or + " 0000";

    div_res_and.innerHTML = res_and_b ? "<br/>Die Linie liegt vollständig außerhalb." : "";
    div_res_or.innerHTML = res_or_b ? "<br/>Die Linie liegt vollständig innerhalb." : "";

    // final result sentence
    var result;
    if (res_and_b) result = "Die Linie liegt vollständig außerhalb des Bildbereiches und muss " + bold("nicht geclippt") + " werden.";
    else if (res_or_b) result = "Die Linie liegt vollständig innerhalb des Bildbereiches und muss " + bold("nicht geclippt") + " werden.";
    else result = "Die Linie liegt weder vollständig außerhalb noch innerhalb des Bildbereiches und muss " + bold("geclippt") + " werden.";
    div_res.innerHTML = result;
}

function color(text, color){
    return "<span style=\"color: var(--" + color + ")\">" + text + "</span>";
}

function bold(text){
    return "<span style=\"font-weight: bold\">" + text + "</span>";
}
