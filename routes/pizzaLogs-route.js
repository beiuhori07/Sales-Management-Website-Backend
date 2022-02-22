const express = require('express')
const router = express.Router()

const getLOTD = require('../controllers/pizzaLogs')

router.get('/:date', getLOTD)

module.exports = router