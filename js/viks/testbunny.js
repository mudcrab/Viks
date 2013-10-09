var Bunny = function(name)
{
	var pos = {x: 100, y: 100};
	var size = {w: 26, h: 37};
	var image = 'bunny';
	PistonEntity.call(this, pos, size, image, name);
};
Bunny.prototype = Object.create(PistonEntity.prototype);
Bunny.prototype.constructor = PistonEntity;