const mongoose = require('../db/conn');
const {Schema} = mongoose

const Bank = mongoose.model(
    'Bank',
    new Schema({
        userId:{
            type: String,
            required: true
        },
        agency:{
            type: String,
            required: true
        },
        pass:{
            type: String,
            required: true
        },
        money:{
            type: String,
            required: true
        },  
        bank:{
            type: Number,
            required: true
        },
    }, {timestamps: true})
)

module.exports = Bank