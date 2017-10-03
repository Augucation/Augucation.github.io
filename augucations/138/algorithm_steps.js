var step = 0;

var bsteps;         // bresenham's iteration steps
var esteps = 4;     // explanation steps before the actual bresenham' iteration steps
var tsteps;         // total calculation and explanation steps

function algoStep()
{
    updateStepGUI();

    if (step > 0)
        canvas.removeEventListener("mousemove", movePoint, false);

    if (step != 1)
        removeDeltas();

    var last_d = lined[step - 5];
    var curr_d = lined[step - 4];

    var last_p = line[step - 5];
    var curr_p = line[step - 4];

    switch(step)
    {

        case 0:
            printVariables(p, q, m);

            printCalculation("");

            printInfo("Im Folgenden wird der Bresenham-Algorithmus zur Rasterisierung einer Linie zwischen den Punkten p und q vorgestellt.\nDu kannst der Punkt q per Drag & Drop verschieben.\nFür eine einfachere Veranschaulichung werden nur Linien mit einer Steigung 0 <= m <= 1 betrachtet.");

            canvas.addEventListener("mousemove", movePoint, false);

            break;

        case 1:
            printVariables(p, q, m, dx, dy);
            printCalculation("\u0394x = q.x - p.x<br/>\u00A0\u00A0   = " + q.x + " - " + p.x + "<br/>\u00A0\u00A0   = " + dx +"<br/><br/>\u0394y = q.y - p.y<br/>\u00A0\u00A0   = " + q.y + " - " + p.y + "<br/>\u00A0\u00A0   = " + dy);
            printInfo("Zunächst werden \u0394x und \u0394y anhand der Punkte p und q berechnet.");

            visualizeDeltas();

            break;

        case 2:
            printVariables(p, q, m, dx, dy, d);

            printCalculation("d = 2 * \u0394y - \u0394x <br/>\u00A0 = 2 * " + dy + " - " + dx + "<br/>\u00A0 = " + lined[0]);

            printInfo("Der Algorithmus funktioniert indem von jedem bisher eingefärbten Pixel unterscieden wird, ob der Pixel östlich oder südöstlich vom momentanen Pixel eingefärbt wird.<br/>Entschieden wird das abhängig vom Vorzeichen der Entscheidungsvariable d.<br/>Diese wird zu Beginn auf d = 2 * \u0394y - \u0394x gesetzt.");

            break;

        case 3:
            printVariables(p, q, m, dx, dy, d, incrE, incrSE);

            printCalculation("incrE = 2 * \u0394y<br/>\u00A0\u00A0\u00A0 \u00A0     = 2 * " + dy + "<br/>\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0= " + incrE + "<br/><br/>incrSE = 2 * (\u0394y - \u0394x)<br/>\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0= 2 * (" + dy + " - " + dx + ")<br/>\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0= " + incrSE);

            printInfo("In jedem Schritt wird nun die Entscheidungsvariable d inkrementiert. Wird der Pixel östlich vom momentanen Pixel eingefärbt, wird d um incrE = 2 * \u0394y inkrementiert bzw. um incrSE = 2 * (\u0394y - \u0394x), falls der südöstliche Pixel eingefärbt wird.");

            break;

        case 4:
            printVariables(p, q, m, dx, dy, d, incrE, incrSE);

            printCalculation("");

            printInfo("Zu Beginn wird der Pixel an Punkt p = (0,0) eingefärbt. Dies ist der erste Pixel der Linie.");

            drawPixel(line[0]);
            drawPoint(line[0]);

            break;
        }

        if (4 < step && step < tsteps)
        {
            printVariables(curr_p, q, m, dx, dy, curr_d, incrE, incrSE);

            if (last_d <= 0)
            {
                printCalculation(
                    "d = " + last_d
                    + "<br/>d <= 0<br/>\u00A0\u00A0d = d +  increE<br/>\u00A0\u00A0" + "\u00A0\u00A0= " + last_d + " + " + incrE
                    + "<br/>\u00A0\u00A0\u00A0\u00A0= "+ curr_d

                    + "<br/><br/>\u00A0\u00A0p = (" + last_p.x + "," + last_p.y + ")"
                    + "<br/>\u00A0\u00A0p.x++"
                    + "<br/>\u00A0\u00A0p = (" + curr_p.x + "," + curr_p.y + ")"
                );

                printInfo("Die Entscheidungsvariable d hat ein negatives Vorzeichen. Somit wird der Pixel östlich vom momentanen Pixel eingefärbt und d um incrE inkrementiert.");
            }
            else {
                printCalculation(
                    "d = " + last_d
                    + "<br/>d > 0<br/>\u00A0\u00A0d = d +  increSE<br/>\u00A0\u00A0" + "\u00A0\u00A0= " + last_d + " + " + incrSE
                    + "<br/>\u00A0\u00A0\u00A0\u00A0= "+ curr_d

                    + "<br/><br/>\u00A0\u00A0p = (" + last_p.x + "," + last_p.y + ")"
                    + "<br/>\u00A0\u00A0p.x++, p.y++"
                    + "<br/>\u00A0\u00A0p = (" + curr_p.x + "," + curr_p.y + ")"
                );

                printInfo("Die Entscheidungsvariable d hat ein positives Vorzeichen. Somit wird der Pixel südöstlich vom momentanen Pixel eingefärbt und d um incrSE inkrementiert.");
            }

            drawLineUntilPixel(step - 4);
        }

        if (step == tsteps)
        {
            printVariables(q, q, m, dx, dy, lined[lined.length - 1], incrE, incrSE);

            var space = "\u00A0\u00A0\u00A0\u00A0";
            if (q.x > 9) space += "\u00A0";
            if (q.y > 9) space += "\u00A0";

            printCalculation(
                "(" + q.x + "," + q.y + ") == (" + q.x + "," + q.y + ")"
                +"<br/>" + space + "p == q"
            );

            printInfo("Punkt p hat Punkt q erreicht, damit terminiert der Algorithmus.");

            drawLineUntilPixel(bsteps - 1);

        }
}

function nextStep()
{
    if (step == tsteps)
        return;

    step++;
    algoStep();
}

function prevStep()
{
    if (step == 0)
        return;

    step--;
    algoStep();
}

function setStep(n)
{
    if (n < 0 || n > tsteps)
        return;

    step = n;
    algoStep();
}
