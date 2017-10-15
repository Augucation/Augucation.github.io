var colorRow = "#dee1f2";
var colorScanline = "#b9bccc";
var colorHighlightLine = "#af2626";
var colorLabel ="#555e67";
var colorIntersection = "#27d83e";

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

function drawScanline(y, color = colorScanline, width = scanlineWidth)
{
    ctx.beginPath();
    ctx.strokeStyle = color;
    moveToPixel(0, y);
    lineToPixel(pixelNum + 1, y);
    ctx.stroke();
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

function drawIntersection(x, y, size = 5)
{
    drawPoint({x: x, y: y}, colorIntersection, size, true);

    /* draw ugly crosses instead of boring circles
    ctx.beginPath();
    ctx.strokeStyle = colorIntersection;
    ctx.lineWidth = 3;

    moveToPixel(x + 0.2, y + 0.2);
    lineToPixel(x + 0.8, y + 0.8);
    moveToPixel(x + 0.2, y + 0.8);
    lineToPixel(x + 0.8, y + 0.2);

    ctx.stroke();
    */
}

function drawAllIntersections(intersectionArray)
{
    for (var y = 0; y < intersectionArray.length; y++)
    {
        for (var x = 0; x < intersectionArray[y].length; x++)
        {
            drawIntersection(intersectionArray[y][x], y);
        }
    }
}

function drawIntersectionPair(pair)
{
    drawIntersection(pair.l, pair.y);
    drawIntersection(pair.r, pair.y);
}

function labelVertex(v)
{
    printOnCanvas(v.name, v.x - 0.5, v.y - 0.5, labelSize, colorLabel);
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

function fillPolygonUntilPair(pair)
{
    // itare over all polygon pairs
    for (var i = 0; i < pairs.length; i++)
    {
        // draw pixels inside of current pair
        fillPolygonPair(pairs[i]);

        // terminate if given pair is reached
        if (pair.y == pairs[i].y && pair.idx == pairs[i].idx)
            return;
    }
}

function fillPolygonPair(pair)
{
    for (var x = Math.round(pair.l); x < Math.round(pair.r); x++)
    {
        drawPixel({x: x, y: pair.y});
    }
}

function fillPolygon()
{
    /*
    for (var y = 0; y < polygon.length; y++)
    {
        for (var x = 0; x < polygon[y].length; x++)
        {
            var pixel = polygon[y][x];

            drawPixel({x: pixel.x, y: pixel.y});
        }
    }
    */

    // draw every pair until the last one
    fillPolygonUntilPair(pairs[pairs.length - 1]);
}
