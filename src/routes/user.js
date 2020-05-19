const router = require('express').Router()
const auth = require('../middleware/auth')
const { isUser, isAdmin, isUserOrAdmin } = require('../middleware/authorization')
const { getUserByid, updateUser, getOrdersByid } = require('../controllers/user')


// get user by id
router.get('/users/:id', auth, isUserOrAdmin, getUserByid)

// update user profile
router.put('/users/:id', auth, isUserOrAdmin, updateUser)

// get order details
router.post('/users/order/details', auth, getOrdersByid)


module.exports = router
