'use strict';

var mongoose = require('mongoose');

mongoose.model('image', require('./schemas/image'));

module.exports = mongoose;
