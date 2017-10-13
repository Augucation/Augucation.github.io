var step = 0;

var fsteps;     // scanline algorithm pair filling steps
var esteps = 10;    // explanation steps before the scanline pair filling steps
var tsteps;         // total calculation and explanation steps

function algoStep()
{
    updateStepGUI();
    removeEdgeHighlight();
    removeTableHightlight(0);
    removeTableHightlight(1);
    clearTableEdges();
    clearTableIntersections();

    if (step > 0)
        canvas.removeEventListener("mousemove", movePoint, false);

    var y = findHighestVertex().y;
    var hv = findHighestVertex();

    var left = false; // default: start on the right edge

    // find longest edge with a finite slope
    var le = sortEdgesByLength(false)[0];
    for (var i = 0; i < sortEdgesByLength().length; i++)
    {
        if (isFinite(le.m))
            break;

        le = sortEdgesByLength(false)[i];
    }


    // the first edge must have a finite slope
    var first_edge = findRightEdgeFromHighestVertex();

    // if the right one has an infinite slope, try the left one
    if (!isFinite(first_edge.m))
    {
        first_edge = findRightEdgeFromHighestVertex(false);
        left = true;
    }

    switch (step)
    {

        case 0:

            printCalculation("");

            printInfo("Im Folgenden wird der Scanline-Algorithmus zur Füllung eines Polygons veranschaulicht."
            + "<br/>Du kannst die Eckpunkte des Polygons per Drag & Drop verschieben.");

            canvas.addEventListener("mousemove", movePoint, false);

            scanline();
            drawAllIntersections(storedIntersections);
            fillTableAllIntersections(storedIntersections);

            break;

        case 1:

            printCalculation("");

            printInfo("Ziel des Algorithmus ist es, zu ermitteln welche Pixel Teil des gegebenen Polygons sind und somit einfärbt werden muss um das Polygon darzustellen."
            + "<br/> Zunächsten werden anhand der Eckpunkte des Polygons all seine Kanten ermittelt. Dabei wird eine Kante als Konstrukt aus Startpunkt, Endpunkt und Steigung gehandhabt, wobei der Startpunkt der Punkt mit dem niedrigen y-Wert, in dieser Darstellung also der obere Punkt, ist.");

            break;

        case 2:

            printCalculation(le.min.name + ": (" + le.min_x + "," + le.min_y + ")"
            + "<br/>" + le.max.name + ": (" + le.max_x + "," + le.max_y + ")"
            + "<br/><br/>" + le.min.name + ".y <= " + le.max.name + ".y"
            + "<br/>\u00A0\u00A0\u00A0" + le.min_y + " <= " + le.max_y
            + "<br/>\u00A0\u00A0Startpunkt: " + le.min.name + "(" + le.min_x + "," + le.min_y + ")"
            + "<br/><br/>m = (" + le.max.name + ".x  - " + le.min.name + ".x) / (" + le.max.name + ".y - " + le.min.name + ".y)"
            + "<br/>m = (" + le.max.x + " - " + le.min.x + ") / (" + le.max.y + " - " + le.min.y + ")"
            + "<br/>m \u2248 " + Math.round(le.m * 100) / 100);


            printInfo("Die Berechnung einer Kante wird nun examplarisch an der längsten Kante des Polygons gezeigt. Von beiden Punkten der Punkte wird der oberste (niedrigster y-Wert) als Starpunkt und der jeweils andere als Endpunkt gespeichert. Dazu wird außerdem die Steigung der Kante ermittelt.");

            highlightEdge(le);
            addTableEdge(le);
            highlightRowInTable(0, 0); // until now its the only edge -> [0]

            break;

        case 3:

            printCalculation("Höchster Punkt: " + hv.name + "(" + hv.x + "," + hv.y + ")"
            + "<br/>y = " + hv.y);

            printInfo("Das nächste Zwischenziel besteht darin, alle Schnittpunkte der Polygonkanten mit den horizontalen Pixelreihen des Rasters zu ermitteln. Dazu wird von oben nach unten über alle horizontalen Pixelreihen, die vom Polygon bedeckt werden, iteriert. Also wird zunächst der höchste Eckpunkt, also der mit dem niedrigsten y-Wert gesucht. Die Pixelreihe mit diesem y-Wert wird nun betrachtet.");

            // highlight current pixel row
            drawScanline(hv.y);

            // highlight highest vertex
            hightlightVertex(hv);

            fillTableAllEdges();

            break;

        case 4:

            printCalculation("y = " + hv.y
            + "<br/><br/>" + first_edge.min.name + ".y <= y && y <= " + first_edge.max.name + ".y"
            + "<br/>\u00A0\u00A0\u00A0" + first_edge.min_y + " <= " + hv.y + " && " + hv.y + " <= " + first_edge.max_y
            + "<br/><br/>Es existiert ein Schnittpunkt der momentanen Kante mit der momentanen Pixelreihe.");

            printInfo("Für jede Pixelreihe wird nun über jede Kante des Polygons iteriert um alle Schnittpunkte der Kanten mit der Pixelreihe zu ermitteln."
            + "<br/>Eine Kante schneidet die Pixelreihe, wenn ihr Startpunkt unterhalb oder auf und ihr Endpunk überhalb oder auf der Pixelreihe liegt. Trifft dies nicht zu, existiert kein Schnittpunkt und die Kante kann übersprungen werden.");

            drawScanline(hv.y);
            highlightEdge(first_edge);
            highlightRowInTable(0, first_edge.idx);
            fillTableAllEdges();

            break;

        case 5:

            printCalculation("y = " + hv.y
            + "<br/><br/>Schnittpunkt: q(x," + hv.y + ")"
            + "<br/><br/>q.x = " + first_edge.min.name + ".x + m * (y - " + first_edge.min.name + ".y)"
            + "<br/>q.x = " + first_edge.min_x + " + " + Math.round(first_edge.m * 100) / 100 + " * (" + hv.y + " - " + first_edge.min_y + ")"
            + "<br/>q.x = " + storedIntersections[hv.y][1]
            + "<br/>q.x \u2248 " + Math.round(storedIntersections[hv.y][1])
            + "<br/><br/>q(" + storedIntersections[hv.y][1] + "," + hv.y + ")");

            printInfo("Als nächtes wird der Schnittpunkt berechnet. Der y-Wert ist bereits bekannt, er entspricht dem y-Wert der Pixelreihe. Der x-Wert wird durch linere Interpolation berechnet. Dazu wird auf den x-Wert des Startpunkts der Kante das Produkt der Steigung ...");

            drawScanline(hv.y);
            highlightEdge(first_edge);
            highlightRowInTable(0, first_edge.idx);
            drawIntersection(storedIntersections[hv.y][0], hv.y, 10);
            addTableIntersection(intersections[hv.y][0], hv.y);
            fillTableAllEdges();

            break;

        case 6:

            var curr_y = hv.y + 1;
            var x = left ? storedIntersections[curr_y][0] : storedIntersections[curr_y][1];

            printCalculation("y = " + curr_y
            + "<br/><br/>Schnittpunkt: q(x," + curr_y + ")"
            + "<br/><br/>q.x = " + first_edge.min.name + ".x + m * (y - " + first_edge.min.name + ".y)"
            + "<br/>q.x = " + first_edge.min_x + " + " + Math.round(first_edge.m * 100) / 100 + " * (" + curr_y + " - " + first_edge.min_y + ")"
            + "<br/>q.x = " + Math.round(x * 100) / 100
            + "<br/>q.x \u2248 " + Math.round(x)
            + "<br/><br/>q(" + Math.round(x) + "," + curr_y + ")");

            printInfo("Weiter Schnittpunkt ..."
            + "<br/>Da wir nur ganze Pixel einfärben können, wird die berechnete x-Koordinate des Schnittpunktes gerundet. Der gerundete Wert wird dann in eine Liste aller Schnittpunkte eingetragen.");

            drawScanline(curr_y);
            highlightEdge(first_edge);
            highlightRowInTable(0, first_edge.idx);
            addTableIntersection(intersections[hv.y][0], hv.y);
            addTableIntersection(x, hv.y + 1);
            fillTableAllEdges();

            drawIntersection(storedIntersections[hv.y][0], hv.y, 5);
            drawIntersection(x, curr_y, 10);

            break;

        case 7:

            printCalculation("");

            printInfo("Nach diesem Prinzip werden nun alle Schnittpunkte berechnet und in der Liste gespeichert.");

            drawAllIntersections(correctIntersectionsSorted);
            fillTableAllIntersections(allIntersectionsUnsorted);
            fillTableAllEdges();

            break;

        case 8:

            printCalculation("");

            printInfo("Ne Runde ausmisten.");

            drawAllIntersections(correctIntersectionsSorted);
            fillTableAllIntersections(correctIntersectionsUnsorted);
            fillTableAllEdges();

            break;

        case 9:

            printCalculation("");

            printInfo("Ne Runde sortieren.");

            drawAllIntersections(correctIntersectionsSorted);
            fillTableAllIntersections(correctIntersectionsSorted);
            fillTableAllEdges();

            break;

        case 10:

            printCalculation("");

            printInfo("Für jede Pixelreihe wird jetzt von links nach rechts jedes Pixelpärchen betrachtet bla bla dazwischen einfärben.");

            drawAllIntersections(correctIntersectionsSorted);
            fillTableAllIntersections(correctIntersectionsSorted);
            fillTableAllEdges();

            break;
    }

    if (step > 10 && step <= tsteps)
    {
        var p = pairs[step - 10 - 1];
        var fp = floatPairs[step - 10 - 1];

        printCalculation("Schnittpunktpaar: " + fp.l + " - " + fp.r);

        printInfo("Mal mal ne Runde!");

        fillTableAllEdges();
        fillTableIntersectionPairs(floatPairs);
        highlightIntersectionpair(p);
        fillPolygonUntilPair(p);
        drawIntersectionPair(fp);
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
