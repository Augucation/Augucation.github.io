var colorRow = "#dee1f2";
var colorHighlightLine = "#af2626";
var colorLabel ="#555e67";

var highlightLineWidth = 5;
var highlightPointSize = 15;
var scanlineWidth = 5;
var labelSize = 20;

function colorPixelrow(y, color = colorRow)
{
    for (var x = 0; x <= pixelNum; x++)
    {
        drawPixel({x: x, y: y}, color);
    }
    draw();
}

function drawScanline(y, color = colorRow, width = scanlineWidth)
{
    ctx.beginPath();
    ctx.strokeStyle = color;
    moveToPixel(0, y + 0.5);
    lineToPixel(pixelNum + 1, y + 0.5);
    ctx.stroke();
}

function highlightEdge(edge)
{
    ctx.beginPath();
    ctx.strokeStyle = colorHighlightLine;
    ctx.lineWidth = highlightLineWidth;

    moveToPixel(edge.min_x + 0.5, edge.min_y + 0.5);
    lineToPixel(edge.max_x + 0.5, edge.max_y + 0.5);

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

function labelVertex(v)
{
    printOnCanvas(v.name, v.x, v.y, labelSize, colorLabel);
}

function labelAllVertices()
{
    for (var i = 0; i < vertices.length; i++)
    {
        labelVertex(vertices[i]);
    }
}

function printOnCanvas(text, x, y, size = 20, color = "#000000")
{
    ctx.fillStyle = color;
    //ctx.font = size + "px lighter";
    ctx.font = "normal normal lighter " + size + "px arial";
    ctx.fillText(text, x * pixelSize, y * pixelSize);
}
