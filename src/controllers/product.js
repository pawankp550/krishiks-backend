const Product = require('../models/product')
const { errorHandler } = require("../helpers/dbErrorHandlers"); 

const cloudinary = require("cloudinary")

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

exports.create = async (req, res) => {
    try {
         cloudinary.v2.uploader.upload(req.file.path, async function(err, result) {
        if (err) {
            return res.status(500).json({
            error: errorHandler(err)
        });
        }

        const productObj = {
            ...req.body,
            photo: result.secure_url
        }

        try {
            const product = new Product(productObj)
                const savedProduct = await product.save()
                if(!savedProduct){
                        return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                    res.status(200).send(savedProduct)
        } catch (err) {
            res.status(500).json({
            error: errorHandler(err)
        });
        }   
    })
    } catch(err) {
         res.status(500).json({
            error: errorHandler(err)
        });
    }
}

// update product details without image
exports.updateProductById = async (req, res) => {
    console.log(req.params.id)
    console.log(req.body)
    try {
        const filter = {_id: req.params.id}
        const update = req.body
        const opts = { new: true }

        const product = await Product.findOneAndUpdate(filter, update, opts)

        if (!product) {
            res.status(404).json({
                error: 'could not find product'
            })
        }
        res.send(product)
    } catch (err) {
            res.status(500).json({
            error: 'could not update'
        });
    } 
}

// update product image without details
exports.updateProductImageById = async (req, res) => {
    console.log('in updateProductImageById')

    try {
        cloudinary.v2.uploader.upload(req.file.path, async function(err, result) {
        if (err) {
            return res.status(500).json({
            error: errorHandler(err)
        });
        }
        console.log(result)
        const filter = {_id: req.params.id}
        const update = {photo: result.secure_url}
        const opts = { new: true }

        const product = await Product.findOneAndUpdate(filter, update, opts)

        if (!product) {
            res.status(404).json({
                error: 'could not find product'
            })
        }
        res.send(product)
    })
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

exports.getProductById = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id).populate("category")

        if(!product){
            return res.status(404).json({
            error: 'coud not find product'
        })
        }
        res.send(product)
    } catch (err) {
        res.status(500).json({
                error: errorHandler(err)
            });
    }
}

exports.deleteProductById = async (req, res) => {
    try{
        const product = await Product.findOneAndDelete({_id: req.params.id})

        if(!product){
            return res.status(404).json({
            error: 'coud not find product'
        })
        }
        res.send({
            message: 'item deleted successfully'
        })
    } catch (err) {
        res.status(500).json({
                error: errorHandler(err)
            });
    }
}

exports.listProducts =  async (req, res) => {
    try{
        const sortType = req.query.sortType ? req.query.sortType : 'desc'
        const sortBy = req.query.sortBy ? req.query.sortBy : 'sold'
        const limit = req.query.limit ? parseInt(req.query.limit) : 10

        const products = await Product.find().populate("category seller").limit(limit).sort([[sortBy, sortType]]).exec()

        if (!products) {
            return res.status(404).json({
                error: errorHandler(err)
            });
        }

        res.send(products)
    } catch (err) {
        res.status(500).json({
                error: errorHandler(err)
            });
    }
}

exports.listRelatedProducts = async (req, res) => {
    try{
        const sortType = req.query.sortType ? req.query.sortType : 'desc'
        const sortBy = req.query.sortBy ? req.query.sortBy : 'sold'
        const limit = req.query.limit ? parseInt(req.query.limit) : 10

        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(400).send({ error: 'no product with id found' })
        }

        const relatedProducts = await Product.find({ _id: { $ne: req.params.id }, category : product.category })
        .limit(limit).sort([[sortBy, sortType]]).exec()

        if (!relatedProducts) {
            return res.status(400).send({ error: 'no related products found' })
        }

        res.send(relatedProducts)

    } catch (err) {
        res.status(500).json({
                error: errorHandler(err)
            });
    }
}

exports.listCategories = async (req, res) => {
    try {
        const categories = await Product.distinct('category')

        if(!categories) {
            return res.status(404).send({ error: 'no categories found' })
        }

        res.send(categories)
    } catch (err) {
        res.status(500).json({
                error: errorHandler(err)
            });
    }
}


exports.listByFilter = async (req, res) => {
    let order = req.query.order ? req.query.order : "desc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;
    let skip = parseInt(req.query.skip);
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);
    try{
         for (let key in req.body.filters) {
            if (req.body.filters[key].length > 0) {
                if (key === "price") {
                    // gte -  greater than price [0-10]
                    // lte - less than
                    findArgs[key] = {
                        $gte: req.body.filters[key][0],
                        $lte: req.body.filters[key][1]
                    };
                } else {
                    findArgs[key] = req.body.filters[key];
                }
            }
    }
    const products = await Product.find(findArgs)
        .populate("category seller")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec()

    if(!products) {
        return res.status(404).send({ error: 'products not found' })
    }

    res.json({
        size: products.length,
        products
    });
    } catch (err) {
        res.status(500).json({
                error: errorHandler(err)
            });
    }

}

exports.listSearched = async (req, res) => {
    const query = {}
    try {
        if (req.query.name) {
            query.name = { $regex: req.query.name, $options: 'i' }
            if(req.query.category) {
                query.category = req.query.category            
            }
        }
    
        const products = await Product.find(query)
        .populate("category")
        .exec()
    
        if(!products) {
            return res.status(404).send({ error: 'products not found' })
        }
        res.status(200).send(products)

    } catch(err) {
        res.status(500).json({
                error: errorHandler(err)
            });
    }
}
