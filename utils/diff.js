'use strict';

var _     = require('lodash');
var cache = require('../services/cache');

module.exports = function(board, callback) {
	var cacheable = {
		id:      board._id,
		path:    './static/' + board._id + '.png',
		tickets: _.map(board.tickets, function(ticket) {
			return {
				id:       ticket._id,
				color:    ticket.color,
				position: ticket.position
			}
		})
	}
	cache.set(cacheable.id, cacheable);
	return callback(true);
}
