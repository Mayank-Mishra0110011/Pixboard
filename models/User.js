const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	profilePicture: {
		type: String
	},
	hearts: {
		pix: [
			{
				pix: {
					type: Schema.Types.ObjectId,
					ref: 'pix'
				}
			}
		],
		boards: [
			{
				board: {
					type: Schema.Types.ObjectId,
					ref: 'boards'
				}
			}
		]
	},
	boards: [
		{
			board: {
				type: Schema.Types.ObjectId,
				ref: 'boards'
			}
		}
	],
	followers: [
		{
			follower: {
				type: Schema.Types.ObjectId,
				ref: 'users'
			}
		}
	],
	following: [
		{
			following: {
				type: Schema.Types.ObjectId,
				ref: 'users'
			}
		}
	],
	messagesSent: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users'
			},
			message: {
				type: String,
				required: true
			}
		}
	],
	messagesReceived: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users'
			},
			message: {
				type: String,
				required: true
			}
		}
	],
	profile: {
		location: {
			type: String
		},
		bio: {
			type: String
		},
		social: {
			twitter: {
				type: String
			},
			facebook: {
				type: String
			},
			instagram: {
				type: String
			}
		}
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = User = mongoose.model('users', UserSchema);
