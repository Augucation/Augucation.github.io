var canvas = document.getElementById("canvy");
var ctx = canvas.getContext("2d");

// default colors
var colorLine = "#686B94";
var color_hci = "#555e67";
var colorPoint = "#af2626";

var segmentLineWidth = 1;
var lineWidth = 5;
var borderWidth = 0.25;

var bc_fontSize = 30; // static bit codes inside the canvas
var pointSize = 10;

var p1 = {x: 220, y: 530};
var p2 = {x: 520, y: 220};
var points = [p1, p2];

var draggingPoint = null;

var width = canvy.width; // same as height
var absBorderWidth = width * borderWidth;

function clear(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawLineP1P2(){
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color_hci;
    ctx.stroke();
}

function drawPoint(point, color = colorPoint, size = pointSize){
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(point.x, point.y, size, 0, 2 * Math.PI, false);
    ctx.fill();
}

// helper: get mouse position in canvas
function getMousePos(evt){
    var rect = canvas.getBoundingClientRect(),
        scaleX = canvas.width / rect.width,
        scaleY = canvas.height / rect.height;

    return {
      x: ((evt.clientX - rect.left) * scaleX),
      y: ((evt.clientY - rect.top) * scaleY)
    }
}

function clickedOnPoint(mousePos){
    for (var i = 0; i < points.length; i++){
        if (distance(mousePos, points[i]) < 10){
            return i;
        }
    }
    return null;
}

function addEventListenerToCanvas(){
    // click listener to move points
    canvas.addEventListener("mousedown", function(evt){
            draggingPoint = clickedOnPoint(getMousePos(evt), true);
    });

    canvas.addEventListener("mouseup", function(){
        // reset draggingPoint
        draggingPoint = false;
    });

    // move points
    canvas.addEventListener("mousemove", movePoint, false);
}

function movePoint(evt){
    var mPos = getMousePos(evt);

    // don't leave the canvas!
    if (mPos.x < 0 || mPos.y < 0 || mPos.x > width || mPos.y > width)
        return;

    manageCursorIcon(mPos, true);

    // return if no point is dragged at the moment
    if (draggingPoint == null || points[draggingPoint] == undefined)
        return;

    // move dragged vertex
    points[draggingPoint].x = mPos.x;
    points[draggingPoint].y = mPos.y;

    clear();
    // calc();
    draw();

    dispatchEvent(new CustomEvent("moved_point"));
}

function distance(a, b){
    return (Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)));
}

function manageCursorIcon(mPos){

    for (var i = 0; i < points.length;  i++)
    {
        if ((distance(mPos, points[i]) < pointSize))
        {
            canvas.className = "pointy";
            return;
        }
    }
    canvas.className = "";
}

function printOnCanvas(text, x, y, size = 20, color = "#000000"){
    ctx.fillStyle = color;
    //ctx.font = size + "px lighter";
    ctx.font = "normal normal lighter " + size + "px arial";
    ctx.fillText(text, x, y);
}

function addStaticBitcodes(){
    // absolute borderwidth times pi * thumb
    var offset = width * borderWidth * 0.3;

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

function draw(){

    // draw the lines which separate rectangle from border
    ctx.beginPath();

    // horizontal lines
    ctx.moveTo(0, absBorderWidth);
    ctx.lineTo(width, absBorderWidth);
    ctx.moveTo(0, width - absBorderWidth);
    ctx.lineTo(width, width - absBorderWidth);

    // vertical lines
    ctx.moveTo(absBorderWidth, 0);
    ctx.lineTo(absBorderWidth, width);
    ctx.moveTo(width - absBorderWidth, 0);
    ctx.lineTo(width - absBorderWidth, width);

    ctx.lineWidth = segmentLineWidth;
    ctx.strokeStyle = colorLine;
    ctx.stroke();

    addStaticBitcodes();

    drawLineP1P2();
    drawPoint(p1);
    drawPoint(p2);
}

addEventListenerToCanvas();
