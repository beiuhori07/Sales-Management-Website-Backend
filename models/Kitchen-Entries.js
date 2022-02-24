const mongoose = require('mongoose')

const KitchenEntriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide item name']
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
        type: String,
        default: 'MM-DD-YYYY'
    }
})

module.exports = mongoose.model('KitchenEntries', KitchenEntriesSchema)