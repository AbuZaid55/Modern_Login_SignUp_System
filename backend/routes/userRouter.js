const express = require('express')
const router = express.Router()
const auth = require('../auth/auth.js')
const {home, singUp, verifyEmail, logIn, sendResetLink, resentVerificatonCode, changePass} = require('../controller/userController')

router.get('/',auth,home)
router.post('/signUp',singUp)
router.post('/verify_email',verifyEmail)
router.post('/logIn',logIn)
router.post('/sendResetLink',sendResetLink) 
router.post('/resendVerificationCode',resentVerificatonCode)
router.post('/changePass',changePass)

module.exports = router 