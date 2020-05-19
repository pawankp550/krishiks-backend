const router = require('express').Router()
const auth = require('../middleware/auth')
const { isAdmin } = require('../middleware/authorization')

const { addOrderToUserHistory, updateProductQuantity } = require('../middleware/order')
const { createOrder, listAllOrders, listOrderStatuses, changeOrderStatus } = require('../controllers/order')

// create order
router.post('/order/create', auth, addOrderToUserHistory, updateProductQuantity, createOrder)

// list orders
router.get('/order/list', auth, isAdmin, listAllOrders )

// get status enums
router.get('/order/status', auth, isAdmin, listOrderStatuses)

// update order status
router.put('/order/changestatus', auth, isAdmin, changeOrderStatus)

module.exports = router