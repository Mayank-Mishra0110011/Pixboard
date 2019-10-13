const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
	let errors = {};
	data.username = !isEmpty(data.username) ? data.username : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	data.password2 = !isEmpty(data.password2) ? data.password2 : '';
	if (!validator.isLength(data.username, { min: 4, max: 16 })) {
		errors.username = 'Username must be 4 to 16 characters long';
	}
	if (validator.isEmpty(data.username)) {
		errors.username = 'Username field is required';
	}
	if (!validator.isEmail(data.email)) {
		errors.email = 'Email is invalid';
	}
	if (validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
	}
	if (!validator.isLength(data.password, { min: 8, max: 30 })) {
		errors.password = 'Password must be 8 to 30 characters long';
	}
	if (validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}
	if (validator.isEmpty(data.password2)) {
		errors.password2 = 'Confirm Password field is required';
	}
	if (!validator.equals(data.password, data.password2)) {
		errors.password2 = 'Passwords do not match';
	}
	if (!isEmpty(data.twitter)) {
		if (!validator.isURL(data.twitter)) {
			errors.twitter = 'Not a valid URL';
		}
	}
	if (!isEmpty(data.facebook)) {
		if (!validator.isURL(data.facebook)) {
			errors.facebook = 'Not a valid URL';
		}
	}
	if (!isEmpty(data.instagram)) {
		if (!validator.isURL(data.instagram)) {
			errors.instagram = 'Not a valid URL';
		}
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
};
