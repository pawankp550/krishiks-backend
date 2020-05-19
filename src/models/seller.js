const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sellerSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    phone: {
        type: Number,
        trim: true
    }
},
{ timestamps: true }
)

module.exports = mongoose.model('Seller', sellerSchema)