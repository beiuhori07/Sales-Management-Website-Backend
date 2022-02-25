const PizzaEntries = require('../models/Pizza-Entries')
const Pizza = require('../models/Pizza')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const removeItem = async (req, res) => {
    const { params: {
        id: pizzaId
        }
    } = req

    if(!pizzaId) {
        throw new BadRequestError('Please provide an item id')
    }

    const item = await PizzaEntries.findByIdAndRemove(pizzaId);
    if(!item) {
        throw new NotFoundError('invalid item id')
    } else {
        const findItem = await Pizza.findOne({ name: item.name })
        await findItem.updateOne({numberSold: findItem.numberSold - item.numberSold}, {new: true, runValidators: true});
    }

    res.status(StatusCodes.OK).json(`removed item with id ${pizzaId} and update numberSold`);
}

const getLOTD = async (req, res) => {
    const { params: { date } } = req

    if(!date) {
        throw new BadRequestError('Please provide a date')
    }

    const pizzaFound = await PizzaEntries.find({ time: date }, 'time _id name numberSold price' )
    // if(!pizzaFound) {
    //     throw new NotFoundError('invalid date')
    // }
    res.status(StatusCodes.OK).json(pizzaFound)
}

module.exports = {
    getLOTD,
    removeItem
}