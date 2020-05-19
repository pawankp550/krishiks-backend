const Router = require('express').Router()
const { create, getCategoryById, updateCategory, deleteCategory, getCategories } = require('../controllers/category')
const { isAdmin } = require('../middleware/authorization')
const auth = require('../middleware/auth')

Router.post('/category/create', auth, isAdmin, create)

Router.get('/category/:id', getCategoryById)

Router.put('/category/:id', auth, isAdmin, updateCategory)

Router.delete('/category/:id', auth, isAdmin, deleteCategory)

Router.get('/category', getCategories)

module.exports = Router