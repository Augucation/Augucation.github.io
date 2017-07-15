function task(text, hint, html, js, solution_html, solution_js) {

    this.text = text;
    this.hint = hint;

    this.html = html;
    this.js = js;

    this.solution_html = solution_html;
    this.solution_js = solution_js;

    tasks.push(this);
}

// stores all created tasks
var tasks = new Array();

function createTasks () {
    new task (
        "Füge das Bild \"kaese.jpg\" mit einer Breite von 640 und einer Höhe von 426 ein.",
        "Bildelement:\n" +
        "<img />\n\n" +
        "Quelle:\n" +
        "src=\"..\"\n\n" +
        "Breite:\n" +
        "width=\"..\"\n\n" +
        "Höhe:\n" +
        "height=\"..\"\n\n",

        "",

        "",

        "<img src=\"kaese.jpg\" width=\"640\" height=\"426\"/>",

        ""
    );

    new task(
        "Gib den Elementen die entsprechenden Elementtypen.",

        "Erste Überschrift:\n<h1>...</h1>\n\nZweite Überschrift:\n<h2>...</h2>\n\nParagraph:\n<p>...</p>",

        "<p>Große Hauptüberschrift!</p>\n" +
        "<p>Kleinere Unterüberschrift</p>\n" +
        "<p>Paragraph.</p>\n" +
        "<p>Kleinere Unterüberschrift</p>\n" +
        "<p>Paragraph.</p>\n",

        "",

        "<h1>Große Hauptüberschrift!</h1>\n" +
        "<h2>Kleinere Unterüberschrift</h2>\n" +
        "<p>Paragraph.</p>\n" +
        "<h2>Kleinere Unterüberschrift</h2>\n" +
        "<p>Paragraph.</p>\n",

        ""
    );

    new task(
        "Ergänze die gegebene Tabelle um die Spalte \"Zustand\" und deklariere die erste Zeile als Kopfzeile (table header).",

        "Tabelle:\n" +
        "<table>\n\n" +
        "Zeile (table row):\n" +
        "<tr>\n\n" +
        "Zelle (table data):\n" +
        "<td>\n\n" +
        "Kopfzeilenelement (table header):\n" +
        "<th>\n",

        "<table>\n" +
        "  <tr>\n" +
        "    <td>Produkt</td>\n" +
        "    <td>Preis</td>\n" +
        "  </tr>\n" +
        "  <tr>\n" +
        "    <td>Fernseher</td>\n" +
        "    <td>700€</td>\n" +
        "  </tr>\n" +
        "  <tr>\n" +
        "    <td>Smartphone</td>\n" +
        "    <td>100€</td>\n" +
        "  </tr>\n" +
        "</table>",

        "",

        "<table>\n" +
        "  <tr>\n" +
        "    <th>Produkt</th>\n" +
        "    <th>Preis</th>\n" +
        "    <th>Zustand</th>\n" +
        "  </tr>\n" +
        "  <tr>\n" +
        "    <td>Fernseher</td>\n" +
        "    <td>700€</td>\n" +
        "    <td>gebraucht</td>\n" +
        "  </tr>\n" +
        "  <tr>\n" +
        "    <td>Smartphone</td>\n" +
        "    <td>100€</td>\n" +
        "    <td>neu</td>\n" +
        "  </tr>\n" +
        "</table>",

        ""
    );

    new task(
        "Verlinke die Website \"https://www.google.de\" durch einen Hyperlink mit dem Inhalt \"Google\".",

        "Verweis:\n" +
        "<a>\n\n" +
        "Hyperlinkreferenz:\n" +
        "href=\"...\"",

        "",

        "",

        "<a href=\"https://www.google.de\">Google</a>",

        ""
    );

    new task(
        "Erstelle einen Button mit der Aufschrift \"Click\", der die Funktion \"f()\" aufruft.",
        "Eingabeelement:\n" +
        "<input/>\n\n" +
        "Typ:\n" +
        "type=\"...\"\n\n" +
        "Aufschrift:\n" +
        "value=\"...\"\n\n" +
        "Bei Click auszuführender Javascript Code:\n" +
        "onclick=\"...\"",

        "",

        "function f()\n" +
        "{\n" +
        "  alert(\"Mööööp.\");\n" +
        "}",

        "<input type=\"button\" value=\"Click\" onclick=\"f();\"/>",

        ""
    );

    new task(
        "Erstelle ein 500 x 500 großes SVG-Element mit einem pink gefüllten und grün umrandeten Quadrat mit einer Kantenlänge von 50 und einem rot gefüllten Kreis mit einem Radius von 40 mit dem Mittelpunkt an der Position (100, 50).",

        "SVG-Element:\n" +
        "<svg/>\n\n" +
        "Rechteck-Element:\n" +
        "<rect/>\n\n" +
        "Kreis-Element:\n" +
        "<circle/>\n\n" +
        "Breite:\n" +
        "width=\"...\"\n\n" +
        "Höhe:\n" +
        "height=\"...\"\n\n" +
        "Füllfarbe:\n" +
        "fill=\"...\"\n\n" +
        "Umrandungsfarbe:\n" +
        "stroke=\"...\"\n\n" +
        "Radius:\n" +
        "r=\"...\"\n\n" +
        "x-Koordinate des Mittelpunkts:\n" +
        "cx=\"...\"\n\n" +
        "y-Koordinate des Mittelpunkts:\n" +
        "cy=\"...\"\n\n",

        "",

        "",

        "<svg width=\"500\" height=\"500\">\n" +
        "  <rect fill=\"pink\" stroke=\"green\" width=\"50\" height=\"50\"/>\n" +
        "  <circle fill=\"red\" r=\"40\" cx=\"100\" cy=\"50\"/>\n" +
        "</svg>\n",

        ""
    );

    new task(
        "Vervollständige die Funtion increment(), die den Inhalt des Elements mit der Id \"counter\" liest, um 1 inkrementiert und auf den neuen Wert setzt.",

        "Inhalt eines Elements:\n" +
        "element.innerHTML\n\n" +
        "Zum Integer parsen:\n" +
        "parseInt()",

        "<p id=\"counter\">0</p>\n" +
        "<input type=\"button\" value=\"+ 1\" onclick=\"increment();\"/>",

        "var counter = document.getElementById(\"counter\");\n\n" +
        "function increment()\n" +
        "{\n" +
        "  //TODO: Inhalt von counter lesen, um 1 inkrementieren, Inhalt von counter auf neuen Wert setzen\n" +
        "}",

        "<p id=\"counter\">0</p>\n" +
        "<input type=\"button\" value=\"+ 1\" onclick=\"increment();\"/>",

        "var counter = document.getElementById(\"counter\");\n\n" +
        "function increment()\n" +
        "{\n" +
        "  counter.innerHTML = parseInt(counter.innerHTML) + 1;\n" +
        "}"
    );

    new task (
        "Gib dem Bildelement einen weiteren Eventlistener, der dem Click-Event die Funktion \"button_press()\" anhängt.",

        "",

        "<img id=\"button_image\" src=\"button_red_off.png\" width=\"400\" height=\"400\"/>",

        "var button_image = document.getElementById(\"button_image\");\n\n" +
        "function button_on ()\n" +
        "{\n" +
        "  button_image.src = \"button_red_on.png\";\n" +
        "}\n\n" +
        "function button_off ()\n" +
        "{\n" +
        "  button_image.src = \"button_red_off.png\";\n" +
        "}\n\n" +
        "function button_press ()\n" +
        "{\n" +
        "  button_image.src = \"button_green_on.png\";\n" +
        "}\n\n" +
        "button_image.addEventListener(\"mouseenter\", function () {\n" +
        "  button_on();\n" +
        "});\n\n" +
        "button_image.addEventListener(\"mouseleave\", function () {\n" +
        "  button_off();\n" +
        "});",

        "<img id=\"button_image\" src=\"button_red_off.png\" width=\"400\" height=\"400\"/>",

        "var button_image = document.getElementById(\"button_image\");\n\n" +
        "function button_on ()\n" +
        "{\n" +
        "  button_image.src = \"button_red_on.png\";\n" +
        "}\n\n" +
        "function button_off ()\n" +
        "{\n" +
        "  button_image.src = \"button_red_off.png\";\n" +
        "}\n\n" +
        "function button_press ()\n" +
        "{\n" +
        "  button_image.src = \"button_green_on.png\";\n" +
        "}\n\n" +
        "button_image.addEventListener(\"mouseenter\", function () {\n" +
        "  button_on();\n" +
        "});\n\n" +
        "button_image.addEventListener(\"mouseleave\", function () {\n" +
        "  button_off();\n" +
        "});\n\n" +
        "button_image.addEventListener(\"click\", function () {\n" +
        "  button_press();\n" +
        "});",

        ""
    );
}

function setTask(idx)
{
    var t = tasks[idx];

    clearResult();

    // Show the task as text
    $("#task").text(t.text);

    // Set the hint
    $("#tipText").text(t.hint);

    // Fill the editors with code
    $("#editor_html").val(t.html);
    $("#editor_js").val(t.js);
}

document.addEventListener("newTask", function (e) {
    setTask(e.detail.idx);
});
