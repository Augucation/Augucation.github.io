var variablesContainer = document.getElementById("variablesContainer");
var calculationContainer = document.getElementById("calculationContainer");
var infoContainer = document.getElementById("infoContainer");

var table_edges = document.getElementById("table_edges");
var table_edges_tr = table_edges.getElementsByTagName("tr");
var table_edges_td = table_edges.getElementsByTagName("td");

var table_intersections = document.getElementById("table_intersections");
var table_intersections_tr = table_intersections.getElementsByTagName("tr");
var table_intersections_td = table_intersections.getElementsByTagName("td");

var tables = [table_edges, table_intersections];

var highlightColor = "#af2626";

function fillTableEdges()
{
    for (var i = 0; i < edges.length; i++)
    {
        var e = edges[i];

        table_edges_td[i * 3 + 0].innerHTML = "(" + e.min_x + "," + e.min_y + ")";
        table_edges_td[i * 3 + 1].innerHTML = "(" + e.max_x + "," + e.max_y + ")";
        table_edges_td[i * 3 + 2].innerHTML = Math.round(e.m * 100) / 100;
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
