const express = require('express')
const router = express.Router()

const { updateItem, getSingleItem, getAllItems, getMoreItems } = require('../controllers/kitchen')

router.patch('/update', updateItem)
router.get('/get/single/:id', getSingleItem)
router.get('/get/all', getAllItems)
router.post('/get/more', getMoreItems)

module.exports = router