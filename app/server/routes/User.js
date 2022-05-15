const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		userName: { type: String, required: true, unique: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		phoneNumber: {type: String}
	},
	{ versionKey: false },
	{ collection: 'users' }
)

const model = mongoose.model('UserSchema', UserSchema)

module.exports = model