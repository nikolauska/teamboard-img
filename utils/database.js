'use strict';

var mongoose   = require('mongoose');
var fs 		   = require('fs');

var Grid 	   = require('gridfs-stream');
	Grid.mongo = mongoose.mongo;

var Image  	   = mongoose.model('image');

var conn       = mongoose.connection;

/**
 * Looks for hashed html from database and returns found document
 * @param {string} hash - Hashed html.
 * @param {function} callback - Function to be run after query.
 * @returns {function} callback
 */
function findHash(hash, path, callback) {
	var query = Image.where({ hash: hash });

	return query.findOne(function(err, file) {
		if(err) {
			return callback(err);
		}

		return file.retrieveBlobs(function (err) {
		    if(err) {
		      return callback(err);
		    }

		    return callback(null, file);
		});
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
	conn.once('open', function () {
	    var gfs = Grid(conn.db);
	 
	    // streaming to gridfs
	    //filename to store in mongodb
	    var writestream = gfs.createWriteStream({
	        filename: 'board.png'
	    });
	    fs.createReadStream(image).pipe(writestream);

	    writestream.on('error', function (err) {
	    	return callback(err);
	    });

	    writestream.on('close', function (file) {
	    	return callback(null, file);
	    });
	});
}

module.exports = {
	findHash: findHash,
	storeImage: storeImage
};