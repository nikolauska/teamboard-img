'use strict';

var fs = require('fs');

function Cache() {

	this._cache            = { }
	this._cleanupInterval  = process.env.CLEANUP_INTERVAL  || 60;
	this._cleanupThreshold = process.env.CLEANUP_THRESHOLD || 60 * 60;

	var cleanup = function() {
		var cache = this._cache;

		for(var id in cache) {

			var item      = cache[id];
			var diff      = Date.now() - item.cachedAt;
			var threshold = this._cleanupThreshold * 1000;

			if(diff > threshold) {
				fs.exists(item.path, function(exists) {
					if(!exists) {
						return console.log('cache:cleanup' +
							'invalid path:', item);
					}
					fs.unlink(item.path, function(err) {
						if(err) {
							return console.error('cache:cleanup:', err);
						}
						delete cache[id];
						console.log('cache:cleanup: removed:', item);
					});
				});
			}
		}
	}

	setInterval(cleanup.bind(this), this._cleanupInterval * 1000);
}

Cache.prototype.set = function(id, item) {
	this._cache[id]          = item;
	this._cache[id].cachedAt = Date.now();
	return this._cache[id];
}

module.exports = new Cache();
