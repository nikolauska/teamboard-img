'use strict';

var mongoose = require('mongoose');

var Image  	 = mongoose.model('image');

function findHash(hash, callback) {
	var query = Image.where({ hash: hash });

	return query.findOne(callback)
}

function storeImage(hash, image, callback) {
	var data = new Buffer(image).toString('base64');

	var newImg = new Image( {
		hash: hash,
		data: data
	});

	return newImg.save(callback);
}

module.exports = {
	findHash: findHash,
	storeImage: storeImage
};