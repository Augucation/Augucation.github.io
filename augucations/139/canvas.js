/* default polygon coordinates
var vertices = [
                {x: 70, y: 70},
                {x: 340, y: 160},
                {x: 390, y: 250},
                {x: 300, y: 300},
                {x: 250, y: 380}
               ];
var vertices = [
                {x: 3, y: 3},
                {x: 14, y: 7},
                {x: 15, y: 11},
                {x: 9, y: 14},
                {x: 4, y: 15}
               ];
*/

var vertices = [
                {x: 6, y: 1.5, name: "p0"},
                {x: 9, y: 4.5, name: "p1"},
                {x: 2, y: 9.5, name: "p2"},
                {x: 1, y: 7.5, name: "p3"},
                {x: 3, y: 3.5, name: "p4"}
               ];

var pointSize = 10;

// default colors
var colorLine = "#686B94";
var colorPoint = "#af2626";

var polygonLineWidth = 1;

var draggingPoint = null;

var movePointFunction;

canvas = document.getElementById("canvy");
ctx = canvas.getContext("2d");

function clear()
{
    // clear
    ctx.translate(-offset, -offset);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(offset, offset);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function moveToPixel(x, y)
{
    ctx.moveTo(x * pixelSize, y * pixelSize);
}

function lineToPixel(x, y)
{
    ctx.lineTo(x * pixelSize, y * pixelSize);
}

function drawPoint(point, color = colorPoint, size = pointSize, rasterized = false)
{
    ctx.beginPath();
    ctx.fillStyle = color;
    if (rasterized)
        ctx.arc((point.x) * pixelSize, (point.y) * pixelSize, size, 0, 2 * Math.PI, false);
    else
        ctx.arc(point.x, point.y, size, 0, 2 * Math.PI, false);
    ctx.fill();
}

function drawPixel(point, color = colorLine)
{
    ctx.fillStyle = color;
    ctx.fillRect(point.x * pixelSize, point.y * pixelSize, pixelSize, pixelSize);
}

function drawPolygon(color = colorLine, lineWidth = polygonLineWidth)
{
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    moveToPixel(vertices[0].x, vertices[0].y);

    for (var i = 0; i < vertices.length; i++)
    {
        var next = vertices[(i + 1) % vertices.length];
        lineToPixel(next.x, next.y);
    }

    ctx.stroke();
}

function distance(a, b)
{
    return (Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)));
}

// helper: get rasterized mouse position in canvas
function getMousePos(evt)
{
    var rect = canvas.getBoundingClientRect(),
        scaleX = canvas.width / rect.width,
        scaleY = canvas.height / rect.height;

    return {
      //x: Math.floor(((evt.clientX - rect.left) * scaleX) / pixelSize - 0.5), //-1
      //y: Math.floor(((evt.clientY - rect.top) * scaleY) / pixelSize - 0.5)

      //x: Math.round(((evt.clientX - rect.left) * scaleX) / pixelSize) - 1, //-1
      //y: Math.round(((evt.clientY - rect.top) * scaleY) / pixelSize) - 1

      x: ((evt.clientX - rect.left) * scaleX - offset) / pixelSize,
      y: ((evt.clientY - rect.top) * scaleY - offset) / pixelSize
    }
}

// helper: get unrasterized mouse position in canvas
function getRealMousePos(evt)
{
    var rect = canvas.getBoundingClientRect(),
        scaleX = canvas.width / rect.width,
        scaleY = canvas.height / rect.height;

    return {
      x: ((evt.clientX - rect.left) * scaleX) - offset,
      y: ((evt.clientY - rect.top) * scaleY) - offset
    }
}

function clickedOnPoint(mousePos, rasterized = false)
{
    for (var i = 0; i < vertices.length; i++)
    {
        if (rasterized)
        {
            if ((distance(mousePos, vertices[i]) < 1))
                return i;
        }
        else
        {
            if (distance(mousePos, vertices[i]) < 10)
                return i;
        }
    }
    return null;
}

function addEventListenerToCanvas()
{
    // click listener to move line points
    canvas.addEventListener("mousedown", function(evt)
        {
            draggingPoint = clickedOnPoint(getMousePos(evt), true);
        }
    );

    canvas.addEventListener("mouseup", function()
        {
            // reset draggingPoint
            draggingPoint = false;
        }
    );

    // move points
    canvas.addEventListener("mousemove", movePoint, false);
}

function movePoint(evt)
{
    var mPos = getMousePos(evt);
    var rmPos = getRealMousePos(evt);

    // don't leave the coordinate system!
    if (rmPos.x < 0 || rmPos.y < 0 || rmPos.x > (pixelNum + 1) * pixelSize || rmPos.y > (pixelNum + 1) * pixelSize )
        return;

    manageCursorIcon(mPos, true);

    // return if no point is dragged at the moment
    if (draggingPoint == null || vertices[draggingPoint] == undefined)
        return;

    // move dragged vertex
    vertices[draggingPoint].x = mPos.x;
    vertices[draggingPoint].y = mPos.y;

    clear();
    calc();
    draw();
}

function manageCursorIcon(mPos, rasterized = false)
{
    var range = rasterized ? 0.5 : pointSize;
    //var mmPos = rasterized ? {x: mPos.x - 0.5, y: mPos.y - 0.5} : mPos;

    for (var i = 0; i < vertices.length;  i++)
    {
        if ((distance(mPos, vertices[i]) < range))
        {
            canvas.className = "pointy";
            return;
        }
    }
    canvas.className = "";
}

function calc()
{
    scanline();
    fillPolygon();
    //fillTableAllEdges();
    //fillTableIntersections();
}

function draw()
{
    for (var i = 0; i < vertices.length; i++)
    {
        drawPoint(vertices[i], colorPoint, pointSize, true);
    }

    drawPolygon(colorPoint);

    drawCoordinateSystem();

    labelAllVertices();
}

addEventListenerToCanvas();
