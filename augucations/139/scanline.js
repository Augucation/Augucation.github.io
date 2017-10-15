var edges;
var intersections;
var storedIntersections;
var allIntersectionsUnsorted;
var correctIntersectionsUnsorted;
var correctIntersectionsSorted;
var intersectionspairs;
var pairs;
var floatPairs;
var polygon;

function scanline()
{
    // reset the arrays

    edges = [];
    intersections = [];
    storedIntersections = [];
    allIntersections = [];
    intersectionspairs = [];
    pairs = [];
    floatPairs = [];
    polygon = [];

    // calculate and store the polygon's edges

    for (var i = 0; i < vertices.length; i++)
    {

        // consider two following points:
        // the lower one is min, the upper one is max (y-axis value)

        var curr = vertices[i];
        var next = vertices[(i + 1) % vertices.length];

        var min = curr.y >= next.y ? next : curr;
        var max = curr.y >= next.y ? curr : next;

        var edge = {
            min_x: min.x,
            min_y: min.y,
            max_x: max.x,
            max_y: max.y,
            min: min,
            max: max,
            m: (max.x - min.x) / (max.y - min.y),
            l: Math.sqrt(Math.pow(max.x - min.x, 2) + Math.pow(max.y - min.y, 2)),
            idx: edges.length,
            intersections: []
        };

        edge.m = isNaN(edge.m) ? 0 : edge.m;

        edges.push(edge);
    }

    // find all intersections

    for (var i = 0; i <= pixelNum; i++) // iterate over every horizontal pixel line
    {

        // 2D intersections array: one row for each scanline
        intersections.push([]);
        storedIntersections.push([]);

        // calculate the current y value
        var scan_y = i;

        // iterate over the edges and find the intersections
        for (var j = 0; j < edges.length; j++)
        {
            var edge = edges[j];

            // skip horizontal edges
            if (edge.m == Number.POSITIVE_INFINITY || edge.m == Number.NEGATIVE_INFINITY)
                continue;

            // skip edge if edge does not intersect the scanline
            if (!(edge.min_y <= scan_y && scan_y <= edge.max_y))
                continue;

            // calculate the intersection's x coordinate
            var intersection = {x: Math.round(calcIntersectionX(edge, scan_y) * 10) / 10, y: scan_y, edge: edge};

            intersections[i].push(Math.round(intersection.x * 10) / 10);
            storedIntersections[i].push(Math.round(intersection.x * 10) / 10);

            edge.intersections.push(intersection);
        }

        //intersections[i].sortNumbers();
        //storedIntersections[i].sortNumbers();
    }

    allIntersectionsUnsorted = intersections.copy();

    removeFalseDuplicates(intersections);
    //removeFalseDuplicates(storedIntersections);

    correctIntersectionsUnsorted = intersections.copy();

    for (var y = 0; y < intersections.length; y++)
    {
        intersections[y].sortNumbers();
        storedIntersections[y].sortNumbers();
    }

    correctIntersectionsSorted = intersections.copy();

    // draw

    // iterate over intersections lists

    for (var y = 0; y < intersections.length; y++)
    {
        // create an empty array for each horizontal row
        polygon[y] = [];

        // for each row of intersections iterate over every second intersection to draw between these intersection pairs
        for (var x = 0; x < intersections[y].length; x+=2)
        {
            // for each intersection pair start at the pixel right to the first intersection, go pixel wise to the right and draw all pixels until the second intersection is reached
            for (var p = intersections[y][x] + 1; p < intersections[y][x + 1]; p++)
            {
                //drawPixel({x: p, y: y});
                polygon[y].push({x: p, y: y});
            }

            pairs.push({l: intersections[y][x], r: intersections[y][x+1], y: y, idx: x / 2});
            floatPairs.push({l: storedIntersections[y][x], r: storedIntersections[y][x+1], y: y, idx: x / 2});
        }
    }

    fillPolygon();

    fsteps = pairs.length;
    tsteps = fsteps + esteps;
    stepSlider.max = tsteps;

    /*
    // iterate over scanlines
    for (var y = 0; y <= pixelNum + 1; y++) // y <= pixelNum
    {

        // skip scanline if there aren't any intersections
        if (intersections[y].length == 0)
            continue;

        // if there is only one intersection, draw this pixel and move on
        if (intersections[y].length == 1)
        {
            //drawPixel({x: intersections[y][0], y: y}); // y - 1
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
                drawPixel({x: x, y: y}); // y - 1
        }
    }
    */
}

function calcIntersectionX(edge, y)
{
    return edge.min_x + edge.m * (y - edge.min_y); // y - 0.5 - edge.min_y
}

function sortIntersectionIntoArray(arr, x)
{
    //if (arr.indexOf(x) >= 0 && arr.length > 0)
    //    return null;

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

// all intersections that are vertices but no local maxima are removed
function removeFalseDuplicates(arr)
{
    /* ursprünglich: hardgecoded mit intersections*/

    // iterate over all vertices
    for (var i = 0; i < vertices.length; i++)
    {
        // get previous, current and next vertices
        var prev = vertices[(i - 1) % vertices.length];
        var curr = vertices[i];
        var next = vertices[(i + 1) % vertices.length];

        // javascript's modulo ignores negative values >:(
        if (prev == undefined)
            prev = vertices[vertices.length - 1];

        // the vertex is a maximum if the vertical directions of prev-curr and curr-next have different signs

        var dir0 = curr.y - prev.y;
        var dir1 = next.y - curr.y;

        // skip the current vertex, if the directions have different signs -> local maximum
        if ((dir0 < 0) != (dir1 < 0))
            continue;

        // else, delete the vertex once from the intersections list
        var roundY = Math.floor(curr.y);
        var roundX = Math.round(curr.x);

        // DEBUG
        if (i == 4)
        {
            //console.log(arr[roundY]);
            //console.log("arr[" + roundY + "] " + roundX + ": ", arr[roundY]);
        }
        //removeIntersectionByIndex(arr[roundY], arr[roundY].indexOf(curr.x));
    }

    // if the number of intersections per scanline is odd, delete the one with the highest x value
    /*
    for (var y = 0; y < intersections.length; y++)
    {
        // skip scanline if the length of intersections is even
        if (intersections[y].length % 2 == 0)
            continue;

        // find the index of the rightest intersection
        var idx = 0;
        for (var i = 0; i < intersections[y].length; i++)
        {
            if (intersections[y][idx] < intersections[y][i])
                idx = i;
        }

        // remove this vertex
        removeIntersectionByIndex(intersections[y], idx);
    }
    */

    /*
    // iterate over the edges
    for (var i = 0; i < edges.length; i++)
    {
        // get current and next edge
        var e = edges[i];                       // current edge
        var n = edges[(i + 1) % edges.length];  // next edge

        // calculate the vertical directions of both edges
        var e_dir = e.max.y - e.min.y;
        var n_dir = n.max.y - n.min.y;

        // if both directions have different signs, their shared vertex is a local maximum and can be skipped
        if (e_dir * n_dir < 0) // different signs -> negative product
            continue;

        // for each edge pair, check if both edges are on the same side in relation to their shared vertex. if not, skip this pair.

        // if one edge's start is the other one's end, they are on different sides and their shared vertex does not need to be removed
        //if (e.min.y == n.min.y || e.max.y == n.max.y)
        //    continue;

        // find their shared vertex
        var vertex;

        if (e.max.y == n.min.y)
            vertex = e.max;

        if (e.min.y == n.max.y)
            vertex = e.min;

        // delete one instance of this shared vertex from the intersections List
        removeIntersectionByIndex(intersections[vertex.y], intersections[vertex.y].indexOf(vertex.x));
    }
    */
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

function findScanlineYRange()
{
    // find lowest and highest y value
    var miny = vertices[0].y;
    var maxy = vertices[0].y;
    for (var i = 0; i < vertices.length; i++)
    {
        if (miny > vertices[i].y)
            miny = vertices[i].y;

        if (maxy < vertices[i].y)
            maxy = vertices[i].y;
    }

    // to get the min and max scanlines, ceil min and floor max
    return {min: Math.ceil(miny), max: Math.floor(maxy)};
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

function sortEdgesByLength(ascending = true)
{
    var sorted_edges = edges.copy();

    function compare(a,b)
    {
        if (a.l < b.l)
            return ascending ? -1 : 1;
        if (a.l > b.l)
            return ascending ? 1 : -1;
        return 0;
    }

    return sorted_edges.sort(compare);
}

// tricky: findRightEdge-Function with false as parameter returns the left one
function findRightEdgeFromHighestVertex(right = true)
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
    if (right)
        return possibleEdges[0].max_x > possibleEdges[1].max_x ? possibleEdges[0] : possibleEdges[1];
    else
        return possibleEdges[0].max_x > possibleEdges[1].max_x ? possibleEdges[1] : possibleEdges[0];
}

function removeIntersectionByIndex(arr, index)
{
    arr.remove(index);
}
