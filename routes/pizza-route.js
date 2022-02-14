const express = require('express')
const router = express.Router()

const { updatePizza, getSinglePizza, getAllPizza } = require('../controllers/pizza')

router.patch('/update', updatePizza)
router.get('/get/single/:id', getSinglePizza)
router.get('/get/all', getAllPizza)

module.exports = router