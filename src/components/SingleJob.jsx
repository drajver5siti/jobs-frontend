import { useParams } from "react-router";
import { useJobsContext } from "../context/jobs";
import { AiFillHeart } from 'react-icons/ai'


const SingleJob = () => {

    const { id } = useParams();
    const { jobs } = useJobsContext();
    const job = jobs.find((x) => x._id === id)
    return (
        <div className='px-4 max-w-5xl'>
            <h1 className='text-4xl font-semibold'>{job?.title}</h1>
            <h2 className='text-3xl font-semibold'>{job?.company}</h2>
            <p className='text-2xl'>{job?.location}</p>
            <hr className='my-2' />
            <p>{job?.description}</p>
            <div className='flex w-full justify-center gap-6 my-4'>
                <button className='block px-4 py-2 bg-accent-color text-white font-semibold rounded-md w-9/12 hover:bg-accent-color-hover max-w-[15rem]'>Apply</button>
                <AiFillHeart size='2.5rem' className='fill-white stroke-[25px] stroke-black bg-slate-200 p-2 rounded-md hover:fill-accent-color hover:cursor-pointer' />
            </div>
        </div>
    )
}

export default SingleJob;