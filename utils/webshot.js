'use strict';

var webshot  	 = require('webshot');
var jade 	 	 = require('jade');
var md5 		 = require('MD5');

var imageOptions = require('../config/image/options');
var database	 = require('./utils/database');


function generateImage(type, callback, jadeOptions, webshotOptions) {
	var jadeOpt = jadeOptions;
	var webshotOpt = webshotOptions;
	var optionsDefault = imageOptions.getFromType(type);

	// If options weren't given then use default
	if(typeOf jadeOpt == "undefined") {jadeOpt = optionsDefault.jadeOptions;};
	if(typeOf webshotOpt == "undefined") {webshotOpt = optionsDefault.webshotOptions;};

	// Where image will be created before saving to db
	imagePath = '/temp/' + id + 'png';


	// Generates html
	return jade.renderFile(jadePath, jadeOpt, function(err, html) {
		if(err) {
			return callback(err);
		}

		var hash = md5(html);

		// Get array of found entries from database
		var found = database.findHash(hash);

		// Check if image already exists
		if(found.length > 0) {
			return callback(null, found[0].data);
		}

		// Generate image from html
		return webshot(html, imagepath, webshotOpt, function(err) {
			if(err) {
				return callback(err);
			}

			// Store image to database and get returned
			var data = database.storeImage(hash, imagePath);

			return callback(null, data);
		});
	});	
}

module.exports = {
	generateImage: generateImage
}