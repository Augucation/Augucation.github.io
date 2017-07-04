
// list of all allowed element names
var elementNames = ["filmsammlung", "film", "titel", "haupttitel", "untertitel", "genre", "animationsstudio", "darsteller", "vorname", "nachname"];

var forbiddenPCDATAElements = ["<", ">", "&gt;"];

function checkValidity(xml) {

    var err = null;

    console.log(xml);

    // check for invalid elements
    var allElements = xml.getElementsByTagName("*");

    for (var i = 0; i < allElements.length; i++) {

        // invalid tagNames
        if (elementNames.indexOf(allElements[i].tagName) == -1) { // elementNames doesn't contain tagName
            if (err == null) err = "Ungültiges Element: " + allElements[i].tagName;
            console.log("err: ", err);

            displayResultValidity(err);
            return;
        }

        // pcadata
        if (allElements[i].tagName == "haupttitel") // haupttitel allows cdata
            continue;

        if (allElements[i].childNodes.length > 1) // only check elements without childNodes
            continue;

        var c = allElements[i].innerHTML; // get innerHTML content

        // check for all forbidden elements if they are in the string
        for (var j = 0; j < forbiddenPCDATAElements.length; j++) {

            console.log(c.indexOf(forbiddenPCDATAElements[j]) > -1);
            if (c.indexOf(forbiddenPCDATAElements[j]) > -1) {
                if (err == null) err = "Element enthält CDATA";
                console.log("err: ", err);

                displayResultValidity(err);
                return;
            }
        }
    }

    // childNodes[1] = <filmsammlung>
    if (xml.childNodes[1] == null || xml.childNodes[1].tagName != "filmsammlung") {
        if (err == null ) err = "Fehlende Filmsammlung";
        console.log("err: ", err);
    }

    // error if IDs are not unique
    if (!checkIDSingularity(xml.childNodes[1])) {
        if (err == null) err = "Ungültige ID";
        console.log("err: ", err);
    }

    // <filmsammlung>:
    //    - n = 1, 3, ... undendlich viele ungerade childNodes[n] = <film>
    for (var i = 1; i < xml.childNodes[1].childNodes.length; i += 2) {
        if (!checkNumber(xml.childNodes[1], "film", 0, Number.MAX_VALUE)) {
            if (err == null) err = "Ungültige Anzahl an Filmen";
            console.log("err: ", err);
        }

        if (xml.childNodes[1].childNodes[i].tagName != "film") {
            if (err == null ) err = "Fehlender Film";
            console.log("err: ", err);
        }
    }

    //<film>:
    //    - childNodes[0] = <titel>
    //    - childNodes[1] = <genre>
    //    - childNodes[2] = <animationsstudio> oder <darsteller>
    //    - childNodes[3++] = nichts oder <darsteller>

    // for each film
    for (var i = 1; i < xml.childNodes[1].childNodes.length; i += 2) {
        var film = xml.childNodes[1].childNodes[i];

        if (!checkNumber(film, "titel", 1, 1)) {
            if (err == null) err = "Ungültige Anzahl an Titeln";
            console.log("err: ", err);
        }

        if (film.childNodes[1] == null || film.childNodes[1].tagName != "titel") {
            if (err == null ) err = "Fehlender Titel";
            console.log("err: ", err);
        }

        if (film.childNodes[3] == null || film.childNodes[3].tagName != "genre") {
            if (film.childNodes[3].tagName == "titel") {
                if (err == null ) err = "Ungültige Anzahl an Titeln";
                console.log("err: ", err);
            }
            else {
                if (err == null ) err = "Fehlendes Genre";
                console.log("err: ", err);
            }
        }

        if (film.childNodes[5] == null || film.childNodes[5].tagName != "animationsstudio" && film.childNodes[5].tagName != "darsteller") {

            if (film.childNodes[5] != null && film.childNodes[5].tagName == "genre") {
                if (err == null ) err = "Ungültige Anzahl an Genres";
                console.log("err: ", err);
            }
            else {
                if (err == null ) err = "Fehlendes Animationsstudio/Darsteller";
                console.log("err: ", err);
            }
        }

        // if there is an animationsstudio, there can only be one animationsstudio and no darsteller
        if (film.childNodes[5] == null || film.childNodes[5].tagName == "animationsstudio") {

            if (!checkNumber(film, "animationsstudio", 1, 1)) {
                if (err == null) err = "Ungültige Anzahl an Animationsstudios";
                console.log("err: ", err);
            }

            if (!checkNumber(film, "darsteller", 0, 0)) {
                if (err == null) err = "Ungültiges Element: Darsteller";
                console.log("err: ", err);
            }
        }

        // if there is a darsteller, there can't be an animationsstudio
        if (film.childNodes[5] == null || film.childNodes[5].tagName == "darsteller") {

            if (!checkNumber(film, "animationsstudio", 0, 0)) {
                if (err == null) err = "Ungültiges Element: Animationsstudio";
                console.log("err: ", err);
            }
        }

        // multiple darsteller
        for (var j = 5; j < film.childNodes.length; j += 2) {

            // exit loop when element is an animationsstudio
            if (film.childNodes[5].tagName == "animationsstudio")
                break;

            if (film.childNodes[j] == null || film.childNodes[j] != null && film.childNodes[j].tagName != "darsteller") {
                if (err == null ) err = "Unerlaubtes Element nach Animationsstudio/Darsteller";
                console.log("err: ", err);
            }


            //<darsteller>:
            //  - childNodes[last] = <nachname>
            //  - davor: beliebig viele <vorname>
            if (film.childNodes[j] != null) {


                // nachname
                var secondLastChild = film.childNodes[j].childNodes[film.childNodes[j].childNodes.length - 2];
                if (secondLastChild == null || secondLastChild.tagName != "nachname") {

                    // if the secondLastChild isn't a nachname, but other siblings are, the order is wrong
                    if (checkNumber(film.childNodes[j], "nachname", 1, 1)) {
                        if (err == null) err = "Ungültiges Element nach Nachname";
                        console.log("err: ", err);
                    }


                    if (err == null ) err = "Fehlender Nachname";
                    console.log("err: ", err);
                }

                // vorname
                // iterate backwards from nachname over all vornames
                for (var k = film.childNodes[j].childNodes.length - 4; k > 0; k =- 2) {

                    var vn = film.childNodes[j].childNodes[k];
                    if (vn == null || vn.tagName != "vorname") {
                        if (vn.tagName == "nachname") {
                            if (err == null) err = "Ungültige Anzahl an Nachnamen";
                            console.log("err: ", err);
                        }
                        else {
                            if (err == null ) err = "Fehlender Vorname";
                            console.log("err: ", err);
                        }
                    }
                }
            }
        }


        // <titel>:
        //    - childNodes[0] = <haupttitel>
        //    - childNodes[1] = nichts oder <untertitel>
        if (film.childNodes[1].childNodes[1] == null || film.childNodes[1].childNodes[1].tagName != "haupttitel") {
            if (err == null ) err = "Fehlender Haupttitel";
            console.log("err: ", err);
        }

        // untertitel is optional, so it can be null without an error. However, only check it if it's not null to avoid undefined errors
        if (film.childNodes[1].childNodes[3] != null) {

            if (!checkNumber(film.childNodes[1], "untertitel", 0, 1)) {
                if (err == null) err = "Ungültige Anzhal an Untertiteln";
                console.log("err: ", err);
            }

            if (film.childNodes[1].childNodes[3].tagName != "untertitel" || film.childNodes[1].childNodes[5] != null) {

                if (!checkNumber(film.childNodes[1], "haupttitel", 1, 1)) {
                    if (err == null) err = "Ungültige Anzhal an Haupttiteln";
                    console.log("err: ", err);
                }

                if (err == null ) err = "Unerlaubtes Element nach Haupttitel";
                console.log("err: ", err);
            }
        }
    }

    displayResultValidity(err);
}

function getXMLID (elem) {

    if (elem == null)
        return;

    var outerHTML = elem.outerHTML;

    // cut beginning
    outerHTML = outerHTML.split("\"")[1];

    // cut rest
    outerHTML = outerHTML.split("\"")[0];

    return outerHTML;
}

function checkIDSingularity (parent) {

    var IDs = [];
    for (var i = 1; parent.childNodes.length; i +=2 ) {

        var id = getXMLID(parent.childNodes[i]);

        if (id == null)
            break;

        // check for duplicates
        if (IDs.indexOf(id) > -1) {
            return false;
        }
        else {
            IDs.push(id);
        }
    }
    return true;
}

function checkNumber (parent, name, min, max) {

    var count = 0;

    for (var i = 0; i < parent.childNodes.length - 1; i++) {
        if (parent.childNodes[i].tagName == name)
            count++;
    }

    if (name == "nachndsdame") {
        console.log("name: ", name);
        console.log("parent: ", parent);
        console.log("min: ", min);
        console.log("max: ", max);
        console.log("count: ", count);
        console.log("valid: ", (count >= min && count <= max));
    }

    return (count >= min && count <= max);
}
