'use strict';

// Required options for creating board in jade
var jade = {
    background: '',
    tickets: [],
    pretty: true                 
};

// Required options for webshot
var webshot = {
    siteType:   'html',
    shotSize: {
        width:  1920,
        height: 1080
    },
    shotOffset: { 
    	left: 	0, 
		right: 	0, 
		top: 	0, 
		bottom: 0 
	},
    renderDelay: 10
};

// Path where jade file can be found on static folder
var pathBg = __dirname + '/bg/';
var pathJade = __dirname + '/site.jade';

module.exports = {
    jade: jade,
    zoomFactor: 1,
    webshot: webshot,
    pathBg: pathBg,
    pathJade: pathJade
}