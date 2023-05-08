const jwt = require('jsonwebtoken')
const User = require("../models/user");

const TOKEN_KEY = process.env.TOKEN_KEY

//get user by jwt token

module.exports = getUserByToken = async (token) =>{

    //verification
    
    if(!token){
        res.status(422).json({message: 'Acesso negado.'});
        return;
    }

    try {    
        const decoded = jwt.verify(token, TOKEN_KEY);
        const userId = decoded.id;
        const user = await User.findOne({_id: userId});
        return user;
    } catch (error) {
        res.status(422).json({message: 'Token invalido'});
    }
}