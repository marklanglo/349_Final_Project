const mongoose = require('mongoose')

const CarSchema = new mongoose.Schema(
	{
		carName: { type: String, required: true },
		carPrice: { type: Number, required: true },
		carDescription: { type: String, required: true, unique: true },
		carPicture: { type: String, required: true },

	},
	{ versionKey: false },
	{ collection: 'car' }
)

const model = mongoose.model('CarSchema', CarSchema)

module.exports = model