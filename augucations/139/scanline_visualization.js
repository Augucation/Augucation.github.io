var colorRow = "#dee1f2";
var colorHighlightLine = "#af2626";

var highlightLineWidth = 5;
var highlightPointSize = 15;

function colorPixelrow(y, color = colorRow)
{
    for (var x = 0; x <= pixelNum; x++)
    {
        drawPixel({x: x, y: y}, color);
    }
    draw();
}

function highlightEdge(edge)
{
    ctx.beginPath();
    ctx.strokeStyle = colorHighlightLine;
    ctx.lineWidth = highlightLineWidth;

    moveToPixel(edge.min_x, edge.min_y);
    lineToPixel(edge.max_x, edge.max_y);

    ctx.stroke();
}

function removeEdgeHighlight()
{
    clear();
    draw();
}

function hightlightVertex(point)
{
    drawPoint(point, colorHighlightLine, highlightPointSize, true);
}

function drawIntersection(x, y)
{
    drawPoint({x: x, y: y}, "#00FF00", 5, true);
}

function drawAllIntersections()
{
    for (var y = 0; y < storedIntersections.length; y++)
    {
        for (var x = 0; x < storedIntersections[y].length; x++)
        {
            drawIntersection(storedIntersections[y][x], y);
        }
    }
}
