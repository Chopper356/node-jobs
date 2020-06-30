const {Schema, model} = require("mongoose");
const Hirer = require("./hirer");

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
		type: Schema.Types.ObjectId,
		ref: "Hirer",
		required: false
	},
	dateCreated: {
		type: Date,
		default: Date.now()
	}
});

module.exports = model("Job", Job);