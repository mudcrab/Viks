(function() {
	var C = function() {};
	C.prototype.create = function() {
		var c = function(){};
		var methods = {};
		var superClass = {};
		
		if(arguments.length == 1)
			methods = arguments[0];
		else if(arguments.length == 2)
		{
			methods = arguments[1];
			superClass = arguments[0];
			c = function() { arguments[0].call(this); };
			c.prototype = Object.create(superClass.prototype);
			c.prototype.constructor = superclass;
		}
		for(var fn in methods)
		{
			c.prototype[fn] = methods[fn];
		}
		return c;
	};
	window.Class = new C();
})();