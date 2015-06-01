'use strict';

var crypto = require('crypto');

/**
 * Generates hashed value from html text
 * @param {string} html - html to be hashed.
 * @returns {string} hashed text
 */
function generateHash(html) {
	return crypto.createHash('md5').update(html).digest('hex');
}

module.exports = {
	generateHash: generateHash
}
