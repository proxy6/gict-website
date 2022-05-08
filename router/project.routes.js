const express = require('express')
const router = express.Router()
const {getProjectPage} = require('../controller/project.controller')
router.get('/projects', getProjectPage)
module.exports = router;
