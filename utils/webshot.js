'use strict';


var webshot = require('webshot');

module.exports = function(html, dest, callback) {

	var zoomFactor = 0.25;

	var options = {
		siteType:   'html',
		zoomFactor: zoomFactor,
		shotSize: {
			width:  800 * zoomFactor,
			height: 480 * zoomFactor
		}
	}

	return webshot(html, dest, options, function(err) {
		if(err) {
			return callback(err);
		}
		return callback();
	});
}
