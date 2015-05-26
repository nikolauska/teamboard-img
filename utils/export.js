'use strict';

var webshot  	 = require('webshot');
var jade 	 	 = require('jade');
var fs 			 = require('fs');

var imageOptions = require('../config/image');
var database	 = require('./database');
var hash	 	 = require('./hashing');

var error        = require('../utils/error');



/**
 * Stores image to database
 * @param {string} type - type of image wanted.
 * @param {string} id - board id.
 * @param {function} callback - Function to be run after generation.
 * @param {object} jadeOptions - options for jade html generation.
 * @param {object} webshotOptions - options for webshot image generation.
 * @returns {function} callback
 */
function generateImage(type, id, callback, jadeOptions, webshotOptions) {
	var optionsDefault = imageOptions.getFromType(type);
	var jadeOpt = optionsDefault.options.jade;
	var webshotOpt = optionsDefault.options.webshot;
	
	// If options weren't given then use default
	if(jadeOptions) {jadeOpt = jadeOptions;};
	if(webshotOptions) {webshotOpt = webshotOptions;};

	// Where image will be created before saving to db
	var imagePath = require('../static') + 'temp/' + id + '.png';

	// Generates html
	return jade.renderFile(optionsDefault.options.path, jadeOpt, function(err, html) {
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
				// Generate image from html
				return webshot(html, imagePath, webshotOpt, function(err) {
					if(err) {
						return callback(error(503, err));
					}

					console.log('Image generated');

					// Store image to database and get returned binary code
					return database.storeImage(hash, imagePath, function(err, data) {
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
	generateImage: generateImage
}