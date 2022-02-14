const Pizza = require('../models/Pizza')
const PizzaEntries = require('../models/Pizza-Entries')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getSinglePizza = async (req, res) => {
    const { id: pizzaId } = req

    if(!pizzaId) {
        throw new BadRequestError('Please provide a pizza id')
    }

    const pizzaFound = await Pizza.findById(pizzaId)
    if(!pizzaFound) {
        throw new NotFoundError('invalid pizza name')
    }

    res.status(StatusCodes.OK).json(pizzaFound)
}

const getAllPizza = async (req, res) => {
    const pizzas = await Pizza.find();

    res.status(StatusCodes.OK).json({ pizzas, length: pizzas.length })
}


const updatePizza = async (req, res) => {
    const { name: pizzaName, addQuantity } = req.body
    if(!pizzaName) {
        throw new BadRequestError('Please provide the pizza name')
    }
    if(addQuantity <= 0) {
        throw new BadRequestError('Added quantity cant be less than or equal to 0')
    }
    let pizzaFound = await Pizza.findOne({ name: pizzaName })  
    if(!pizzaFound) {
        throw new NotFoundError('invalid pizza name')
    }
    const pizzaNoSold = pizzaFound.numberSold;
    await pizzaFound.updateOne({ numberSold: pizzaNoSold + addQuantity }, {new: true, runValidators: true})
    await PizzaEntries.create({
        name: pizzaName,
        numberSold: addQuantity,
        price: pizzaFound.price * addQuantity,
    })
    res.status(StatusCodes.OK).json({ msg: `added ${addQuantity} to ${pizzaName}` })
}

module.exports = {
    updatePizza,
    getSinglePizza,
    getAllPizza,
}