var transformation_angles_manager = function() {

    this.sliders = [];

    this.sliders[0] = document.getElementById("SliderX");
    this.sliders[1] = document.getElementById("SliderY");
    this.sliders[2] = document.getElementById("SliderZ");

    this.mats = {};

    this.currentTransormation = "trans"; // "rotZ", "rotY", "rotX", "scale"

    this.init = function(){
        this.findMatrices();
        this.addListeners();
    }

    this.findMatrices = function(){
        this.mats.all = document.getElementsByClassName("matrix");
        for (var i = 0; i < this.mats.all.length; i++){
            this.mats[this.mats.all[i].id] = this.mats.all[i];
        }
    }

    var self = this;
    this.addListeners = function(){

        for (var i = 0; i < this.mats.all.length; i++){

            this.mats.all[i].addEventListener("click", function(ev) {

                // hacky hack.
                // This event is called on a cell inside a matrix, but we want
                // it to be called on the matrix itself.
                // -> Set the id to the grandparent's id (cell -> row -> mat)
                ev.target.id = ev.target.parentNode.parentNode.id;

                // store the current rotation element
                self.currentTransformation = ev.target.id;

                // exlude composition matrix
                if (ev.target.id == "comp")
                    return;

                // show sliders when matrix is clicked
                for (slider of self.sliders)
                    self.showSlider(slider, true);

                // highlight matrix
                self.highLightMats(true);

            }, false);
        }

        document.addEventListener("click", function(ev) {

            // when clicked on anything but a rot element, hide the slider
            if (   !ev.target.className.includes("matrix")
                && !ev.target.className.includes("cell")
                && !ev.target.id.includes("Slider")
                || ev.target.id == "comp") {

                    for (slider of self.sliders){
                        self.showSlider(slider, false);
                    }
                    self.highLightMats(false);
            }
        }, false);


        for (slider of self.sliders)
            slider.addEventListener("input", function(ev){

                // update the rotation data stored inside the trans manager
                trans.setRotation(self.currentAngle, parseFloat(this.value));

                // update gui
                self.updateGUIAngle(self.currentAngle, parseFloat(this.value));

            }, false);

        // add listener to the reset button to reset gui
        document.getElementById("resetBtn").addEventListener("click", self.resetGUIAngles(), false);
    }

    this.showSlider = function(slider, show)
    {
        slider.style.visibility = show ? "visible" : "hidden";

        //this.slider.value = trans.getRotation(this.currentAngle);

    }

    this.updateGUIAngle = function(axis, value){
        this.mats[axis].innerHTML = "R<sub>" + axis.toLowerCase() + "</sub>(" + value + ")";
    }

    this.resetGUIAngles = function(){
//        self.updateGUIAngle("X", 0);
//        self.updateGUIAngle("Y", 0);
//        self.updateGUIAngle("Z", 0);
    }

    this.highLightMats = function(transformation){

        console.log("highlightMats: ", transformation);

        // unhighlight all
        for (var i = 0; i < this.mats.all.length; i++)
            this.mats.all[i].className = "matrix";

        // if an transformation is given, highlight the current matrices
        // hardcoded and ugly :(
        if (transformation){
            if (self.currentTransformation == "trans")
                this.mats.all[1].className = "matrix highlighted";
            else if (self.currentTransformation.includes("rot")){
                    this.mats.all[2].className += " highlighted";
                    this.mats.all[3].className = "matrix highlighted";
                    this.mats.all[4].className = "matrix highlighted";
            }
            else if (self.currentTransformation == "scale")
                this.mats.all[5].className = "matrix highlighted";
        }
    //    console.log(this.mats.all[2]);
    }

    this.init();
}

var angle_man = new transformation_angles_manager();
