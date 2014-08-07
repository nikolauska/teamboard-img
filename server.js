'use strict';

var app   = require('express')();
var utils = require('./utils');

// resolve id-parameter to a board from mongodb: attaches to 'req.board'
app.param('board_id', require('./middleware/board'));

// resolve screenshot for the given board
app.get('/boards/:board_id/screenshot', function(req, res, next) {
	return utils.jade(req.board, function(err, html) {
		if(err) {
			return next(err);
		}
		utils.webshot(html, function(err, stream) {
			if(err) {
				return next(err);
			}
			res.set('content-type', 'image/png');
			stream.on('data', function(data) {
				res.write(data.toString('binary'), 'binary');
			});
			stream.on('end', function() {
				res.end();
			});
		});
	});
});

module.exports = app;
