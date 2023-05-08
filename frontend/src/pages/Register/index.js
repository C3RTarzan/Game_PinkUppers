import './styles.scss';

import { useState, useContext } from 'react';

import { NavLink } from 'react-router-dom';

import { Context } from '../../context/UserContext';

import Input from '../../components/Input';
import Header from '../../layout/Header'
import Message from '../../components/message';

function Register(){
    const [user, setUser] = useState({})
    const {register} = useContext(Context)

    function handleOnChange(e){
        setUser({...user, [e.target.name] : e.target.value})
    }
    function handleSubmit(e){
        e.preventDefault();
        register(user);
    }

    return(
        <>
        <Header />
        <main className='Login'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <Input 
                    text='Usuário'
                    type='text'
                    name='user'
                    placeholder='Digite seu usuário'
                    handleOnChange={handleOnChange}
                />
                <Input 
                    text='Email'
                    type='email'
                    name='email'
                    placeholder='Digite seu E-Mail'
                    handleOnChange={handleOnChange}
                />
                <Input 
                    text='Senha'
                    type='password'
                    name='pass'
                    placeholder='Digite sua senha'
                    handleOnChange={handleOnChange}
                />
                <Input 
                    text='Confirmação de senha'
                    type='password'
                    name='confPass'
                    placeholder='Confirme a sua senha'
                    handleOnChange={handleOnChange}
                />
                <Input type='submit' value="Cadastrar" />
                <Message />
            </form>
            <span className='AccountLogin'>Já tem uma conta? <NavLink to='/Login'>Clique aqui</NavLink></span>
        </main>
        
        </>
    )
}

export default Register;