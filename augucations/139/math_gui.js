var variablesContainer = document.getElementById("variablesContainer");
var calculationText = document.getElementById("calculationText");
var infoContainer = document.getElementById("infoContainer");

var span_p = document.getElementById("var_span_p");
var span_q = document.getElementById("var_span_q");
var span_m = document.getElementById("var_span_m");
var span_dx = document.getElementById("var_span_dx");
var span_dy = document.getElementById("var_span_dy");
var span_d = document.getElementById("var_span_d");
var span_incrE = document.getElementById("var_span_incrE");
var span_incrSE = document.getElementById("var_span_incrSE");

function printVariables(p_val = null, q_val = null, m_val = null, dx_val = null, dy_val = null, d_val = null, incrE_val = null, incrSE_val = null)
{
    span_p.innerHTML = p_val == null ? "" : "p = (" + p_val.x + "," + p_val.y + ")";
    span_q.innerHTML = q_val == null ? "" :  "q = (" + q_val.x + "," + q_val.y + ")";
    span_m.innerHTML = m_val == null ? "" :  "m = " + Math.round(m_val * 100) / 100;
    span_dx.innerHTML = dx_val == null ? "" :  "\u0394x = " + dx_val;
    span_dy.innerHTML = dy_val == null ? "" :  "\u0394y = " + dy_val;
    span_d.innerHTML = d_val == null ? "" :  "d = " + d_val;
    span_incrE.innerHTML = incrE_val == null ? "" :  "incrE = " + incrE_val;
    span_incrSE.innerHTML = incrSE_val == null ? "" :  "incrSE = " + incrSE_val;
}

function printCalculation(text)
{
    calculationText.innerHTML = text;
}

function printInfo(text)
{
    infoContainer.innerHTML = text;
}
