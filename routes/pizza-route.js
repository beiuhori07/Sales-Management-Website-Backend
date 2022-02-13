const express = require('express')
const router = express.Router()

const { updatePizza, getSinglePizza, getAllPizza, getMultiplePizza } = require('../controllers/pizza')

router.patch('/update', updatePizza)
router.get('/get/single', getSinglePizza)
router.get('/get/multiple', getMultiplePizza)
router.get('/get/all', getAllPizza)

module.exports = router