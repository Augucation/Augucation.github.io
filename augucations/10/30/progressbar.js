function progressBar (container, count) {

    this.container = container;
    this.count = count;

    var that = this;

    this.createProgressPoints = function () {

        // create one point for every created task
        for (i = 0; i < tasks.length; i++){

            var point = document.createElement("div");
            point.className = "progressPoint";

            // on click throw new task event with the point's index i as parameter
            point.onclick = (function (i) {

                return function () {

                    var event = new CustomEvent("newTask", { 'detail':{
                        idx: i
                    }});

                    document.dispatchEvent(event);
                }
            })(i);

            this.container.appendChild(point);
        }
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
    this.highlightCurrentPoint(0);
}
