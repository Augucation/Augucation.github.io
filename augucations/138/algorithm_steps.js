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

    labelVertices();

    var monoS = "<span style = \"font-family :monospace\">";
    var monoE = "</span>";
    var mono_p = "<span style=\"font-family: monospace\">p</span>";
    var mono_q = "<span style=\"font-family: monospace\">q</span>";
    var mono_x = "<span style=\"font-family: monospace\">x</span>";
    var mono_y = "<span style=\"font-family: monospace\">y</span>";
    var mono_d = "<span style=\"font-family: monospace\">d</span>";
    var mono_dx = "<span style=\"font-family: monospace\">\u0394x</span>";
    var mono_dy = "<span style=\"font-family: monospace\">\u0394y</span>";
    var mono_incrE = "<span style=\"font-family: monospace\">incrE</span>";
    var mono_incrSE = "<span style=\"font-family: monospace\">incrSE</span>";

    switch(step)
    {

        case 0:
            printVariables(p, q, m);

            printCalculation("");

            printInfo("Im Folgenden wird der Bresenham-Algorithmus zur Rasterisierung einer Linie zwischen den Punkten " + mono_p + " und " + mono_q + " vorgestellt.<br/>Du kannst den Punkt " + mono_q + " per Drag & Drop verschieben.<br/>Für eine einfachere Veranschaulichung werden nur Linien mit einer Steigung von<br/>" + monoS + "0 <= m <= 1" + monoE + " betrachtet.");

            canvas.addEventListener("mousemove", movePoint, false);

            break;

        case 1:
            printVariables(p, q, m, dx, dy);
            printCalculation("\u0394x = q.x - p.x<br/>\u00A0\u00A0   = " + q.x + " - " + p.x + "<br/>\u00A0\u00A0   = " + dx +"<br/><br/>\u0394y = q.y - p.y<br/>\u00A0\u00A0   = " + q.y + " - " + p.y + "<br/>\u00A0\u00A0   = " + dy);
            printInfo("Zunächst werden die Differenzen" + mono_dx + " und " + mono_dy + " der Punkte " + mono_p + " und " + mono_q + " berechnet.");

            visualizeDeltas();

            break;

        case 2:
            printVariables(p, q, m, dx, dy, d);

            printCalculation("d = 2 * \u0394y - \u0394x <br/>\u00A0 = 2 * " + dy + " - " + dx + "<br/>\u00A0 = " + lined[0]);

            printInfo("Der Algorithmus funktioniert so, dass in jedem Schritt der Punkt " + mono_p + " einen Schritt in " + mono_x + "-Richtung zum Punkt " + mono_q + " hin versetzt wird. Zusätzlich dazu wird " + mono_p + " hin und wieder um einen Pixel nach unten verschoben. Dabei wird jeder Pixel, den " + mono_p + " besucht, eingefärbt."
            + "<br/>Ob Punkt " + mono_p + " nur nach rechts (östlich) oder nach rechts unten (südöstlich) verschoben wird, ist abhängig vom Vorzeichen der Entscheidungsvariable " + mono_d + ".<br/>Diese wird zu Beginn auf " + monoS + " d = 2 * \u0394y - \u0394x" + monoE + " gesetzt.");

            break;

        case 3:
            printVariables(p, q, m, dx, dy, d, incrE, incrSE);

            printCalculation("incrE = 2 * \u0394y<br/>\u00A0\u00A0\u00A0 \u00A0     = 2 * " + dy + "<br/>\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0= " + incrE + "<br/><br/>incrSE = 2 * (\u0394y - \u0394x)<br/>\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0= 2 * (" + dy + " - " + dx + ")<br/>\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0= " + incrSE);

            printInfo("In jedem Schritt wird die Entscheidungsvariable " + mono_d + " inkrementiert. Wird Punkt " + mono_p + " östlich verschoben, wird " + mono_d + " um " + monoS + "incrE = 2 * \u0394y" + monoE + " inkrementiert bzw. um " + monoS + "incrSE = 2 * (\u0394y - \u0394x)" + monoE + ", falls " + mono_p + " zusätzlich einen Pixel nach unten wandert.");

            break;

        case 4:
            printVariables(p, q, m, dx, dy, d, incrE, incrSE);

            printCalculation("");

            printInfo("Zu Beginn wird der Pixel an Punkt " + monoS + "p = (0,0)" + monoE + " eingefärbt. Dies ist der erste Pixel der Linie.");

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
                    + "<br/>d <= 0<br/>\u00A0\u00A0d = d +  incrE<br/>\u00A0\u00A0" + "\u00A0\u00A0= " + last_d + " + " + incrE
                    + "<br/>\u00A0\u00A0\u00A0\u00A0= "+ curr_d

                    + "<br/><br/>\u00A0\u00A0p = (" + last_p.x + "," + last_p.y + ")"
                    + "<br/>\u00A0\u00A0p.x++"
                    + "<br/>\u00A0\u00A0p = (" + curr_p.x + "," + curr_p.y + ")"
                );

                printInfo("Die Entscheidungsvariable " + mono_d + " hat ein negatives Vorzeichen. Somit wird der Punkt " + mono_p + " östlich verschoben und " + mono_d + " um " + mono_incrE + " inkrementiert.");
            }
            else {
                printCalculation(
                    "d = " + last_d
                    + "<br/>d > 0<br/>\u00A0\u00A0d = d +  incrSE<br/>\u00A0\u00A0" + "\u00A0\u00A0= " + last_d + " + " + incrSE
                    + "<br/>\u00A0\u00A0\u00A0\u00A0= "+ curr_d

                    + "<br/><br/>\u00A0\u00A0p = (" + last_p.x + "," + last_p.y + ")"
                    + "<br/>\u00A0\u00A0p.x++, p.y++"
                    + "<br/>\u00A0\u00A0p = (" + curr_p.x + "," + curr_p.y + ")"
                );

                printInfo("Die Entscheidungsvariable " + mono_d + " hat ein positives Vorzeichen. Somit wird der Punkt " + mono_p + " südöstlich verschoben und " + mono_d + " um " + mono_incrSE + " inkrementiert.");
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

            printInfo("Punkt " + mono_p + " hat Punkt " + mono_q + " erreicht, damit terminiert der Algorithmus.");

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
