var transformation_manager = function(){

    this.radio_local = document.getElementById("radio_local");
    this.radio_global = document.getElementById("radio_global");

    this.mode = "local";  // or global

    self = this;

    this.radio_local.onclick = function() {
        self.mode = "local";
    }

    this.radio_global.onclick = function() {
        self.mode = "global";
    }    
}

var transformation_manager = new transformation_manager();
