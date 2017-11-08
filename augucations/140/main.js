var pixelSize = 39; //51; //25; // same as grid size

var offset = 25;

var pixelNum = 13; //10; //20 //canvas.width / pixelSize;

var canvas, ctx;

function main()
{
    ctx.webkitImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false; /// future

    //drawLine();
    //addEventListenerToCanvas();
    //drawCoordinateSystem();

    translateCanvas();
    calc();
    draw();

    algoStep();
}

main();
