var http		=	require('http');
var fs			=	require('fs');
var express 	=	require('express');
var bodyParser 	=	require('body-parser');

var utils		=	require('./utils');

var app 		=	express();
var Router 		=	express.Router();
var options 	=	[];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8888;

Router.get('/webshot/board', function(req, res, options) {
	var options = {
		'background': req.background,
		'customBackground': req.customBackground,
		'ticket':  {
			'position': {  
				'x':    req.ticket.position.x,
				'y':	req.ticket.position.y
				} 
			}
		};
	res.attachment('Board.png').send(200, utils.export.generateImage(options)); //res.json({message: 'Return image here'});
});

app.use(express.static(__dirname + '/config/image/img'),router);
app.listen(port);
console.log("Listening to port: " + port);

module.exports = Router;
