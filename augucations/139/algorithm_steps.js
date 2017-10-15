var step = 0;

var fsteps;     // scanline algorithm pair filling steps
var esteps = 10;    // explanation steps before the scanline pair filling steps
var tsteps;         // total calculation and explanation steps

// monospace snippets
var monoS = "<span style = \"font-family :monospace\">";
var monoE = "</span>";
var mono_x = "<span style=\"font-family: monospace\">x</span>";
var mono_y = "<span style=\"font-family: monospace\">y</span>";

function algoStep()
{
    updateStepGUI();
    removeEdgeHighlight();
    removeTableHightlight(0);
    removeTableHightlight(1);
    clearTableEdges();
    clearTableIntersections(true);

    updating = false;

    if (step > 0)
        canvas.removeEventListener("mousemove", movePoint, false);

    // find longest edge with a finite slope
    var le = sortEdgesByLength(false)[0];
    for (var i = 0; i < sortEdgesByLength().length; i++)
    {
        if (isFinite(le.m))
            break;

        le = sortEdgesByLength(false)[i];
    }

    var y_min = findScanlineYRange().min;

    // get the first and second intersections' edges
    var first_edge = intersections[y_min][0].edge;
    var second_edge = intersections[y_min][1].edge;

    switch (step)
    {

        case 0:

            printCalculation("");

            printInfo("Im Folgenden wird der Scanline-Algorithmus zur Füllung eines Polygons veranschaulicht."
            + "<br/>Du kannst die Eckpunkte des Polygons per Drag & Drop verschieben.");

            canvas.addEventListener("mousemove", movePoint, false);

            scanline();

            break;

        case 1:

            printCalculation("");

            printInfo("Ziel des Algorithmus ist es, zu ermitteln welche Pixel Teil des gegebenen Polygons sind und somit eingefärbt werden müssen um das Polygon darzustellen."
            + "<br/>Um dies zu erreichen, werden zunächst anhand der Eckpunkte alle Kanten des Polygons berechnet und in einer Liste gespeichert.");

            break;

        case 2:

            var minx = Math.round(le.min.x * 10) / 10;
            var miny = Math.round(le.min.y * 10) / 10;
            var maxx = Math.round(le.max.x * 10) / 10;
            var maxy = Math.round(le.max.y * 10) / 10;

            printCalculation(le.min.name + ": (" + minx + "," + miny + ")"
            + "<br/>" + le.max.name + ": (" + maxx + "," + maxy + ")"
            + "<br/><br/>" + le.min.name + ".y <= " + le.max.name + ".y"
            + "<br/>\u00A0\u00A0\u00A0" + miny + " <= " + maxy
            + "<br/>\u00A0\u00A0Startpunkt: " + le.min.name + "(" + minx + "," + miny + ")"
            + "<br/><br/>m = \u0394x / \u0394y"
            + "<br/>m = (" + le.max.name + ".x  - " + le.min.name + ".x) / (" + le.max.name + ".y - " + le.min.name + ".y)"
            + "<br/>m = (" + maxx + " - " + minx + ") / (" + maxy + " - " + miny + ")"
            + "<br/>m \u2248 " + Math.round(le.m * 100) / 100);


            printInfo("Eine Kante besteht aus einem Startpunkt, einem Endpunkt und einer Steigung. Dabei ist der Startpunkt derjenige der beiden Eckpunkte der Kante mit dem geringeren " + mono_y + "-Wert, in dieser Darstellung also der höhere."
            + "<br/>Die Steigung der Kante wird anhand der Differenz ihrer beiden Eckpunkte berechnet.");

            highlightEdge(le);
            addTableEdge(le);
            highlightRowInTable(0, 0); // until now its the only edge -> [0]

            break;

        case 3:

            printCalculation("");

            printInfo("Nach diesem Schema werden alle weiteren Kanten berechnet und der Liste hinzugefügt.");

            fillTableAllEdges();

            break;

        case 4:

            var r = findScanlineYRange();

            printCalculation("");

            printInfo("Das nächste Zwischenziel besteht darin, alle Schnittpunkte der Polygonkanten mit den horizontalen Pixelreihen des Rasters zu ermitteln. Dafür wird von oben nach unten über alle Pixelreihen, die das Polygon schneiden, iteriert.")

            fillTableAllEdges();

            for (var y = r.min; y <= r.max; y++)
            {
                drawScanline(y);
            }

            break;

        case 5:

            printCalculation("y = " + y_min
            + "<br/><br/>" + first_edge.min.name + ".y <= y && y <= " + first_edge.max.name + ".y"
            + "<br/>\u00A0\u00A0\u00A0" + Math.round(first_edge.min_y * 10) / 10 + " <= " + y_min + " && " + y_min + " <= " + Math.round(first_edge.max_y * 10) / 10
            + "<br/><br/>Es existiert ein Schnittpunkt der momentanen Kante mit der momentanen Pixelreihe.");

            printInfo("Für jede Pixelreihe wird nun über jede Kante des Polygons iteriert um alle Schnittpunkte der Kanten mit der Pixelreihe zu ermitteln."
            + "<br/>Eine Kante schneidet die Pixelreihe, wenn ihr Startpunkt überhalb oder auf und ihr Endpunkt unterhalb oder auf der Pixelreihe liegt. Trifft dies nicht zu, existiert kein Schnittpunkt und die Kante kann übersprungen werden.");

            drawScanline(y_min);
            highlightEdge(first_edge);
            fillTableAllEdges();
            highlightRowInTable(0, first_edge.idx);

            break;

        case 6:

            printCalculation("y = " + y_min
            + "<br/><br/>Schnittpunkt: q(x," + y_min + ")"
            + "<br/><br/>q.x = " + first_edge.min.name + ".x + m * (y - " + first_edge.min.name + ".y)"
            + "<br/>q.x = " + Math.round(first_edge.min_x * 10) / 10 + " + " + Math.round(first_edge.m * 10) / 10 + " * (" + y_min + " - " + Math.round(first_edge.min_y * 10) / 10 + ")"
            + "<br/>q.x = " + intersections[y_min][0].x
            //+ "<br/>q.x \u2248 " + Math.round(intersections[y_min][1] * 10) / 10
            + "<br/><br/>q(" + intersections[y_min][0].x + "," + y_min + ")");

            printInfo("Der " + mono_y  + "-Wert des Schnittpunkts ist durch die momentane Pixelreihe definiert."
            + "<br/>Der " + mono_x + "-Wert wird durch eine lineare Interpolation berechnet."
             +"<br/><br/>Der erechnete Schnittpunk wird in einer Liste gespeichert.");

            drawScanline(y_min);
            highlightEdge(first_edge);
            fillTableAllEdges();
            highlightRowInTable(0, first_edge.idx);
            highlightRowInTable(1, y_min);
            drawIntersection(intersections[y_min][0].x, y_min, 10);

            fillTableIntersectionLeftColumn();
            addTableIntersection(intersections[y_min][0].x, y_min);

            break;

        case 7:

            printCalculation("y = " + y_min
            + "<br/><br/>Schnittpunkt: q(x," + y_min + ")"
            + "<br/><br/>q.x = " + second_edge.min.name + ".x + m * (y - " + second_edge.min.name + ".y)"
            + "<br/>q.x = " + Math.round(second_edge.min_x * 10) / 10 + " + " + Math.round(second_edge.m * 10) / 10 + " * (" + y_min + " - " + Math.round(second_edge.min_y * 10) / 10 + ")"
            + "<br/>q.x = " + Math.round(intersections[y_min][1].x * 10) / 10
            //+ "<br/>q.x \u2248 " + Math.round(x)
            + "<br/><br/>q(" + Math.round(intersections[y_min][1].x * 10) / 10 + "," + y_min + ")");

            printInfo("Nach diesen Prinzip werden alle Schnittpunkte der Polygonkanten mit der momentanen Pixelreihe ermittelt und der Liste hinzugefügt.");

            drawScanline(y_min);
            highlightEdge(second_edge);
            fillTableAllEdges();
            highlightRowInTable(0, second_edge.idx);
            highlightRowInTable(1, y_min);
            fillTableIntersectionLeftColumn();
            addTableIntersection(intersections[y_min][0].x, y_min);
            addTableIntersection(intersections[y_min][1].x, y_min);

            drawIntersection(intersections[y_min][0].x, y_min, 5);
            drawIntersection(intersections[y_min][1].x, y_min, 10);

            break;

        case 8:

            printCalculation("");

            printInfo("Dies geschieht für alle Pixelreihen, die das Polygon schneiden.");

            drawAllIntersections(allIntersectionsUnsorted);
            fillTableAllIntersections(allIntersectionsUnsorted);
            fillTableAllEdges();

            break;

        case 9:

            printCalculation("");

            printInfo("In der Liste aller Schnittpunkte werden nun für jeden " + mono_y + "-Wert alle " + mono_x + "-Werte aufsteigend sortiert.");

            drawAllIntersections(intersections);
            fillTableAllIntersections(intersections);
            fillTableAllEdges();

            break;

        case 10:

            printCalculation("");

            printInfo("Um das Polygon letztendlich einzufärben, werden die Schnittpunkte paarweise betrachtet."
            + "<br/>Nun wird wieder über alle relevanten horizontalen Pixelreihen iteriert. Dabei werden alle Pixel, die innerhalb eines Schnittpunktpaares liegen, eingefärbt.");

            drawAllIntersections(intersections);
            fillTableIntersectionPairs(pairs);
            fillTableAllEdges();

            break;
    }

    if (step > esteps && step < tsteps)
    {
        var p = pairs[step - esteps - 1];

        printCalculation("y: " + p.y
        + "<br/>Schnittpunktpaar: " + p.l + " - " + p.r);

        if (Math.round(p.r) - Math.round(p.l) > 0)
            printInfo("Alle Pixel, die innerhalb des Schnittpunktpaares liegen, werden eingefärbt.");
        else
            printInfo("Dieses Schnittpunktpaar umschließt keine Pixel.");

        clear();
        fillPolygonUntilPair(p);
        draw();
        drawScanline(p.y);
        drawIntersectionPair(p);

        fillTableIntersectionPairs(pairs);
        highlightIntersectionpair(p);
        fillTableAllEdges();
    }

    if (step == tsteps)
    {
        printCalculation("");

        printInfo("Es wurden alle Schnittpunktpaare durchlaufen, damit terminiert der Algorithmus. Das Polygon ist nun vollständig eingefärbt.");

        clear();
        fillPolygon();
        draw();

        fillTableIntersectionPairs(pairs);
        fillTableAllEdges();

        addEventListenerToCanvas();
        updating = true;
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

function calcStepNumbers(scanlineSteps)
{
    fsteps = scanlineSteps;
    tsteps = fsteps + esteps + 1;
    stepSlider.max = tsteps;
}
