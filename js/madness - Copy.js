var tiles;
function Madness()
{
    var sList, fps, width = 100, height = 100, tileMap, viewport, player, cursor, abRect;
    var abSize = {
        w : $('#actionbuttons').width(),
        h : $('#actionbuttons').height(),
        x : $('#interfaceui').position().left,
        y : $('#interfaceui').position().top
    };
    console.log(abSize);
    this.setup = function()
    {
        fps = document.getElementById('framecounter');
        tiles = new jaws.SpriteList();
        for(var i = 0; i < width; i++)
        {
            for(var j = 0; j < height; j++)
            {
                tiles.push(new Sprite({ image: "assets/tiles/grass1.png", x: i*32, y: j*32 }));
            }
        }
        
        viewport = new jaws.Viewport({max_x: width*32, max_y: height*32});
        tileMap = new jaws.TileMap({size: [width, height], cell_size : [32, 32]});
        tileMap.push(tiles);
        player = new jaws.Sprite({image: "assets/tiles/player.png", x: 160, y: 160, anchor: "center"});
        jaws.preventDefaultKeys(["up", "down", "left", "right", "space"]);
        cursor = new jaws.Sprite({image: "assets/tiles/player.png", x: 0, y:0});
        cursor.alpha = 0;
        abRect = new jaws.Rect(0, abSize.y, $(window).width(), 40);
    };
    this.update = function()
    {
        var that = this;
        fps.innerHTML = jaws.game_loop.fps;
        if(jaws.pressed("a"))  { player.move(-2,0);}
        if(jaws.pressed("d")) { player.move(2,0);}
        if(jaws.pressed("w"))    { player.move(0, -2);}
        if(jaws.pressed("s"))  { player.move(0, 2);}
        $(document).live('click', function(event) {
            if($(event.target).attr('id') == 'gameDisplay')
            {
                var position = getPosition(jaws.mouse_x, jaws.mouse_y, viewport.x, viewport.y, true);
                var relPoint = getRelativePosPoint(jaws.mouse_x, jaws.mouse_y);
                cursor.alpha = 1;
                cursor.setX(position.x * 32);
                cursor.setY(position.y * 32);
            }
            else
            {
                console.log($(event.target).attr('id'));
            }
        });
        viewport.centerAround(player);
    };
    this.draw = function()
    {
        viewport.drawTileMap(tileMap);
        viewport.draw(player);
        viewport.draw(cursor);
        //for(var i = 0; i < tiles.length; i++)
        //{
            //tiles.at(i).rect().draw();
        //}
    };
};
jaws.onload = function()
{
    jaws.unpack();
    jaws.assets.add(['assets/tiles/grass1.png', 'assets/tiles/player.png']);
    jaws.start(Madness);
};
getRelativePosPoint = function(canvas_x, canvas_y)
{
    var coords = {
        x : Math.floor(canvas_x / 32),
        y : Math.floor(canvas_y / 32)
    };
    return coords;
};
getPosition = function(canvas_x, canvas_y, view_x, view_y, point)
{
    var coors;
    var x = canvas_x + view_x;
    var y = canvas_y + view_y;
    if(!point)
    {
        coors = {
            x : x,
            y : y
        }
    }
    else
    {
        coors = {
            x : Math.floor(x / 32),
            y : Math.floor(y / 32)
        }
    }
    return coors;
};