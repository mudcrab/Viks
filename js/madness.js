


var Madness = Class.create({
    player: null,
    stage: null,
    input: null,
    camera: null,
    entityCameraOffset: {},
    toLoad: null,
    loader: null,
    initialize: function()
    {
        piston.debug.enabled = false;
        jQuery('#char_frame_outer_ring').easyPieChart({
            trackColor: false,
            scaleColor: false,
            lineWidth: 3,
            barColor: "#19c0ff",
            size: 74,
            animate: 800
        });
        jQuery('#char_frame_inner_ring').easyPieChart({
            trackColor: false,
            scaleColor: false,
            lineWidth: 3,
            barColor: "#fa012a",
            size: 68,
            animate: 800
        });

        jQuery('#button').hide();

        jQuery.ajax({
            type: 'GET',
            url: 'https://api.bitbucket.org/1.0/repositories/mudcrab/piston-engine/changesets?callback=?',
            async: true,
            jsonpCallback: 'jsonCallback',
            contentType: "application/json",
            dataType: 'jsonp',
            done: function(json) {
               console.dir(json.sites);
            },
            fail: function(e) {
               console.log(e.message);
            },
            always: function() {}
        });
        jsonCallback = function(dat) {
            var latest = dat.changesets.length - 1;
            jQuery('#version').html(dat.changesets[latest].node);
        };


        //Debug.hideDebug();
        // palce the action buttons too
        var abPos = $('actionbuttons').getWidth() / 2;
        $('actionbuttons').setStyle({
            marginLeft: '-' + abPos + 'px'
        });
        // console.log(this.loader.addAsset('image', 'player', 'player'));
        this.toLoad = toLoad;
        //console.log($(document.body).getWidth())
        //console.log($(document.body).getWidth())
    },
    setup: function()
    {
        var tilesW = 40;
        var tilesH = 30;
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
        piston.stage = new PistonStage({x: 0, y: 0}, stageSize);
        this.input = new PistonInput();
        this.loadEntities(tilesW, tilesH);
        
        this.input.addMouseHandler('click', 'button');
        this.input.addMouseHandler('mouseup', 'gameDisplay');  

        piston.stage.setup();

        var that = this;

        Event.observe(window, 'resize', function() { that.resize(); });
    },
    loadEntities: function(tilesW, tilesH) {
        piston.stage.addLayer(0, 32);
        piston.stage.addLayer(1, 32);

        var map = new PistonTiledMap('test2.json');
        map.parseTiled(function(data) {
            /*for(var i = 0; i < data.length; i++)
            {
                var tile = new PistonEntity(data[i].pos, data[i].size, data[i].imageName);
                tile.scrollable = true;
                tile.clickable = true;
                piston.stage.addChild(tile, data[i].layer);
            }*/
            for(var i = 0; i < data.layers.length; i++)
            {
                piston.stage.addChildren(data.layers[i], i, data.width, data.height);
            }
            piston.stage.setup();
        });

        var pData = {
            pos: {
                x: Math.floor($('gameDisplay').getWidth() / 2 - 16),
                y: Math.floor($('gameDisplay').getHeight() / 2 - 16)
            },
            size: {
                w: 128,
                h: 128
            },
            image: 'c_down_0',
            name: 'Player 1'
        };
        
        this.player = new Player(pData.pos, pData.size, pData.image, pData.name);
        this.player.scrollable = true;
        this.player.manual = true;
        piston.stage.addChild(this.player, 1);



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
            console.log(piston.stage.getClickedEntity(this.input.mouseXY.x, this.input.mouseXY.y));
        }
        var charX, charY, stageX, stageY;
        
        $('fps').update(piston.core.fps);
        
        if(this.input.keyDown('w'))
        {
            if(this.player.pos.y <= 0)
            {
                this.player.move(0, 0);
            }
            else
            {
                this.player.move(0, -2);
                piston.stage.move(0, 1);
            }
        }
        if(this.input.keyDown('s'))
        {
            if(this.player.pos.y + 32 >= piston.stage.stageSize.screenHeight)
            {
                this.player.move(0, 0);
            }
            else
            {
                
                this.player.move(0, 2);
                piston.stage.move(0, -1);
            }
        }
        if(this.input.keyDown('a'))
        {
            if(this.player.pos.x <= 0)
            {
                this.player.move(0, 0);
            }
            else
            {
                this.player.move(-2, 0);
                piston.stage.move(1, 0);
            }
        }
        if(this.input.keyDown('d'))
        {
            if(this.player.pos.x + 32 >= piston.stage.stageSize.screenWidth)
            {
                this.player.move(0, 0);
            }
            else
            {
                this.player.move(2, 0);
                piston.stage.move(-1, 0);
            }
        }
        if(this.input.keyUp('space'))
        {
            jQuery('#char_frame_outer_ring').data('easyPieChart').update(Math.floor(Math.random() * 100));
            jQuery('#char_frame_inner_ring').data('easyPieChart').update(Math.floor(Math.random() * 100));
            console.log(JSON.stringify(piston.stage.layers[0].size));
            
        }
        piston.stage.update();
        $('totalent').update('T: ' + piston.renderer.entityInfo.total);
        $('drawnent').update('D: ' + piston.renderer.entityInfo.drawn);
        //jQuery('#stagexy').html('[' + piston.stage.entities[0].pos.y + '] [ x: ' + piston.stage.stagePos.x + ', y: ' + piston.stage.stagePos.y + ' ]');
    },
    resize: function()
    {
        
    }
});
piston.core = new PistonEngine('gameDisplay', Madness);