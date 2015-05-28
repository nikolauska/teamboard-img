'use strict';

var app    = require('express')();
var bodyParser = require('body-parser');
var config = require('../config');

if(process.env.NODE_ENV == 'development') {
	app.use(require('morgan')({ format: 'dev' }));
}

app.set('json spaces', 2);

app.use(bodyParser.urlencoded({ 'limit': '1000kb', 'extended': true }));
app.use(bodyParser.json());
app.use(require('method-override')());

module.exports = app;
