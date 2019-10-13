const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
	let errors = {};
	if (data.username) {
		data.username = !isEmpty(data.username) ? data.username : '';
		if (validator.isEmpty(data.username)) {
			errors.username = 'Email or Username required';
		}
	} else {
		data.email = !isEmpty(data.email) ? data.email : '';
		if (!validator.isEmail(data.email)) {
			errors.email = 'Email is invalid';
		}
		if (validator.isEmpty(data.email)) {
			errors.email = 'Email or Username required';
		}
	}
	data.password = !isEmpty(data.password) ? data.password : '';
	if (validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
};
