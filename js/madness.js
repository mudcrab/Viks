var Madness = Class.create({
    initialize: function()
    {

    },
    setup: function(stage)
    {

    },
    draw: function()
    {
        
    },
    update: function()
    {
        $('fps').update(piston.fps);
    }
});
var piston = new PistonEngine('gameDisplay', Madness);
//var engine = new PistonEngine('gameDisplay', jQuery(window).width(), jQuery(window).height(), Madness, 'c2d', 8);
