const express = require('express')
const isAuth = require('../auth/isAuth')
const GuestCtrl = require('../controllers/guest-ctrl')

const router = express.Router()

router.post('/guest', isAuth.isAuth, GuestCtrl.createGuest)
router.put('/guest/:id', isAuth.isAuth, GuestCtrl.updateGuest)
router.delete('/guest/:id', isAuth.isAuth, GuestCtrl.deleteGuest)
router.get('/guest/:id', isAuth.isAuth, GuestCtrl.getGuestById)
router.get('/guest', isAuth.isAuth, GuestCtrl.getGuests)

module.exports = router