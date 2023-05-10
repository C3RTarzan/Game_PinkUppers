const mongoose = require('../db/conn');
const {Schema} = mongoose

const Server = mongoose.model(
    'Server',
    new Schema({
        ip:{
            type: String,
            required: true
        },
        title:{
            type: String,
            required: true
        }, 
        login:{
            type: String,
            required: true
        },
        pass:{
            type: String,
            required: true
        },  
        type:{
            type: Number,
            required: true
        },
        specifications:{
            processor:{
                type: Number,
                required: true
            },
            hd:{
                type: Number,
                required: true
            },
            memory:{
                type: Number,
                required: true
            },
            Internet:{
                type: Number,
                required: true
            },
        },
        userId:{
            type: String,
            required: true
        },
        state:{
            type: Number,
            required: true
        }
    }, {timestamps: true})
    )

    module.exports = Server