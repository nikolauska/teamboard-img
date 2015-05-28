var Validator = require('jsonschema').Validator;
var v = new Validator();

var ticketSchema = {
    'id': '/ticketSchema',
    'type': 'object',
    'properties': {
    	'color': {
    		'type': 'string'
    	},
    	'content': {
    		'type': 'string'
    	},
    	'position': {
    		'type': 'object',
    		'items': {
    			'x': {
    				'type': 'number'
    			},
    			'y': {
    				'type': 'number'
    			}
    		}
    	}
    },
    'required': ['color', 'content', 'position']
};

var board = {
    "id": "/boardRequest",
    "type": "object",
    "properties": {
    	'id': {
    		type: 'string'
    	},
    	'background': {
    		type: 'string'
    	},
    	'customBackground': {
    		'type': 'string'
    	},
    	'tickets': {
    		'type': 'array',
    		'items': {
    			'$ref': '/ticketSchema'
    		}
    	}
    },
    'required': ['background', 'customBackground', 'tickets']
};

function boardf(body) {
	if(typeof body.id == 'undefined') {
		return 'id is not defined on request';
	}
	if(typeof body.background == 'undefined') {
		return 'background not defined on request';
	}
	if(typeof body.customBackground == 'undefined') {
		return 'customBackground not defined on request';
	}
	if(typeof body.tickets == 'undefined') {
		return 'tickets not defined on request';
	}

	return ticketsf(body.tickets);
}

function ticketsf(tickets) {
	for (index = 0; index < tickets.length; ++index) {
		if(typeof tickets[index].color == 'undefined') {
			return 'color is not defined on ticket number:' + index;
		}
		if(typeof tickets[index].content == 'undefined') {
			return 'content is not defined on ticket number:' + index;
		}
		if(typeof tickets[index].position == 'undefined') {
			return 'position is not defined on ticket number:' + index;
		}
		if(typeof tickets[index].position.x == 'undefined') {
			return 'position x is not defined on ticket number:' + index;
		}
		if(typeof tickets[index].position.y == 'undefined') {
			return 'position y is not defined on ticket number:' + index;
		}
	}

	return null;
}

module.exports = function(req, callback) {
	var body = req.body;
	var err = null;

	return callback(boardf(req.body));


	//v.addSchema(ticketSchema, '/ticketSchema');
	//return callback(v.validate(req.body, board));
}