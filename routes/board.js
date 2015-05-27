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
	.post(function(req, res, next) {
		console.log("request received");
		return exportAs.generateImage(exportAs.getJadeOptions(req), exportAs.getWebshotOptions(req), function(err, data) {
			if(err) {
				return next(err);
			}
			return res.status(200).contentType('octet-stream').send(data);
		});
	})

module.exports = Router;
