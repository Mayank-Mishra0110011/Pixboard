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
		return res.json({ commentError: 'Cannot post an empty comment' });
	}
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
			res.json({ pixNotFound: 'Pix Not Found' });
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
			res.json({ pixNotFound: 'Pix Not Found' });
		});
});

//@route POST comment/heart/:comment_id
//@desc like a comment
//@access Private
router.post('/heart/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	comment
		.findOne({ _id: req.params.comment_id })
		.then((commentData) => {
			if (commentData.hearts.filter((heart) => heart.toString() === req.user.id).length > 0) {
				const removeIndex = commentData.hearts
					.map((item) => {
						return item.toString();
					})
					.indexOf(req.user.id);
				commentData.hearts.splice(removeIndex, 1);
			} else {
				commentData.hearts.unshift(req.user.id);
			}
			commentData.save().then(() => {
				res.json(commentData);
			});
		})
		.catch(() => res.json({ commentNotFound: 'Comment Not Found' }));
});

//@route POST comment/reply/:comment_id
//@desc reply to a comment
//@access Private
router.post('/reply/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	if (!req.body.reply || req.body.reply.trim().length == 0) {
		return res.json({ replyError: 'Cannot post an empty reply' });
	}
	comment
		.findOne({ _id: req.params.comment_id })
		.then((commentData) => {
			const reply = new Comment({
				pix: commentData.pix,
				parent: commentData.id,
				user: req.user.id,
				username: req.user.username,
				profilePicture: req.user.profilePicture,
				comment: req.body.reply
			});
			reply.save().then((replyData) => {
				commentData.replies.unshift(replyData.id);
				commentData.save().then((commentData) => {
					res.json({ commentData: commentData });
				});
			});
		})
		.catch(() => {
			res.json({ commentNotFound: 'Comment Not Found' });
		});
});

//@route GET comment/all/comments
//@desc Get all comments (dev route)
//@access Public
router.get('/all/comments', (req, res) => {
	comment
		.find({})
		.then((commentData) => {
			res.json(commentData);
		})
		.catch(() => {
			res.json({ noCommentsExist: 'No Comments Exist' });
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
		.catch(() => res.json({ commentNotFound: 'Comment Not Found' }));
});

module.exports = router;
