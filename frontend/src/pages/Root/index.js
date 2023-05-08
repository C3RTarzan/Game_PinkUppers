import './styles.scss'

import { useState, useEffect } from 'react'

import api from '../../utils/api'

import userPhone from '../../assets/img/user.png'

function Root(){
    const [user, setUser] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() =>{
        api.get('/root@pnk', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) =>{
            setUser(response.data)
        })
    })
    const userName = user.user

    return(
        <main className='profile'>
            <div className='user-inffo'>
                <div className='inffo-identification'>
                    <div className='identification-image'>
                        <div className='image-bc'>
                            <img src={userPhone}></img>
                        </div>
                    </div>
                    <div className='identification-name'>
                        <span>{userName}</span>
                    </div>
                </div>
                <div className='inffo-data'>

                </div>
            </div>

            <div className='user-server'>
                
            </div>

            <div className='user-bank'>
                
            </div>

        </main>
    )
}

export default Root