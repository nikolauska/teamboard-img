'use strict';

var express    = require('express');

var middleware = require('../middleware');
var exportAs   = require('../utils/export');
var bgBoard    = require('../static/board');

var Router     = express.Router();

Router.param('board_id',  middleware.resolve.board);

Router.route('/board/:board_id')

	/**
	 * Get board image
	 *
	 * returns:
	 *   png image of given board
	 */
	.get(function(req, res, next) {
		function imageCallback(err, data) {
			if(err) {
				return next(err);
			}
			
			return res.attachment('board.png').status(200).contentType('image/png').send(data);
		} 

		var bg = req.background ? req.background : "PLAY";
		var cbg = req.customBackground ? req.customBackground : "";
		var tickets = req.tickets ? req.tickets : [];

		bg = require('../static/board').getBackgroundPath(bg);

		var options = {
			background: bg,
			tickets: tickets,
			pretty: true 
		};

		return exportAs.generateImage('board', req.resolved.id, imageCallback, options);
	})

module.exports = Router;
