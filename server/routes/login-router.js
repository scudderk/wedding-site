const express = require('express')

const LoginCtrl = require('../controllers/login-ctrl')

const router = express.Router()

router.post('/login', LoginCtrl.login)
router.post('/refresh_token', LoginCtrl.refresh_token)
router.post('/revokeRefreshTokenForUser', LoginCtrl.revokeRefreshTokenForUser)

module.exports = router