var m = 0;

function calcEquation(p, q)
{
    m = calcM(p, q);
}

function calcM(p, q)
{
    return -(q.y - p.y) / (p.x - q.x);
}

function bresenham(p, q)
{
    var a = clonePoint(p);
    var b = clonePoint(q);


    /* Midpoint Algorithm */


    /* Code von http://www.idav.ucdavis.edu/education/GraphicsNotes/Bresenhams-Algorithm/Bresenhams-Algorithm.html

    */
    var dx = b.x - a.x;
    var dy = b.y - a.y;
    var m = dy / dx;
    var err = m - 1;

    while (a.x < b.x)
    {
        drawPixel(a);

        if (err >= 0)
        {
            a.y++;
            err -= 1;
        }
        a.x++;
        err += m;
    }

    /* Code von den ICG Slides

    // b is toooo far away
    //b.x--; b.y--;

    var dx = b.x - a.x;
    var dy = b.y - a.y;
    var m = dy / dx;
    var d = 2 * dy - dx;
    var incrE = 2 * dy;
    var incrNE = 2 * (dy - dx);

    while (a.x < b.x)
    {
        drawPixel(a);

        if (d <= 0)
        {
            d += incrE;
            a.x++;
        }
        else
        {
            d += incrNE;
            a.x++;
            a.y++;
        }
    }
    */
}

function plotLine(p, q)
{
    // start and ending points a and b
    var a = clonePoint(p);
    var b = clonePoint(q);

    // calculate x and y delta between a and b
    var dx =  Math.abs(b.x - a.x);
    var dy = -Math.abs(b.y - a.y);

    // calculate direction
    var sx = a.x < b.x ? 1 : -1;
    var sy = a.y < b.y ? 1 : -1;

    var err = dx + dy;
    var e2;                                   /* error value e_xy */

    for (;;){

        // draw current pixel
        drawPixel(a);

        // terminate if end point has been reached
        if (a.x == b.x && a.y == b.y) break;

        // double error
        e2 = 2 * err;


        if (e2 >= dy)       /* x step */
        {
            err += dy;
            a.x += sx;
        }

        if (e2 <= dx)       /* y step */
        {
            err += dx;
            a.y += sy;
        }
    }
}

function clonePoint(point)
{
    return {
        x: point.x,
        y: point.y
    };
}
