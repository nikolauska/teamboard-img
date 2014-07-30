'use strict';


var mongo    = require('../services/mongo');
var ObjectID = require('mongodb').ObjectID;

module.exports = function(req, res, next, id) {
	mongo(function(err, db) {
		if(err) {
			return next(err);
		}
		db.collection('boards').findOne({ '_id': ObjectID(id) },
			function(err, board) {
				if(err) {
					return next(err);
				}
				req.board = board;
				return next();
			});
	});
}
