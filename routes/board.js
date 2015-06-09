'use strict';

var express = require('express');

var validator  = require('../config/validator');
var utils      = require('../utils');
var bgBoard    = require('../static/board');

var Router = express.Router();

Router.route('/board')

	/**
	 * Get board image
	 *
	 * returns:
	 *   png image of given board
	 */
	.post(function(req, res, next) {
		return validator.board(req, function(err) {
			if(err) {
				return res.status(500).contentType('application/json').send(err);
			}

			return utils.export.generateImage(
				   utils.export.getJadeOptions(req.body), 
				   utils.export.getWebshotOptions(req.body), 
				   function(err, data) {
						if(err) {
							return res.status(500).contentType('application/json').send(err);
						}
						
						return res.attachment(req.body.name + '.png').status(200).contentType('image/png').send(data);
					});
		});	
	})

module.exports = Router;
