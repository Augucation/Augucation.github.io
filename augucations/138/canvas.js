// default line coordinates
var p = {x: 0, y: 0};
var q = {x: 19, y: 10};

var pointSize = 10;

// default colors
var colorLine = "#333333";
var colorPoint = "#686B94";
var colorDisabled = "#dadbe5";

var draggingPoint = 0; // 0: none, 1: p, 2: q

function clear()
{
    // clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
      x: Math.floor(((evt.clientX - rect.left) * scaleX) / pixelSize),
      y: Math.floor(((evt.clientY - rect.top) * scaleY) / pixelSize)
    }
}

// 0: no point click
// 1: clicked on p
// 2: clicked on q
function clickedOnPoint(mousePos)
{
    // check for p
    if (distance(mousePos, p) < 1)
        return 1;

    // check for q
    if (distance(mousePos, q) < 1)
        return 2;

    return 0;
}

function addEventListenerToCanvas()
{
    // click listener to move line points
    canvas.addEventListener("mousedown", function(evt)
        {
            draggingPoint = clickedOnPoint(getMousePos(evt));
        }
    );

    canvas.addEventListener("mouseup", function()
        {
            // reset draggingPoint
            draggingPoint = 0;
        }
    );

    // move points
    canvas.addEventListener("mousemove", function(evt)
    {
        var m = getMousePos(evt);

        // avoid the forbidden octant!
        if (m.y > m.x)
            return;

        manageCursorIcon(m);

        // return if no point is dragged at the moment
        if (!draggingPoint)
            return;

        // move p
        if (draggingPoint == 1)
            p = m;

        // move q
        else if (draggingPoint == 2)
            q = m;

        clear();

        disableSecondOctant();

        drawCoordinateSystem();

        drawPixel(p, colorPoint);
        drawPixel(q, colorPoint);

        plotLine(p, q);

        calcEquation(p, q);
        updateGUI();
    }
);
}

function manageCursorIcon(mPos)
{
    canvas.className = ((distance(mPos, p) < 1) ||
                        (distance(mPos, q) < 1))     ? "pointy" : "";
}

function disableSecondOctant()
{
    for (var x = 0; x < pixelNum; x++)
    {
        for (var y = 0; y < pixelNum; y++)
        {
            if (y > x)
                drawPixel({x: x, y: y}, colorDisabled);
        }
    }
}

disableSecondOctant();

drawCoordinateSystem();

drawPixel(p, colorPoint);
drawPixel(q, colorPoint);

plotLine(p, q);

addEventListenerToCanvas();
