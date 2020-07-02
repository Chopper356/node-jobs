const Job = require("../models/job");

// function creator(req, res) {
// 	const job = Job.findById(req.params.id);
// }

module.exports = (req, res, next) => {
	if (req.session.user_type != "hirer") {
		return res.redirect("/jobs");
	}

	next();
}