const User = require("../models/user");

const getToken = require('../helpers/get-token');
const getUserByToken = require("../helpers/get-user-by-token");


module.exports = class ServerController{
    static async root(req, res){
        let currentUser
        if(req.headers.authorization){   
            const token = getToken(req)
            const user = await getUserByToken(token)
            currentUser = await User.findById(user._id)
            currentUser.pass = undefined

        }else{
            currentUser = null
        }
        res.status(200).send(currentUser)
        
    }
}