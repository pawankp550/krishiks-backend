const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sellerSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        unique: true,
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
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
        trim: true
    }
},
{ timestamps: true }
)
const Seller = mongoose.model('Seller', sellerSchema)
module.exports = Seller