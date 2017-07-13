function task(text, hint) {

    this.text = text;
    this.hint = hint;

    tasks.push(this);
}

// stores all created tasks
var tasks = new Array();


var taskOne = new task("Füge das Bild \"kaese.jpg\" ein.", "Bild einfügen:\n<img src=\"path\"/>");
