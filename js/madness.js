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
        Debug.init();
        Debug.setSize(250, 150);
        Debug.toggle();


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
        this.toLoad = 
        [
            {
                type: 'image',
                file: 'sprites',
                instanceName: 'plr'
            },
            {
                type: 'image',
                file: 'grass1',
                instanceName: 'grass1'
            },
            {
                type: 'image',
                file: 'grass2',
                instanceName: 'grass2'
            },
            {
                type: 'image',
                file: 'grass3',
                instanceName: 'grass3'
            },
            {
                type: 'spritemap',
                file: 'sprites',
                instanceName: 'main',
                sprites: [
                    {
                        startX: 0,
                        startY: 0,
                        stopX: 32,
                        stopY: 32,
                        instanceName: 'plr'
                    }
                ]
            }
        ];
        //console.log($(document.body).getWidth())
        //console.log($(document.body).getWidth())
    },
    setup: function()
    {
        //var tilesW = 32;
        //var tilesH = 17;
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
        /*for(var i = 0; i < tilesW; i++)
        {
            for(var j = 0; j < tilesH; j++)
            {
                var rand = Math.floor(Math.random() * 3) + 1;
                var tile = new PistonEntity({x: i * 32, y: j * 32}, { w: 32, h: 32 }, this.loader.getAsset('grass' + rand).image);
                tile.scrollable = true;
                tile.clickable = true;
                this.stage.addChild(tile, 0);
            }
        }*/
        var pData = {
            pos: {
                x: Math.floor($('gameDisplay').getWidth() / 2 - 16),
                y: Math.floor($('gameDisplay').getHeight() / 2 - 16)
            },
            size: {
                w: 32,
                h: 32
            },
            image: this.loader.getAsset('plr').image,
            name: 'Player 1'
        };
        var pData_ = {
            pos: {
                x: Math.floor($('gameDisplay').getWidth() / 2 - 16),
                y: Math.floor($('gameDisplay').getHeight() / 2 - 16)
            },
            size: {
                w: 32,
                h: 32
            },
            image: this.loader.getAsset('plr').image,
            name: 'Player 2'
        };
        //this.stage.addLayer();
        //console.log(pData.image)
        this.player = new Player(pData.pos, pData.size, pData.image, pData.name);
        this.player.scrollable = true;
        this.stage.addChild(this.player, 1);
        //console.log(this.loader.getAsset({name: 'main', sprite: 'plr'}, 'spritemap'))
        var testObj = new PistonEntity({x: 300, y: 300}, { w: 32, h: 32 }, this.loader.getAsset({name: 'main', sprite: 'plr'}, 'spritemap'));
        testObj.scrollable = true;
        testObj.clickable = true;
        this.stage.addChild(testObj, 0);
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
            }
            else
            {
                this.player.move(0, -2);
                this.stage.move(0, 1);
            }
        }
        if(this.input.keyDown('s'))
        {
            if(this.player.pos.y + 32 >= this.stage.stageSize.screenHeight)
            {
                this.player.move(0, 0);
            }
            else
            {
                
                this.player.move(0, 2);
                this.stage.move(0, -1);
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
                this.stage.move(1, 0);
            }
        }
        if(this.input.keyDown('d'))
        {
            if(this.player.pos.x + 32 >= this.stage.stageSize.screenWidth)
            {
                this.player.move(0, 0);
            }
            else
            {
                this.player.move(2, 0);
                this.stage.move(-1, 0);
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
            
            //console.log(this.player.scrollable)
            jQuery('#char_frame_outer_ring').data('easyPieChart').update(Math.floor(Math.random() * 100));
            jQuery('#char_frame_inner_ring').data('easyPieChart').update(Math.floor(Math.random() * 100));
            //console.log(this.stage.layers[1].layerEntities);
            //this.stage.addLayer(2);
            //console.log(this.stage.layers);
        }
        this.stage.update();
        $('totalent').update('T: ' + this.stage.entities.length);
        $('drawnent').update('D: ' + this.stage.drawnEntities);
        jQuery('#stagexy').html('[' + this.stage.entities[0].pos.y + '] [ x: ' + this.stage.stagePos.x + ', y: ' + this.stage.stagePos.y + ' ]');
    },
    resize: function()
    {
        
    }
});
var piston = new PistonEngine('gameDisplay', Madness);