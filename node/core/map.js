//"use strict";

var heat = require(appRoot + '/core/heat.js');
var seed = require(appRoot + '/core/lib/seed.js');

var entity = {
    water: require(appRoot + '/core/entity/water.js'),
    food: require(appRoot + '/core/entity/food.js'),
    nexus: require(appRoot + '/core/entity/nexus.js')
};

var map = function () {
	this.loaded = false;
};
map.prototype = {
    number: function(n) {
        return (Math.floor(this.seed.next() * n));
    },

    create: function(type) {
        var x = this.number(this.size), y = this.number(this.size);
        var e = new entity[type](this, {
            x: x,
            y: y,
            size: this.number(500 * this.scale)
        });
        this.entity.push(e);
        return ([x + '.' + y, e]);
    },

	load: function(config) {
        this.scale = config.scale || 1;
        this.size = (config.size || 32) * this.scale;
        this.seed = new seed(config.seed || Math.floor(Math.random() * 5000));
        this.heat = {
            food0: new heat(this.size),
            food1: new heat(this.size),
            water0: new heat(this.size),
            water1: new heat(this.size)
        };
        this.side = [];

        this.entity = [];
        for (var i = 0; i < (config.count || 2); i ++) {
            this.side.push(i);
            this.heat['nexus_' + i] = new heat(this.size);
            this.entity.push(new entity.nexus(this, {
                x: this.number(this.size),
                y: this.number(this.size),
                side: i
            }));
        }
        this.gen();
        this.loaded = true;
    },

    gen: function() {
        var grid = {};

        var water = this.number(10 * this.scale);
        for (var i = 0; i < water; i++) {
            var d = this.create('water');
            grid[d[0]] = d[1];
        }

        var food = this.number(10 * this.scale);
        for (var i = 0; i < food; i++) {
            var d = this.create('food');
            grid[d[0]] = d[1];
        }
        this.grid = grid;
    },

    think: function() {
        for (var i in this.heat) {
            this.heat[i].think();
        }
        for (var i in this.entity) {
            this.entity[i].think();
        }
        return (this);
    },

    draw: function() {
        var map = [];
        for (var i = 0; i < this.size; i++) {
            map[i] = [];
            for (var x = 0; x < this.size; x++) {
                map[i][x] = '_';
            }
        }
        var type = {
            food: 'f',
            water: 'w',
            warrior: 'x',
            warrior1: 'y',
            worker: 'a',
            worker1: 'b',
            nexus: '1',
            nexus1: '2'
        }, count = {};
        for (var i in this.entity) {
			var t = (this.entity[i].type == 'food' || this.entity[i].type == 'water');
			if (!t || (t && this.entity[i].size != 0)) {
				var k = this.entity[i].type + (this.entity[i].side || '');
				count[k] = (count[k] || 0)+ 1;
				map[this.entity[i].pos.x][this.entity[i].pos.y] = type[k];
			}
        }
        console.log(count);
        for (var i in map) {
            console.log('|' + map[i].join('') + '|');
        }
    }
};

module.exports = map;