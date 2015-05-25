'use strict';

var webshot  	 = require('webshot');
var jade 	 	 = require('jade');
var fs 			 = require('fs');

var imageOptions = require('../config/image/options');
var database	 = require('./utils/database');
var hash	 	 = require('./utils/hashing');


function generateImage(type, callback, jadeOptions, webshotOptions) {
	var jadeOpt = jadeOptions;
	var webshotOpt = webshotOptions;
	var optionsDefault = imageOptions.getFromType(type);

	// If options weren't given then use default
	if(typeOf jadeOpt == "undefined") {jadeOpt = optionsDefault.jadeOptions;};
	if(typeOf webshotOpt == "undefined") {webshotOpt = optionsDefault.webshotOptions;};

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
					var data = database.storeImage(hash, imagePath);

					// Remove generated image file
					return fs.unlink(imagePath, function(err) {
						if(err) {
							callback(err);
						}

						return callback(null, data);
					});

					
				});
			} else {
				// Image was found on database so return that
				return return callback(null, doc.data);
			}
		});	
	});	
}

module.exports = {
	generateImage: generateImage
}