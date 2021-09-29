const express = require('express');
const Router = express.Router()
const {getCryptoPage, postCryptoPage} = require('../controller/services.controller')

Router.get('/digital-currency', getCryptoPage)
Router.post('/digital-currency', postCryptoPage)
module.exports = Router;