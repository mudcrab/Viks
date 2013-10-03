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

	/*that.player = new PistonEntity({ x: 10, y: 10, lastx: 10, lasty: 10 }, { w: 32, h: 32 }, 'test');
	that.player.image = 'plr1';
	that.player.scrollable = true;
	piston.core.getStage().addEntity(that.player);*/
};
var Game = new Viks();