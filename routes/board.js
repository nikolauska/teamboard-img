'use strict';

var express    = require('express');

var middleware = require('../middleware');
var exportAs   = require('../utils/export');
var bgBoard    = require('../static/board');

var Router     = express.Router();

Router.route('/board')

	/**
	 * Get board image
	 *
	 * returns:
	 *   png image of given board
	 */
	.get(function(req, res, next) {
		console.log("request received");
		return exportAs.generateImage(exportAs.getJadeOptions(req), exportAs.getWebshotOptions(req), function(err, data) {
			if(err) {
				return next(err);
			}
			
			return res.attachment('board.png').status(200).contentType('image/png').send(data);
		});
	})

module.exports = Router;
