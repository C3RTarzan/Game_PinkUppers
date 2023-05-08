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
        // software:{
        //     name:{
        //         type: String,
        //         required: false
        //     },
        //     version:{
        //         type: String,
        //         required: false
        //     },
        //     power:{
        //         type: String,
        //         required: false
        //     },
        //     size:{
        //         type: String,
        //         required: false
        //     }
        // },
        userId:{
            type: String,
            required: true
        }
    }, {timestamps: true})
    )

    module.exports = Server