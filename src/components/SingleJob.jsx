import { AiFillHeart } from 'react-icons/ai'

import NotFound from '../components/NotFound'
import { useUserContext } from "../context/auth";
import { getJob, updateJob } from '../services/jobs'
import { toast } from "react-toastify";
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';

const SingleJob = () => {
    const { token } = useUserContext();
    const { id } = useParams();
    const [job, setJob] = useState(null);



    useEffect(() => {
        async function fetchData() {
            try {
                const res = await getJob(id);
                setJob(res);
            } catch (error) {
            }
        }
        fetchData();
    }, [])

    const fave = async () => {

    }

    return (
        job ? <div className='px-4 max-w-5xl'>
            < h1 className='text-4xl font-semibold' > {job?.title}</h1 >
            <h2 className='text-3xl font-semibold'>{job?.company}</h2>
            <p className='text-2xl'>{job?.location}</p>
            <hr className='my-2' />
            <p>{job?.description}</p>
            <div className='flex w-full justify-center gap-6 my-4'>
                <button className='block px-4 py-2 bg-accent-color text-white font-semibold rounded-md w-9/12 hover:bg-accent-color-hover max-w-[15rem]'>Apply</button>
                <AiFillHeart size='2.5rem' className={` stroke-[25px] stroke-black bg-slate-200 p-2 rounded-md hover:fill-accent-color hover:cursor-pointer ${job?.favorite ? 'fill-accent-color' : 'fill-white'}`}
                    onClick={() => fave()} />
            </div>
        </div >
            :
            <NotFound />
    )
}

export default SingleJob;