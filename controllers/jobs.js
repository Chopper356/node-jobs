const Job = require("../models/job");

module.exports = {
	getAllJobs(req, res) {
		res.render("jobs", {
			title: "Jobs",
			jobs: [1, 2, 3, 4]
		});
	},

	createJob(req, res) {
		Job.create({
			title: "Test title",
			description: "Test description",
			creator: "Nikita"
		})

		res.send("OK!")
	}
}