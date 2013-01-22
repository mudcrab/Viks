var Madness = Class.create({
    testent: null,
    stage: null,
    input: null,
    camera: null,
    entityCameraOffset: {},
    initialize: function()
    {
        Debug.init();
        Debug.setSize(250, 150);
        this.testent = new PistonEntity({x: Math.floor($('gameDisplay').getWidth() / 2 - 16), y: Math.floor($('gameDisplay').getHeight() / 2 - 16)}, {w: 32, h: 32}, 'player', 'Entity test');
    },
    setup: function()
    {
        var tilesW = 25;
        var tilesH = 25;
        var tileSize = {
            w: 32,
            h: 32
        };
        var stageSize = {
            stageWidth: tilesW,
            stageHeight: tilesH,
            screenWidth: $('gameDisplay').getWidth(),
            screenHeight: $('gameDisplay').getHeight(),
            pxWidth: tilesW * tileSize.w,
            pxHeight: tilesH * tileSize.h
        };
        this.stage = new PistonStage({x: 0, y: 0}, stageSize);
        this.input = new PistonInput();
        for(var i = 0; i < tilesW; i++)
        {
            for(var j = 0; j < tilesH; j++)
            {
                var rand = Math.floor(Math.random() * 3) + 1;
                this.stage.addChild(new PistonEntity({x: i * 32, y: j * 32}, { w: 32, h: 32 }, 'grass' + rand));
            }
        }
        this.stage.addChild(this.testent);
        //this.testent.properties.speed = 2;
        /*this.camera = new PistonCamera();
        this.camera.setCamera(this.testent);
        this.camera.setPos(this.testent.pos.x - this.camera.rectSize.w / 2 + this.testent.size.w / 2, this.testent.pos.y - this.camera.rectSize.h / 2 + this.testent.size.h / 2);
        this.stage.addChild(this.camera);
        this.entityCameraOffset = {
            top: this.testent.pos.y - this.camera.getPos().y,
            left: this.testent.pos.x - this.camera.getPos().x
        };*/
        this.stage.setup();
        var that = this;
        Event.observe(window, 'resize', function() { that.resize(); });
    },
    draw: function()
    {
        
    },
    update: function()
    {
        var charX, charY, stageX, stageY;
        $('fps').update(piston.fps);
        jQuery('#renderer').html(piston.info().renderer);
        
        
        if(this.input.keyDown('w'))
        {

        }
        if(this.input.keyDown('s'))
        {

        }
        if(this.input.keyDown('a'))
        {

        }
        if(this.input.keyDown('d'))
        {
            
        }
        if(this.input.keyUp('space'))
        {
            //console.log(this.stage.entities[0].pos);
            //console.log(Util.objToString(this.stage.stagePos));
            //console.log(this.stage.entities[0].pos.x);
            //console.log(this.stage.entities[0].pos.y);
            console.log(this.testent.pos.y);
            //console.log(this.stage.drawnEntities);
        }
        this.stage.update();
        $('totalent').update(this.stage.entities.length);
        $('drawnent').update(this.stage.drawnEntities);
    },
    resize: function()
    {
        
    }
});
var piston = new PistonEngine('gameDisplay', Madness);