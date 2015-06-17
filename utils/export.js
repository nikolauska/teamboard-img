'use strict';

var webshot = require('webshot');
var jade    = require('jade');
var fs      = require('fs');

var hash     = require('./hashing');

var error = require('../utils/error');
var board = require('../static/board');

var defaultTeamboardGridSize = 10;

/**
 * Gets options needed for jade from request message
 * @param {object} request - request message from api.
 * @returns {object} jade options
 */
function getJadeOptions(body) {
	//Copying json so original won't be overwritten
	var jade = JSON.parse(JSON.stringify(board.jade));

	switch (body.background) {
		case 'CUSTOM': 
			jade.background = body.customBackground;
			break;
		case 'PLAY':
			jade.background = board.pathBg + 'play.png';
			break;
		case 'SWOT':
			jade.background = board.pathBg + 'swot.png';
			break;
		case 'SCRUM':
			jade.background = board.pathBg + 'scrum.png';
			break;
		case 'KANBAN':
			jade.background = board.pathBg + 'kanban.png';
			break;
		case 'KEEP_DROP_TRY':
			jade.background = board.pathBg + 'keep_drop_try.png';
			break;
		case 'CUSTOMER_JOURNEY_MAP':
			jade.background = board.pathBg + 'customer_journey_map.png';
			break;
		case 'BUSINESS_MODEL_CANVAS':
			jade.background = board.pathBg + 'business_model_canvas.png';
			break;
	};
	jade.tickets = body.tickets;
	jade.width = jade.width * (body.size.width / defaultTeamboardGridSize);
	jade.height = jade.height * (body.size.height / defaultTeamboardGridSize);

	return jade;
}

/**
 * Gets options needed for webshot from request message
 * @param {object} request - request message from api.
 * @returns {object} webshot options
 */
function getWebshotOptions(body) {
	//Copying json so original won't be overwritten
	var webshotOpt = JSON.parse(JSON.stringify(board.webshot));

	webshotOpt.shotSize.width = webshotOpt.shotSize.width * (body.size.width / defaultTeamboardGridSize);
	webshotOpt.shotSize.height = webshotOpt.shotSize.height * (body.size.height / defaultTeamboardGridSize);

	return webshotOpt;
}

/**
 * Stores image to database
 * @param {object} jadeOptions - options for jade html generation.
 * @param {object} webshotOptions - options for webshot image generation.
 * @param {function} callback - Function to be run after generation.
 * @returns {function} callback
 */
function generateImage(jadeOptions, webshotOptions, callback) {
	// Generates html
	return jade.renderFile(board.pathJade, jadeOptions, function(err, html) {
		if(err) {
			return callback(err);
		}
		var hashed = hash.generateHash(html);

		// Where image will be created before saving to db
		var imagePath = require('../static/temp') + hashed + '.png';

		// Generate image from html
		return webshot(html, imagePath, webshotOptions, function(err) {
			if(err) {
				return callback(err);
			}

			return fs.readFile(imagePath, '', function(err, data){
				if(err) {
					return callback(err);
				}

				// Remove generated image file
				return fs.unlink(imagePath, function(err) {
					if(err) {
						return callback(err);
					}

					return callback(null, data);
				});
			});
		});
	});	
}

module.exports = {
	getJadeOptions: getJadeOptions,
	getWebshotOptions: getWebshotOptions,
	generateImage: generateImage	
}
