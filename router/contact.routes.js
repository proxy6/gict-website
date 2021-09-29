const express = require('express');
const Router = express.Router()
const {contact} = require('../controller/contact.controller')

Router.post('/', contact)
module.exports = Router