var Madness = Class.create({
    testent: null,
    stage: null,
    input: null,
    camera: null,
    entityCameraOffset: {},
    initialize: function()
    {

        this.testent = new PistonEntity({x: Math.floor($('gameDisplay').getWidth() / 2 - 16), y: Math.floor($('gameDisplay').getHeight() / 2 - 16)}, {w: 32, h: 32}, 'player', 'Entity test');
    },
    setup: function()
    {
        this.stage = new PistonStage(
            {x: 0, y: 0}, 
            {width: Math.floor($('gameDisplay').getWidth() / 32 + 1), height: Math.floor($('gameDisplay').getHeight() / 32 + 1),  
            pxW: $('gameDisplay').getWidth(), pxH: $('gameDisplay').getHeight()}
            );
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
        this.camera = new PistonCamera();
        this.camera.setCamera(this.testent);
        this.camera.setPos(this.testent.pos.x - this.camera.rectSize.w / 2 + this.testent.size.w / 2, this.testent.pos.y - this.camera.rectSize.h / 2 + this.testent.size.h / 2);
        this.stage.addChild(this.camera);
        this.entityCameraOffset = {
            top: this.testent.pos.y - this.camera.getPos().y,
            left: this.testent.pos.x - this.camera.getPos().x
        };
        var that = this;
        Event.observe(window, 'resize', function() { that.resize(); });
    },
    draw: function()
    {
        
    },
    update: function()
    {
        $('fps').update(piston.fps);
        jQuery('#renderer').html(piston.info().renderer);
        if(this.input.keyDown('w'))
        {
            if(this.testent.pos.y >= 0)
            {
                this.testent.move(0, -$(this).testent.properties.speed);
            }
        }
        if(this.input.keyDown('s'))
        {
            if(Math.abs(this.testent.pos.y + this.testent.size.h) <= this.stage.stageSize.pxH)
            {
                this.testent.move(0, $(this).testent.properties.speed);
            }
        }
        if(this.input.keyDown('a'))
        {
            if(this.testent.pos.x >= 0)
            {
                this.testent.move(-$(this).testent.properties.speed, 0);
            }
        }
        if(this.input.keyDown('d'))
        {
            if(Math.abs(this.testent.pos.x + this.testent.size.w) <= this.stage.stageSize.pxW)
            {
                this.testent.move($(this).testent.properties.speed, 0);
            } 
        }
        this.stage.update();
    },
    resize: function()
    {
        
    }
});
var piston = new PistonEngine('gameDisplay', Madness);