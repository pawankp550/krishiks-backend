const User = require('../models/user')
const Product = require('../models/product')

exports.addOrderToUserHistory = (req, res, next) => {
    let history = []
    try {
        req.body.order.products.forEach((item) => {
            const { _id, name, count, description, category } = item
            history.push({
                _id,
                name,
                count,
                category,
                description,
                transaction_id: req.body.order.transaction_id,
                amount: req.body.order.amount
            })
    
        })
    
        User.findOneAndUpdate(
            { _id:req.user._id },
            { $push: { history } },
            { new: true },
            (error, data) => {
                if (error) {
                    return res.status(400).json({
                        error: "could not update user purchase history"
                    })
                }
    
                next()
            }
        )

    } catch (err) {
        res.status(500).json({error: err})
    }

}

exports.updateProductQuantity = (req, res, next) => { 
    let bulkOps = req.body.order.products.map(item => {
        return {
            updateOne: { 
                filter: { _id: item._id },
                update: { $inc: { quantity: -item.count, sold: +item.count } }
            }
        }
    })

    Product.bulkWrite(bulkOps, {}, (error, products) => {
        if(error) {
            return res.status(400).json({
                error: 'could not update product'
            })
        }
        next()
    })
}
