const express = require('express')

const LoginCtrl = require('../controllers/login-ctrl')

const router = express.Router()

router.post('/login', LoginCtrl.login)

module.exports = router