const Job = require("../models/job");
const {validationResult} = require("express-validator");

module.exports = {
	getAllJobs(req, res) {
		Job.find().populate("creator", "name").lean().then(jobs => {
			res.render("jobs", {
				title: "Jobs",
				jobsError: req.flash("jobsError"),
				errorCreateJob: req.flash("errorCreateJob"),
				errorJob: req.flash("errorJob"),
				jobs
			});
		}).catch(err => { 
			res.flash("jobsError", "Error render jobs");
			return res.redirect("/jobs");
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
			req.flash("errorCreateJob", "Job create error");
			return res.redirect("/jobs");
		}
	},

	async renderJobPage(req, res) {
		try {
			const job = await Job.findById(req.params.id).populate("creator", "name").lean();
			res.render("job", {
				title: `Job: ${Job.title}`,
				errorEdit: req.flash("errorEdit"),
				job
			});
		}
		catch(err) {
			req.flash("errorJob", "Render job page error");
			return res.redirect("/jobs");
		}
	},

	async renderEditPage(req, res) {
		try {
			const job = await Job.findById(req.params.id).lean();
			res.render("edit-job", {
				title: "Edit job",
				job
			});
		}
		catch(err) {
			req.flash("errorEdit", "Render edit page error");
			return res.redirect("/jobs");
		}
	},

	async editJob(req, res) {
		const {_id} = req.body;

		try {
			const job = await Job.findById(_id);

			Object.assign(job, req.body)
			await job.save();

			res.redirect("/jobs");
		}
		catch(err) {
			req.flash("errorEdit", "Edit error");
			return res.redirect("/jobs");
		}
	}
}