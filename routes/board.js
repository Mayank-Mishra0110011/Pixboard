const express = require('express');
const router = express.Router();
const passport = require('passport');
const board = require('../models/Board');
const user = require('../models/User');
const pix = require('../models/Pix');

//@route POST board/create
//@desc Create a new image board
//@access Private
router.post('/create', passport.authenticate('jwt', { session: false }), (req, res) => {
	if (!req.body.title) {
		return res.status(400).json({ title: 'Board needs to have a title' });
	}
	user.findOne({ _id: req.user.id }).then((user) => {
		const newBoard = new Board({
			user: req.user.id,
			title: req.body.title
		});
		newBoard.save().then((board) => {
			user.boards.push(board);
			user.save().then(() => {
				res.json({ board: board });
			});
		});
	});
});

//@route DELETE board/delete/:board_id
//@desc Delete board by id
//@access Private
router.delete('/delete/:board_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	board
		.findOne({ _id: req.params.board_id })
		.then((_board) => {
			for (let i = 0; i < _board.pix.length; i++) {
				pix.findOneAndRemove({ _id: _board.pix[i].pix }).then();
			}
			user.findOne({ _id: _board.user }).then((user) => {
				let userRemoveIndex;
				for (let i = 0; i < user.boards.length; i++) {
					if (user.boards[i].id == req.params.board_id) {
						userRemoveIndex = i;
						break;
					}
				}
				user.boards.splice(userRemoveIndex, 1);
				user.save().then(() => {
					board.findOneAndRemove({ _id: req.params.board_id }).then(() => {
						res.json({ succes: true });
					});
				});
			});
		})
		.catch(() => {
			return res.json({ boardNotFound: 'Board not found' });
		});
});

//@route POST board/heart/:board_id
//@desc like a board
//@access Private
router.post('/heart/:board_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	board
		.findOne({ _id: req.params.board_id })
		.then((foundBoard) => {
			user.findOne({ _id: req.user.id }).then((userData) => {
				if (foundBoard.hearts.filter((heart) => heart.toString() === req.user.id).length > 0) {
					const removeIndex = foundBoard.hearts
						.map((item) => {
							return item.toString();
						})
						.indexOf(req.user.id);
					const userDataRemoveIndex = userData.hearts.boards
						.map((item) => {
							return item.id.toString();
						})
						.indexOf(req.params.board_id);
					userData.hearts.boards.splice(userDataRemoveIndex, 1);
					userData.save().then(() => {
						foundBoard.hearts.splice(removeIndex, 1);
						foundBoard.save().then((foundBoard) => res.json(foundBoard));
					});
				} else {
					userData.hearts.boards.unshift(foundBoard);
					userData.save().then(() => {
						foundBoard.hearts.unshift(userData.id);
						foundBoard.save().then((foundBoard) => res.json(foundBoard));
					});
				}
			});
		})
		.catch(() => {
			res.json({ boardNotFound: 'Board Not Found' });
		});
});

//@route GET board/:board_id
//@desc Get board by id
//@access Public
router.get('/:board_id', (req, res) => {
	board
		.findOne({ _id: req.params.board_id })
		.then((board) => {
			res.json({ board: board });
		})
		.catch(() => {
			return res.json({ boardNotFound: 'Board not found' });
		});
});

//@route GET board/all/boards
//@desc Get all boards
//@access Public
router.get('/all/boards', (req, res) => {
	board
		.find()
		.then((board) => {
			res.json({ board: board });
		})
		.catch(() => {
			return res.json({ boardNotFound: 'Boards not found' });
		});
});

module.exports = router;
