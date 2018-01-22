// default colors
var colorLine = "#686B94";
var colorPoint = "#af2626";

var polygonLineWidth = 1;

var draggingPoint = null;

var movePointFunction;

var updating = false; // if true, tables, polygon drawinga and gui are updated when vertices are moved

var boarderWidth = 0.25;
var bc_fontSize = 30; // static bit codes inside the canvas

var canvas = document.getElementById("canvy");
var ctx = canvas.getContext("2d");

var width = canvy.width; // same as height

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

/*
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

    if (updating)
    {
        updateTables();
        stepSlider.value = tsteps;
        step = tsteps;

        clear();
        fillPolygon();
        draw();
    }
}

function manageCursorIcon(mPos, rasterized = false)
{
    var range = rasterized ? 0.5 : pointSize;

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
*/

function printOnCanvas(text, x, y, size = 20, color = "#000000")
{
    ctx.fillStyle = color;
    //ctx.font = size + "px lighter";
    ctx.font = "normal normal lighter " + size + "px arial";
    ctx.fillText(text, x, y);
}

function addStaticBitcodes()
{
    // absolute boarderwidth times pi * thumb
    var offset = width * boarderWidth * 0.3;

    // additional offset for the labels inside the right column
    var roffset = offset * 1.2;

    // additional offset for the labels inside the upper row
    var uoffset = offset * 0.7;

    // additional offset for the labels inside the lower row
    var loffset = offset * 0.5;

    // additional offset for the labels inside the middle column
    var moffset = offset * 0.5;

    printOnCanvas("1001", offset, offset + uoffset, bc_fontSize);
    printOnCanvas("1000", width * 0.5 - moffset, offset + uoffset, bc_fontSize);
    printOnCanvas("1010", width - offset - roffset, offset + uoffset, bc_fontSize);
    printOnCanvas("0001", offset, width * 0.5, bc_fontSize);
    printOnCanvas("0000", width * 0.5 - moffset, width * 0.5, bc_fontSize);
    printOnCanvas("0010", width - offset - roffset, width * 0.5, bc_fontSize);
    printOnCanvas("0101", offset, width - offset - loffset, bc_fontSize);
    printOnCanvas("0100", width * 0.5 - moffset, width - offset - loffset, bc_fontSize);
    printOnCanvas("0110", width - offset - roffset, width - offset - loffset, bc_fontSize);
}

function draw()
{
    absBoarderWidth = width * boarderWidth;

    // draw the lines which separate rectangle from boarder
    ctx.beginPath();

    // horizontal lines
    ctx.moveTo(0, absBoarderWidth);
    ctx.lineTo(width, absBoarderWidth);
    ctx.moveTo(0, width - absBoarderWidth);
    ctx.lineTo(width, width - absBoarderWidth);

    // vertical lines
    ctx.moveTo(absBoarderWidth, 0);
    ctx.lineTo(absBoarderWidth, width);
    ctx.moveTo(width - absBoarderWidth, 0);
    ctx.lineTo(width - absBoarderWidth, width);

    ctx.stroke();

    addStaticBitcodes();
}

// addEventListenerToCanvas();
