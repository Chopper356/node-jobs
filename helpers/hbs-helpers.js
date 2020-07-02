module.exports = {
	ifeq(a, b, options) {
		if(a == b) {
			return options.fn(this);
		}
		return options.inverse(this);
	},

	ifneq(a, b, options) {
		if(a !== b) {
			return options.fn(this);
		}
		return options.inverse(this);
	}
}