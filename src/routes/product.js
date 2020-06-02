const Router = require('express').Router()
const { 
    create, getProductById, 
    deleteProductById, 
    updateProductById, 
    listProducts, 
    listRelatedProducts, 
    listCategories, 
    listByFilter,
    listSearched,
    updateProductImageById 
} = require('../controllers/product')

const auth = require('../middleware/auth')
const { isAdmin } = require('../middleware/authorization')
const upload = require('../middleware/multer')

// create product
Router.post('/product/create', auth, isAdmin, upload.single('imageData'), create, (error, req, res, next) => {
 res.status(400).send({ error: error.message })
})


// list categories
Router.get('/product/categories', listCategories)

// get product
Router.get('/product/:id', getProductById)

// remove product
Router.delete('/product/:id', auth, isAdmin, deleteProductById)

// update product details only
Router.patch('/product/:id',  auth, isAdmin, updateProductById)

// update product image only
Router.patch('/product/image/:id', auth, isAdmin, upload.single('imageData'), updateProductImageById, (error, req, res, next) => {
 res.status(400).send({ error: error.message })
})

// get products
Router.get('/products', listProducts)

// get relatedItems
Router.get('/products/related/:id', listRelatedProducts)

// get by filter
Router.post("/products/by/filter", listByFilter)

// get by search
Router.get("/products/search", listSearched)


module.exports = Router