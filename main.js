
global.appRoot = (require('path').resolve(__dirname)).replace(/\\/g, '/');
var config = {
    fps: 10
};

var map = new (require(appRoot + '/core/map.js'))();
map.load(config);

var render = function() {
    process.stdout.write('\033c');
    map.think().draw();
    setTimeout(function() {
        render();
    }, 1000 / config.fps)
};
render();