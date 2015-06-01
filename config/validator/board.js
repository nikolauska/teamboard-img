function boardCheck(body) {
    switch('undefined') {
        case typeof body.id:
            return 'id is not defined on request';
        case typeof body.background:
            return 'background not defined on request';
        case typeof body.customBackground:
            return 'customBackground not defined on request';
        case typeof body.tickets:
            return 'tickets not defined on request';
    }

	return ticketsCheck(body.tickets);
}

function ticketsCheck(tickets) {
	for (index = 0; index < tickets.length; ++index) {
        switch('undefined') {
            case typeof tickets[index].color:
                return 'color is not defined on ticket number:' + index;
            case typeof tickets[index].content:
                return 'content is not defined on ticket number:' + index;
            case typeof tickets[index].position:
                return 'position is not defined on ticket number:' + index;
            case typeof tickets[index].position.x:
                return 'position x is not defined on ticket number:' + index;
            case typeof tickets[index].position.y:
                return 'position y is not defined on ticket number:' + index;
        }
	}

	return null;
}

module.exports = function(req, callback) {
	return callback(boardCheck(req.body));
}
