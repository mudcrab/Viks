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
    player: null,
    input: null,
    
    initialize: function()
    {
        this.input = new PistonInput();
    },
    setup: function(stage)
    {
        this.stage = stage;
        this.stage.setSize(10 * 32, 10 * 32, 32, 32);
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
                this.stage.addChild(new PistonEntity(x * 32, y * 32, 32, 32, 'grass1', 'grass' + pos));
                pos++;
            }
        }
        this.player = new PistonEntity(300, 300, 32, 32, 'player', 'player character');
        this.player.properties.xspeed = 3;
        this.player.properties.yspeed = 3;
        this.player.scrollable = false;
        this.player.clickable = true;
        this.stage.addChild(this.player);
        this.stage.addCamera(this.player);
    },
    update : function()
    {
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
        jQuery('#totalent').html(this.stage.totalEntities);
        jQuery('#drawnent').html(this.stage.drawnEntities);
        var leftClick = this.input.leftMouseClick();
        if(leftClick.clicked)
        {
            this.mouseX = leftClick.x;
            this.mouseY = leftClick.y;
            var clicker = this.stage.isClicked(this.mouseX, this.mouseY);
            if(clicker !== undefined)
            {
                /*if(clicker.visible)
                    clicker.visible = false;
                else
                    clicker.visible = true;*/

            }
        }
        if(this.input.keyDown('w'))
        {
            this.player.move(0, -this.player.properties.yspeed);
        }
        if(this.input.keyDown('s'))
        {
            this.player.move(0, this.player.properties.yspeed);
        }
        if(this.input.keyDown('a'))
        {
            this.player.move(-this.player.properties.xspeed, 0);
        }
        if(this.input.keyDown('d'))
        {
            this.player.move(this.player.properties.xspeed, 0);
        }
    },
    draw: function()
    {
        
    }
});
var engine = new PistonEngine('gameDisplay', jQuery(window).width(), jQuery(window).height(), Madness);
