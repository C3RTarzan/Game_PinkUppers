const User = require("../models/user");

const getToken = require('../helpers/get-token');
const getUserByToken = require("../helpers/get-user-by-token");
const getServerByToken = require("../helpers/get-server-by-token");


module.exports = class ServerController{
    static async root(req, res){
        let response
        if(req.headers.authorization){   
            const token = getToken(req)
            const user = await getUserByToken(token)    
            const server = await getServerByToken(token)  
            response = {
                user: user,
                server: server
            }
        }else{
            response = null
        }
        res.status(200).send(response)
        
    }
}