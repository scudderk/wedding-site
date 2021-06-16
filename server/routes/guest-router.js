const express = require('express')

const GuestCtrl = require('../controllers/guest-ctrl')

const router = express.Router()

router.post('/guest', GuestCtrl.createGuest)
router.put('/guest/:id', GuestCtrl.updateGuest)
router.delete('/guest/:id', GuestCtrl.deleteGuest)
router.get('/guest/:id', GuestCtrl.getGuestById)
router.get('/guest', GuestCtrl.getGuests)

module.exports = router