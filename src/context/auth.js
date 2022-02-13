import { createContext, useContext, useState } from 'react';
import { decodeToken } from 'react-jwt';
import { toast } from 'react-toastify';
import { loginUser, registerUser } from '../services/auth';
import toastProperties from '../services/toastProperties';

const UserContext = createContext();



export const useUserContext = () => {
    return useContext(UserContext);
}

const UserProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userID, setUserID] = useState(null);


    const afterLogin = (token) => {
        localStorage.setItem('jwt', token);
        setToken(token);
        const decodedToken = decodeToken(token);
        setUserID(decodedToken.user)
    }


    const logInProvider = (username, password) => {
        return loginUser(username, password)
            .then(data => {
                afterLogin(data.token)
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
        setUserID(null);
        // setUser(null);
        if (!toast.isActive('logged_out') && msg)
            toast.success('Logged out', { ...toastProperties, toastId: 'logged_out' });
    }

    const registerProvider = async (data) => {
        const result = await registerUser(data);
        return result;
    }

    return (
        <UserContext.Provider value={{ logInProvider, logOutProvider, registerProvider, afterLogin, token, userID }}>
            {children}
        </UserContext.Provider>
    )

}
export default UserProvider;