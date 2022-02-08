import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/auth";
import { isExpired } from 'react-jwt'



const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { logInProvider, afterLogin, logOutProvider } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem('jwt');
        if (token && !isExpired(token)) {
            afterLogin(token)
            navigate('/');
        }
        else if (isExpired(token))
            logOutProvider(false);

    }, [navigate, afterLogin, logOutProvider, isExpired])

    const submitForm = async (e) => {
        e.preventDefault();
        logInProvider(username, password)
            .then(() => {
                navigate('/');
            })
            .catch((err) => {
            })
    }

    return (
        <div className='w-screen h-screen bg-gradient-to-r from-[#44a08d] to-[#093637]
                        flex justify-center items-center min-w-max overflow-hidden
        '>
            <form className='flex flex-col bg-white h-4/6  w-11/12 lg:w-5/12  items-center max-w-md overflow-hidden' onSubmit={submitForm}>
                <h2 className='text-center font-bold font-mono text-2xl pt-10'>LOGIN</h2>
                <div className='flex flex-col h-4/6 justify-center'>

                    <label htmlFor="username">Username:</label>
                    <input type="text" name="email" value={username} onChange={(e) => setUsername(e.target.value)}
                        className='outline-none p-1 bg-slate-200 mb-4 focus:bg-slate-300' />


                    <label htmlFor="password">Password:</label>
                    <input type="password" name="" value={password} onChange={(e) => setPassword(e.target.value)}
                        className='outline-none bg-slate-200 p-1 focus:bg-slate-300 ' />

                    <button type='submit' disabled={!username || !password} className='bg-emerald-700 text-white p-2 mt-6 font-bold uppercase font-mono hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-emerald-800 disabled:text-slate-100'>Submit</button>
                    <p className='text-xs font-mono mt-4'><Link to='/register' className='text-emerald-700 hover:underline hover:text-emerald-800'>Register</Link> if you don't have an account</p>
                </div>
            </form>
        </div>
    )
}

export default Login;