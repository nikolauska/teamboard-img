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
	return fs.readFileSync(image, '', {}, function(err, data){
		if(err) {
			callback(err);
		}

		//var data = new Buffer(data).toString('binary');

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
	});
	
}

module.exports = {
	findHash: findHash,
	storeImage: storeImage
};