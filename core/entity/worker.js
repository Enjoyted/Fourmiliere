"use strict";

var obj = function(map, config) {
    this.map = map;
    this.type = 'worker';
    this.pos = {
        x: config.x || 0,
        y: config.y || 0
    };
    this.health = 10;
    this.pulse = 0;
    this.nexus = config.nexus;
    this.side = config.side;
};
obj.prototype = require(appRoot + '/core/lib/extends.js')(require(appRoot + '/core/entity.js'), {
    think: function() {
        this.createPulse('nexus_' + this.side);

        this.nexus.health += 1;

        var ws = (this.nexus.food / this.nexus.water), cord = [[-1, 0], [1, 0], [0, -1], [0, 1]];

        var score = 0, next = null, type = '';
        for (var v in cord) {
            var c = cord[v], g = this.map.grid[(this.pos.x + c[0]) + '.' + (this.pos.y + c[1])];
            if (g && g.size > 0) {
                g.size -= 1;
                this.nexus[g.type] += 1;
                return;
            }

            var f = this.heat('food' + this.side, this.pos.x + c[0], this.pos.y + c[1]);
            if (f > score) {
                score = f;
                type = 'food' + this.side;
                next = [this.pos.x + c[0], this.pos.y + c[1]];
            }

            var w = this.heat('water' + this.side, this.pos.x + c[0], this.pos.y + c[1]) * ws;
            if (w > score) {
                score = w;
                type = 'water' + this.side;
                next = [this.pos.x + c[0], this.pos.y + c[1]];
            }
        }

        if (next) {
            this.setPos(next[0], next[1]);
            this.map.heat[type].set(this.pos.x, this.pos.y, 0);
        } else {
            var c = cord[Math.floor(Math.random() * cord.length)];
            this.setPos(this.pos.x + c[0], this.pos.y + c[1]);
        }
    }
});

module.exports = obj;