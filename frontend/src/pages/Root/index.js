import './styles.scss'

import { useState, useEffect } from 'react'

import api from '../../utils/api'

import userPhone from '../../assets/img/user.png'

import { FaServer } from "react-icons/fa";
import { Navigate } from 'react-router-dom';

function Root(){

    const [isLoading, setIsLoading] = useState(true);
    const [isCopying, setIsCopying] = useState(true)


    const [user, setUser] = useState({})
    const [server, setServer] = useState({})


    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        async function fetchData(){
            try{
                const result = await api.get('/root@pnk', {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`
                    }
                })
                setUser(result.data.user)
                setServer(result.data.server)
                setIsLoading(false)    
            } catch(error){
                console.log("PNK erro: " + error); 
            }
        }
        fetchData();
    }, [token])

    function state(state){
        if(state === 0 || state === 1){
            return "Online"
        }
        if(state === 2){
            return "Offline"
        }
        if(state === 3){
            return "Unavailable"
        }
        return 
    }
    function stateServerUpddate(state){
        if(state === 0 || state === 1){
            return "Alterar IP"
        }
        if(state === 2){
            return "Renovar"
        }
        if(state === 3){
            return "Atualizando"
        }
        return 
    }
    function stateUnavailable(state){
        const itens = document.querySelectorAll(".State3")
        for(let i = 0; i < itens.length; i++){
            itens[i].style.display = "none"
        }
    }

    function copyText(event) {
        const text = event.target.textContent;
        const id = event.target.id;
        const content = event.target.textContent;
        const span = document.getElementById(id);

        if(isCopying){
            setIsCopying(false);
            navigator.clipboard.writeText(text)
              .then(() => {
                // Feedback visual de sucesso
                span.innerHTML = 'Copiado!';
                
                // Redefine o texto após um tempo
                const TIMEOUT_MS = 500;
                setTimeout(() => {
                  span.innerHTML = content;
                  setIsCopying(true);
                }, TIMEOUT_MS);
              })
              .catch((error) => {
                console.log('Erro ao copiar o texto: ' + error);
              });
        }
      
    }
    
    const handleMenuClick = (ip) => {
        const iten = document.getElementById(ip);

        if(iten.style.height === "" || iten.style.height === "0px"){
            iten.style.height = "60px"
        }else{
            iten.style.height = "0px"
        } 
    }

    if (isLoading) {
        return <div className='Loading'><span>Carregando....</span></div>;
    }
    
    return(
        <main className='profile'>
            <div className='user-info'>
                <div className='info-identification'>
                    <div className='identification-image'>
                        <div className='image-bc'>
                            <img src={userPhone}></img>
                        </div>
                    </div>
                    <div className='identification-name'>
                        <span id='copy' onClick={copyText}>{user.user}</span>
                    </div>
                </div>
                <div className='info-data'>
                    <div className='data-bc'>
                        <div className='bc-itens'>
                            <div className='primary'>
                                <span>Reputação:</span>
                            </div>
                            <div className='secondary'>
                                <span>Tempo:</span>
                            </div>
                            <div className='primary'>
                                <span>Dinheiro:</span>
                            </div>
                            <div className='secondary'>
                                <span>DDOS:</span>
                            </div>
                            <div className='primary'>
                                <span>Bitcoin:</span>
                            </div>
                            <div className='secondary'>
                                <span>Servidor:</span>
                            </div>
                            <div className='primary'>
                                <span>Status:</span>
                            </div>
                        </div>
                        <div className='bc-itens'>
                            <div className='primary'>
                                <span>{user ? user.reputation : ""}</span>
                            </div>
                            <div className='secondary'>
                                <span></span>
                            </div>
                            <div className='primary'>
                                <span>R$</span>
                            </div>
                            <div className='secondary'>
                                <span>GB</span>
                            </div>
                            <div className='primary'>
                                <span></span>
                            </div>
                            <div className='secondary'>
                                <span></span>
                            </div>
                            <div className='primary'>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div className='user-server'>
                {server.map(item =>
                (<div key={item.ip} className='server-bc'>                   
                    <div className='bc-server'>
                        <div className='server-icon'>
                            <FaServer className={state(item.state)}/>
                        </div>
                        <div className='server-date'>
                            <span id={"IP:" + item.ip} onClick={copyText} className={state(item.state)}>{item.ip}</span>
                        </div>
                        <div className='server-upddate'>
                            <span onClick={() => handleMenuClick(item._id)}>{stateServerUpddate(item.state)}</span>
                        </div>
                        <div className='server-button'>
                            <button className={state(item.state)}>ENTRAR</button>
                        </div>
                    </div>
                    <div id={item._id} className='bc-info'>
                        {stateUnavailable(item.state)}
                        <div className={"State" + item.state + " info-price"}>
                            <span>
                                500$
                            </span>
                        </div>
                        <div className={"State" + item.state + ' info-date'}>
                            <span>
                                10/06/2023
                            </span>
                        </div>
                        <div className='info-time'>
                            <span>
                                10m
                            </span>
                        </div>
                        <div className={"State" + item.state + ' info-button'}>
                            <span>
                                {stateServerUpddate(item.state)}
                            </span>
                        </div>
                    </div>
                </div>)
                )}
            </div>
    
            <div className='user-bank'>
                
            </div>
        </main>
    )
}
        



export default Root