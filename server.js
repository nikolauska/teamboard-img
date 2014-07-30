'use strict';

var app   = require('express')();
var utils = require('./utils');

// resolve id-parameter to a board from mongodb: attaches to 'req.board'
app.param('board_id', require('./middleware/board'));

// resolve screenshot for the given board
app.get('/boards/:board_id/screenshot', function(req, res, next) {
	var path = 'static/' + req.params.board_id + '.png';
	utils.diff(req.board, function(refresh) {
		if(refresh) {
			// (re)generate screenshot first by compiling
			// .jade-template using jade and then using webshot
			// to generate screenshot from the compiled html
			return utils.jade(req.board, function(err, html) {
				if(err) {
					return next(err);
				}
				utils.webshot(html, path, function(err) {
					if(err) {
						return next(err);
					}
					return res.sendfile(path);
				});
			});
		}
		else return res.sendfile(path);
	});
});

module.exports = app;
