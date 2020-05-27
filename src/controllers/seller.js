const Seller = require('../models/seller')
const { errorHandler } = require("../helpers/dbErrorHandlers"); 

exports.create = async (req, res) => {
    const seller = new Seller(req.body)

    try{
        const savedSeller = await seller.save()
        res.status(201).send(savedSeller)
    } catch (err) {
        res.status(409).json({
                error: errorHandler(err)
            });
    }
}

exports.getSellerById = async (req, res) => {
    try{
        const seller = await Seller.findById(req.params.id)

        if (!seller) {
            return  res.status(404).json({
                error: 'could not find seller'
            })
        }
        res.send(seller)
    } catch (err) {
        res.status(500).json({
                error: errorHandler(err)
            });
    }
}

exports.updateSeller = async (req, res) => {
    try{
        const filter = {_id: req.params.id}
        const update = req.body
        const opts = { new: true }

        const seller = await Seller.findOneAndUpdate(filter, update, opts)

        if (!seller) {
            return  res.status(404).json({
                error: 'could not find seller'
            })
        }
        res.send(seller)
    } catch (err) {
        res.status(500).json({
                error: errorHandler(err)
            });
    }
}

exports.deleteSeller = async (req, res) => {
    try{
        const seller = await Seller.findOneAndDelete({ _id: req.params.id })

        if (!seller) {
            return res.status(404).json({
                error: 'could not find seller'
            })
        }

        res.status(200).send(seller)
    } catch (err) {
        res.status(500).json({
                error: errorHandler(err)
            });
    }
}
exports.getSellers = async (req, res) => {
    try {
        const sellers = await Seller.find({})

        if (!sellers) {
            return res.status(404).json({
            error: 'could not find seller'
            })
        }

        res.send(sellers)
    } catch (err) {
        res.status(500).json({
                error: errorHandler(err)
            });
    }
}