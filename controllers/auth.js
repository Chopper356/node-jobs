const Hirer = require("../models/hirer");
const Executor = require("../models/executor");
const md5 = require("md5");

module.exports = {
	async login(req, res) {
		try {
			const type = req.body.type;
			let User = null;

			if (type == "hirer") User = Hirer;
			if (type == "executor") User = Executor;

			const user = await User.findOne({email: req.body.email, password: md5(req.body.password)});

			if (!user) {
				req.flash("errorLogin", "Email is incorrect.");
				return res.redirect("/auth");
			}

			req.session.user = user;
			req.session.user_type = type;
			req.session.save(err => {
				if(err) {
					throw err
				}
				res.redirect("/");
			});
		}
		catch(err) {
			req.flash("serverError", "Server error. Please try again later.");
			return res.redirect("/auth");
		}
	},
	async register(req, res) {
		try {
			const type = req.body.type;
			let User = null;

			if (type == "hirer") User = Hirer;
			if (type == "executor") User = Executor;

			const user = await User.findOne({email: req.body.email});

			if (user) {
				req.flash("errorRegister", "Email already exists.");
				return res.redirect("/auth");
			}

			if (req.body.password !== req.body.repeat) {
				req.flash("errorRegister", "Password mismatch.");
				return res.redirect("/auth");
			}

			User.create({
				name: req.body.name,
				email: req.body.email,
				password: md5(req.body.password)
			});

			res.redirect("/");
			
		}
		catch(err) {
			req.flash("serverError", "Server error. Please try again later.");
			return res.redirect("/auth");
		}
	},
	logout(req, res) {
		req.session.destroy(function(err) {
			res.redirect("/");
		});
	},
	page(req, res) {
		if(req.session.user) {
			return res.redirect("/");
		}

		res.render("auth", {
			title: "Login and register",
			errorLogin: req.flash("errorLogin"),
			serverError: req.flash("serverError"),
			errorRegister: req.flash("errorRegister")
		});
	}
}