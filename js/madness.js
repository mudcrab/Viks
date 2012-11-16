var Madness = Class.create({
    testent: null,
    stage: null,
    input: null,
    initialize: function()
    {

        this.testent = new PistonEntity({x: Math.floor($('gameDisplay').getWidth() / 2 - 16), y: Math.floor($('gameDisplay').getHeight() / 2 - 16)}, {w: 32, h: 32}, 'player', 'Entity test');
    },
    setup: function()
    {
        this.stage = new PistonStage();
        this.input = new PistonInput();
        for(var i = 0; i < Math.floor($('gameDisplay').getWidth() / 32 + 1); i++)
        {
            for(var j = 0; j < Math.floor($('gameDisplay').getHeight() / 32 + 1); j++)
            {
                var rand = Math.floor(Math.random() * 3) + 1;
                this.stage.addChild(new PistonEntity({x: i * 32, y: j * 32}, {w: 32, h: 32}, 'grass' + rand));
            }
        }
        this.stage.addChild(this.testent);
        this.testent.properties.speed = 2;
        this.testent.rectSize = {w: 500, h: 300};
        this.testent.rectPos = {x: Math.floor($('gameDisplay').getWidth() / 2 - 250), y: Math.floor($('gameDisplay').getHeight() / 2 - 150)};
        this.testent.rectVisible = true;
    },
    draw: function()
    {
        
    },
    update: function()
    {
        $('fps').update(piston.fps);
        if(this.input.keyDown('w'))
        {
            this.testent.move(0, -this.testent.properties.speed);
        }
        if(this.input.keyDown('s'))
        {
            this.testent.move(0, this.testent.properties.speed);
        }
        if(this.input.keyDown('a'))
        {
            this.testent.move(-this.testent.properties.speed, 0);
        }
        if(this.input.keyDown('d'))
        {
            this.testent.move(this.testent.properties.speed, 0);
        }
    }
});
var piston = new PistonEngine('gameDisplay', Madness);