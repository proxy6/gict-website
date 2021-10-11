const express = require('express');
const router = express.Router()
const {getCryptoPage, postCryptoPage, getCrackedAppsPage, getTrainingPage} = require('../controller/services.controller')

router.get('/digital-currency', getCryptoPage)
router.post('/digital-currency', postCryptoPage)
router.get('/cracked-apps', getCrackedAppsPage)
router.get('/training', getTrainingPage)
module.exports = router;