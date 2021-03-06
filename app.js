var express = require('express');
var app = express();
var http = require('http').Server(app);

var Datastore = require('nedb'),
    rooms = new Datastore();
    listOfRooms = new Datastore();
    users = new Datastore({filename:'users.db', autoload:true});

var io = require('./sockets').listen(http, rooms, users,listOfRooms);

var port = process.env.PORT || 3000;
var DEBUG = true;

app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/public/'));

app.locals.pretty = true;

app.get('/:room?', function(req, res) {
    res.sendFile('views/index.html', {root: __dirname});
});

http.listen(port, function() {
	console.log('Listening on port ' + port);
});

