'use strict';

var mongoose = require('mongoose');
var fs 	     = require('fs');

var Image = mongoose.model('image');


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
	});
}

/**
 * Stores image to database
 * @param {string} hash - Hashed html.
 * @param {string} image - Path to image file.
 * @param {function} callback - Function to be run after save.
 * @returns {function} callback
 */
function storeImage(hash, image, callback) {
	return fs.stat(image, function(err, stats) {
		if(err) {
			return callback(err);
		}

		return fs.readFile(image, '', function(err, data){
			if(err) {
				return callback(err);
			}

			// Max value mongo db allows on default
			var maxFileSizeInBytes = 16777216;

			if(stats.size < maxFileSizeInBytes) {
				var newImg = new Image( {
					hash: hash,
					data: data
				});

				return newImg.save(function(err) {
					if(err) {
						return callback(err);
					}

					return callback(null, data);
				});
			} else {
				return callback(null, data);
			}		
		});
	});
}

module.exports = {
	findHash: findHash,
	storeImage: storeImage
}
