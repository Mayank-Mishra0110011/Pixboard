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

//@route POST user/profile
//@desc Edit users profile
//@access Private
router.post('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
	const userFields = {};
	if (req.body.username) {
		if (!validator.isLength(req.body.username, { min: 3, max: 8 })) {
			return res.status(400).json({ username: 'Username must be 3 to 8 characters long' });
		}
		userFields.username = req.body.username;
	}
	if (req.body.profilePicture) {
		if (!validator.isURL(req.body.profilePicture)) {
			return res.status(400).json({ profilePicture: 'Invalid Profile Picture' });
		}
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

//@route POST user/register
//@desc register user data
//@access Public
router.post('/register', (req, res) => {
	if (req.body.email) {
		req.body.email = req.body.email.trim().toLowerCase();
	}
	const { errors, isValid } = validateRegisterInput(req.body);
	if (req.body.username) {
		if (!validator.isLength(req.body.username, { min: 3, max: 8 })) {
			errors.username = 'Username must be 3 to 8 characters long';
			return res.status(400).json(errors);
		}
	}
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
	if (req.body.twitter && req.body.twitter.trim().toLowerCase() != '' && validator.isURL(req.body.twitter)) {
		profileFields.social.twitter = req.body.twitter;
	} else {
		profileFields.social.twitter = '';
	}
	if (req.body.facebook && req.body.facebook.trim().toLowerCase() != '' && validator.isURL(req.body.facebook)) {
		profileFields.social.facebook = req.body.facebook;
	} else {
		profileFields.social.facebook = '';
	}
	if (req.body.instagram && req.body.instagram.trim().toLowerCase() != '' && validator.isURL(req.body.instagram)) {
		profileFields.social.instagram = req.body.instagram;
	} else {
		profileFields.social.instagram = '';
	}
	if (!req.body.profilePicture || req.body.profilePicture.trim() == '') {
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
	const email = req.body.email.trim().toLowerCase();
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
					jwt.sign(payload, keys.secretKey, { expiresIn: 86400 }, (err, token) => {
						res.json({
							success: true,
							token: `Bearer ${token}`
						});
					});
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
});

//@route DELETE user/profile
//@desc Delete user and profile
//@access Private
router.delete('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
	user.findOneAndRemove({ _id: req.user.id }).then(() => {
		res.json({ success: true });
	});
});

//@route POST user/message
//@desc Send Message to another user
//@access Private
router.post('/message', passport.authenticate('jwt', { session: false }), (req, res) => {
	if (!req.body.message) {
		res.json({ messageError: 'Message body is required' });
	} else if (req.body.email || req.body.username) {
		if (req.body.message.trim() == '') {
			res.json({ messageError: 'Cannot send an empty message' });
		}
		if (req.body.username) {
			if (req.body.username.trim().toLowerCase() == '') {
				res.json({ messageError: 'Invalid username' });
			}
			user
				.findOne({ username: req.body.username })
				.then((userData) => {
					userData.messagesReceived.push({
						user: req.user._id,
						message: req.body.message
					});
					userData.save().then((data) => {
						user.findOne({ _id: req.user.id }).then((senderData) => {
							senderData.messagesSent.push({
								user: userData.id,
								message: req.body.message
							});
							senderData.save().then(() => {
								res.json({ messageSuceess: 'Message Sent!' });
							});
						});
					});
				})
				.catch(() => {
					res.json({ messageError: 'Invalid username' });
				});
		} else {
			if (req.body.email.trim().toLowerCase() == '') {
				res.json({ messageError: 'Invalid email' });
			}
			user
				.findOne({ email: req.body.email })
				.then((userData) => {
					userData.messagesReceived.push({
						user: req.user._id,
						message: req.body.message
					});
					userData.save().then((data) => {
						user.findOne({ _id: req.user.id }).then((senderData) => {
							senderData.messagesSent.push({
								user: userData.id,
								message: req.body.message
							});
							senderData.save().then(() => {
								res.json({ messageSuceess: 'Message Sent!' });
							});
						});
					});
				})
				.catch(() => {
					res.json({ messageError: 'Invalid email' });
				});
		}
	} else {
		res.json({ messageError: 'Username or Email is required' });
	}
});

//@route GET user/profile/:username
//@desc GET user profile by username
//@access Public
router.get('/profile/user/:username', (req, res) => {
	const errors = {};
	user
		.findOne({ username: req.params.username }, [
			'username',
			'profilePicture',
			'profile',
			'boards',
			'hearts',
			'pix'
		])
		.then((profile) => {
			if (!profile) throw err;
			res.json(profile);
		})
		.catch(() => {
			errors.noProfile = 'Deleted';
			return res.status(400).json(errors);
		});
});

//@route GET user/id/:user_id
//@desc GET user profile by id
//@access Public
router.get('/id/:user_id', (req, res) => {
	const errors = {};
	user
		.findOne({ _id: req.params.user_id }, [
			'username',
			'profilePicture',
			'profile',
			'boards',
			'hearts',
			'pix',
			'messagesSent',
			'messagesReceived',
			'followers',
			'following'
		])
		.then((profile) => {
			if (!profile) throw err;
			res.json(profile);
		})
		.catch(() => {
			errors.noProfile = 'Deleted';
			return res.status(400).json(errors);
		});
});

//@route GET user/profile/all
//@desc GET all user profiles
//@access Public (Testing only)
router.get('/profile/all', (req, res) => {
	const errors = {};
	user
		.find({}, [ 'username', 'profilePicture', 'profile', 'boards', 'hearts', 'pix' ])
		.then((profiles) => {
			if (!profiles) throw err;
			res.json(profiles);
		})
		.catch(() => {
			errors.noProfile = 'Deleted';
			return res.status(400).json(errors);
		});
});

//@route GET user/profile
//@desc GET current users profile
//@access Private
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
	const errors = {};
	user
		.findOne({ _id: req.user.id }, [
			'username',
			'profilePicture',
			'profile',
			'boards',
			'hearts',
			'pix',
			'messages'
		])
		.then((profile) => {
			if (!profile) throw err;
			res.json(profile);
		})
		.catch(() => {
			errors.noProfile = 'Deleted';
			return res.status(400).json(errors);
		});
});

//@route POST user/follow/:user_id
//@desc Follow a user
//@access Private
router.post('/follow/:user_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	user.findOne({ _id: req.user.id }).then((userData) => {
		user
			.findOne({ _id: req.params.user_id })
			.then((followUserData) => {
				if (
					followUserData.followers.filter((userID) => userID.follower._id.toString() == req.user.id).length >
					0
				) {
					// user has already followed this person
					let removeIndex = followUserData.followers
						.map((userID) => {
							return userID.follower._id;
						})
						.indexOf(req.user.id);
					followUserData.followers.splice(removeIndex, 1);
					removeIndex = undefined;
					removeIndex = userData.following
						.map((userID) => {
							return userID.following._id;
						})
						.indexOf(followUserData.id);
					userData.following.splice(removeIndex, 1);
					userData.save().then(() => {
						followUserData.save().then(() => {
							res.json({ success: true });
						});
					});
				} else {
					userData.following.push({ following: followUserData.id });
					followUserData.followers.push({ follower: userData.id });
					userData.save().then(() => {
						followUserData.save().then(() => {
							res.json({ success: true });
						});
					});
				}
			})
			.catch(() => {
				res.json({ followError: 'Invalid User' });
			});
	});
});

module.exports = router;
