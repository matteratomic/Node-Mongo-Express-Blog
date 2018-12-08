const express = require('express')
const router = express.Router()
const article = require('./article')
const user = require('./user')

article(router)
user(router)

module.exports = router
