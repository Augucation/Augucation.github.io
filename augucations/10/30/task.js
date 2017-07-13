function task(text, hint, html, js) {

    this.text = text;
    this.hint = hint;

    this.html = html;
    this.js = js;

    tasks.push(this);
}

// stores all created tasks
var tasks = new Array();

function createTasks () {
    new task (
        "Füge das Bild \"kaese.jpg\" ein.",
        "Bild einfügen:\n<img src=\"path\"/>",
        "",
        ""
    );

    new task(
        "Erstelle folgendene Elemente: Hauptüberschrift, Unterüberschrift, Paragraph, Unterüberschrift, Paragraph.",
        "Erste Überschrift:\n<h1>...</h1>\n\nZweite Überschrift:\n<h2>...</h2>\n\nParagraph:\n<p>...</p>",
        "",
        ""
    );

    new task(
        "Ergänze die gegebene Tabelle um die Spalte \"Zustand\" und deklariere die erste Zeile als Kopfzeile (table header).",
        "",
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
        ""
    );

    new task("", "", "", "");
    new task("", "", "", "");
    new task("", "", "", "");
    new task("", "", "", "");
    new task("", "", "", "");
    new task("", "", "", "");
    new task("", "", "", "");
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
