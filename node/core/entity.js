"use strict";

var obj = function () {

};
obj.prototype = {
    setPos: function(x, y) {
        if (x > 0 && y > 0 && x < this.map.size && y < this.map.size) {
            this.pos.x = x;
            this.pos.y = y;
        }
    },

    createPulse: function(t) {
        if (this.pulse > 10) {
            this.map.heat[t].add(this.pos.x, this.pos.y, 10);
            this.pulse = 0;
        } else {
            this.pulse += 1;
        }
    },

    heat: function(type, x, y) {
        if (x > 0 && y > 0 && x < this.map.size && y < this.map.size) {
            return (this.map.heat[type].map[x][y]);
        }
        return (-99);
    },

    think: function() {
        //console.log('cat')
    }
};

module.exports = obj;