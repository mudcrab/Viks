var Madness = Class.create({
    player: null,
    stage: null,
    input: null,
    camera: null,
    entityCameraOffset: {},
    initialize: function()
    {
        //Debug.init();
        //Debug.setSize(250, 150);
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
        this.loadEntities(tilesW, tilesH);
        this.stage.setup();
        var that = this;
        Event.observe(window, 'resize', function() { that.resize(); });
    },
    loadEntities: function(tilesW, tilesH) {
        for(var i = 0; i < tilesW; i++)
        {
            for(var j = 0; j < tilesH; j++)
            {
                var rand = Math.floor(Math.random() * 3) + 1;
                this.stage.addChild(new PistonEntity({x: i * 32, y: j * 32}, { w: 32, h: 32 }, 'grass' + rand));
            }
        }
        var pData = {
            pos: {
                x: Math.floor($('gameDisplay').getWidth() / 2 - 16),
                y: Math.floor($('gameDisplay').getHeight() / 2 - 16)
            },
            size: {
                w: 32,
                h: 32
            },
            image: 'player',
            name: 'Player 1'
        };
        this.stage.addLayer();
        this.player = new Player(pData.pos, pData.size, pData.image, pData.name);
        this.stage.addChild(this.player, 1);
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
            this.stage.move(0, -1);
        }
        if(this.input.keyDown('a'))
        {

        }
        if(this.input.keyDown('d'))
        {
            
        }
        if(this.input.keyUp('space'))
        {
            //console.log(Util.objToString(this.stage.borderHit));
            //console.log(Util.objToString(this.stage.layers));
            var fps = 0;
            for(var i = 0; i < this.stage.layers.length; i++)
            {
                fps += this.stage.layers[i].renderer.fps();
            }
            console.log(fps)
        }
        this.stage.update();
        $('totalent').update(this.stage.entities.length);
        $('drawnent').update(this.stage.drawableEntities.length);
        //jQuery('#stagexy').html('[' + this.stage.entities[0].pos.y + '] [ x: ' + this.stage.stagePos.x + ', y: ' + this.stage.stagePos.y + ' ]');
    },
    resize: function()
    {
        
    }
});
var piston = new PistonEngine('gameDisplay', Madness);