const express = require('express')

const { signUpUser, loginUser, emailConfirmation } = require('../controller/AuthController')

const router = express.Router()

router.post('/register', signUpUser)
router.post('/login', loginUser)
router.put('/confirm/:_id', emailConfirmation)




module.exports = router;