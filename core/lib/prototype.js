(function() {
	var map = function(size) {
		this.size = size;
		this.decay = 0.5;
		this.scope = 2;
		this.map = [];
		for (var i = 0; i < this.size; i++) {
			this.map[i] = [];
			for (var x = 0; x < this.size; x++) {
				this.map[i][x] = 0;
			}
		}
	};
	map.prototype = {
		set: function(x, y, strength) {
			this.map[x][y] = strength;
			this.spread(x, y);
		},

		/*spread: function(x, y) {
		 if (this._skip[x + '.' + y]) {
		 return;
		 }

		 var cord = [[-1, 0], [1, 0], [0, -1], [0, 1]];
		 for (var v in cord) {
		 var k = cord[v][0], i = cord[v][1];

		 var valid = ((k != 0 || i != 0) && x + i > 0 && y + k > 0 && x + i < this.size && y + k < this.size);
		 if (valid && (this.map[x][y] > this.map[x + i][y + k])) {
		 this.map[x + i][y + k] += this.decay;
		 this._skip[(x + i) + '.' + (y + k)] = true;
		 }
		 }
		 this.map[x][y] = Math.max(0, this.map[x][y] - this.decay);
		 },*/

		valid: function(x, y) {
			return (x > 0 && y > 0 && x < this.size && y < this.size);
		},

		spread: function(x, y) {
			var self = this, s = function(x, y, skip, p, cap) {
				if (p < self.decay) {
					return;
				}

				var cord = [[-1, 0], [1, 0], [0, -1], [0, 1]];
				for (var v in cord) {
					var c = cord[v];
					if ((c[0] != skip[0] || c[1] != skip[1]) && self.valid(x + c[0], y + c[1]) && self.map[x][y] > self.map[x + c[0]][y + c[1]]) {
						self.map[x + c[0]][y + c[1]] = p - self.scope;
						s(x + c[0], y + c[1], c, p - self.scope, cap + 1);
					}
				}
			}
			s(x, y, [0, 0], self.map[x][y], 0);
		},

		think: function() {
			this._skip = {};
			var height = this.map[0][0], list = [[0, 0]];
			for (var x = 0; x < this.size; x++) {
				for (var y = 0; y < this.size; y++) {
					if (this.map[x][y] != 0) {
						if (this.map[x][y] >= height) {
							if (this.map[x][y] == height) {
								list.push([x, y]);
							} else {
								height = this.map[x][y];
								list = [[x, y]];
							}
						}
					}
					this.map[x][y] = Math.max(0, this.map[x][y] - this.decay);
				}
			}

			/*for (var i in list) {
			 this.spread(list[i][0], list[i][1]);
			 }*/
		}
	};

	var heat = new map(32);
	heat.set(16, 16, 50);

	var canvas = document.createElement('canvas');
	document.getElementsByTagName('body')[0].appendChild(canvas);
	canvas.style.position = 'absolute';
	canvas.style.zIndex = '999';
	canvas.style.top = '0px';
	canvas.style.left = '0px';
	canvas.style.width = '100%';
	canvas.style.height = '100%';
	canvas.style.background = 'white';

	var loop = 200, ctx = canvas.getContext('2d'), size = 5;
	var render = function() {
		heat.think();

		/*if (loop % 5) {
		 var x = Math.floor(Math.random() * 32), y = Math.floor(Math.random() * 32);

		 heat.set(x, y, Math.floor(Math.random() * 50) + heat.map[x][y]);
		 }*/

		for (var i in heat.map) {
			for (var k in heat.map[i]) {
				ctx.fillStyle = 'rgb(' + Math.floor((Math.min(heat.map[i][k], 50) / 50) * 255) + ', 0, 0)';
				ctx.fillRect(size * i, size * k, size, size);
			}
		}

		setTimeout(function() {
			if (loop > 0) {
				loop += 1;
				render();
			}
		}, 100);
	}
	render();
})();