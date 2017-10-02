var line = [];

var m, dx, dy, d, incrE, incrSE;

function bresenham(p, q)
{
    var a = clonePoint(p);
    var b = clonePoint(q);

    dx = b.x - a.x;
    dy = b.y - a.y;
    m = dy / dx;
    d = 2 * dy - dx;
    incrE = 2 * dy;
    incrSE = 2 * (dy - dx);

    line = [];

    line.push(clonePoint(a));
    
    while (a.x < b.x)
    {
        if (d <= 0)
        {
            d += incrE;
            a.x++;
        }
        else
        {
            d += incrSE;
            a.x++;
            a.y++;
        }

        line.push(clonePoint(a));
    }
}

function clonePoint(point)
{
    return {
        x: point.x,
        y: point.y
    };
}
