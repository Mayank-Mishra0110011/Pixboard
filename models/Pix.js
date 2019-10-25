const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PixSchema = new Schema({
	board: {
		type: Schema.Types.ObjectId,
		ref: 'boards'
	},
	title: {
		type: String
	},
	image: {
		type: String,
		required: true
	},
	username: {
		type: String
	},
	profilePicture: {
		type: String
	},
	hearts: [
		{
			type: Schema.Types.ObjectId,
			ref: 'users'
		}
	],
	comments: [
		{
			type: Schema.Types.ObjectId,
			ref: 'comments'
		}
	],
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Pix = mongoose.model('pix', PixSchema);
