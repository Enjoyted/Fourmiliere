"use strict";

var obj = function(seed) {
	this._seed = seed || 1;
};
obj.prototype = {
	next: function() {
		this._seed = (this._seed * 9301 + 49297) % 233280;
		return (this._seed / (233280.0));
	},

	setSeed: function(seed) {
		this._seed = seed;
		return (this);
	}
};

module.exports = obj;