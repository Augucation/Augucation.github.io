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

function printVariables(p_val = "", q_val = "", m_val = "", dx_val = "", dy_val = "", d_val = "", increE_val = "", increSE_val = "")
{

    console.log("dx: ", dx_val);

    span_p.innerHTML = p_val == "" ? "" : "p = (" + p_val.x + "," + p_val.y + ")";
    span_q.innerHTML = q_val == "" ? "" :  "q = (" + q_val.x + "," + q_val.y + ")";
    span_m.innerHTML = m_val == "" ? "" :  "m = " + Math.round(m_val * 100) / 100;
    span_dx.innerHTML = dx_val == "" ? "" :  "\u0394x = " + dx_val;
    span_dy.innerHTML = dy_val == "" ? "" :  "\u0394y = " + dy_val;
    span_d.innerHTML = d_val == "" ? "" :  "d = 2 * \u0394y - \u0394x = " + d_val;
    span_incrE.innerHTML = increE_val == "" ? "" :  "increE = 2 * \u0394y = " + increE_val;
    span_incrSE.innerHTML = increSE_val == "" ? "" :  "increSE = 2 * \u0394y - \u0394x = " + increSE_val;
}

function printCalculation(text)
{
    calculationText.innerHTML = text;
}

function printInfo(text)
{
    infoContainer.innerHTML = text;
}
