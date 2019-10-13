const express = require('express');
const router = express.Router();
const passport = require('passport');
const board = require('../models/Board');
const pix = require('../models/Pix');
const user = require('../models/User');

//@route POST pix/upload/:board_id
//@desc Post pix to a board
//@access Private
router.post('/upload/:board_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	if (!req.body.image) {
		return res.status(400).json({ image: 'Pix should be an image or an image url' });
	}
	board
		.findOne({ _id: req.params.board_id })
		.populate('user', [ 'username', 'profilePicture' ])
		.then((board) => {
			const newPix = new Pix({
				board: board.id,
				image: req.body.image,
				username: board.user.username,
				profilePicture: board.user.profilePicture
			});
			if (req.body.title) {
				newPix.title = req.body.title;
			}
			if (req.body.description) {
				newPix.description = req.body.description;
			}
			newPix.save().then((pix) => {
				board.pix.push({ pix: pix._id });
				board.save().then(() => {
					res.json({ pix: pix });
				});
			});
		})
		.catch(() => {
			return res.json({ boardNotFound: 'Board Not Found' });
		});
});

//@route POST pix/heart/:pix_id
//@desc like a pix
//@access Private
router.post('/heart/:pix_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	pix
		.findOne({ _id: req.params.pix_id })
		.then((foundPix) => {
			user.findOne({ _id: req.user.id }).then((userData) => {
				if (foundPix.hearts.filter((heart) => heart.toString() === req.user.id).length > 0) {
					const removeIndex = foundPix.hearts
						.map((item) => {
							return item.toString();
						})
						.indexOf(req.user.id);
					const userDataRemoveIndex = userData.hearts.pix
						.map((item) => {
							return item.id.toString();
						})
						.indexOf(req.params.pix_id);
					userData.hearts.pix.splice(userDataRemoveIndex, 1);
					userData.save().then(() => {
						foundPix.hearts.splice(removeIndex, 1);
						foundPix.save().then((foundPix) => res.json(foundPix));
					});
				} else {
					userData.hearts.pix.unshift(foundPix);
					userData.save().then(() => {
						foundPix.hearts.unshift(userData.id);
						foundPix.save().then((foundPix) => res.json(foundPix));
					});
				}
			});
		})
		.catch(() => {
			res.json({ pixNotFound: 'Pix Not Found' });
		});
});

//@route DELETE pix/delete/:pix_id
//@desc Delete pix
//@access Private
router.delete('/delete/:pix_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	pix
		.findOneAndRemove({ _id: req.params.pix_id })
		.then((pix) => {
			board.findOne({ _id: pix.board }).then((board) => {
				let removeIndex;
				for (let i = 0; i < board.pix.length; i++) {
					if (board.pix[i].pix.toString() == pix._id.toString()) {
						removeIndex = i;
						break;
					}
				}
				board.pix.splice(removeIndex, 1);
				board.save().then(() => {
					res.json({ success: true });
				});
			});
		})
		.catch(() => {
			return res.json({ pixNotFound: 'Pix Not Found' });
		});
});

//@route GET pix/:pix_id
//@desc Get pix by id
//@access Public
router.get('/:pix_id', (req, res) => {
	pix
		.findOne({ _id: req.params.pix_id })
		.then((pix) => {
			res.json({ pix: pix });
		})
		.catch(() => {
			return res.status(400).json({ pixNotFound: 'Pix Not Found' });
		});
});

//@route GET pix/all/pix
//@desc Get all pix
//@access Public
router.get('/all/pix', (req, res) => {
	pix
		.find()
		.then((pix) => {
			res.json({ pix: pix });
		})
		.catch(() => {
			return res.status(400).json({ pixNotFound: 'Pix Not Found' });
		});
});

module.exports = router;
