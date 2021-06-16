const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Guest = new Schema(
    {
        forename: { type: String, required: true },
        surname: { type: String, required: true },
        guestGroupID: { type: Number, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('guests', Guest)