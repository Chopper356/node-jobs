const mongoose = require("mongoose");
const config = require("config");

module.exports = function() {
	mongoose.connect(config.mongo, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	}).then(() => {
		console.log("MongoDB connected");
	}).catch(err => {
		console.log("MongoDB connection error:", err);
	});
}