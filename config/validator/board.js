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

module.exports = function(req, callback) {
	var body = req.body;

	v.addSchema(ticketSchema, '/ticketsSchema');
	console.log(v.validate(req.body, board));
	return callback(v.validate(req.body, board));
}