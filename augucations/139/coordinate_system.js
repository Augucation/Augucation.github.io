var gridColor = "#000000";
var axisColor = "#333333";

var gridLineWidth = 0.2;
var axisLineWidth = 3;

function translateCanvas()
{
    ctx.translate(offset, offset);
}

function drawCoordinateSystem()
{
    ctx.beginPath();
    ctx.lineWidth = gridLineWidth;
    ctx.strokeStyle = gridColor;

    // draw vertical lines
    for (var i = 1; i <= pixelNum; i++)
    {
        moveToPixel(i, 0);
        lineToPixel(i, pixelNum + 1);
    }

    // draw horizontal lines
    for (var i = 1; i <= pixelNum; i++)
    {
        moveToPixel(0, i);
        lineToPixel(pixelNum + 1, i);
    }

    ctx.stroke();

    // draw axes

    ctx.beginPath();
    ctx.lineWidth = axisLineWidth;
    ctx.strokeStyle = axisColor;

    ctx.moveTo(0, 0);
    lineToPixel(0, pixelNum + 1);

    ctx.moveTo(0, 0);
    lineToPixel(pixelNum + 1, 0);

    ctx.stroke();

    // draw arrows
    ctx.beginPath();
    ctx.lineWidth = axisLineWidth;
    ctx.strokeStyle = axisColor;

    //x
    moveToPixel(pixelNum + 0.7, -0.3);
    lineToPixel(pixelNum + 1, 0);
    lineToPixel(pixelNum + 0.7, 0.3);

    //y
    moveToPixel(-0.3, pixelNum + 0.7);
    lineToPixel(0, pixelNum + 1);
    lineToPixel(0.3, pixelNum + 0.7);

    ctx.stroke();

    // arrow labels
    printOnCanvas("x", pixelNum + 0.2, -0.2, 18, axisColor);
    printOnCanvas("y", -0.3, pixelNum + 0.5, 20, axisColor);
}

function printOnCanvas(text, x, y, size = 20, color = "#000000")
{
    ctx.fillStyle = color;
    //ctx.font = size + "px lighter";
    ctx.font = "normal normal lighter " + size + "px arial";
    ctx.fillText(text, x * pixelSize, y * pixelSize);
}
