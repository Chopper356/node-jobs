module.exports = function(req, res, next) {
	if(req.session.user) {
		res.locals.user = req.session.user;
		res.locals.user_type = req.session.user_type;
	}

	next();
}