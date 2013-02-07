var Player = Class.create(PistonEntity, {
	move: function(x, y)
	{
		this.pos.lastx = this.pos.x;
		this.pos.lasty = this.pos.y;
		this.pos.x += x;
		this.pos.y += y;
	}
});