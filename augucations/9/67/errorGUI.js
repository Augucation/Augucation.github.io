var scrollValue;

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
        //sconsole.log("scroll: ", scroll);

        //var scroll = textarea.pageYOffset;

        //var scroll = scrollValue;
        //console.log("scrollValue: ", scrollValue);

        // highlight the relevant line by set the position of the red line
        this.lineNumber = 5;
        this.yPos = this.lineHeight * (this.lineNumber - 1) - scroll; // - 1 because line count starts at 1
        console.log("this.ypos: ", this.lineNumber);
    }

    this.drawOnPos = function () {

        // highlight the relevant line by set the position of the red line
        textarea.css("background-position", "0px " + this.yPos);
    }

    this.update = function () {

        var that = this;
        //setTimeout(function () {
            that.calcYPos();
            that.drawOnPos();
        //}, 0);
    }
}

//window events
$("#input").on('scroll', function(){
    that = $(this);
    scrollValue = that.scrollTop();
});
