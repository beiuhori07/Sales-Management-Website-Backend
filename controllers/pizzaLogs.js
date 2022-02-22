const PizzaEntries = require('../models/Pizza-Entries')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getLOTD = async (req, res) => {
    const { params: { date } } = req

    if(!date) {
        throw new BadRequestError('Please provide a date')
    }

    const pizzaFound = await PizzaEntries.find({ time: date }, 'time _id name numberSold price' )
    if(!pizzaFound) {
        throw new NotFoundError('invalid date')
    }
    res.status(StatusCodes.OK).json(pizzaFound)
}

module.exports = getLOTD