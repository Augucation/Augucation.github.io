// allows to type tabs in a textarea instead of switching focus

function allowTabInTextarea (textareaID) {

    var textarea = document.getElementById(textareaID);

    textarea.addEventListener("keydown", function (e) {

        var keyCode = e.keyCode || e.which;

        if (keyCode == 9) {
            e.preventDefault();
            var start = textarea.selectionStart;
            var end = textarea.selectionEnd;

            // set textarea value to: text before caret + tab + text after caret
            textarea.value = ((textarea).value.substring(0, start)
                        + "  " // \t
                        + textarea.value.substring(end));

            // put caret at right position again
            textarea.selectionStart =
            textarea.selectionEnd = start + 2;
        }
    });
}
