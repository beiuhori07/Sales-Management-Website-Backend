const mongoose = require('mongoose')

const PizzaEntriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide pizza name']
    },
    price: {
        type: Number,
        required: [true, 'Please provide price']
    },
    numberSold: {
        type: Number,
        required: [true, 'Please provide numberSold']
    },
    time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('PizzaEntries', PizzaEntriesSchema)