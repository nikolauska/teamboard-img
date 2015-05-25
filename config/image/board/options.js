'use strict';

// Required options for creating board in jade
var jade = {
        customBackground: 'PLAY',
        background: '',
        tickets: [],
        pretty: true                 
    };

// Defines zooming for webshot image
var zoomFactor = 1;

// Required options for webshot
var webshot = {
    siteType:   'html',
    zoomFactor: zoomFactor,
    shotSize: {
        width:  1920 * zoomFactor,
        height: 1080 * zoomFactor
    }
};

var path = __dirname + '/site.jade';

module.exports = {
    jade: jade,
    zoomFactor: zoomFactor,
    webshot: webshot,
    path: path
}
