'use strict';

var md5 = require('MD5');

/**
 * Generates hashed value from html text
 * @param {string} html - html to be hashed.
 * @returns {string} hashed text
 */
function generateHash(html) {
	return md5(html);
}

module.exports = {
	generateHash: generateHash
}