'use strict';

var md5 = require('MD5');

function generateHash(html) {
	return md5(html);
}

module.exports = {
	generateHash: generateHash
}