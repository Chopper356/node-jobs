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
	},
	ifeqid(a, b, options) {
		if(a.toString() == b.toString()) {
			return options.fn(this);
		}
		return options.inverse(this);
	},
	ifeqeq(a, b, c, d, options) {
		if(a == b && c == d) {
			return options.fn(this);
		}
		return options.inverse(this);
	},
	ifeqin(a, b, c, d, options) {
		if(a == b || c == d) {
			return options.fn(this);
		}
		return options.inverse(this);
	},
}