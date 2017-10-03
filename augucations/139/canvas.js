// default polygon coordinates
var vertices = [
                {x: 70, y: 70},
                {x: 340, y: 160},
                {x: 390, y: 250},
                {x: 300, y: 300},
                {x: 250, y: 380}
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

function drawPoint(point, color = colorPoint, rasterized = false)
{
    ctx.beginPath();
    ctx.fillStyle = color;
    if (rasterized)
        ctx.arc((point.x + 0.5) * pixelSize, (point.y + 0.5) * pixelSize, 10, 0, 2 * Math.PI, false);
    else
        ctx.arc(point.x, point.y, 10, 0, 2 * Math.PI, false);
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

    ctx.moveTo(vertices[0].x, vertices[0].y);

    for (var i = 0; i < vertices.length; i++)
    {
        var next = vertices[(i + 1) % vertices.length];
        ctx.lineTo(next.x, next.y);
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
      x: Math.floor(((evt.clientX - rect.left) * scaleX) / pixelSize - 1), //-0.5
      y: Math.floor(((evt.clientY - rect.top) * scaleY) / pixelSize - 1)
    }
}

// helper: get rasterized mouse position in canvas
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

function clickedOnPoint(mousePos)
{
    for (var i = 0; i < vertices.length; i++)
    {
        if (distance(mousePos, vertices[i]) < 10)
            return i;
    }
    return null;
}

function addEventListenerToCanvas()
{
    // click listener to move line points
    canvas.addEventListener("mousedown", function(evt)
        {
            draggingPoint = clickedOnPoint(getRealMousePos(evt));
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
    if (rmPos.x < 0 || rmPos.y < 0 || rmPos.x > canvas.width - 2 * offset || rmPos.y > canvas.height - 2 * offset)
        return;

    manageCursorIcon(rmPos);

    // return if no point is dragged at the moment
    if (draggingPoint == null)
        return;

    // move q
    if (draggingPoint != null)
        vertices[draggingPoint] = rmPos;

    clear();
    calc();
    draw();

    //printVariables(p, q, m);
}

function manageCursorIcon(mPos, rasterized = false)
{
    for (var i = 0; i < vertices.length;  i++)
    {
        if ((distance(mPos, vertices[i]) < pointSize))
        {
            canvas.className = "pointy";
            return;
        }
    }
    canvas.className = "";
}

function calc()
{
    //bresenham(p, q);
    //printVariables(p, q, m);
}

function draw()
{
    for (var i = 0; i < vertices.length; i++)
    {
        drawPoint(vertices[i]);
    }

    drawPolygon();

    drawCoordinateSystem();
}

function drawLineUntilPixel(idx)
{
    clear();

    for (var i = -1; i < idx; i++)
    {
        drawPixel(line[i + 1]);
    }

    drawPoint(line[idx]);
    drawPoint(q, colorPoint);

    drawCoordinateSystem();
}

addEventListenerToCanvas();
