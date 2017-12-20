

/*

    this.rotateAbs = function(x, y, z, local){
        // rotate the object itself
        _x = x ? x : that.transform.rotation.x;
        _y = y ? y : that.transform.rotation.y;
        _z = z ? z : that.transform.rotation.z;
        that.transform.rotation.set(_x, _y, _z);

        // if not local, translate the coordinate system as well
        if (!local)
            that.coordinate_system.rotate(x, y, z);
    }

    this.translateRel = function(x, y, z, local){
        // translate the object itself
        that.transform.translateX(x);
        that.transform.translateY(y);
        that.transform.translateZ(z);

        // if not local, translate the coordinate system as well
        if (!local)
            that.coordinate_system.translate(x, y, z);
    }

    this.translateAbs = function(x, y, z, local){
        // translate the object itself
        _x = x ? x : that.transform.position.x;
        _y = y ? y : that.transform.position.y;
        _z = z ? z : that.transform.position.z;
        that.transform.position.set(_x, _y, _z);

        // if not local, translate the coordinate system as well
        if (!local)
            that.coordinate_system.position.set(_x, _y, _z);
            // 6:20
    }
*/
