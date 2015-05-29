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
	return callback(boardf(req.body));
}