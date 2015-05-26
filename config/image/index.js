'use strict';

var board = require('./board/options');
var bg = require('../../static') + 'board';

function getFromType(type) {
	switch(type) {
    	case 'board':
    		return {
    			options: board,
    			path: board.path,
    			bgPath: bg
    		};
    };
}

module.exports = {
    getFromType: getFromType
}