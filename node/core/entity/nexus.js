"use strict";

var entity = {
    worker: require(appRoot + '/core/entity/worker.js'),
    warrior: require(appRoot + '/core/entity/warrior.js')
};

var obj = function(map, config) {
    this.map = map;
    this.type = 'nexus';
    this.pos = {
        x: config.x || 0,
        y: config.y || 0
    };
    this.food = 100;
    this.water = 100;
    this.health = 100;
    this.side = config.side;
    this.spawn = 200;
};
obj.prototype = require(appRoot + '/core/lib/extends.js')(require(appRoot + '/core/entity.js'), {
    think: function() {
        if (this.spawn > 20) {
            var type = ['worker', 'warrior', (Math.floor(Math.random() * 2) == 1) ? 'worker' : 'warrior'];
            for (var i in type) {
                this.map.entity.push(new entity[type[i]](this.map, {
                    x: this.pos.x,
                    y: this.pos.y,
                    nexus: this,
                    side: this.side
                }));
            }

            this.map.heat['nexus_' + this.side].add(this.pos.x, this.pos.y, 50);
            this.spawn = 0;
        }

        this.food = Math.max(0, this.food - 1);
        this.water = Math.max(0, this.water - 1);

        if (this.food != 0 && this.water != 0) {
            this.spawn += 1;
        }
    }
});

module.exports = obj;