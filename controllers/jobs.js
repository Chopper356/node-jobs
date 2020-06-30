const Job = require("../models/job");
const {validationResult} = require("express-validator");

module.exports = {
	getAllJobs(req, res) {
		Job.find().populate("creator", "name").lean().then(jobs => {
			res.render("jobs", {
				title: "Jobs",
				jobs
			});
		}).catch(err => { 
			res.send("Jobs error");
			console.log(err)
		});
	},

	renderCreatePage(req, res) {
		res.render("create", {
			title: "Create"
		});
	},

	async createJob(req, res) {
		// const errors = validationResult(req);

		// if(!errors.isEmpty()) {
		// 	return res.render("create", {
		// 		title: "Create job",
		// 		data: {
		// 			title: req.body.title,
		// 			description: req.body.description,
		// 			creator: req.session.user._id
		// 		}
		// 	});
		// }


		
		try {
			await Job.create({
				title: req.body.title,
				description: req.body.description,
				creator: req.session.user._id,
				dateCreated: Date.now()
			});
			res.redirect("/jobs");
		}
		catch(err) {
			console.log(err);
		}
	}
}