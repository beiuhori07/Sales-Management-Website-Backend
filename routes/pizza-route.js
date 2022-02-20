const express = require('express')
const router = express.Router()

const { updatePizza, getSinglePizza, getAllPizza, getMorePizza } = require('../controllers/pizza')

router.patch('/update', updatePizza)
router.get('/get/single/:id', getSinglePizza)
router.get('/get/all', getAllPizza)
router.post('/get/more', getMorePizza)

module.exports = router