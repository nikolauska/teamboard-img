'use strict';


var jade = require('jade');

module.exports = function(board, callback) {
	return jade.renderFile('./assets/board.jade', {
			tickets: board.tickets
		},
		function(err, html) {
			if(err) {
				return callback(err);
			}
			return callback(null, html);
		});
}
