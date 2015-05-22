'use strict';

var mongoose = require('mongoose');

function findHash(hash, callback) {
	return mongoose.connection.db.collection('image', function (err, collection) {
    	return collection.find(query).toArray(callback);
    });
}

function storeImage(schema) {

}

module.exports = {
	findHash: findHash,
	storeImage: storeImage
};