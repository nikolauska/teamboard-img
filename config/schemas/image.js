'use strict';

var mongoose 	= require('mongoose');
var mongoConfig = require('../');

module.exports = new mongoose.Schema({
	/**
	 * Hash for locating already generated picture
	 */
	hash: {
		type:    String,
		default: ''
	},

	/**
	 * Actual image data in binary
	 */
	data: {
		type: 	 Buffer,
		default: null
	},

	/**
	 * Content type for data stored
	 */
	contentType: {
		type: 	 String,
		default: 'image/png'
	},

	/**
	 * Created time, used to remove expired content from database
	 */
	createdAt: { 
		type: Date, 
		expires: mongoConfig.mongo.expireTimeHours*60*60,
		default: Date.now 
	}
});