const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	pix: {
		type: Schema.Types.ObjectId,
		ref: 'pix'
	},
	parent: {
		type: Schema.Types.ObjectId,
		ref: 'pix'
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
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
	comment: {
		type: String
	},
	replies: [
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

module.exports = Comment = mongoose.model('comments', CommentSchema);
