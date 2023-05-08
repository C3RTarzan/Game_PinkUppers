const jwt = require('jsonwebtoken')

const TOKEN_KEY = process.env.TOKEN_KEY

const createUserToken = async(user, req, res) => {

    // create a token
    const token = jwt.sign({
        user: user.user,
        id: user._id
    }, TOKEN_KEY)
    // return token
    res.status(200).json({
        message: "Você está autenticado.",
        token: token,
        userId: user._id
    })
    

}

module.exports = createUserToken