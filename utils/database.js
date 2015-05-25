'use strict';

var mongoose = require('mongoose');
var fs 		 = require('fs');

var Image  	 = mongoose.model('image');

function findHash(hash, callback) {
	var query = Image.where({ hash: hash });

	return query.findOne(function(err, doc) {
		if(err) {
			return callback(err);
		}

		return callback(null, doc);
	})
}

function storeImage(hash, image, callback) {
	var bitmap = fs.readFileSync(image);
	var data = new Buffer(bitmap).toString('base64');

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
}

module.exports = {
	findHash: findHash,
	storeImage: storeImage
};