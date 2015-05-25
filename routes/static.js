'use strict';

var express    = require('express');

var middleware = require('../middleware');
var error      = require('../utils/error');
var exportAs   = require('../utils/export');

var Router     = express.Router();

var board      = express.static(__dirname + '/config/image/board');
var background = express.static(__dirname + '/static/background');

module.exports = {
	Router: Router,
	board: board,  
	background: background
}