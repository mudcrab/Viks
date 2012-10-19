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
        for(var i = 0; i < 10; i++)
        {
            for(var j = 0; j < 10; j++)
            {
                this.stage.addChild(new PistonEntity(i * 32, j * 32, 32, 32, 'player', 'player character ' + Math.floor(Math.random() * 100)));
            }
        }
        this.player = new PistonEntity(300, 300, 32, 32, 'player', 'player character');
        this.player.scrollable = false;
        this.player.clickable = true;
        this.stage.addChild(this.player);
        this.stage.addCamera(this.player);
    },
    update : function()
    {
        jQuery('#fps').html(engine.fps());
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
    },
    draw: function()
    {
        
    }
});
var engine = new PistonEngine('gameDisplay', jQuery(window).width(), jQuery(window).height(), Madness);
