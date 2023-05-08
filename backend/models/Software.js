const mongoose = require('../db/conn');
const {Schema} = mongoose

const Software = mongoose.model(
    'Software',
    new Schema({
        name:{
            type: String,
            required: true
        },
        version:{
            type: String,
            required: true
        },
        power:{
            type: String,
            required: true
        },
        size:{
            type: String,
            required: true
        },
        userId:{
            type: String,
            required: true,
        },
        licensed:{
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
        icon:{
            type: String,
            required: true,
        }
    }, {timestamps: true} )
)

module.exports = Software