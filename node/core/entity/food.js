"use strict";

var obj = function(map, config) {
    this.map = map;
    this.type = 'food';
    this.pos = {
        x: config.x || 0,
        y: config.y || 0
    };
    this.size = config.size;
    this.pulse = 0;
};
obj.prototype = require(appRoot + '/core/lib/extends.js')(require(appRoot + '/core/entity.js'), {
    think: function() {
        console.log('food', this.size);
        if (this.pulse > 10 && this.size != 0) {
            this.map.heat.food0.add(this.pos.x, this.pos.y, this.size / 10);
            this.map.heat.food1.add(this.pos.x, this.pos.y, this.size / 10);
            this.pulse = 0;
        } else {
            this.pulse += 1;
        }
    }
});

module.exports = obj;