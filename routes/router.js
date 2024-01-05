const express = require('express')
const Product = require('./productRoute')
const routes = require('./productRoute')
const router = express.Router()

router.use(express.json())

router.use('/products', routes)


module.exports = router