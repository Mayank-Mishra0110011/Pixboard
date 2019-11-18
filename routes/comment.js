const express = require('express');
const router = express.Router();
const passport = require('passport');
const pix = require('../models/Pix');
const comment = require('../models/Comment');

//@route POST comment/:pix_id
//@desc Post comment on a pix
//@access Private
router.post('/:pix_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	if (!req.body.comment || req.body.comment.trim().length == 0) {
		return res.status(400).json({ comment: 'Cannot post an empty comment' });
	}
	if (req.params.pix_id == 'none') {
		const newPix = new Pix({
			board: '5dcc618d1a1e3f2e4e2d0937',
			image: req.body.image,
			username: '',
			profilePicture: ''
		});
		newPix.save().then((newPixData) => {
			pix
				.findOne({ _id: newPixData._id })
				.then((pixData) => {
					const userComment = new Comment({
						pix: pixData.id,
						user: req.user.id,
						username: req.user.username,
						profilePicture: req.user.profilePicture,
						comment: req.body.comment
					});
					userComment.save().then((commentData) => {
						pixData.comments.unshift(commentData);
						pixData.save().then(() => res.json({ success: true }));
					});
				})
				.catch(() => {
					res.json({ pixNotFound: 'Deleted' });
				});
		});
	} else {
		pix
			.findOne({ _id: req.params.pix_id })
			.then((pixData) => {
				const userComment = new Comment({
					pix: pixData.id,
					user: req.user.id,
					username: req.user.username,
					profilePicture: req.user.profilePicture,
					comment: req.body.comment
				});
				userComment.save().then((commentData) => {
					pixData.comments.unshift(commentData);
					pixData.save().then(() => res.json({ success: true }));
				});
			})
			.catch(() => {
				res.json({ pixNotFound: 'Deleted' });
			});
	}
});

//@route POST comment/edit/:comment_id
//@desc Edit a comment
//@access Private
router.post('/edit/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	if (!req.body.comment || req.body.comment.trim().length == 0) {
		return res.json({ commentError: 'Cannot post an empty comment' });
	}
	const commentData = req.body.comment;
	comment
		.findOneAndUpdate({ _id: req.params.comment_id }, { $set: { comment: commentData } }, { new: true })
		.then((data) => {
			res.json(data);
		})
		.catch(() => {
			res.json({ commentNotFound: 'Deleted' });
		});
});

//@route GET comment/:pix_id
//@desc Get all comments on a post
//@access Public
router.get('/:pix_id', (req, res) => {
	comment
		.find({ pix: req.params.pix_id })
		.then((commentData) => {
			res.json(commentData);
		})
		.catch(() => {
			res.json({ pixNotFound: 'Deleted' });
		});
});

//@route GET comment/all/comments
//@desc Get all comments (Testing only)
//@access Public
router.get('/all/comments', (req, res) => {
	comment
		.find({})
		.then((commentData) => {
			res.json(commentData);
		})
		.catch(() => {
			res.json({ noCommentsExist: 'Deleted' });
		});
});

//@route DELETE comment/:comment_id
//@desc Delete a comment
//@access Private
router.delete('/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	comment
		.findOneAndRemove({ _id: req.params.comment_id })
		.then(() => {
			res.json({ success: true });
		})
		.catch(() => res.json({ commentNotFound: 'Deleted' }));
});

module.exports = router;
