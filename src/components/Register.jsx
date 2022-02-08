import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { registerUser } from '../services/auth';
import { toast } from 'react-toastify';


const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('loggedIn'))
            return navigate('/');
    }, [])



    const submitForm = async (e) => {
        e.preventDefault();
        const data = {
            username,
            password,
        }
        const properties = {
            position: 'bottom-right',
            pauseOnHover: false,
            autoClose: 3500,
        }
        try {
            await registerUser(data)
            toast.success(`Successfully registered`, properties);
            navigate('/login');
        }
        catch (err) {
            console.log(err.message);
            toast.error(`${err.message}`, properties);
        }

    }

    return (


        <div className='w-screen h-screen bg-gradient-to-r from-[#44a08d] to-[#093637]
                        flex justify-center items-center min-w-max overflow-hidden
        '>
            <form className='flex flex-col bg-white h-4/6  w-11/12 lg:w-5/12  items-center max-w-md' onSubmit={submitForm}>
                <h2 className='text-center font-bold font-mono text-2xl pt-10'>REGISTER</h2>
                <div className='flex flex-col h-4/6 justify-center'>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="email" value={username} onChange={(e) => setUsername(e.target.value)}
                        className='outline-none p-1 bg-slate-200 mb-4 focus:bg-slate-300 w-60
                        ' />


                    <label htmlFor="password">Password:</label>
                    <input type="text" name="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        className='outline-none bg-slate-200 p-1 focus:bg-slate-300 mb-4' />

                    <label htmlFor="confirmPassword">Confirm password:</label>
                    <input type="text" name="confirmPassword" value={confirmPassword} onChange={(e) => {
                        setConfirmPassword(e.target.value)
                    }}

                        className='outline-none bg-slate-200 p-1 focus:bg-slate-300 ' />

                    <button type='submit' disabled={!username || !password || password !== confirmPassword} className='bg-emerald-700 text-white p-2 mt-6 font-bold uppercase font-mono hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-emerald-800 disabled:text-slate-100'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Register;