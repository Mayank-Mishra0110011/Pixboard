const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/User');
const keys = require('../config/keys');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const validator = require('validator');

//@route POST user/register
//@desc Register user
//@access Public
router.post('/register', (req, res) => {
	if (req.body.email) {
		req.body.email = req.body.email.toLowerCase();
	}
	const { errors, isValid } = validateRegisterInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}
	const profileFields = {};
	if (req.body.location) {
		profileFields.location = req.body.location;
	} else {
		profileFields.location = '';
	}
	if (req.body.bio) {
		profileFields.bio = req.body.bio;
	} else {
		profileFields.bio = '';
	}
	profileFields.social = {};
	if (req.body.twitter) {
		profileFields.social.twitter = req.body.twitter;
	} else {
		profileFields.social.twitter = '';
	}
	if (req.body.facebook) {
		profileFields.social.facebook = req.body.facebook;
	} else {
		profileFields.social.facebook = '';
	}
	if (req.body.instagram) {
		profileFields.social.instagram = req.body.instagram;
	} else {
		profileFields.social.instagram = '';
	}
	if (!req.body.profilePicture) {
		req.body.profilePicture =
			'https://www.cmcaindia.org/wp-content/uploads/2015/11/default-profile-picture-gmail-2.png';
	}
	user.findOne({ username: req.body.username }).then((username) => {
		if (username) {
			errors.username = 'Username already taken';
			return res.status(400).json(errors);
		} else {
			user.findOne({ email: req.body.email }).then((user) => {
				if (user) {
					errors.email = 'Email already exists';
					return res.status(400).json(errors);
				} else {
					const newUser = new User({
						username: req.body.username,
						email: req.body.email,
						profilePicture: req.body.profilePicture,
						password: req.body.password,
						profile: profileFields
					});
					bcrypt.genSalt(10, (err, salt) => {
						bcrypt.hash(newUser.password, salt, (err, hash) => {
							if (err) throw err;
							newUser.password = hash;
							newUser.save().then((user) => {
								res.json(user);
							});
						});
					});
				}
			});
		}
	});
});

//@route POST user/login
//@desc User login / Return jwt token
//@access Public
router.post('/login', (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}
	const password = req.body.password;
	if (req.body.username) {
		const username = req.body.username;
		user
			.findOne({ username })
			.then((user) => {
				if (!user) {
					throw err;
				}
				bcrypt.compare(password, user.password).then((isEqual) => {
					if (isEqual) {
						const payload = {
							id: user.id,
							username: user.username,
							profilePicture: user.profilePicture
						};
						if (req.body.remember) {
							jwt.sign(payload, keys.secretKey, (err, token) => {
								res.json({
									success: true,
									token: `Bearer ${token}`
								});
							});
						} else {
							jwt.sign(payload, keys.secretKey, { expiresIn: 86400 }, (err, token) => {
								res.json({
									success: true,
									token: `Bearer ${token}`
								});
							});
						}
					} else {
						errors.password = 'Password Incorrect';
						return res.status(400).json(errors);
					}
				});
			})
			.catch(() => {
				errors.user = 'User not found';
				res.status(404).json(errors);
			});
	} else {
		const email = req.body.email;
		user
			.findOne({ email })
			.then((user) => {
				if (!user) {
					throw err;
				}
				bcrypt.compare(password, user.password).then((isEqual) => {
					if (isEqual) {
						const payload = {
							id: user.id,
							username: user.username,
							profilePicture: user.profilePicture
						};
						if (req.body.remember) {
							jwt.sign(payload, keys.secretKey, (err, token) => {
								res.json({
									success: true,
									token: `Bearer ${token}`
								});
							});
						} else {
							jwt.sign(payload, keys.secretKey, { expiresIn: 86400 }, (err, token) => {
								res.json({
									success: true,
									token: `Bearer ${token}`
								});
							});
						}
					} else {
						errors.password = 'Password Incorrect';
						return res.status(400).json(errors);
					}
				});
			})
			.catch(() => {
				errors.email = 'Email not found';
				res.status(404).json(errors);
			});
	}
});

//@route DELETE user/profile
//@desc Delete user and profile
//@access Private
router.delete('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
	user.findOneAndRemove({ _id: req.user.id }).then(() => {
		res.json({ success: true });
	});
});

//@route POST user/profile
//@desc Edit users profile
//@access Private
router.post('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
	const userFields = {};
	if (req.body.username) {
		if (!validator.isLength(req.body.username, { min: 4, max: 16 })) {
			return res.status(400).json({ username: 'Username must be 4 to 16 characters long' });
		}
		userFields.username = req.body.username;
	}
	if (req.body.profilePicture) {
		userFields.profilePicture = req.body.profilePicture;
	}
	user.findOne({ _id: req.user.id }).then((data) => {
		userFields.profile = data.profile;
		if (req.body.location) {
			userFields.profile.location = req.body.location;
		}
		if (req.body.bio) {
			userFields.profile.bio = req.body.bio;
		}
		if (req.body.twitter) {
			userFields.profile.social.twitter = req.body.twitter;
		}
		if (req.body.facebook) {
			userFields.profile.social.facebook = req.body.facebook;
		}
		if (req.body.instagram) {
			userFields.profile.social.instagram = req.body.instagram;
		}
		if (req.body.username) {
			user.findOne({ username: req.body.username }).then((username) => {
				if (username) {
					return res.status(400).json({ username: 'Username already taken' });
				} else {
					user.findOneAndUpdate({ _id: req.user.id }, { $set: userFields }, { new: true }).then((data) => {
						res.json(data);
					});
				}
			});
		} else {
			user.findOneAndUpdate({ _id: req.user.id }, { $set: userFields }, { new: true }).then((data) => {
				res.json(data);
			});
		}
	});
});

//@route GET user/profile/:username
//@desc GET user profile by username
//@access Public
router.get('/profile/user/:username', (req, res) => {
	const errors = {};
	user
		.findOne({ username: req.params.username }, [ 'username', 'profilePicture', 'profile' ])
		.then((profile) => {
			if (!profile) throw err;
			res.json(profile);
		})
		.catch(() => {
			errors.noProfile = 'There is no profile for this user';
			return res.status(400).json(errors);
		});
});

//@route GET user/profile/all
//@desc GET all user profiles
//@access Public
router.get('/profile/all', (req, res) => {
	const errors = {};
	user
		.find({}, [ 'username', 'profilePicture', 'profile', 'boards', 'hearts' ])
		.then((profiles) => {
			if (!profiles) throw err;
			res.json(profiles);
		})
		.catch(() => {
			errors.noProfile = 'There are no profiles';
			return res.status(400).json(errors);
		});
});

//@route GET user/profile
//@desc GET current users profile
//@access Private
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
	const errors = {};
	user
		.findOne({ _id: req.user.id }, [ 'username', 'profilePicture', 'profile', 'boards' ])
		.then((profile) => {
			if (!profile) throw err;
			res.json(profile);
		})
		.catch(() => {
			errors.noProfile = 'There is no profile of the user';
			return res.status(400).json(errors);
		});
});

module.exports = router;
