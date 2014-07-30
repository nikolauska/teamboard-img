'use strict';


var mongodb = require('mongodb');

var mongourl = process.env.MONGODB_URL ||
	'mongodb://localhost:27017/teamboard-dev';

var mdb = null;

module.exports = function(callback) {
	if(mdb) {
		return callback(null, mdb);
	}
	mongodb.MongoClient.connect(mongourl, function(err, db) {
		if(err) {
			return callback(err);
		}
		return callback(null, mdb = db);
	});
}
