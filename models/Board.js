const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	title: {
		type: String,
		required: true
	},
	hearts: [
		{
			type: Schema.Types.ObjectId,
			ref: 'users'
		}
	],
	pix: [
		{
			pix: {
				type: Schema.Types.ObjectId,
				ref: 'pix'
			}
		}
	],
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Board = mongoose.model('boards', BoardSchema);
