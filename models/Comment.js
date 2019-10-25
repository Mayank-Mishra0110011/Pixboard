const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	pix: {
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
	comment: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Comment = mongoose.model('comments', CommentSchema);
