var Madness = function() {
	this.player = null;
	this.stage = null;
	this.input = null;
	this.camera = null;
	this.entityCameraOffset = {};
	this.toLoad = null;
	this.loader = null;
	this.initialize();
};
Madness.prototype.initialize = function()
{
	this.toLoad = toLoad;
},
Madness.prototype.setup = function()
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
		screenWidth: $('body').width(),
		screenHeight: $('body').height(),
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

		//Event.observe(window, 'resize', function() { that.resize(); });
};
Madness.prototype.loadEntities = function(tilesW, tilesH) {
	piston.stage.addLayer(0, { w: 90, h: 45});
	piston.stage.addLayer(1, 32);
	piston.stage.layers[1].renderByTile = false;

	var map = new PistonTiledMap('iso_map_2.json');
	map.parseTiled('isometric', function(data) {
		for(var i = 0; i < data.layers.length; i++)
		{
			piston.stage.addChildren(data.layers[i], i, data.width, data.height);
		}
		piston.stage.setup();
	});

	var pData = {
		pos: {
			x: Math.floor($('#gameDisplay').width() / 2 - 16),
			y: Math.floor($('#gameDisplay').height() / 2 - 16)
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
};
Madness.prototype.draw = function()
{

};
Madness.prototype.update = function()
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

	$('#fps').text(piston.core.fps);

	if(this.input.keyDown('w'))
	{
		if(this.player.pos.y <= 0)
		{
			this.player.move(0, 0);
		}
		else
		{
			this.player.move(0, -2);
			piston.stage.move(0, 3);
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
			piston.stage.move(0, -3);
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
			piston.stage.move(3, 0);
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
			piston.stage.move(-3, 0);
		}
	}
	if(this.input.keyUp('space'))
	{

	}
	piston.stage.update();
	$('#totalent').text('T: ' + piston.core.totalEntities);
	$('#drawnent').text('D: ' + piston.core.totalDrawnEntities);
};
Madness.prototype.resize = function()
{

};
piston.core = new PistonEngine('#gameDisplay', Madness);