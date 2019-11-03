const express = require('express');
const router = express.Router();
const user = require('../models/User');
const passport = require('passport');
const request = require('request');
const cheerio = require('cheerio');

//@route GET search/:page/:q
//@desc GET image search results including profile names that match query
//@access Private
router.get('/:page/:q', passport.authenticate('jwt', { session: false }), (req, res) => {
	user
		.find({ username: new RegExp(req.params.q) }, [
			'username',
			'profilePicture',
			'followers',
			'following',
			'boards'
		])
		.then((users) => {
			getImage(req.params.q, req.params.page)
				.then((data) => {
					res.json({ data: data, users: users });
				})
				.catch((err) => {
					console.log(err);
				});
		});
});

//@route GET search/dashboard/:page/:q
//@desc GET images for the dashboard
//@access Private
router.get('/dashboard/:page/:q', passport.authenticate('jwt', { session: false }), (req, res) => {
	getImage(req.params.q, req.params.page)
		.then((data) => {
			res.json({ data });
		})
		.catch((err) => {
			console.log(err);
		});
});

function getImage(searchQuery, pageIndex) {
	return new Promise((resolve, reject) => {
		request(`https://imgur.com/search/score/all/page/${pageIndex}?scrolled&q=${searchQuery}`, (err, res, html) => {
			if (err) {
				reject(err);
			} else if (res.statusCode == 200) {
				const $ = cheerio.load(html);
				const imgCards = $('.cards').html();
				let imgURLs;
				if (imgCards) {
					imgURLs = imgCards
						.match(/src\s*=\s*"(.+?)"/g)
						.map((url) => 'https:' + url.slice(5, url.length - 4) + 'gif');
				}
				resolve(imgURLs);
			}
		});
	});
}

module.exports = router;
