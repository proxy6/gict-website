const express = require('express')
const router = express.Router()
const {getEventPage, postEventReferral} = require('../controller/event.controller')
router.get('/', getEventPage)
router.post('/referral', postEventReferral)
module.exports = router;
