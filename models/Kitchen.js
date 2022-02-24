const mongoose = require('mongoose')

const KitchenSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        unique: true
    },
    price: {
        type: Number,
        required: [true, 'Please provide price'],
    },
    numberSold: {
        type: Number,
        default: 0
    }
})


module.exports = mongoose.model('Kitchen', KitchenSchema)