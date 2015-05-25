'use strict';

var express    = require('express');

var middleware = require('../middleware');
var error      = require('../utils/error');
var exportAs   = require('../utils/export');

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

			return res.attachment('board.png').status(200).send(data);
		} 

		var bg = req.background ? req.background : "PLAY";
		var cbg = req.customBackground ? req.background : "";
		var tickets = req.tickets ? req.tickets : [];

		var options = {
			'background': bg,
			'customBackground': cbg,
			'tickets': tickets
		};

		return exportAs.generateImage('board', req.resolved.id, imageCallback);
	})

module.exports = Router;
