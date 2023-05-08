const User = require("../models/user");
const bcrypt = require('bcrypt');

//helpers
const createUserToken = require("../helpers/create-user-token");
const createServerUser = require("../helpers/create-server-user");
const createBankUser = require("../helpers/create-bank-user");

const jwt = require('jsonwebtoken');

//Token key
const TOKEN_KEY = process.env.TOKEN_KEY

module.exports = class UserController{
    static async register(req, res){

        const {user, pass, confPass, email, localId} = req.body
        if(localId){
            //Check if user exists
            const userExists = await User.findOne({email: email})
            if(userExists){ 
                //check if password match with db password
                const checkPassword = await bcrypt.compare(pass, userExists.pass)

                if(!checkPassword){
                    res.status(422).json({message: 'Falha ao tentar logar'});
                    return;
                }
                await createUserToken(userExists, req, res);  
                return 
            }

            //Create a password
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(pass, salt);

            //Create a user
            const currentUser = new User({
                user,
                email,
                pass: passwordHash,
                office: 'user',
            })
            try {
                const newUser = await currentUser.save(); 
                await createServerUser(newUser, req, res, 1);      
                await createUserToken(newUser, req, res);  
                await createBankUser(newUser, req, res, 1);    
            } catch (error) {
                res.status(500).json({message: error})
            }

        }

        if(!user){ 
            res.status(422).json({message: 'O usuário é obrigatorio.'});
            return;
        }
        if(user.length < 4){ 
            res.status(422).json({message: 'O usuário é muito curto.'});
            return;
        }
        if(!email){ 
            res.status(422).json({message: 'O email é obrigatorio.'});
            return;
        }
        if(!pass){ 
            res.status(422).json({message: 'A senha é obrigatorio.'});
            return;
        }
        if(!confPass){ 
            res.status(422).json({message: 'A confirmação de senha é obrigatorio.'});
            return;
        }
        if(pass !== confPass){ 
            res.status(422).json({message: 'As senhas devem ser a mesmas.'});
            return;
        }
        if(pass.length < 8){ 
            res.status(422).json({message: 'A senha é muito curta.'});
            return;
        }

        //Check if user exists
        const userExists = await User.findOne({user: user})

        if(userExists){ 
            res.status(422).json({message: 'O usuário já está em uso.'});
            return;
        }

        //Check if email exists
        const emailExists = await User.findOne({email: email})

        if(emailExists){ 
            res.status(422).json({message: 'O email já está em uso.'});
            return;
        }

        //Create a password
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(pass, salt);

        //Create a user
        const currentUser = new User({
            user,
            email,
            pass: passwordHash,
            office: 'user',
        })
        try {
            const newUser = await currentUser.save(); 
            await createServerUser(newUser, req, res, 1);      
            await createUserToken(newUser, req, res);  
            await createBankUser(newUser, req, res, 1);    
        } catch (error) {
            res.status(500).json({message: error})
        }

        
    }

    static async login(req, res){
        const {user, pass} = req.body

        if(!user){ 
            res.status(422).json({message: 'O usuário é obrigatorio.'});
            return;
        }
        if(!pass){ 
            res.status(422).json({message: 'A senha é obrigatorio.'});
            return;
        }

        //check if user exist
        const existUser = await User.findOne({user: user})

        if(!existUser){ 
            res.status(422).json({message: 'Esse usuário não existe..'});
            return;
        }

        //check if password match with db password
        const checkPassword = await bcrypt.compare(pass, existUser.pass)

        if(!checkPassword){
            res.status(422).json({message: 'Senha invalida'});
            return;
        }        
        await createUserToken(existUser, req, res);   
    }
}