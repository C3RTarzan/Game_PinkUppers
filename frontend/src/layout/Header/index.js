import { NavLink } from 'react-router-dom';
import './styles.scss';

import { BsFillPersonLinesFill } from "react-icons/bs";
import { BiExit } from "react-icons/bi";

/* context */
import { Context } from '../../context/UserContext';
import { useContext } from 'react';


function Header(){

    const {authenticated, logout} = useContext(Context)

    return(
        <header>
            <div className='Logo'>
            </div>
            {authenticated 
                ?(
                    <div className='button'>
                        <a onClick={logout}><BiExit /> Sair</a>
                    </div>
                )
                :(
                    <div className='button'>
                        <NavLink to="/Login"> <BsFillPersonLinesFill /> </NavLink>
                    </div>
                )
            }
            
        </header>
    )
}

export default Header;