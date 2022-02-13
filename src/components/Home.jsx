import { useState } from "react";
import { useNavigate } from "react-router";
import { createSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "../context/auth";
import { searchJobs } from '../services/jobs';
import toastProperties from '../services/toastProperties'

const Home = () => {



    const { logOutProvider, token } = useUserContext();
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('');
    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();
        const search = `?${createSearchParams({ keyword, location })}`
        navigate({
            pathname: '/jobs',
            search: search,
        })
    }

    return (
        <>
            <div className='bg-light-color pl-6 sm:pl-16 lg:pl-40 pt-32 h-full select-none'>
                <p className=' font-mono text-3xl font-semibold text-dark-color'>Find a job</p>
                <p className=' font-mono text-5xl font-bold'>ANYWHERE ANYTIME</p>

                <form action="" className='grid grid-rows-2 mt-10 relative w-11/12' onSubmit={submitForm}>
                    <div className='flex items-center row-start-1 '>
                        <input type="text" name="" id="" className='w-7/12 h-20 rounded-l-md rounded-bl-md px-2 py-4 outline-none pl-8 placeholder:font-mono' placeholder='Job or keyword  ' value={keyword} onChange={(e) => setKeyword(e.target.value)} autoFocus />
                        <span className='w-[1px] bg-gray-500 h-[40px] inline-block z-10'></span>
                        <input type="text" name="" id="" className='w-5/12 h-20 rounded-r-md rounded-br-md px-2 py-4 outline-none -ml-[2px] pl-8 placeholder:font-mono' placeholder='Location' value={location} onChange={(e) => setLocation(e.target.value)} />
                    </div>
                    <button type='submit' className='h-12 mt-8 bg-accent-color w-64 rounded-lg text-white font-mono font-bold row-start-2 place-self-center lg:-ml-32 lg:row-start-1 lg:absolute lg:right-0 lg:top-0 lg:mt-4 lg:w-32 lg:mr-4'>Search</button>
                </form>
            </div>
        </>
    )
}

export default Home;