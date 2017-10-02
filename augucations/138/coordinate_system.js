var gridColor = "#000000";
var axisColor = "#333333";

var gridLineWidth = 0.2;
var axisLineWidth = 3;

function drawAxisArrows()
{
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "red";
    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width, 0);
    ctx.stroke();

    ctx.translate(offset, offset);
}

function drawCoordinateSystem()
{
    ctx.beginPath();
    ctx.lineWidth = gridLineWidth;
    ctx.strokeStyle = gridColor;

    // draw vertical lines
    for (var i = 1; i < canvas.width / pixelSize; i++)
    {
        ctx.moveTo(i * pixelSize, 0);
        ctx.lineTo(i * pixelSize, canvas.height);
    }

    // draw horizontal lines
    for (var i = 1; i < canvas.height / pixelSize; i++)
    {
        ctx.moveTo(0, i * pixelSize);
        ctx.lineTo(canvas.width, i * pixelSize);
    }

    ctx.stroke();

    // draw axes

    ctx.beginPath();
    ctx.lineWidth = axisLineWidth;
    ctx.strokeStyle = axisColor;

    ctx.moveTo(0, 0);
    ctx.lineTo(0, canvas.height);

    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width, 0);

    ctx.stroke();
}
