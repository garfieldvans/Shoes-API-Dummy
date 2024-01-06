const express = require('express')
const Product = require('./productRoute')
const routes = require('./productRoute')
const searchroutes = require('./search')
const router = express.Router()

router.use(express.json())

router.use('/products', routes)
router.use('/search', searchroutes)


module.exports = router