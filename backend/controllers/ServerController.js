const getToken = require('../helpers/get-token');
const getUserByToken = require("../helpers/get-user-by-token");
const getServerByToken = require("../helpers/get-server-by-token");


module.exports = class ServerController{
    static async root(req, res){
        if(!req.headers.authorization){   
            res.sendStatus(401)
            return
        }
        const token = getToken(req)
        const user = await getUserByToken(token)    
        const server = await getServerByToken(token)  
         
        res.status(200).json({
            user,
            server
        })
        
    }
}