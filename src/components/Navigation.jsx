import { useUserContext } from "../context/auth";
import { GiHamburgerMenu } from 'react-icons/gi'
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { isExpired } from "react-jwt";

const Navigation = () => {
    const { logOutProvider, token, afterLogin } = useUserContext();
    const [openMenu, setOpenMenu] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!token) {
            // I dont have the jwt in my state, but it can still be in my localStorage
            const jwt = localStorage.getItem('jwt');
            if (jwt && !isExpired(jwt)) {
                afterLogin(jwt)
            }
            else if (jwt) {
                // There is a jwt in the localStorage but it is expired, just remove it
                localStorage.removeItem('jwt');
            }
        }
    }, [location.key, afterLogin, token])

    return (
        <nav className='bg-[#232528] h-12 flex items-center pl-2 z-50  sticky overflow-visible top-0'>
            <GiHamburgerMenu className='text-white text-4xl peer md:hidden cursor-pointer md:cursor-none z-40' onClick={() => {
                setOpenMenu(!openMenu)
            }} />

            {(
                <ul className={`${openMenu ? 'translate-x-0' : '-translate-x-48'} z-30 transition-transform bg-[#232528] text-white absolute top-0 left-0 h-screen w-3/12 flex flex-col items-center pt-20 gap-3 md:flex md:flex-row md:w-screen md:h-12 md:p-0 md:m-0 md:z-0 md:translate-x-0 md:items-center
                    `}>
                    <Link to='/' ><button className='_button-style md:ml-28' onClick={() => setOpenMenu(false)}>Home</button></Link>
                    <Link to='/profile'><button className='_button-style' onClick={() => setOpenMenu(false)}>Profile</button></Link>
                    <Link to='/jobs'><button className='_button-style' onClick={() => setOpenMenu(false)}>Jobs</button></Link>
                    <button className=' block _button-style mt-auto mb-5 md:m-0 md:ml-auto md:mr-16' onClick={() => {
                        setOpenMenu(false)
                        token ? logOutProvider() : navigate('/login')
                    }}>{token ? 'Logout' : 'Login'}</button>
                </ul>
            )}
        </nav>
    )
}

export default Navigation;