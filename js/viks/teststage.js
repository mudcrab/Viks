var TestStage = function()
{
	PistonStage.call(this);
};
TestStage.prototype = Object.create(PistonStage.prototype);
TestStage.prototype.constructor = TestStage;

TestStage.prototype.update = function(delta)
{
	this.layers[0].entities[0].draw = true;
	this.layers[0].entities[0].move(1, 1)
};