var transformation_angles_manager = function() {

    this.sliderDivs = [];
    this.sliderDivs[0] = document.getElementById("slidersTrans");
    this.sliderDivs[1] = document.getElementById("slidersRot");
    this.sliderDivs[2] = document.getElementById("slidersScale");

    this.sliders = [];
    this.sliders[0] = document.getElementById("SliderTransX");
    this.sliders[1] = document.getElementById("SliderTransY");
    this.sliders[2] = document.getElementById("SliderTransZ");
    this.sliders[3] = document.getElementById("SliderRotZ");
    this.sliders[4] = document.getElementById("SliderRotY");
    this.sliders[5] = document.getElementById("SliderRotX");
    this.sliders[6] = document.getElementById("SliderScaleX");
    this.sliders[7] = document.getElementById("SliderScaleY");
    this.sliders[8] = document.getElementById("SliderScaleZ");

    this.mats = {};

    this.currentTransformation;
    this.currentMatrixDiv;

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
                var target_id = ev.target.parentNode.parentNode.id;

                // store the current transformation id and div
                self.currentTransformation = target_id;
                self.currentMatrixDiv = ev.target;

                // exclude composition matrix
                if (target_id == "composition")
                    return;


                // show sliders when matrix is clicked
                if (target_id == "translation"){
                    self.showSlider(self.sliderDivs[0], true);
                    self.showSlider(self.sliderDivs[1], false);
                    self.showSlider(self.sliderDivs[2], false);
                }
                else if (target_id.includes("rotation")){
                    self.showSlider(self.sliderDivs[1], true);
                    self.showSlider(self.sliderDivs[0], false);
                    self.showSlider(self.sliderDivs[2], false);
                }
                else if (target_id == "scale"){
                    self.showSlider(self.sliderDivs[2], true);
                    self.showSlider(self.sliderDivs[0], false);
                    self.showSlider(self.sliderDivs[1], false);
                }


                // highlight matrix
                self.highLightMats(true);

            }, false);
        }

        document.addEventListener("click", function(ev) {

            // when clicked on anything but a matrix or the reset button,
            // hide the slider
            if (   !ev.target.className.includes("matrix")
                && !ev.target.className.includes("cell")
                && !ev.target.id.includes("Slider")
                && !ev.target.id == "resetBtn"
                || ev.target.id == "composition") {

                    for (sliderDiv of self.sliderDivs){
                        self.showSlider(sliderDiv, false);
                    }
                    self.highLightMats(false);
            }
        }, false);


        // add listener to the reset button to reset gui
        document.getElementById("resetBtn").addEventListener("click", self.resetGUIAngles(), false);
    }

    this.showSlider = function(sliderDiv, show) {
        sliderDiv.style.display = show ? "block" : "none";

    }

    this.updateGUIAngle = function(axis, value){
        this.mats[axis].innerHTML = "R<sub>" + axis.toLowerCase() + "</sub>(" + value + ")";
    }

    this.resetGUIAngles = function(){
//        self.updateGUIAngle("X", 0);
//        self.updateGUIAngle("Y", 0);
//        self.updateGUIAngle("Z", 0);
    }

    this.setCurrentMatrixDiv = function() {
        this.currentMatrixDiv = document.getElementById(this.currentTransformation);
    }

    this.highLightMats = function(transformation){

        var mats = document.getElementsByClassName("matrix");
        for (var i = 1; i < mats.length; i++) {
            mats[i].id = trans.composition_order[i - 1];
        }

        this.setCurrentMatrixDiv();
        gui.findDivs();

        // unhighlight all
        for (var i = 0; i < this.mats.all.length; i++)
            this.mats.all[i].parentNode.className = "matrix_container";

        // If there is no current transformation, return at this point and don't
        // highlight anything.
        if (!transformation || !this.currentTransformation)
            return;

        // If the current transformation is a rotation, hightlight all
        // rotation matrices!
        if (this.currentTransformation.includes("rotation")) {
            document.getElementById("rotationX").parentNode.className += " highlighted";
            document.getElementById("rotationY").parentNode.className += " highlighted";
            document.getElementById("rotationZ").parentNode.className += " highlighted";
        }
        // Else just highlight the matrix that was clicked on.
        else {
            this.currentMatrixDiv.parentNode.className += " highlighted";
        }
    }

    this.init();
}

var angle_man = new transformation_angles_manager();
