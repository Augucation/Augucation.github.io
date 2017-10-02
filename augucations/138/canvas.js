// default line coordinates
var p = {x: 0, y: 0};
var q = {x: 19, y: 10};

var pointSize = 10;

// default colors
var colorLine = "#686B94";
var colorPoint = "#af2626";
var colorDisabled = "#dadbe5";

var draggingPoint = 0; // 0: none, 1: p, 2: q

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

function drawPoint(point, color = "red")
{
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(point.x * pixelSize, point.y * pixelSize, 10, 0, 2 * Math.PI, false);
    ctx.fill();
}

function drawPixel(point, color = "#686B94")
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
      x: Math.floor(((evt.clientX - rect.left) * scaleX) / pixelSize - 0.5),
      y: Math.floor(((evt.clientY - rect.top) * scaleY) / pixelSize - 0.5)
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
    canvas.addEventListener("mousemove", function(evt)
    {
        var m = getMousePos(evt);

        // don't leave the coordinate system!
        if (m.x < 0 || m.y < 0)
            return;

        // avoid the forbidden octant!
        if (m.y > m.x)
            return;

        manageCursorIcon(m);

        // return if no point is dragged at the moment
        if (!draggingPoint)
            return;

        // move q
        if (draggingPoint)
            q = m;

        clear();

        disableSecondOctant();

        drawCoordinateSystem();

        drawPoint(p, colorPoint);
        drawPoint(q, colorPoint);

        //plotLine(p, q);
        bresenham(p, q);

        calcEquation(p, q);
        updateGUI();
    }
);
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

function initDraw()
{

    drawAxisArrows();

    disableSecondOctant();

    drawCoordinateSystem();

    //drawPixel(p, colorPoint);
    //drawPixel(q, colorPoint);
    drawPoint(p, colorPoint);
    drawPoint(q, colorPoint);

    //plotLine(p, q);
    //bresenham(p, q);
}

addEventListenerToCanvas();
