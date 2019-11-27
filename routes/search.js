const express = require('express');
const router = express.Router();
const user = require('../models/User');
const passport = require('passport');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

//@route GET search/:q
//@desc GET image search results including profile names that match query
//@access Private
router.get('/:q', passport.authenticate('jwt', { session: false }), (req, res) => {
	user
		.find({ username: new RegExp(req.params.q) }, [
			'username',
			'profilePicture',
			'followers',
			'following',
			'boards'
		])
		.then((users) => {
			getImage(req.params.q)
				.then((data) => {
					res.json({ data: data, users: users });
				})
				.catch((err) => {
					console.log(err);
				});
		});
});

//@route GET search/dashboard/:q
//@desc GET images for the dashboard
//@access Private
router.get('/dashboard/:q', passport.authenticate('jwt', { session: false }), (req, res) => {
	getImage(req.params.q)
		.then((data) => {
			res.json({ data });
		})
		.catch((err) => {
			console.log(err);
		});
});

async function getImage(searchQuery) {
	try {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto(`https://pinterest.com/search/pins/?q=${searchQuery}`);
		await autoScroll(page);
		const body = await page.evaluate(() => {
			return document.querySelector('body').innerHTML;
		});
		const $ = cheerio.load(body);
		const imgURLs = [];
		$('img').each(function(i, img) {
			imgURLs.push($(img).attr('src'));
		});
		await browser.close();
		return Promise.resolve(imgURLs);
	} catch (error) {
		console.log(error);
	}
}

async function autoScroll(page) {
	await page.evaluate(async () => {
		await new Promise((resolve, reject) => {
			let totalHeight = 0;
			let distance = 100;
			let timer = setInterval(() => {
				let scrollHeight = 2000;
				window.scrollBy(0, distance);
				totalHeight += distance;
				if (totalHeight >= scrollHeight) {
					clearInterval(timer);
					resolve();
				}
			}, 100);
		});
	});
}

module.exports = router;
