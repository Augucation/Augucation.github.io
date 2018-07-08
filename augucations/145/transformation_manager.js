var Mode = {LOCAL: 1, GLOBAL: 2};

var transformation_manager = function(){
    this.mode = Mode.LOCAL;

    var that = this;

    this.init = function(){

        addEventListener("slider_input", function(event)
                        {
                            objects.teapot.transform(event, that.mode);
                        },
                        false);

        addEventListener("radiobutton_input", function(event)
                        {
                            var name = event.detail.name.toUpperCase();
                            that.mode = Mode[name];
                        },
                        false);
    }

}

transformation_manager = new transformation_manager();
transformation_manager.init();
