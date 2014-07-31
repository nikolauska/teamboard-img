'use strict';


var webshot = require('webshot');

module.exports = function(html, dest, callback) {

	var zoomFactor = 0.20;

	var options = {
		siteType:   'html',
		zoomFactor: zoomFactor,
		shotSize: {
			width:  1920 * zoomFactor,
			height: 1080 * zoomFactor
		}
	}

	return webshot(html, dest, options, function(err) {
		if(err) {
			return callback(err);
		}
		return callback();
	});
}
