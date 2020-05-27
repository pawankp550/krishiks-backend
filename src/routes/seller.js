const Router = require('express').Router()
const { create, getSellerById, updateSeller, deleteSeller, getCategories } = require('../controllers/seller')
const { isAdmin } = require('../middleware/authorization')
const auth = require('../middleware/auth')

Router.post('/seller/create', auth, isAdmin, create)

Router.get('/seller/:id', getSellerById)

Router.put('/seller/:id', auth, isAdmin, updateSeller)

Router.delete('/seller/:id', auth, isAdmin, deleteSeller)

Router.get('/sellers', getCategories)

module.exports = Router