var transformation_manager = function()
{
    var Mode = {LOCAL: 1, GLOBAL: 2};
    this.mode = Mode.LOCAL;

    addEventListener("rotate_object",
                    function(event)
                    {
                        this.rotate(event);
                    },
                    false);

    this.rotate()
    {

    }

}
