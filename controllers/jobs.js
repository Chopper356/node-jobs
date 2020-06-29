module.exports = {
	getAllJobs(req, res) {
		res.render("jobs", {
			title: "Jobs",
			jobs: [1, 2, 3, 4]
		});
	}
}