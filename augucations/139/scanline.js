var edges;
var intersections;
var allIntersectionsUnsorted;
var intersectionspairs;
var pairs;
var polygon;

function scanline()
{
    // reset the arrays

    edges = [];
    intersections = [];
    intersectionspairs = [];
    pairs = [];
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
            m: (max.y - min.y) / (max.x - min.x),
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
        //storedIntersections.push([]);

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

            //intersections[i].push(Math.round(intersection.x * 10) / 10);
            //storedIntersections[i].push(Math.round(intersection.x * 10) / 10);
            intersections[i].push(intersection);
            //storedIntersections[i].push(intersection);

            edge.intersections.push(intersection);
        }
    }

    // backup the unsorted intersections before they are sorted (to display them later during the explanation)
    allIntersectionsUnsorted = intersections.copy();

    // sort the intersections by their x values
    for (var y = 0; y < intersections.length; y++)
    {
        function compare(a,b) {
          if (a.x < b.x)
            return -1;
          if (a.x > b.x)
            return 1;
          return 0;
        }

        intersections[y].sort(compare);
        //storedIntersections[y].sort(compare);
    }

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
            for (var p = intersections[y][x].x + 1; p < intersections[y][x + 1].x; p++)
            {
                polygon[y].push({x: p, y: y});
            }

            pairs.push({l: intersections[y][x].x, r: intersections[y][x+1].x, y: y, idx: x / 2});
        }
    }

    calcStepNumbers(pairs.length);
}

function calcIntersectionX(edge, y)
{
    return edge.min_x + 1 / edge.m * (y - edge.min_y); // y - 0.5 - edge.min_y
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
    var edge;

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
        edge = possibleEdges[0].max_x > possibleEdges[1].max_x ? possibleEdges[0] : possibleEdges[1];
    else
        edge = possibleEdges[0].max_x > possibleEdges[1].max_x ? possibleEdges[1] : possibleEdges[0];

    //console.log("min: ", edge.min, "  max: ", edge.max);
    console.log("right: ", right, "  edge: ", edge)
    while (edge.max.y < findScanlineYRange().min)
    {
        console.log("aasadsdsdsdsd: ", edge);
        if (right)
            edge = edges[edge.idx + 1];
        else
            edge = edges[edge.idx - 1]
    }

    return edge;
}

function removeIntersectionByIndex(arr, index)
{
    arr.remove(index);
}
