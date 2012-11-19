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
        this.stage = new PistonStage(0, 0, Math.floor($('gameDisplay').getWidth() / 32 + 1), Math.floor($('gameDisplay').getHeight() / 32 + 1));
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
        if(this.input.keyDown('w'))
        {
            this.camera.move(0, -$(this).testent.properties.speed);
            this.testent.moveTo(this.camera.getPos().x + this.camera.rectSize.w / 2 - 16, this.camera.getPos().y + this.camera.rectSize.h / 2 - 16);

            /*if(this.testent.pos.y <= this.camera.getPos().y)
            {
                this.camera.move(0, -$(this).testent.properties.speed);
                this.camera.moveTo(this.camera.getPos().x, this.camera.getPos().y);
            }
            else
                this.testent.move(0, -$(this).testent.properties.speed);*/
        }
        if(this.input.keyDown('s'))
        {
            this.camera.move(0, $(this).testent.properties.speed);
            this.testent.moveTo(this.camera.getPos().x + this.camera.rectSize.w / 2 - 16, this.camera.getPos().y + this.camera.rectSize.h / 2 - 16);
        }
        if(this.input.keyDown('a'))
        {
            //this.testent.move(-this.testent.properties.speed, 0);
            //this.stage.move(this.testent.properties.speed, 0);
        }
        if(this.input.keyDown('d'))
        {
            
        }
        
    },
    resize: function()
    {
        
    }
});
var piston = new PistonEngine('gameDisplay', Madness);