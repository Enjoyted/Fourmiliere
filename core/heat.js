"use strict";

var obj = function(size) {
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
obj.prototype = {
    add: function(x, y, strength) {
        this.map[x][y] = strength;
        this.spread(x, y);
    },

    set: function(x, y, strength) {
        this.map[x][y] = strength;
    },

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
        };
        s(x, y, [0, 0], self.map[x][y], 0);
    },

    think: function() {
        for (var x = 0; x < this.size; x++) {
            for (var y = 0; y < this.size; y++) {

                this.map[x][y] = Math.max(0, this.map[x][y] - this.decay);
            }
        }
    }
};

module.exports = obj;