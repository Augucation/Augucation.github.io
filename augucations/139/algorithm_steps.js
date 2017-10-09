var step = 0;

var bsteps = 0;         // bresenham's iteration steps
var esteps = 10;     // explanation steps before the actual bresenham' iteration steps
var tsteps = bsteps + esteps;         // total calculation and explanation steps

function algoStep()
{
    updateStepGUI();
    removeEdgeHighlight();
    removeTableHightlight(0);
    removeTableHightlight(1);

    if (step > 0)
        canvas.removeEventListener("mousemove", movePoint, false);

    var le = findLongestEdge();
    var curr_edge = findRightEdgeFromHighestVertex();
    var y = findHighestVertex().y;

    switch (step) {

        case 0:

            printCalculation("");

            printInfo("Im Folgenden wird der Scanline-Algorithmus zur Füllung eines Polygons veranschaulicht."
            + "<br/>Du kannst die Eckpunkte des Polygons per Drag & Drop verschieben.");

            canvas.addEventListener("mousemove", movePoint, false);

            break;

        case 1:

            printCalculation("");

            printInfo("Ziel des Algorithmus ist es, zu ermitteln welche Pixel Teil des gegebenen Polygons sind und somit einfärbt werden muss um das Polygon darzustellen."
            + "<br/> Zunächsten werden anhand der Eckpunkte des Polygons all seine Kanten ermittelt. Dabei wird eine Kante als Konstrukt aus Startpunkt, Endpunkt und Steigung gehandhabt, wobei der Startpunkt der Punkt mit dem niedrigen y-Wert, in dieser Darstellung also der obere Punkt, ist.");

            break;

        case 2:

            printCalculation("p0: (" + le.min_x + "," + le.min_y + ")"
            + "<br/>p1: (" + le.max_x + "," + le.max_y + ")"
            + "<br/><br/>p0.y <= p1.y"
            + "<br/>\u00A0\u00A0\u00A0" + le.min_y + " <= " + le.max_y
            + "<br/>\u00A0\u00A0Startpunkt: p0(" + le.min_x + "," + le.min_y + ")");

            printInfo("Die Berechnung einer Kante wird nun examplarisch an der längsten Kante des Polygons gezeigt. Alle Kanten werden in einer Liste gespeichert.");

            highlightEdge(le);

            break;

        case 3:

            printCalculation("Höchster Punkt: (" + findHighestVertex().x + "," + findHighestVertex().y + ")"
            + "<br/>y = " + findHighestVertex().y);

            printInfo("Das nächste Zwischenziel besteht darin, alle Schnittpunkte der Polygonkanten mit den horizontalen Pixelreihen des Rasters zu ermitteln. Dazu wird von oben nach unten über alle horizontalen Pixelreihen, die vom Polygon bedeckt werden, iteriert. Also wird zunächst der höchste Eckpunkt, also der mit dem niedrigsten y-Wert gesucht. Die Pixelreihe mit diesem y-Wert wird nun betrachtet.");

            // highlight current pixel row
            colorPixelrow(findHighestVertex().y);

            // highlight highest vertex
            hightlightVertex(findHighestVertex());

            break;

        case 4:

            printCalculation("y = " + y
            + "<br/><br/>p0.y <= y && y <= p1.y"
            + "<br/>\u00A0\u00A0\u00A0" + curr_edge.min_y + " <= " + y + " && " + y + " <= " + curr_edge.max_y
            + "<br/><br/>Es existiert ein Schnittpunkt der momentanen Kante mit der momentanen Pixelreihe.");

            printInfo("Für jede Pixelreihe wird nun über jede Kante des Polygons iteriert um alle Schnittpunkte der Kanten mit der Pixelreihe zu ermitteln."
            + "<br/>Eine Kante schneidet die Pixelreihe, wenn ihr Startpunkt unterhalb oder auf und ihr Endpunk überhalb oder auf der Pixelreihe liegt. Trifft dies nicht zu, existiert kein Schnittpunkt und die Kante kann übersprungen werden.");

            colorPixelrow(findHighestVertex().y);
            highlightEdge(curr_edge);
            highlightRowInTable(0, curr_edge.idx);

            break;

        case 5:

            drawAllIntersections();

            printCalculation("y = " + y
            + "<br/><br/>Schnittpunkt: q(x," + y + ")"
            + "<br/><br/>q.x = p0.x + m * (y - p0.y)"
            + "<br/>q.x = " + curr_edge.min_x + " + " + curr_edge.m + " * (" + y + " - " + curr_edge.min_y + ")"
            + "<br/>q.x = " + storedIntersections[y + 1][1]
            + "<br/><br/>q(" + storedIntersections[y + 1][1] + "," + y + ")");

            printInfo("Als nächtes wird der Schnittpunkt berechnet. Der y-Wert ist bereits bekannt, er entspricht dem y-Wert der Pixelreihe. Der x-Wert wird durch linere Interpolation berechnet. Dazu wird auf den x-Wert des Startpunkts der Kante das Produkt der Steigung ...");

            break;
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
