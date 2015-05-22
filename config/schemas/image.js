
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
		type: 	 buffer
		default: null
	},

	/**
	 * Content type for data stored
	 */
	contentType: {
		type: 	 String,
		default: 'image/png'
	}
});