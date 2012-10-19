var Madness = Class.create({
    //assets/ui/frame.png
    spr : null,
    x : 10,
    y : 10,
    stage: null,
    player: null,
    mouseX: null,
    mouseY: null,
    stageX: null,
    stageY: null,
    
    initialize: function()
    {
        //spr = new Sprite('assets/tiles/player.png', 10, 10);
        var asd = new Array();
        //spr.setPosition(10, 10);
        //var ent = new Entity(10, 10);
    },
    setup: function(stage)
    {
        this.stage = stage;
        this.stage.boundingBox = {
            top: Math.floor(jQuery(window).height() * 0.1),
            bottom: Math.floor(jQuery(window).height() * 0.9),
            left: Math.floor(jQuery(window).width() * 0.1),
            right: Math.floor(jQuery(window).width() * 0.9)
        };
        var pos = 0;
        for(var x = 0; x < 100; x++)
        {
            for(var y = 0; y < 60; y++)
            {
                this.stage.addChild(new Entity('tiles/grass1.png', x * 32, y * 32, 32, 32, true, pos));
                pos++;
            }
        }
        var charFrame = new Entity('ui/ui_test.png', jQuery(window).width() / 2 - Math.floor(515 / 2), 50, 515, 85, false, 'frame');
        charFrame.clickable = true;
        
        this.player = new Entity('tiles/player.png', Math.floor(jQuery(window).width() / 2), Math.floor(jQuery(window).height() / 2), 32, 32, false, 'char');
        this.player.properties.xspeed = 3;
        this.player.properties.yspeed = 3;
        this.player.clickable = true;
        this.stage.addChild(this.player);
        this.stage.setSize(100 * 32, 60 * 32, 32, 32);
        this.stage.addCamera(this.player);
        this.stage.addChild(charFrame);
        //this.stage.addChild(new Entity('player.png'), 100, 100, false, 'playerChar');
    },
    update : function()
    {
        var fps = engine.fps();
        if(fps < 30)
        {
            jQuery('#fps').css('color', '#f55b5b');
        }
        else if(fps < 45)
        {
            jQuery('#fps').css('color', '#f9ee2a');
        }
        else
        {
            jQuery('#fps').css('color', '#fff');
        }
        jQuery('#fps').html(engine.fps());
        jQuery('#delta').html(engine.delta);
        jQuery('#totalent').html(this.stage.totalEntities);
        jQuery('#drawnent').html(this.stage.drawnEntities);
        //this.stage.getEntityAt(3).moveTo(100, 300);
        //this.stage.getEntity('second').moveTo(200, 300);
        if(engine.onKeyUp('space'))
        {
            console.log('spaaaaaaaaace');
            //this.stage.addChild(new Entity('grass1.png', Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), true, 'asd' + Math.random()));
            this.stage.addChild(new Entity('player.png', Math.floor(Math.random() * 1440), Math.floor(Math.random() * 775), false, 'entity_' + Math.floor(Math.random() * 1000)));
        }
        if(engine.onKeyDown('w'))
        {
            this.player.move(0, -this.player.properties.yspeed);
        }
        if(engine.onKeyDown('s'))
        {
            this.player.move(0, this.player.properties.yspeed);
        }
        if(engine.onKeyDown('a'))
        {
            this.player.move(-this.player.properties.xspeed, 0);
        }
        if(engine.onKeyDown('d'))
        {
            this.player.move(this.player.properties.xspeed, 0);
        }
        if(engine.onKeyUp('q'))
        {
            console.log('upppp');
        }
        var mousePress = engine.mousePress();
        var mouseClick = engine.mouseClick();
        if(mousePress.pressed)
        {
            //console.log(mousePress);
        }
        if(mouseClick.clicked)
        {
            this.mouseX = mouseClick.x;
            this.mouseY = mouseClick.y;
            this.stageX = Math.abs(this.stage.stageX) + this.mouseX;
            this.stageY = Math.abs(this.stage.stageY) + this.mouseY;
            var clicker = this.stage.isClicked(this.mouseX, this.mouseY);
            if(clicker !== undefined)
            {
                console.log(clicker);
            }
        }
        if(this.mouseX !== null)
        {
            jQuery('#mousexy').html(this.mouseX + ' x ' + this.mouseY);
            jQuery('#stagexy').html(this.stageX + ' x ' + this.stageY);
        }
    },
    draw: function()
    {
        /*for(var x = 0; x < 20; x++)
        {
            for(var y = 0; y < 20; y++)
            {
                spr.render(x * 32, y * 32);
            }
        }*/
        //spr.render();
        this.stage.render();
    }
});
var engine = new PistonEngine('gameDisplay', jQuery(window).width(), jQuery(window).height(), Madness);
