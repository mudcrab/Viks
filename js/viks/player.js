var Player = Class.create(PistonEntity, {

	animationUp: {
		currentFrame: 0,
		maxFrames: 9,
		frames: [ 'c_up_0', 'c_up_1', 'c_up_2', 'c_up_3', 'c_up_4', 'c_up_5', 'c_up_6', 'c_up_7', 'c_up_8' ]
	},
	animationDown: {
		currentFrame: 0,
		maxFrames: 9,
		frames: [ 'c_down_0', 'c_down_1', 'c_down_2', 'c_down_3', 'c_down_4', 'c_down_5', 'c_down_6', 'c_down_7', 'c_down_8' ]
	},
	animationLeft: {
		currentFrame: 0,
		maxFrames: 9,
		frames: [ 'c_left_0', 'c_left_1', 'c_left_2', 'c_left_3', 'c_left_4', 'c_left_5', 'c_left_6', 'c_left_7', 'c_left_8' ]
	},
	animationRight: {
		currentFrame: 0,
		maxFrames: 9,
		frames: [ 'c_right_0', 'c_right_1', 'c_right_2', 'c_right_3', 'c_right_4', 'c_right_5', 'c_right_6', 'c_right_7', 'c_right_8' ]
	},

	move: function(x, y)
	{
		var self = this;
		this.pos.lastx = this.pos.x;
		this.pos.lasty = this.pos.y;
		this.pos.x += x;
		this.pos.y += y;
		if(x < 0)
		{
			if(self.animationLeft.currentFrame +1 != self.animationLeft.maxFrames)
			{
				self.image = piston.loader.getAsset(self.animationLeft.frames[self.animationLeft.currentFrame]).image;
				self.animationLeft.currentFrame++;
			}
			else
			{
				self.animationLeft.currentFrame = 0;
				self.image = piston.loader.getAsset(self.animationLeft.frames[0]).image;
			}
		}
		else if(x > 0)
		{
			if(self.animationRight.currentFrame +1 != self.animationRight.maxFrames)
			{
				self.image = piston.loader.getAsset(self.animationRight.frames[self.animationRight.currentFrame]).image;
				self.animationRight.currentFrame++;
			}
			else
			{
				self.animationRight.currentFrame = 0;
				self.image = piston.loader.getAsset(self.animationRight.frames[0]).image;
			}
		}

		if(y > 0)
		{
			if(self.animationDown.currentFrame +1 != self.animationDown.maxFrames)
			{
				self.image = piston.loader.getAsset(self.animationDown.frames[self.animationDown.currentFrame]).image;
				self.animationDown.currentFrame++;
			}
			else
			{
				self.animationDown.currentFrame = 0;
				self.image = piston.loader.getAsset(self.animationDown.frames[0]).image;
			}
		}
		else if(y < 0)
		{
			if(self.animationUp.currentFrame +1 != self.animationUp.maxFrames)
			{
				self.image = piston.loader.getAsset(self.animationUp.frames[self.animationUp.currentFrame]).image;
				self.animationUp.currentFrame++;
			}
			else
			{
				self.animationUp.currentFrame = 0;
				self.image = piston.loader.getAsset(self.animationUp.frames[0]).image;
			}
		}	
	},
	update: function()
	{
		/*if(x < 0)
			this.image = piston.loader.getAsset('c_right').image;
		else if(x > 0)
			this.image = piston.loader.getAsset('c_left').image;

		if(y > 0)
			this.image = piston.loader.getAsset('c_up').image;
		else if(y < 0)
			this.image = piston.loader.getAsset('c_down').image;*/
	}
});