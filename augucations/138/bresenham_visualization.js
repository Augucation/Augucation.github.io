var colorDeltaX = "#00FF00";
var colorDeltaY = "#00FF00";

function visualizeDeltas()
{
    visualizeLine();

    var dx = calcDX(p, q);
    var dy = calcDY(p, q);

    visualizeDeltaX(dx);
    visualizeDeltaY(dy);

    console.log("dx: ", dx, "  dy:", dy);
}

function visualizeDeltaX(dx)
{
    // draw dx line
    ctx.beginPath();
    ctx.strokeStyle = colorDeltaX;
    moveToPixel(p.x, q.y);
    lineToPixel(q.x, q.y);
    ctx.stroke();

    // write delta value
    printOnCanvas("\u0394x = " + dx, dx * 0.4, q.y + 1, 20);
}

function visualizeDeltaY(dy)
{
    // draw dy line
    ctx.beginPath();
    ctx.strokeStyle = colorDeltaY;
    moveToPixel(q.x, p.y);
    lineToPixel(q.x, q.y);
    ctx.stroke();
}

function visualizeLine()
{
    ctx.beginPath();
    moveToPixel(p.x, p.y);
    lineToPixel(q.x, q.y);
    ctx.stroke();
}

function printOnCanvas(text, x, y, size = 20, color = "#000000")
{
    ctx.fillStyle = color;
    ctx.font = size + "px Verdana";
    ctx.fillText(text, x * pixelSize, y * pixelSize);
}
