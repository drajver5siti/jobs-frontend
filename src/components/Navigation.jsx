import { useUserContext } from "../context/auth";
import { GiHamburgerMenu } from 'react-icons/gi'
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Navigation = () => {
    const { logOutProvider, loggedIn, logInProvider } = useUserContext();
    const [openMenu, setOpenMenu] = useState(false);
    const navigate = useNavigate();

    return (
        <nav className='bg-[#232528] h-12 flex items-center pl-2 overflow-hidden'>
            <GiHamburgerMenu className='text-white text-4xl peer md:hidden cursor-pointer md:cursor-none z-20' onClick={() => {
                setOpenMenu(!openMenu)
            }} />

            {(
                <ul className={`${openMenu ? 'translate-x-0' : '-translate-x-40'} z-10 transition-transform bg-[#232528] text-white absolute top-0 -z-10 left-0 h-screen w-3/12 flex flex-col items-center pt-20 gap-3 md:flex md:flex-row md:w-screen md:h-12 md:p-0 md:m-0 md:z-0 md:translate-x-0 md:items-center
                    `}>
                    <Link to='/'><button className='_button-style md:ml-28'>Home</button></Link>
                    <Link to='/profile'><button className='_button-style' >Profile</button></Link>
                    <button className=' block _button-style mt-auto mb-5 md:m-0 md:ml-auto md:mr-16' onClick={() => {
                        loggedIn ? logOutProvider() : navigate('/login')
                    }}>{loggedIn ? 'Logout' : 'Login'}</button>
                </ul>
            )}
        </nav>
    )
}

export default Navigation;