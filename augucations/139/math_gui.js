var variablesContainer = document.getElementById("variablesContainer");
var calculationContainer = document.getElementById("calculationContainer");
var infoContainer = document.getElementById("infoContainer");

var table_edges = document.getElementById("table_edges").getElementsByTagName("tbody")[0];

var table_intersections = document.getElementById("table_intersections");
var table_intersections_tr = table_intersections.getElementsByTagName("tr");
var table_intersections_td = table_intersections.getElementsByTagName("td");

var tables = [table_edges, table_intersections];

var highlightColor = "#af2626";

function addTableEdge(edge, idx = -1)
{
    var tr = table_edges.insertRow(idx);

    var td_min = tr.insertCell(0);
    var td_max = tr.insertCell(1);
    var td_m = tr.insertCell(2);

    td_min.innerHTML = edge.min.name + "(" + Math.round(edge.min_x * 10) / 10 + "," + Math.round(edge.min_y * 10) / 10 + ")";
    td_max.innerHTML = edge.max.name + "(" + Math.round(edge.max_x * 10) / 10 + "," + Math.round(edge.max_y * 10) / 10 + ")";
    td_m.innerHTML = Math.round(edge.m * 10) / 10;
}

function fillTableAllEdges()
{
    clearTableEdges();

    for (var i = 0; i < edges.length; i++)
    {
        addTableEdge(edges[i]);
    }
}

function addTableIntersection(x, y)
{
    var td = table_intersections_td[y * 2 + 1];

    // comma comma comma
    if (td.innerHTML != "")
        td.innerHTML += ", ";

    td.innerHTML += x;
}

function fillTableAllIntersections(array)
{
    clearTableIntersections();
    fillTableIntersectionLeftColumn();

    for (var y = 0; y < array.length; y++)
    {
        for (var idx = 0; idx < array[y].length; idx++)
        {
            addTableIntersection(array[y][idx].x, y);
        }
    }
}

function fillTableIntersectionLeftColumn()
{
    var tds = table_intersections_td;

    // iterate over every table cell td
    for (var i = 0; i < tds.length; i++)
    {
        // skip every second cell (right column)
        if (i % 2 == 1)
            continue;

        // insert index (/2, because every second one is skipped)
        tds[i].innerHTML = i / 2;
    }
}

function addTableIntersectionPair(pair)
{
    var td = table_intersections_td[pair.y * 2 + 1];

    /*
    */
    // if td is not empty, add a comma span
    if (td.getElementsByTagName("span").length > 0)
    {
        var commaspan = document.createElement("span");
        commaspan.innerHTML = ", ";
        td.appendChild(commaspan);
    }

    // create a span for every pair
    var span = document.createElement("span");
    span.innerHTML = pair.l + "-" + pair.r;
    td.appendChild(span);
}

function fillTableIntersectionPairs(array)
{
    clearTableIntersections();
    fillTableIntersectionLeftColumn();

    for (var i = 0; i < array.length; i++)
    {
        addTableIntersectionPair(array[i]);
    }
}

function printCalculation(text)
{
    calculationContainer.innerHTML = text;
}

function printInfo(text)
{
    infoContainer.innerHTML = text;
}

// colors all tds in a given row
function highlightRowInTable(table_idx, row_idx)
{
    var t = tables[table_idx];
    var tr = t.getElementsByTagName("tr")[row_idx + 1]; // ignore header row
    var td = tr.getElementsByTagName("td");

    for (var i = 0; i < td.length; i++)
        td[i].className = "td_highlighted";
}

// unhighlights every row in a table
function removeTableHightlight(table_idx)
{
    var t = tables[table_idx];
    var td = t.getElementsByTagName("td");

    for (var i = 0; i < td.length; i++)
    {
        td[i].className = "";
    }
}

// removes every row except for the header row
function clearTableEdges()
{
    var t = table_edges
    var tr_l = t.getElementsByTagName("tr").length;

    for (var i = tr_l - 1; i > 0; i--) // ignore header row
    {
        t.deleteRow(i);
    }
}

function clearTableIntersections(clearBothColumns = false)
{
    if (clearBothColumns)
        $("#table_intersections tr").find("td:eq(0)").empty();

    $("#table_intersections tr").find("td:eq(1)").empty();
}

function highlightIntersectionpair(pair)
{
    // get the td according to the pair's y
    var td = table_intersections_td[pair.y * 2 + 1];

    // get the span according to the pair's idx
    var pair_span = td.getElementsByTagName("span")[pair.idx * 2]; // * 2 because every second span is a comma span

    pair_span.className = "td_highlighted";
}

function updateTables()
{
    fillTableAllEdges();
    fillTableIntersectionPairs(floatPairs);
}
