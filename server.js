'use strict';

var config   = require('./config');
var mongoose = require('./config/mongoose');
var app      = require('./config/express');
var Router   = require('./routes/board')
var express  = require('express');

app.use('/img',     require('./routes/board'));
app.use('/version', require('./routes/version'));
app.use(express.static(__dirname + '/static/board'), Router);

/**
 * Error handling middleware. All errors passed to 'next' will eventually end
 * up here.
 */
app.use(function(err, req, res, next) {
	var boom = require('boom');
	    err  = boom.wrap(err, err.status);
	if(err.output.statusCode >= 500) {
		console.error(err);
	}
	return res.status(err.output.statusCode).send(err.output.payload);
});

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
