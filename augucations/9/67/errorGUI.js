function errorLine(textarea, lineHeight) {

    this.ypos;
    this.lineHeight = lineHeight;
    this.lineNumber;

    this.setLineNumber = function (number) {
        this.lineNumber = number;
    }

    this.show = function (show) {

        // no background if there is no error
        textarea.attr("class", show ? "" : "noError");
    }

    this.calcYPos = function () {

        // consider the scroll bar and adjust the value
        var scroll = textarea.scrollTop();

        // highlight the relevant line by set the position of the red line
        this.yPos = this.lineHeight * (this.lineNumber - 1) - scroll; // - 1 because line count starts at 1
    }

    this.drawOnPos = function () {

        // highlight the relevant line by set the position of the red line
        textarea.css("background-position", "0px " + this.yPos);
    }

    this.update = function () {

        this.calcYPos();
        this.drawOnPos();
    }
}
