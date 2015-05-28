'use strict';

var webshot  = require('webshot');
var jade 	 = require('jade');
var fs 		 = require('fs');

var database = require('./database');
var hash	 = require('./hashing');

var error    = require('../utils/error');
var board    = require('../static/board');

/**
 * Gets options needed for jade from request message
 * @param {object} request - request message from api.
 * @returns {object} jade options
 */
function getJadeOptions(req) {
	var jade = board.jade;

	jade.background = req.background;
	jade.customBackground = req.customBackground;
	jade.tickets = req.tickets;

	return jade;
}

/**
 * Gets options needed for webshot from request message
 * @param {object} request - request message from api.
 * @returns {object} webshot options
 */
function getWebshotOptions(req) {
	// Not info yet what is needed so return default settings
	return board.webshot;
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
			return callback(error(501, err));
		}

		console.log('HTML generated: ' + html);

		var hashed = hash.generateHash(html);

		console.log('Hash generated: ' + hashed);
		// Get array of found entries from database
		return database.findHash(hashed, function(err, doc) {
			if(err) {
				return callback(error(502, err));
			}

			if(doc) {
				console.log('Hash found! Getting image from database');
				// Image was found on database so return that
				return callback(null, new Buffer(doc.data, 'binary'));				
			} else {
				console.log('Hash not found! Generating new image');

				// Where image will be created before saving to db
				var imagePath = require('../static') + 'temp/' + hashed + '.png';

				// Generate image from html
				return webshot(html, imagePath, webshotOptions, function(err) {
					if(err) {
						return callback(error(503, err));
					}

					console.log('Image generated');

					// Store image to database and get returned binary code
					return database.storeImage(hashed, imagePath, function(err, data) {
						if(err) {
							return callback(error(504, err));
						}

						console.log('Image saved to database');

						// Remove generated image file
						return fs.unlink(imagePath, function(err) {
							if(err) {
								return callback(error(505, err));
							}

							console.log('Generated image deleted');

							return callback(null, data);
						});
					});	
				});
			}
		});	
	});	
}

module.exports = {
	getJadeOptions: getJadeOptions,
	getWebshotOptions: getWebshotOptions,
	generateImage: generateImage	
}