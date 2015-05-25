/**
 * Resolve the 'board_id' URL parameter to a 'board' model.
 */
module.exports.board = function(req, res, next, id) {
	req.resolved    = req.resolved || { }
	req.resolved.id = id;

	return next();
}