const Hirer = require("../models/hirer");
const Executor = require("../models/executor");

module.exports = {
	async pageHirer(req, res) {
		const profile = await Hirer.findById(req.params.id).lean();

		if(!profile) {
			return res.redirect("/");
		}

		res.render("profile", {
			title: "Profile hirer",
			errorEdit: req.flash("errorEdit"),
			profile
		})
	},
	async pageExecutor(req, res) {
		const profile = await Executor.findById(req.params.id).lean();

		if(!profile) {
			return res.redirect("/");
		}

		res.render("profile", {
			title: "Profile executor",
			errorEdit: req.flash("errorEdit"),
			profile
		})
	},
	async renderSettingsPage(req, res) {
		const user = req.session.user

		res.render("edit-profile", {
			title: "Profile",
			user
		})
	},
	async editProfile(req, res) {
		try {
			let User = null;

			if (req.session.user_type == "hirer") User = Hirer;
			if (req.session.user_type == "executor") User = Executor;

			const user = await User.findById(req.session.user._id);

			user.name = req.body.name;
			user.email = req.body.email;
			req.session.user = user;
			await user.save();
		}
		catch(err) {
			console.log(err);
			req.flash("errorEdit", "Edit error");
		}

		res.redirect(`/profile/${req.session.user_type}/${user._id}`);
	}
}