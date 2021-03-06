const {Schema, model} = require("mongoose");

const Hirer = Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true,
		select: false
	}
}, {
	versionKey: false 
});

module.exports = model("Hirer", Hirer);

