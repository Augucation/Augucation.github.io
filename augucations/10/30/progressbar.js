function progressBar (container, count) {

    this.container = container;
    this.count = count;

    this.curr = 0;

    var that = this;

    this.createProgressPoints = function () {

        // create one point for every created task
        for (i = 0; i < tasks.length; i++){

            var point = document.createElement("div");
            point.className = "progressPoint";

            // on click throw new task event with the point's index i as parameter
            point.onclick = (function (i) {

                return function () {

                    that.curr = i;

                    var event = new CustomEvent("newTask", { 'detail':{
                        idx: i
                    }});

                    document.dispatchEvent(event);
                }
            })(i);

            this.container.appendChild(point);
        }
    }

    this.prevNextTask = function (prev) {

        if ((prev && this.curr <= 0) || (!prev && this.curr >= tasks.length - 1))
            return;

        this.curr = prev ? this.curr - 1 : this.curr + 1;

        var event = new CustomEvent("newTask", { 'detail':{
            idx: this.curr
        }});

        document.dispatchEvent(event);
    }

    this.highlightCurrentPoint = function (idx) {

        // every point: remove currentPoint class
        $(".progressPoint").removeClass("currentPoint");

        // new current point: add currentPoint class
        $(".progressPoint:eq(" + idx + ")").addClass("currentPoint");
    }

    // new task: highlight current point
    document.addEventListener("newTask", function (e) {
        that.highlightCurrentPoint(e.detail.idx)
    }, false);

    this.createProgressPoints();
    this.highlightCurrentPoint(this.curr);
}
