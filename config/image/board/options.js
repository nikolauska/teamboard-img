'use strict';
var options = require('./server');

// Required options for creating board in jade
var optionsJade = {
        customBackground: options.customBackground,
        background: options.background,
        tickets: options.tickets,
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

module.exports = {
    jade: optionsJade,
    zoomFactor: zoomFactor,
    webshot: webshot
}
