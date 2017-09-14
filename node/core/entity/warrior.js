"use strict";

var obj = function(map, config) {
    this.map = map;
    this.type = 'warrior';
    this.pos = {
        x: config.x || 0,
        y: config.y || 0
    };
    this.health = 100;
    this.pulse = 0;
    this.nexus = config.nexus;
    this.side = config.side;
};
obj.prototype = require(appRoot + '/core/lib/extends.js')(require(appRoot + '/core/entity.js'), {
    think: function() {
        this.createPulse('nexus_' + this.side);

        var cord = [[-1, 0], [1, 0], [0, -1], [0, 1]];

        var score = 0, next = null;
        for (var v in cord) {
            var c = cord[v];

            for (var i in this.map.entity) {
                var e = this.map.entity[i];
                if (e.side != this.side && (e.type == 'worker' || e.type == 'warrior' || e.type == 'nexus') && e.pos.x == this.pos.x + c[0] && e.pos.y == this.pos.y + c[1]) {
                    if (this.map.entity[i].health > 0) {
                        this.map.entity[i].health -= Math.floor(Math.random() * 2);
                    } else {
                        this.map.entity.splice(i, 1);
                    }
                    return;
                }
            }

            for (var k in this.map.side) {
                if (this.map.side[i] != this.side) {
                    var f = this.heat('nexus_' + this.map.side[k], this.pos.x + c[0], this.pos.y + c[1]);
                    if (f > score) {
                        score = f;
                        next = [this.pos.x + c[0], this.pos.y + c[1]];
                    }
                }
            }
        }

        if (next) {
            this.setPos(next[0], next[1]);
            this.map.heat['nexus_' + this.side].set(this.pos.x, this.pos.y, 0);
        } else {
            var c = cord[Math.floor(Math.random() * cord.length)];
            this.setPos(this.pos.x + c[0], this.pos.y + c[1]);
        }
    }
});

module.exports = obj;