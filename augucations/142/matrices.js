// This script creates translation matrices

var matrix_rotX = function(angle)
{
    var m = new THREE.Matrix4();

    m.set(1, 0, 0, 0,
        0, Math.cos(angle), -Math.sin(angle), 0,
        0, Math.sin(angle), Math.cos(angle), 0, 
        0, 0, 0, 1);

    return m;
}

var matrix_rotY = function(angle)
{
    var m = new THREE.Matrix4();

    m.set(Math.cos(angle), 0, Math.sin(angle), 0,
          0, 1, 0, 0,
          -Math.sin(angle), 0, Math.cos(angle), 0,
          0, 0, 0, 1);

    return m;
}

var matrix_rotZ = function(angle)
{
    var m = new THREE.Matrix4();

    m.set(Math.cos(angle), -Math.sin(angle), 0, 0,
          Math.sin(angle), Math.cos(angle), 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1);

    return m;
}

// Debug to string function for 4x4 Matrices
var M4toStr = function(matrix)
{
    // transpose the matrix to read the elements in row-major order
    m = matrix.transpose();

    var s = "";
    for (var x = 0; x < 4; x++)
    {
        var row = "";
        for (var y = 0; y < 4; y++)
        {
            row += m.elements[x + y * 4].toFixed(2) + "\t";
        }
        s += row + "\n";
    }
    return s;
}
