const KitchenEntries = require('../models/kitchen-Entries')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getLOTD = async (req, res) => {
    const { params: { date } } = req

    if(!date) {
        throw new BadRequestError('Please provide a date')
    }

    const itemFound = await KitchenEntries.find({ time: date }, 'time _id name numberSold price' )
    if(!itemFound) {
        throw new NotFoundError('invalid date')
    }
    res.status(StatusCodes.OK).json(itemFound)
}

module.exports = getLOTD