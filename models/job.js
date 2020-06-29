const {Schema, model} = require("mongoose");

const Job = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	creator: {
		type: String,
		required: false
	},
	dateCreated: {
		type: Date,
		default: Date.now()
	}
});

module.exports = model("Job", Job);