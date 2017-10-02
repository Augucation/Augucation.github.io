var bsteps = line.length;   // bresenham's iteration steps
var tsteps = bsteps + 3;    // total calculation and explanation steps
var step = 0;


function algoStep()
{
    if (step > 0)
        canvas.removeEventListener("mousemove", movePoint, false);

    switch(step)
    {
        case 0:
            printCalculation("");
            printInfo("Im Folgenden wird der Bresenham-Algorithmus zur Rasterisierung einer Linie zwischen den Punkten p und q vorgestellt.\nDu kannst der Punkt q per Drag & Drop verschieben.\nFür eine einfachere Veranschaulichung werden nur Linien mit einer Steigung 0 <= m <= 1 betrachtet.");

            canvas.addEventListener("mousemove", movePoint, false);

            break;

        case 1:
            printVariables(p, q, m, dx, dy);
            printCalculation("\u0394x = q.x - p.x = " + dx +"<br />\u0394y = q.y - q.y = " + dy);
            printInfo("Zunächst werden \u0394x und \u0394y anhand der Punkte p und q berechnet.");

            visualizeDeltas();

            break;

        case 2:
            printVariables(p, q, m, dx, dy, d);

            printCalculation("d = 2 * \u0394y - \u0394x <br/>\u00A0 = 2 * " + dy + " - " + dx + "<br/>\u00A0 = " + d);

            printInfo("Der Algorithmus funktioniert indem von jedem bisher eingefärbten Pixel unterscieden wird, ob der Pixel östlich oder südöstlich vom momentanen Pixel eingefärbt wird.<br/>Entschieden wird das abhängig vom Vorzeichen der Entscheidungsvariable d.<br/>Diese wird zu Beginn auf d = 2 * \u0394y - \u0394x gesetzt.");

            break;

        case 3:
            removeDeltas();
            break;
    }
}

function nextStep()
{
    step++;
    algoStep();
}
