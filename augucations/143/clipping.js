function calcBitcodes(){
    for (p of points){
        p.bc = 0;

        // add bits according to the position
        if (p.y < absBorderWidth) p.bc += 8;
        if (p.y > width - absBorderWidth) p.bc += 4;
        if (p.x > width - absBorderWidth) p.bc += 2;
        if (p.x < absBorderWidth) p.bc += 1;
    }
}

function calcAndOr(){
    // perform bitwise and and or
    var and = (p1.bc & p2.bc).toString(2);
    var or = (p1.bc | p2.bc).toString(2);
    return [and, or];
}

function evaluateResults(and, or)
{
    // if b1 and b2 =/= 0000 -> vollständig außerhalb -> true
    // if b1 or b2 == 0000 -> vollständig innerhalb -> true
    return [and != 0000, or == 0000];
}

var clipping_moved_point = function(){
    calcBitcodes();
    var [and, or] = calcAndOr();
    var [and_eval, or_eval] = evaluateResults(and, or);
    fillDivs(p1.bc, p2.bc, and, or, and_eval, or_eval);
}

addEventListener("moved_point", clipping_moved_point, false);

clipping_moved_point();
