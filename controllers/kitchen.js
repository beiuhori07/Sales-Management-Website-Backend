const Kitchen = require('../models/Kitchen')
var moment = require('moment'); // require

const KitchenEntries = require('../models/Kitchen-Entries')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getSingleItem = async (req, res) => {
    const { params: {
        id: kitchenId 
        }
    } = req

    if(!kitchenId) {
        throw new BadRequestError('Please provide an item id')
    }

    const itemFound = await Kitchen.findById(kitchenId)
    if(!itemFound) {
        throw new NotFoundError('invalid item id')
    }

    res.status(StatusCodes.OK).json(itemFound)
}

const getMoreItems = async (req, res) => {
    const { ids, length } = req.body;


    let items = []

    for(i = 0; i < length; i++) {
        let foundItem = await Kitchen.findById(ids[i])
        items.push(foundItem)
    }
    res.status(StatusCodes.OK).json({ items: items, length: items.length })
}

const getAllItems = async (req, res) => {
    const items = await Kitchen.find();

    res.status(StatusCodes.OK).json({ items, length: items.length })
}


const updateItem = async (req, res) => {
    const { name: itemName, addQuantity } = req.body
    if(!itemName) {
        throw new BadRequestError('Please provide the item name')
    }
    if(addQuantity <= 0) {
        throw new BadRequestError('Added quantity cant be less than or equal to 0')
    }
    let itemFound = await Kitchen.findOne({ name: itemName })  
    if(!itemFound) {
        throw new NotFoundError('invalid item name')
    }
    const itemNoSold = itemFound.numberSold;
    await itemFound.updateOne({ numberSold: itemNoSold + addQuantity }, {new: true, runValidators: true})
    
    let mom = moment().format('L')
    let resut
    for(i = 0; i < 3; i++) {
        result = mom.replace("/", "-");
        mom = result  
    }
    console.log(result);

    await KitchenEntries.create({
        name: itemName,
        numberSold: addQuantity,
        price: itemFound.price * addQuantity,
        time: mom
    })
    res.status(StatusCodes.OK).json({ msg: `added ${addQuantity} to ${itemName}` })
}

module.exports = {
    updateItem,
    getSingleItem,
    getAllItems,
    getMoreItems
}