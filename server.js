var http		= require('http');
var fs			= require('fs');
var express 	= require('express');
var bodyParser 	= require('body-parser');

var config 		= require('./config');
var mongoose 	= require('./config/mongoose');
var app 		= require('./config/express');
var exportAs	= require('./utils/export');

var router 		= express.Router();
var options 	= [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8888;

router.get('/webshot/board', function(req, res, options) {
	function imageCallback(err, data) {
		if(err) {
			return res.attachment('error.txt').send(200, err);
		}

		return res.attachment('board.png').send(200, data);
	} 

	var options = {
		'background': req.background,
		'customBackground': req.customBackground,
		'ticket':  {
			'position': {  
				'x':    req.ticket.position.x,
				'y':	req.ticket.position.y
				} 
			}
		};


	return exportAs.generateImage('board', imageCallback, options); //res.json({message: 'Return image here'});
});

app.use(express.static(__dirname + '/config/image/img'),router);
app.listen(port);
console.log("Listening to port: " + port);

module.exports.router = router;

/**
 * The Express application.
 */
module.exports.app = app;

/**
 * Perform necessary initialization to start the server.
 *
 * @param  {function}  onListen  Callback invoked when the server starts
 *                               listening to incoming requests.
 */
module.exports.listen = function(onListen) {
	mongoose.connect(config.mongo.url, config.mongo.opts);
	this.server = app.listen(config.port, onListen || function() {
		console.log('server listening at', config.port);
	});
}

/**
 * Perform necessary teardown to stop the server.
 *
 * @param  {function=}  onShutdown  Callback invoked after shutting down.
 */
module.exports.shutdown = function(onShutdown) {
	return this.server.close(function() {
		mongoose.disconnect(onShutdown || function() {});
	});
}