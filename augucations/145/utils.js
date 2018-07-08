// Radians <-> Degree conversion constants
D2R = Math.PI / 180;
R2D = 180 / Math.PI;

function vec(x, y, z) {
    return new THREE.Vector3(x, y, z);
}

function printMatrix(matrix) {
    e = matrix.elements;
    str = "";

    for (i = 0; i < e.length; i += 4){
        line = e.slice(i, i+4);
        for (j = 0; j < line.length; j++) {
            str += Math.round(line[j] * 100) / 100 + "\t";
        }
        str += "\n";
    }

    console.log(str);
}
