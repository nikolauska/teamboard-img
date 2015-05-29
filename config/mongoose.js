'use strict';

var mongoose = require('mongoose');
var mongooseFs = require('mongoose-fs');

var boardSchema = require('./schemas/image');

boardSchema.plugin(mongooseFs, {keys: ['content', 'complement'], mongoose: mongoose});
mongoose.model('image', boardSchema);

module.exports = mongoose;
