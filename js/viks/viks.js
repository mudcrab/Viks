piston.debug.enabled = true;
var Viks = function()
{
	this.stage = null;
	this.toLoad = [];
	this.loader = null;
	this.player = null;
	this.init();
};
Viks.prototype.init = function()
{
	var that = this;
	piston.loader = new PistonAssetLoader();
	piston.loader.loadAssets(toLoad, that.onLoadComplete);
};
Viks.prototype.onLoadComplete = function()
{
	var that = this;
	piston.core = new PistonEngine(800, 600, 'canvas');
	piston.core.toggleFPS(true);
	piston.core.addStage(new TestStage('asd'));
	that.player = new PistonEntity({ x: 100, y: 100, lastx: 100, lasty: 100 }, { w: 128, h: 128 }, 'test');
	that.player.image = 'c_down_0';
	that.player.scrollable = true;
	piston.core.getStage().addEntity(that.player);
};
var Game = new Viks();