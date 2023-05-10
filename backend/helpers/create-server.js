const Server = require("../models/Server");

const createServer = async(user, req, res, type) => {
    var check = true
    let ip

    //create ip
    function createIp(){
        let ip1 = Math.floor(Math.random() * 256)
        let ip2 = Math.floor(Math.random() * 256)
        let ip3 = Math.floor(Math.random() * 256)
        let ip4 = Math.floor(Math.random() * 256)
        ip = ip1 + '.' + ip2 + '.' + ip3 + '.' + ip4
        return ip
    }
 
    ip = createIp()
    while(check){
        const existIp = await Server.findOne({ip: ip})
        if(existIp){
            ip = createIp()
        }else{
            check = false 
        }
    }

    user.ip = ip

    //Create a Server
    function generatorLogin(){
        
        function getNomeAleatorio(){

            let quantidadeDeSilabas=getRandomIntInclusive(2,3);
            let nome="";
            
            for (contadorSilaba=1;contadorSilaba<=quantidadeDeSilabas;contadorSilaba++){

                nome=nome +  getConsoanteAleatoria() + getVogalAleatoria() ;

            }     
            return nome;
        }    
        function getRandomIntInclusive(min, max) {

            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;

        }       
        function getVogalAleatoria(){
          
            let listaVogais="AEOIU";
            let numeroAleatorio=getRandomIntInclusive(1, 5);
          
            return listaVogais.substring(numeroAleatorio-1,numeroAleatorio);
          
        }
        function getConsoanteAleatoria(){
          
            let listaConsoantes="BCDFGHJKLMNPQRSTWVXYZ";
            let numeroAleatorio=getRandomIntInclusive(1, 21);
          
            return listaConsoantes.substring(numeroAleatorio-1,numeroAleatorio);
        }
        return getNomeAleatorio()

    }
      
    function generatorPass() {
        var pass = '';
        var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 
                'abcdefghijklmnopqrstuvwxyz0123456789@#$';
          
        for (i = 1; i <= 8; i++) {
            var char = Math.floor(Math.random()
                        * str.length + 1);
              
            pass += str.charAt(char)
        }
          
        return pass;
    }

    const login = generatorLogin()
    const pass = generatorPass()
    const currentServer = new Server({
        ip,
        userId: user._id,
        login,
        pass,
        type,
        specifications:{
            processor: 1,
            hd: 1,
            memory: 1,
            Internet: 1
        },
        title: login,
        state: 1
        
    })
    try {
        await currentServer.save();  
        await Server.findOneAndUpdate( {userId: user._id, type: 1}, {title: user.user})
    } catch (error) {
        res.status(500).json({message: error})
    }
}

module.exports = createServer