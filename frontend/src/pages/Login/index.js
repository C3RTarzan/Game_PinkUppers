import './styles.scss';

import { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../services/fitebase'


import Input from '../../components/Input';
import Header from '../../layout/Header'
import { Context } from '../../context/UserContext';
import Message from '../../components/message';

function Login(){
    
    const [user, setUser] = useState({})
    const {login, googleAuth} = useContext(Context)

    function handleOnChange(e){
        setUser({...user, [e.target.name] : e.target.value})
    }
    function handleSubmit(e){
        e.preventDefault();
        login(user);
    }
    function handleFireBase(){
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then((result) =>{
            googleAuth(result._tokenResponse);
        }).catch((e) =>{
            console.log(e);
        })
    }
    return(
        <>
        <Header />
        <main className='Login'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <Input 
                    text='Usuário'
                    type='text'
                    name='user'
                    placeholder='Digite seu usuário'
                    handleOnChange={handleOnChange}
                />
                <Input 
                    text='Senha'
                    type='password'
                    name='pass'
                    placeholder='Digite sua senha'
                    handleOnChange={handleOnChange}
                />
                <Input type='submit' value="Entrar" />
                <Message />
            </form>
            <div className='LoginGoogle'>
                <NavLink onClick={handleFireBase}><img src="https://img.icons8.com/fluency/48/null/gmail-new.png"/> Entrar com Google</NavLink>
                
            </div>
            <span className='AccountLogin'>Não tem uma conta? <NavLink to='/Register'>Clique aqui</NavLink></span>
            <span className='AccountLogin'>Problemas para fazer login? <NavLink to='/Register'>Clique aqui</NavLink></span>
        
        </main>
        </>
    )
}

export default Login;