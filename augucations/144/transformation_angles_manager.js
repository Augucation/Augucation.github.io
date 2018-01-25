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
                console.log("currentTransformation: ", ev.target);
                // don't call children's event listener -> always call the parents' one
                ev.stopPropagation();

                // store the current rotation element
                self.currentTransformation = ev.target.id;

                // show sliders when matrix is clicked
                for (slider of self.sliders){
                    self.showSlider(slider, true);
            }

            }, false);
        }

        document.addEventListener("click", function(ev) {

            // when clicked on anything but a rot element, hide the slider
            if (!ev.target.className.includes("matrix") && !ev.target.id.includes("Slider"))
                for (slider of self.sliders){
                    self.showSlider(slider, false);
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

        if (show)
            this.highLightMats(true);
        else
            this.highLightMats(false);
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

        console.log("highlightMats: ", self.currentTransformation);

        // unhighlight all
        for (var i = 0; i < this.mats.all.length; i++)
            this.mats.all[i].className = "matrix";

        // if an transformation is given, highlight the current matrices
        // hardcoded and ugly :(
        if (transformation){
            if (self.currentTransformation == "trans")
                this.mats.all[1].className = "matrix highlighted";
            else if (self.currentTransformation.includes("rot")){
                    this.mats.all[2].className = "matrix highlighted";
                    this.mats.all[3].className = "matrix highlighted";
                    this.mats.all[4].className = "matrix highlighted";
                }
            else if (self.currentTransformation == "scale")
                this.mats.all[5].className = "matrix highlighted";
        }
    }

    this.init();
}

var angle_man = new transformation_angles_manager();
