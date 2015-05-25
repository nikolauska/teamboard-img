'use strict';

var webshot  	 = require('webshot');
var jade 	 	 = require('jade');
var fs 			 = require('fs');

var imageOptions = require('../config/image');
var database	 = require('./database');
var hash	 	 = require('./hashing');


function generateImage(type, callback, jadeOptions, webshotOptions) {
	var optionsDefault = imageOptions.getFromType(type);
	var jadeOpt = optionsDefault.jadeOptions;
	var webshotOpt = optionsDefault.webshotOptions;
	
	// If options weren't given then use default
	if(jadeOptions) {jadeOpt = jadeOptions;};
	if(webshotOptions) {webshotOpt = webshotOptions;};

	// Where image will be created before saving to db
	imagePath = '/static/' + id + 'png';

	// Generates html
	return jade.renderFile(jadePath, jadeOpt, function(err, html) {
		if(err) {
			return callback(err);
		}

		var hashed = hash(html);

		// Get array of found entries from database
		return database.findHash(hashed, function(err, doc) {
			if(err) {
				return callback(err);
			}

			if(doc === null) {
				// Generate image from html
				return webshot(html, imagepath, webshotOpt, function(err) {
					if(err) {
						return callback(err);
					}

					// Store image to database and get returned binary code
					return database.storeImage(hash, imagePath, function(err, data) {
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
			} else {
				// Image was found on database so return that
				return callback(null, new Buffer(doc.data, 'base64'));
			}
		});	
	});	
}

module.exports = {
	generateImage: generateImage
}