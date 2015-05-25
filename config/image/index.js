'use strict';

var board = require('./board/options');

function getFromType(type) {
	switch(type) {
    	case 'board':
    		return {
    			options: board,
    			path: '../config/image/board/site.jade'
    		};
    };
}

module.exports = {
    getFromType: getFromType
}