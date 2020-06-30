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
				return res.send("User not found");
			}

			req.session.user = user;
			console.log(req.session.user)
			req.session.save(err => {
				if(err) {
					throw err
				}
				res.redirect("/");
			});
		}
		catch(err) {
			res.send("Server error");
			console.log(err);
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
				return res.send("User already exists");
			}

			if (req.body.password !== req.body.repeat) {
				return res.send("Password mismatch");
			}

			User.create({
				name: req.body.name,
				email: req.body.email,
				password: md5(req.body.password)
			});

			res.redirect("/");
			
		}
		catch(err) {
			res.send("Server error");
			console.log(err);
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

		res.render("auth");
	}
}