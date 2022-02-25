const KitchenEntries = require('../models/Kitchen-Entries')
const Kitchen = require('../models/Kitchen');

const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const removeItem = async (req, res) => {
    const { params: {
        id: kitchenId
        }
    } = req

    if(!kitchenId) {
        throw new BadRequestError('Please provide an item id')
    }

    const item = await KitchenEntries.findByIdAndRemove(kitchenId);
    if(!item) {
        throw new NotFoundError('invalid item id')
    } else {
        const findItem = await Kitchen.findOne({ name: item.name })
        await findItem.updateOne({numberSold: findItem.numberSold - item.numberSold}, {new: true, runValidators: true});
    }

    res.status(StatusCodes.OK).json(`removed item with id ${kitchenId} and update numberSold`);
}

const getLOTD = async (req, res) => {
    const { params: { date } } = req

    if(!date) {
        throw new BadRequestError('Please provide a date')
    }

    const itemFound = await KitchenEntries.find({ time: date }, 'time _id name numberSold price' )
    // if(!itemFound) {
    //     throw new NotFoundError('invalid date')
    // }
    res.status(StatusCodes.OK).json(itemFound)
}

module.exports = {
    getLOTD,
    removeItem
}