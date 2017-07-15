function toggleTip() {

    // if width is 0 show tip, else hide
    showTip(!($("#tipDiv").width()));
}

function showTip (show) {

    if (show) {
        $("#tipDiv").css("width", "20%");
        $("#tipButton").css("right", "20%");
        $("#tipButtonText").html(">");
        $("#tipText").css("color", "white");
    }
    else {
        $("#tipDiv").css("width", "0%");
        $("#tipButton").css("right", "0%");
        $("#tipButtonText").html("i");
        $("#tipText").css("color", "var(--hci_gray)");
    }
}

// hide tip on new task events
document.addEventListener("newTask", function(e) {
    showTip(false);
}, false);
