var edges;
var intersections;
var storedIntersections;

function scanline()
{
    edges = [];
    intersections = [];

    // calculate and store the polygon's edges

    for (var i = 0; i < vertices.length; i++)
    {

        // consider two following points:
        // the lower one is min, the upper one is max (y-axis value)

        var curr = vertices[i];
        var next = vertices[(i + 1) % vertices.length];

        var min = curr.y >= next.y ? next : curr;
        var max = curr.y >= next.y ? curr : next;

        var edge = {min_x: min.x,
                    min_y: min.y,
                    max_x: max.x,
                    max_y: max.y,
                    m: (max.x - min.x) / (max.y - min.y),
                    l: Math.sqrt(Math.pow(max.x - min.x, 2) +                Math.pow(max.y - min.y, 2)),
                    idx: edges.length
                    };

        edges.push(edge);
    }


    // find all intersections

    for (var i = 0; i <= pixelNum + 1; i++) // iterate over every horizontal pixel line
    {

        // 2D intersections array: one row for each scanline
        intersections.push([]);

        // calculate the current y value
        var scan_y = i;

        // iterate over the edges and find the intersections
        for (var j = 0; j < edges.length; j++)
        {
            var edge = edges[j];

            // skip edge if edge does not intersect the scanline
            if (!(edge.min_y < scan_y && scan_y <= edge.max_y))
                continue;

            // calculate the intersection's x coordinate
            var intersection = {x: calcIntersectionX(edge, scan_y), y: scan_y};

            //drawPoint(intersection, "#00FF00", true);

            // sort the new intersection into the scanline's intersections array
            // sorted by x (ascending)
            sortIntersectionIntoArray(intersections[i], intersection.x); // Math.round(intersection.x));
        }
    }


    // store the intersections array as an copy before the intersections will be deleted b< the following algorithm step
    storedIntersections = intersections.copy();

    // for better intersection checking, round the intersections' x values to ints
    for (var x = 0; x < intersections.length; x++)
    {
        for (var y = 0; y < intersections[x].length; y++)
        {
            intersections[x][y] = Math.round(intersections[x][y]);
        }
    }

    // draw

    // iterate over scanlines
    for (var y = 0; y <= pixelNum + 1; y++)
    {

        // skip scanline if there aren't any intersections
        if (intersections[y].length == 0)
            continue;

        // if there is only one intersection, draw this pixel and move on
        if (intersections[y].length == 1)
        {
            drawPixel({x: intersections[y][0], y: y - 1});
            continue;
        }

        var par = 0; // parity

        // iterate over x along the scanline
        for (var x = 0; x <= pixelNum + 1; x++)
        {
            // for every intersection: increment parity by 1
            while (intersections[y].indexOf(x) >= 0)
            {
                par++;
                var idx = intersections[y].indexOf(x)
                removeIntersectionByIndex(intersections[y], idx);
            }

            // draw pixel if the parity is odd
            if (par % 2 == 1)
                drawPixel({x: x, y: y - 1});
        }
    }

}

function calcIntersectionX(edge, y)
{
    return edge.min_x + edge.m * (y - edge.min_y); // y - 0.5 - edge.min_y
}

function sortIntersectionIntoArray(arr, x)
{
    // insert intersection before the first element with a higher x
    for (var i = 0; i < arr.length; i++)
    {
        if (arr[i] > x)
        {
            arr.insert(i - 1, x);
            return i - 1;
        }
    }

    // if current intersection.x is higher than the others, push it
    arr.push(x);
    return arr.length;
}

// return the vertex with the lowest y value
// if there are multiple vertices, chose the left one
function findHighestVertex()
{
    // find lowest y value
    var miny = vertices[0].y;
    for (var i = 0; i < vertices.length; i++)
    {
        if (miny > vertices[i].y)
            miny = vertices[i].y;
    }

    // find all vertices with this y value
    var v = [];
    for (var i = 0; i < vertices.length; i++)
    {
        if (vertices[i].y == miny)
            v.push(vertices[i]);
    }

    // from these vertices, find the left one (lowest x value)
    var result = v[0];
    for (var i = 0; i < v.length; i++)
    {
        if (result.x > v[i].x)
            result = v[i];
    }

    return result;
}

function findLongestEdge()
{
    var le = edges[0];

    for (var i = 0; i < edges.length; i++)
    {
        if (edges[i].l > le.l)
            le = edges[i];
    }

    return le;
}

function findRightEdgeFromHighestVertex()
{
    var v = findHighestVertex();

    var possibleEdges = [];

    // find the edges which start at the highest vertex, should find two of them
    for (var i = 0; i < edges.length; i++)
    {
        // store edge, if it contains the highest vertex
        if ((edges[i].min_x == v.x && edges[i].min_y == v.y)
            || (edges[i].max_x == v.x && edges[i].max_y == v.y))
            possibleEdges.push(edges[i]);
    }

    if (possibleEdges.length < 2)
        console.error("Could not find two edges");

    // check which ones end point has the highest x value
    return possibleEdges[0].max_x > possibleEdges[1].max_x ? possibleEdges[0] : possibleEdges[1];
}

function removeIntersectionByIndex(arr, index)
{
    arr.remove(index);
}
