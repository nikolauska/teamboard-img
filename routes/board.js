'use strict';

var express    = require('express');


var validator  = require('../config/validator');
var middleware = require('../middleware');
var utils      = require('../utils');
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
<<<<<<< HEAD
		console.log("request received");
		console.log(req.body);
=======
		console.log("request received" + JSON.stringify(req.body));
>>>>>>> origin/master

		return validator.board(req, function(err) {
			if(err) {
				return next(utils.error(601, err));
			}

			return utils.export.generateImage(utils.export.getJadeOptions(req.body), utils.export.getWebshotOptions(req.body), function(err, data) {
				if(err) {
					return next('error: '+ err);
				}
				
				return res.status(200).contentType('application/octet-stream').send(data);
			});
		});	
	})

module.exports = Router;
