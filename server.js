var http		=	 require('http');
var fs			=	 require('fs');
var express 	=	 require('express');
var bodyParser 	=	 require('body-parser');

var utils      = require('./utils');
var config     = require('./config');

var app = express();
var router = express.Router();
var exports = module.exports = {};
var options = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8888;

router.get('/webshot/board', function(req, res, options) {
	var options {
		'background': req.background,
		'customBackground': req.customBackground,
		'board': req.board.id,
		'ticket':  {
		'position': {  
		'x':    req.ticket.position.x,
		'y':	req.ticket.position.y
				} 
			}
		}

	//res.json({message: 'Return image here'});
	res.sendfile(__dirname + "/config/image/img/bg/"); //req.board_id
});

app.use(express.static(__dirname + '/config/image/img'),router);

app.listen(port);
console.log("Listening to port: " + port);