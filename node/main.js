
global.appRoot = (require('path').resolve(__dirname)).replace(/\\/g, '/');
var config = {
    fps: 10
};

const send = function(ws, map) {
	var a = {heat: {}, entity: []};
	for (var i in map.heat) {
		a.heat[i] = map.heat[i].map;
	}
	for (var x in map.entity) {
		a.entity.push({
			pos: map.entity[x].pos,
			type: map.entity[x].type,
			side: map.entity[x].side,
			size: map.entity[x].size
		})
	}
	try {
		ws.send(JSON.stringify(a));
	} catch (e) {
		// dump code
	}
}, user = [];

var map = new (require(appRoot + '/core/map.js'))();
map.load(config);

var render = function() {
    process.stdout.write('\033c');
    map.think().draw();
    setTimeout(function() {
        render();
		for (var i in user) {
			send(user[i], map);
		}
    }, 1000 / config.fps)
};
render();

const WebSocket = require('ws'), http = require('http'), fs = require('fs');
const wss = new WebSocket.Server({port: 8080});
wss.on('connection', function connection(ws) {
	ws.on('message', function incoming(message) {
		if (message === 'getALL') {
			send(ws, map);
		}
	});
	user.push(ws);
}); 

const server = http.createServer(function(req, res) {
	if (req.url == '/') {
		res.end(fs.readFileSync('public/index.html', 'utf8'));
	} else {
		res.end(req.url);
	}
});

server.listen(3000, function(err) {  
	if (err) {
		return console.log('something bad happened', err)
	}

	console.log('server is listening on 3000');
});
