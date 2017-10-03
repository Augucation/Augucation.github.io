var colorDeltaX = "#141082";
var colorDeltaY = "#141082";
var lineWidth = 0.6;

function visualizeDeltas()
{
    visualizeLine();

    visualizeDeltaX(dx);
    visualizeDeltaY(dy);
}

function visualizeDeltaX(dx)
{
    // draw dx line
    ctx.beginPath();
    ctx.strokeStyle = colorDeltaX;
    ctx.lineWidth = lineWidth;
    moveToPixel(p.x + 0.5, q.y + 0.5);
    lineToPixel(q.x + 0.5, q.y + 0.5);
    ctx.stroke();

    // write delta value
    printOnCanvas("\u0394x = " + dx, dx * 0.4, q.y + 1.5, 20, colorDeltaX);
}

function visualizeDeltaY(dy)
{
    // draw dy line
    ctx.beginPath();
    ctx.strokeStyle = colorDeltaY;
    ctx.lineWidth = lineWidth;
    moveToPixel(p.x + 0.5, p.y + 0.5);
    lineToPixel(p.x + 0.5, q.y + 0.5);
    ctx.stroke();

    // write delta value
    printOnCanvas("\u0394y = " + dy, p.x + 1, q.y * 0.5 + 1, 20, colorDeltaY);
}

function visualizeLine()
{
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    moveToPixel(p.x + 0.5, p.y + 0.5);
    lineToPixel(q.x + 0.5, q.y + 0.5);
    ctx.stroke();
}

function printOnCanvas(text, x, y, size = 20, color = "#000000")
{
    ctx.fillStyle = color;
    //ctx.font = size + "px lighter";
    ctx.font = "normal normal lighter 15px arial";
    ctx.fillText(text, x * pixelSize, y * pixelSize);
}

function removeDeltas()
{
    clear();
    draw();
}
