const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
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
    price: {
        type: Number,
        required: true,
        maxlength: 32,
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subcategory: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Category'}],
    quantity: {
        type: Number
    },
    sold: {
            type: Number,
            default: 0
        },
    photo: {
        type: String
    },
    shipping: {
        type: Boolean
    }
},
{ timestamps: true }
)

module.exports = mongoose.model('Product', productSchema)