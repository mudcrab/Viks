var Madness = Class.create({
    player: null,
    stage: null,
    input: null,
    camera: null,
    entityCameraOffset: {},
    initialize: function()
    {
        Debug.init();
        Debug.setSize(250, 150);
        Debug.hideDebug();
        // palce the action buttons too
        var abPos = $('actionbuttons').getWidth() / 2;
        console.log(abPos)
        $('actionbuttons').setStyle({
            marginLeft: '-' + abPos + 'px'
        });
        //console.log($(document.body).getWidth())
        //console.log($(document.body).getWidth())
    },
    setup: function()
    {
        var tilesW = 32;
        var tilesH = 17;
        var tileSize = {
            w: 32,
            h: 32
        };
        var stageSize = {
            stageWidth: tilesW,
            stageHeight: tilesH,
            screenWidth: $(document.body).getWidth(),
            screenHeight: $(document.body).getHeight(),
            pxWidth: tilesW * tileSize.w,
            pxHeight: tilesH * tileSize.h
        };
        this.stage = new PistonStage({x: 0, y: 0}, stageSize);
        this.input = new PistonInput();
        this.loadEntities(tilesW, tilesH);
        this.stage.setup();
        this.input.addMouseHandler('click', 'button');
        this.input.addMouseHandler('mouseup', 'gameDisplay');
        var that = this;

        Event.observe(window, 'resize', function() { that.resize(); });
    },
    loadEntities: function(tilesW, tilesH) {
        this.stage.addLayer(0);
        this.stage.addLayer(1);
        for(var i = 0; i < tilesW; i++)
        {
            for(var j = 0; j < tilesH; j++)
            {
                var rand = Math.floor(Math.random() * 3) + 1;
                var tile = new PistonEntity({x: i * 32, y: j * 32}, { w: 32, h: 32 }, 'grass' + rand);
                tile.scrollable = true;
                tile.clickable = true;
                this.stage.addChild(tile, 0);
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
        //this.stage.addLayer();
        this.player = new Player(pData.pos, pData.size, pData.image, pData.name);
        this.player.scrollable = true;
        this.stage.addChild(this.player, 1);
    },
    draw: function()
    {
        
    },
    update: function()
    {

        if(this.input.leftMouseClick('button'))
        {
            Debug.toggle();
        }
        if(this.input.leftMouseUp('gameDisplay'))
        {
            console.log(this.stage.getClickedEntity(this.input.mouseXY.x, this.input.mouseXY.y));
        }
        var charX, charY, stageX, stageY;
        $('fps').update(piston.fps);
        jQuery('#renderer').html(piston.info().renderer);
        
        
        if(this.input.keyDown('w'))
        {
            if(this.player.pos.y <= 0)
            {
                this.player.move(0, 0);
                this.stage.move(0, 1);
            }
            else
            {
                this.player.move(0, -1);
            }
        }
        if(this.input.keyDown('s'))
        {
            if(this.player.pos.y + 32 >= this.stage.stageSize.screenHeight)
            {
                this.player.move(0, 0);
                this.stage.move(0, -1);
            }
            else
            {
                this.player.move(0, 1);
            }
        }
        if(this.input.keyDown('a'))
        {
            if(this.player.pos.x <= 0)
            {
                this.player.move(0, 0);
                this.stage.move(1, 0);
            }
            else
            {
                this.player.move(-1, 0);
            }
        }
        if(this.input.keyDown('d'))
        {
            if(this.player.pos.x + 32 >= this.stage.stageSize.screenWidth)
            {
                this.player.move(0, 0);
                this.stage.move(-1, 0);
            }
            else
            {
                this.player.move(1, 0);
            }
        }
        if(this.input.keyUp('space'))
        {
            //console.log(Util.objToString(this.stage.borderHit));
            //console.log(Util.objToString(this.stage.layers));
            //console.log(this.stage.stageLayers[0].entities.length, this.stage.stageLayers[1].entities.length);
            //console.log(this.stage.stageLayers[1].entities)
            //this.stage.addLayer(Math.floor(Math.random() * 100));
            //this.stage.addChild(new PistonEntity({x: 10, y: 10}, { w: 32, h: 32 }, 'player'), 1);
            
            console.log(this.player.scrollable)
            //console.log(this.stage.layers[1].layerEntities);
            //this.stage.addLayer(2);
            //console.log(this.stage.layers);
        }
        this.stage.update();
        $('totalent').update(this.stage.entities.length);
        $('drawnent').update(this.stage.drawableEntities.length);
        jQuery('#stagexy').html('[' + this.stage.entities[0].pos.y + '] [ x: ' + this.stage.stagePos.x + ', y: ' + this.stage.stagePos.y + ' ]');
    },
    resize: function()
    {
        
    }
});
var piston = new PistonEngine('gameDisplay', Madness);