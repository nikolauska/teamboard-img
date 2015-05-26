'use strict';

var mongoose = require('mongoose');
var fs 		 = require('fs');

var Image  	 = mongoose.model('image');


/**
 * Looks for hashed html from database and returns found document
 * @param {string} hash - Hashed html.
 * @param {function} callback - Function to be run after query.
 * @returns {function} callback
 */
function findHash(hash, callback) {
	var query = Image.where({ hash: hash });

	return query.findOne(function(err, doc) {
		if(err) {
			return callback(err);
		}

		return callback(null, doc);
	})
}

/**
 * Stores image to database
 * @param {string} hash - Hashed html.
 * @param {string} image - Path to image file.
 * @param {function} callback - Function to be run after save.
 * @returns {function} callback
 */
function storeImage(hash, image, callback) {
	return fs.readFile(image, '', {}, function(err, img){
		if(err) {
			callback(err);
		}

		console.log(img);

		var newImg = new Image( {
			hash: hash,
			data: img
		});

		return newImg.save(function(err) {
			if(err) {
				return callback(err);
			}

			return callback(null, img);
		});
	});
	
}

module.exports = {
	findHash: findHash,
	storeImage: storeImage
};