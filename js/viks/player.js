var Player = function(pos_, size_, image_, name_) {

	this.animationUp = {
		currentFrame: 0,
		maxFrames: 9,
		frames: [ 'c_up_0', 'c_up_1', 'c_up_2', 'c_up_3', 'c_up_4', 'c_up_5', 'c_up_6', 'c_up_7', 'c_up_8' ]
	};
	this.animationDown = {
		currentFrame: 0,
		maxFrames: 9,
		frames: [ 'c_down_0', 'c_down_1', 'c_down_2', 'c_down_3', 'c_down_4', 'c_down_5', 'c_down_6', 'c_down_7', 'c_down_8' ]
	};
	this.animationLeft = {
		currentFrame: 0,
		maxFrames: 9,
		frames: [ 'c_left_0', 'c_left_1', 'c_left_2', 'c_left_3', 'c_left_4', 'c_left_5', 'c_left_6', 'c_left_7', 'c_left_8' ]
	};
	this.animationRight = {
		currentFrame: 0,
		maxFrames: 9,
		frames: [ 'c_right_0', 'c_right_1', 'c_right_2', 'c_right_3', 'c_right_4', 'c_right_5', 'c_right_6', 'c_right_7', 'c_right_8' ]
	};
	PistonEntity.call(this, pos_, size_, image_, name_);
};
Player.prototype = Object.create(PistonEntity.prototype);
Player.prototype.constructor = PistonEntity;
	/*Player.prototype.move = function(x, y)
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
				self.image = self.animationLeft.frames[self.animationLeft.currentFrame];
				self.animationLeft.currentFrame++;
			}
			else
			{
				self.animationLeft.currentFrame = 0;
				self.image = self.animationLeft.frames[0];
			}
		}
		else if(x > 0)
		{
			if(self.animationRight.currentFrame +1 != self.animationRight.maxFrames)
			{
				self.image = self.animationRight.frames[self.animationRight.currentFrame];
				self.animationRight.currentFrame++;
			}
			else
			{
				self.animationRight.currentFrame = 0;
				self.image = self.animationRight.frames[0];
			}
		}

		if(y > 0)
		{
			if(self.animationDown.currentFrame +1 != self.animationDown.maxFrames)
			{
				self.image = self.animationDown.frames[self.animationDown.currentFrame];
				self.animationDown.currentFrame++;
			}
			else
			{
				self.animationDown.currentFrame = 0;
				self.image = self.animationDown.frames[0];
			}
		}
		else if(y < 0)
		{
			if(self.animationUp.currentFrame +1 != self.animationUp.maxFrames)
			{
				self.image = self.animationUp.frames[self.animationUp.currentFrame];
				self.animationUp.currentFrame++;
			}
			else
			{
				self.animationUp.currentFrame = 0;
				self.image = self.animationUp.frames[0];
			}
		}
	};*/	
	Player.prototype.update = function()
	{
		
	}