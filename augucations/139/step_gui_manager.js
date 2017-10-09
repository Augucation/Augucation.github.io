var stepSlider = document.getElementById("stepSlider");
stepSlider.value = 0;

var prevStepBtn = document.getElementById("prevStepBtn");
var nextStepBtn = document.getElementById("nextStepBtn");

function updateStepGUI()
{
    stepSlider.value = step;

    prevStepBtn.style.visibility = step == 0 ? "hidden" : "visible";
    nextStepBtn.style.visibility = step < tsteps ? "visible" : "hidden";
    nextStepBtn.innerHTML = step == 0 ? "Start" : "Weiter";
}
