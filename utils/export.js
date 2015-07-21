'use strict';

var webshot = require('webshot');
var jade    = require('jade');
var fs      = require('fs');

var hash     = require('./hashing');

var error = require('../utils/error');
var board = require('../static/board');

var defaultTeamboardGridSize = 10;

var Background = {
	DEFAULT: board.pathBg + '1.png',
	SWOT: board.pathBg + '4.png',
	PLAY: board.pathBg + '5.png',
	KANBAN: board.pathBg + '6.png',
	KEEP_DROP_TRY: board.pathBg + '7.png',
	SMOOTH_BRAINSTORMING: board.pathBg + '8.gif',
	LEAN_CANVAS: board.pathBg + '9.png',
	IDEA_GATHERING: board.pathBg + '10.png'
}

/**
 * Gets options needed for jade from request message
 * @param {object} request - request message from api.
 * @returns {object} jade options
 */
function getJadeOptions(body) {
	//Copying json so original won't be overwritten
	var jade = JSON.parse(JSON.stringify(board.jade));

	if(body.background !== 'CUSTOM') {
		jade.background = Background[body.background];
	} else {
		jade.background = body.customBackground
	}

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
