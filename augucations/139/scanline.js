function scanline()
{
    var edges = [];

    for (var i = 0; i < vertices.length; i++)
    {
        var edge = {x0: vertices[i].x,
                    y0: vertices[i].y,
                    x1: vertices[(i + 1) % vertices.length].x,
                    y1: vertices[(i + 1) % vertices.length].y
                    };

        edges.push(edge);
    }

    console.log(edges);
}
