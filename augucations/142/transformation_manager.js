var transformation_manager = function(){

    this.radio_local = document.getElementById("radio_local");
    this.radio_global = document.getElementById("radio_global");

    this.radio_local.onclick = this.rotateCSLocal;
    this.radio_global.onclick = this.rotateCSGlobal;

    that = this;

    this.rotateCSLocal = function(){

        for (i in teapots){
            if(!teapots[i].cs)
                continue;
            var rot = teapots[i].obj.transform.rotation;
            teapots[i].cs.rotate(r2d(rot.x), r2d(rot.y), r2d(rot.z));
        }
        addEventListener("rotate_object", this.rotMsgHandler, false);
    }

    this.rotateCSGlobal = function(){

        for (i in teapots){
            if(!teapots[i].cs)
                continue;
            teapots[i].cs.rotate(0, 0, 0);
        }
        removeEventListener("rotate_object", this.rotMsgHandler);
    }

    this.rotMsgHandler = function(e){
        that.rotateCSLocal();
    }
}

var transformation_manager = new transformation_manager();
