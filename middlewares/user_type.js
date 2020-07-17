const Job = require("../models/job");

module.exports = (access_type) => {
	return (req, res, next) => {
		if(req.session.user_type != access_type) {
			return res.redirect("/");
		}

		next();
	}
}