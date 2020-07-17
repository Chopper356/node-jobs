const {Schema, model} = require("mongoose");

const Comment = new Schema({
	creator: {
		type : Schema.Types.ObjectId,
		ref: "Executor",
		required: true
	},
	message: {
		type : String,
		required: true
	},
	job: {
		type: Schema.Types.ObjectId,
		ref: "Job",
		required: true
	},
	status: {
		type: String,
		enum: ["waiting", "accepted", "refused", "completed"],
		default: "waiting"
	},
	dateCreated: {
		type: Date,
		default: Date.now()
	}
}, {
	versionKey: false 
});

module.exports = model("Comment", Comment);