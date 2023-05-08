const Bank = require("../models/Bank");

const createBankUser = async(user, req, res, bank) => {
    var check = true
    var agency;

    //check if the user already has a bank

    const checkUserBank = await Bank.findOne({userId: user._id, bank: bank})
    if(checkUserBank){
        return
    }

    //Create a Bank
             
    function generatorAgency() {
        var pass = '';
        var str = '123456789' + '987654321';
          
        for (i = 1; i <= 6; i++) {
            var char = Math.floor(Math.random()
                        * str.length + 1);           
            pass += str.charAt(char)
        }
          
        return pass;
    }
    function generatorPass() {
        var pass = '';
        var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 
                'abcdefghijklmnopqrstuvwxyz0123456789@#$';
          
        for (i = 1; i <= 12; i++) {
            var char = Math.floor(Math.random()
                        * str.length + 1);
              
            pass += str.charAt(char)
        }
          
        return pass;
    }

    agency = generatorAgency()

    while(check){
        const existAgency = await Bank.findOne({agency: agency, bank: bank})
        if(existAgency){
            agency = generatorAgency()
        }else{
            check = false 
        }
    }
    
    const pass = generatorPass()

    const currentBank = new Bank({
        userId: user._id,
        agency,
        pass,
        money: "0",
        bank
        
    })
    try {
        await currentBank.save();  
    } catch (error) {
        res.status(500).json({message: error})
    }
}

module.exports = createBankUser