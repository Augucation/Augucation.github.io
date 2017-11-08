// default line coordinates
var p = {x: 0, y: 0};
var q = {x: 19, y: 10};

var pointSize = 10;

// default colors
var colorLine = "#686B94";
var colorPoint = "#af2626";
var colorDisabled = "#dadbe5";

var draggingPoint = 0; // 0: none, 1: p, 2: q

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

function drawPoint(point, color = colorPoint)
{
    ctx.beginPath();
    ctx.fillStyle = color;
    //ctx.arc(point.x * pixelSize, point.y * pixelSize, 10, 0, 2 * Math.PI, false);
    ctx.arc((point.x + 0.5) * pixelSize, (point.y + 0.5) * pixelSize, 10, 0, 2 * Math.PI, false);
    ctx.fill();
}

function drawPixel(point, color = colorLine)
{
    ctx.fillStyle = color;
    ctx.fillRect(point.x * pixelSize, point.y * pixelSize, pixelSize, pixelSize);
}

function distance(a, b)
{
    return (Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)));
}

// helper: get mouse position in canvas
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

function clickedOnQ(mousePos)
{
    return (distance(mousePos, q) < 1);
}

function addEventListenerToCanvas()
{
    // click listener to move line points
    canvas.addEventListener("mousedown", function(evt)
        {
            draggingPoint = clickedOnQ(getMousePos(evt));
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

    // don't leave the coordinate system!
    if (mPos.x < 0 || mPos.y < 0 || mPos.x > pixelNum || mPos.y > pixelNum)
        return;

    // avoid the forbidden octant!
    if (mPos.y > mPos.x)
        return;

    manageCursorIcon(mPos);

    // return if no point is dragged at the moment
    if (!draggingPoint)
        return;

    // move q
    if (draggingPoint)
        q = mPos;

    clear();
    calc();
    draw();

    printVariables(p, q, m);
    labelVertices();
}

function manageCursorIcon(mPos)
{
    canvas.className = (distance(mPos, q) < 1) ? "pointy" : "";
}

function disableSecondOctant()
{
    for (var x = 0; x <= pixelNum; x++)
    {
        for (var y = 0; y <= pixelNum; y++)
        {
            if (x < y)
                drawPixel({x: x, y: y}, colorDisabled);
        }
    }
}

function calc()
{
    bresenham(p, q);
    printVariables(p, q, m);
}

function draw()
{
    disableSecondOctant();

    drawPoint(p);
    drawPoint(q);

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
    labelVertices(line[idx]);

    disableSecondOctant();
    drawCoordinateSystem();
}

addEventListenerToCanvas();
