'use strict';
var Router = require('express').Router();

Router.route('/')
    .get(function(req, res) {
        var version = process.env.VERSION || 'unknown';
        version = {"version":version};
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Authorization, Content-Type, Accept");
        return res.status(200).json(version);
    });

Router.route('/')
    .options(function(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Authorization, Content-Type, Accept");
        return res.status(200).send();
    });

module.exports = Router;
