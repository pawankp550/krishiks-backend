const router = require('express').Router();
const { signup, signin, signout } = require('../controllers/auth')
const auth = require('../middleware/auth')


// user sign up route
router.post('/signup', signup)

// user sign in route
router.post('/signin', signin)

// user sign out route
router.get('/signout', signout)

router.get('/', (req, res) => {
    res.send('route working')
})

router.get('/middle', auth, (req, res) => {
   const publicProfile = req.user
   console.log(publicProfile)
})


module.exports = router