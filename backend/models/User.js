const mongoose = require('../db/conn');
const {Schema} = mongoose

const User = mongoose.model(
    'User',
    new Schema({
        user:{
            type: String,
            required: true
        },
        pass:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        office:{
            type: String,
            required: true
        },  
        ip:{
            type: String,
            required: false
        },    
        ipLogged:{
            type: String,
            required: false
        }, 
        reputation:{
            type: String,
            required: false
        },
        clan:{
            type: String,
            required: false
        },
    }, {timestamps: true} )
)

module.exports = User