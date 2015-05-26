'use strict';

var path = __dirname + '/';

function getBackgroundPath(bg) {
	switch(bg) {
		case 'PLAY': 
			return path + 'bg/play.png';
		case 'SWOT': 
			return path + 'bg/swot.png';
		case 'SCRUM':
			return path + 'bg/scrum.png';
		case 'KANBAN':
			return path + 'bg/kanban.png';
		case 'KEEP_DROP_TRY':
			return path + 'bg/keep_drop_try.png';
		case 'CUSTOMER_JOURNEY_MAP':
			return path + 'customer_journey_map.png';
		case 'BUSINESS_MODEL_CANVAS':
			return path + 'business_model_canvas.png';
	};
}

module.exports = {
	getBackgroundPath: getBackgroundPath
};