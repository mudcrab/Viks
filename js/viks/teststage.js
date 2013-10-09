var TestStage = function()
{
	PistonStage.call(this);
	this.bunny = null;
	this.input = new PistonInput();
	this.init();
};
TestStage.prototype = Object.create(PistonStage.prototype);
TestStage.prototype.constructor = TestStage;


TestStage.prototype.init = function()
{
	this.bunny = new Bunny('Testbunny 1');
	this.bunny.scrollable = true;
	this.bunny.draw = true;
	this.bunny.speedX = 5;
	this.bunny.speedY = 5;
	this.bunny.draw = true;
	this.addEntity(this.bunny);
	//this.bX = Math.floor(Math.random() * 700) + 100;
	//this.bY = Math.floor(Math.random() * 500) + 100;
	// this.input.addMouseHandler('mouseup', 'canvas');
};

TestStage.prototype.update = function(delta)
{
	if(this.input.leftMouseClick('canvas'))
	{
		this.bunny.speedX = 5;
		this.bunny.speedY = 5;
		this.bX = this.input.getMousePos().x;
		this.bY = this.input.getMousePos().y;
	}
	this.bunny.moveTo(this.bX, this.bY);
};