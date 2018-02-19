var Data = function(){

    this.composition = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ];

    this.translation = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ];

    this.rotationX = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ];

    this.rotationY = [
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 1]
    ];

    this.rotationZ = [
        [1, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 1]
    ];

    this.scale = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ];

    this.setTranslationX = function(x) {
        this.d[1][0] = x;
    }

    this.setTranslationY = function(y) {
        this.d[1][5] = y;
    }

    this.setTranslationZ = function(z) {
        this.d[1][10] = z;
    }

    this.setTranslationXYZ = function(x, y, z) {

    }
}

var data = new Data();

/*

TODO:
- Data in 3D Matrix umwandeln
  -> in matrix.js anpassen
- Data übernimmt alle set und get Funktionen vom transformation manager
- Transformation manager: Schnittstelle zwischen data und model renderer:
  Liest/schreibt in data, ruft mit datas daten model renderer auf
*/
