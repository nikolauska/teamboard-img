'use strict';

var config = require('../../config')

var resolutionWidth = 1920;
var resolutionHeight = 1080;

// Required options for creating board in jade
var jade = {
    background: '',
    tickets: [],
    width: resolutionWidth,
    height: resolutionHeight                
}

// Required options for webshot
var webshot = {
    siteType:   'html',
    shotSize: {
        width:  resolutionWidth,
        height: resolutionHeight
    },
    shotOffset: { 
    	left: 	0, 
		right: 	0, 
		top: 	0, 
		bottom: 0 
	},
    renderDelay: 1
}

// Path where jade file can be found on static folder
var pathBg = config.bgUrl + ':' + config.port + '/bg/';
var pathJade = __dirname + '/site.jade';

module.exports = {
    jade: jade,
    zoomFactor: 1,
    webshot: webshot,
    pathBg: pathBg,
    pathJade: pathJade,
    resolutionWidth: resolutionWidth,
    resolutionHeight: resolutionHeight
}
