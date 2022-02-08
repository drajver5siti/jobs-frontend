import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { loginUser, registerUser } from '../services/auth';
import toastProperties from '../services/toastProperties';

const UserContext = createContext();



export const useUserContext = () => {
    return useContext(UserContext);
}

const UserProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);


    const afterLogin = (token) => {
        localStorage.setItem('jwt', token);
        setToken(token);
        if (!toast.isActive('welcome_back'))
            toast.success('Welcome back', { ...toastProperties, toastId: 'welcome_back' });
        setLoggedIn(true);
        localStorage.setItem('loggedIn', true);

    }


    const logInProvider = (username, password) => {
        return loginUser(username, password)
            .then(data => {
                afterLogin(data.token)
                setUser(data.user)
            })
            .catch(err => {
                if (!toast.isActive('error'))
                    toast.error(err.message, { ...toastProperties, toastId: 'error' });
                throw new Error(err.message)
            })
    }

    const logOutProvider = (msg = true) => {
        localStorage.clear();
        setToken(null);
        // setUser(null);
        if (!toast.isActive('logged_out') && msg)
            toast.success('Logged out', { ...toastProperties, toastId: 'logged_out' });
        setLoggedIn(false);
    }

    const registerProvider = async (data) => {
        const result = await registerUser(data);
        return result;
    }

    return (
        <UserContext.Provider value={{ loggedIn, logInProvider, logOutProvider, registerProvider, afterLogin, token, user }}>
            {children}
        </UserContext.Provider>
    )

}
export default UserProvider;