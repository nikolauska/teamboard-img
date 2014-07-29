'use strict';


var app  = require('./server');
var port = process.env.PORT || 9003;

return app.listen(port, function() {
	console.log('server listening at:', port);
});
