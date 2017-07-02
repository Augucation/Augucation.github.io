function checkValidity(xml) {

    var err = null;

    console.log(xml);

    // childNodes[1] = <filmsammlung>
    if (xml.childNodes[1] == null || xml.childNodes[1].tagName != "filmsammlung") {
        err = "no filmsammlung";
        console.log("err: ", err);
    }

    // <filmsammlung>:
    //    - n = 1, 3, ... undendlich viele ungerade childNodes[n] = <film>
    for (var i = 1; i < xml.childNodes[1].childNodes.length; i += 2) {
        if (xml.childNodes[1].childNodes[i].tagName != "film") {
            err = "no film";
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

        if (film.childNodes[1] == null || film.childNodes[1].tagName != "titel") {
            err = "no titel";
            console.log("err: ", err);
        }

        if (film.childNodes[3] == null || film.childNodes[3].tagName != "genre") {
            err = "no genre";
            console.log("err: ", err);
        }

        if (film.childNodes[5] == null || film.childNodes[5].tagName != "animationsstudio" && film.childNodes[5].tagName != "darsteller") {
            err = "no animationsstudio or darsteller";
            console.log("err: ", err);
        }

        // multiple darsteller
        for (var j = 7; j < film.childNodes.length; j += 2) {
            if (film.childNodes[j] == null || film.childNodes[j] != null && film.childNodes[j].tagName != "darsteller") {
                err = "unerlaubter node nach darsteller/titel";
                console.log("err: ", err);
            }
        }
    }


    /*



    <titel>:
        - childNodes[0] = <haupttitel>
        - childNodes[1] = nichts oder <untertitel>

    <darsteller>:
        - childNodes[last] = <nachname>
        - davor: beliebig viele <vorname>



    */
}
