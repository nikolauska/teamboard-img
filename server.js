var http		=	 require('http');
var fs			=	 require('fs');
var express 	=	 require('express');
var bodyParser 	=	 require('body-parser');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8888;

router.get('/webshot', function(req, res) {
	res.json({message: 'Return image here'});
	//res.sendfile(__dirname + "/config/image/img/:shotid");
});

app.use(express.static(__dirname + '/config/image/img'),router);

app.listen(port);
console.log("Listening to port: " + port);