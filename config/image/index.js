'use strict';

var board = require('./board/options');
var bgBoard = require('../../static/board');

function getFromType(type) {
	switch(type) {
    	case 'board':
    		return {
    			options: board,
    			path: board.path,
    			bgPath: bgBoard.path
    		};
    };
}

module.exports = {
    getFromType: getFromType
}