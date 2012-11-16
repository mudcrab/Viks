var Madness = Class.create({
    testent: null,
    stage: null,
    initialize: function()
    {

        this.testent = new PistonEntity({x: 10, y: 10}, {w: 32, h: 32}, 'player', 'Entity test');
    },
    setup: function()
    {
        this.stage = new PistonStage();
        for(var i = 0; i < Math.floor($('gameDisplay').getWidth() / 32 + 1); i++)
        {
            for(var j = 0; j < Math.floor($('gameDisplay').getHeight() / 32 + 1); j++)
            {
                var rand = Math.floor(Math.random() * 3) + 1;
                this.stage.addChild(new PistonEntity({x: i * 32, y: j * 32}, {w: 32, h: 32}, 'grass' + rand));
            }
        }
        this.stage.addChild(this.testent);
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
