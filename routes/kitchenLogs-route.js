const express = require('express')
const router = express.Router()

const { getLOTD, removeItem } = require('../controllers/kitchenLogs')

router.get('/get/:date', getLOTD)
router.get('/remove/:id', removeItem)

module.exports = router