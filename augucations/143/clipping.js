function calcBitcodes(){
    for (p of points){
        p.bc = 0;

        // add bits according to the position
        if (p.y < absBoarderWidth) p.bc += 1000;
        if (p.y > width - absBoarderWidth) p.bc += 100;
        if (p.x > width - absBoarderWidth) p.bc += 10;
        if (p.x < absBoarderWidth) p.bc += 1;
    }
}

var clipping_moved_point = function(){
    calcBitcodes();
}

addEventListener("moved_point", clipping_moved_point, false);
