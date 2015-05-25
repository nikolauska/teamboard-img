'use strict';

var md5 = require('MD5');

function generateHash(html) {
	return MD5(html);
}

module.exports = {
	generateHash: generateHash
}