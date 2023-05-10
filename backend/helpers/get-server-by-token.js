const jwt = require('jsonwebtoken')
const User = require("../models/user");
const Server = require('../models/Server');

const TOKEN_KEY = process.env.TOKEN_KEY

//get user by jwt token

module.exports = getServerByToken = async (token) =>{

    //verification
    
    if(!token){
        res.status(422).json({message: 'Acesso negado.'});
        return;
    }

    try {    
        const decoded = jwt.verify(token, TOKEN_KEY);
        const userId = decoded.id;
        const server = await Server.find({userId: userId});
        
        return server;
    } catch (error) {
        res.status(422).json({message: 'Token invalido'});
    }
}