const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartItemSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    name: String,
    price: String,
    count: Number,
    photo: String
},
{ timestamps: true }
);

exports.CartItem = mongoose.model("CartItem", cartItemSchema)

const OrderSchema = new Schema({
    products: [cartItemSchema],
    transaction_id: {},
    amount: Number,
    updatedAt: Date,
    address: String,
    paymentStatus: String,
    paymentType: String,
    status: {
        type: String,
        default: "Not processed",
        enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"]
    },
   user: {type: mongoose.Schema.Types.ObjectId,
        ref: 'User'} 
    },
{ timestamps: true }
);

exports.Order = mongoose.model("Order", OrderSchema)
