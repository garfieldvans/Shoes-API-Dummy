const express = require('express')
const Product = require('./productRoute')
const routes = require('./productRoute')
const searchroutes = require('./search')
const ctgrroutes = require('./categoriController')
const comments = require('./commentsCtrls')
const router = express.Router()

router.use(express.json())

router.use('/products', routes)
router.use('/category', ctgrroutes)
router.use('/cmt', comments)
router.use('/search', searchroutes)


module.exports = router