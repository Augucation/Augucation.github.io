var transformation_angles_manager = function() {

    this.slider = document.getElementById("angleSlider");

    this.rots = {};

    this.currentAngle = "X";

    this.init = function(){
        this.findRotElements();
        this.addListeners();
    }

    this.findRotElements = function(){
        this.rots.all = document.getElementsByClassName("matrix");
        for (var i = 0; i < this.rots.all.length; i++){
            this.rots[this.rots.all[i].id] = this.rots.all[i];
        }
    }

    var self = this;
    this.addListeners = function(){

        for (var i = 0; i < this.rots.all.length; i++){

            this.rots.all[i].addEventListener("click", function(ev) {

                // store the current rotation element
                self.currentAngle = ev.target.id;

                // show slider when a rot element is clicked
                self.showSlider(true);

            }, false);
        }

        document.addEventListener("click", function(ev) {

            // when clicked on anything but a rot element, hide the slider
            if (!ev.target.className.includes("matrix") && ev.target.id != "angleSlider")
                self.showSlider(false);
        }, false);

        this.slider.addEventListener("input", function(ev){

            // update the rotation data stored inside the trans manager
            trans.setRotation(self.currentAngle, parseFloat(this.value));

            // update gui
            self.updateGUIAngle(self.currentAngle, parseFloat(this.value));

        }, false);

        // add listener to the reset button to reset gui
        document.getElementById("resetBtn").addEventListener("click", self.resetGUIAngles(), false);
    }

    this.showSlider = function(show)
    {
        this.slider.style.visibility = show ? "visible" : "hidden";

        this.slider.value = trans.getRotation(this.currentAngle);

        if (show)
            //console.log("highlight ", this.currentAngle);
            this.highLightAxis(this.currentAngle);
        else
            //console.log("unhighlight");
            this.highLightAxis(false);
    }

    this.updateGUIAngle = function(axis, value){
        this.rots[axis].innerHTML = "R<sub>" + axis.toLowerCase() + "</sub>(" + value + ")";
    }

    this.resetGUIAngles = function(){
        self.updateGUIAngle("X", 0);
        self.updateGUIAngle("Y", 0);
        self.updateGUIAngle("Z", 0);
    }

    this.highLightAxis = function(axis){

        // unhighlight all
        for (var i = 0; i < this.rots.all.length; i++)
            //console.log("juuuuuu: ", this.rots.all[i].id);
            this.rots.all[i].className = "matrix";

        // if an axis is given, highlight this one
        if (axis)
            //console.log("nooooo: ", this.rots[axis].className);
            this.rots[axis].className = "matrix highlighted";
    }

    this.init();
}

var angle_man = new transformation_angles_manager();
