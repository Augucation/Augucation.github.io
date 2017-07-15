var user_html;
var user_js;

// add event listeners to the solution button
// only show solution while the cursor is on the button and the mouse is down
document.getElementById("solutionButton").addEventListener("mousedown", function () {showSolution(true); });
document.getElementById("solutionButton").addEventListener("mouseup", function () {showSolution(false); });
document.getElementById("solutionButton").addEventListener("mouseleave", function () {showSolution(false); });

function showSolution (show) {

    if (show) {

        // save the user's code
        user_html = $("#editor_html").val();
        user_js = $("#editor_js").val();

        // show the solution code
        $("#editor_html").val(tasks[pb.curr].solution_html);
        $("#editor_js").val(tasks[pb.curr].solution_js);
    }
    else {

        // show the user's code augucations
        $("#editor_html").val(user_html);
        $("#editor_js").val(user_js);
    }
}
