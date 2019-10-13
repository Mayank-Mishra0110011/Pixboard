const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const user = require('./routes/user');
const board = require('./routes/board');
const pix = require('./routes/pix');
const comment = require('./routes/comment');
const path = require('path');
const app = express();
const db = require('./config/keys').mongoURI;

mongoose.set('useFindAndModify', false);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((err) => {
		console.log(err);
	});

app.use(passport.initialize());

require('./config/passport')(passport);

app.use('/user', user);

app.use('/board', board);

app.use('/pix', pix);

app.use('/comment', comment);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server Running on port ${port}`);
});
