import { AiFillHeart } from 'react-icons/ai'
import { useUserContext } from "../context/auth";
import { useState } from 'react';
import { toast } from 'react-toastify';


const SideJob = ({ data, updateJob }) => {
    const { token } = useUserContext();

    const handleFavoriteUpdate = async () => {
        // update the job
        try {
            data.favorite = !data.favorite
            await updateJob(token, { ...data, 'favorite': !data.favorite })
        } catch (error) {
            toast.error(error.message)
        }
        // change the ui
    }

    return (
        <div className='_right-height hidden md:block w-6/12 md:sticky top-20 mt-8 mr-4 border-[1px] border-slate-400 rounded-md font-mono'>
            <div className=' _custom-shadow pb-8 shadow-sm px-2'>
                <h1 className='text-4xl font-semibold text-center capitalize'>{data?.title}</h1>
                <h2 className='text-3xl capitalize'> {data?.company} </h2>
                <p className='text-xl capitalize'>{data?.location}</p>
                <div className='flex w-full items-center gap-6'>
                    <button className='block px-4 py-2 bg-accent-color text-white font-semibold rounded-md w-9/12 hover:bg-accent-color-hover max-w-[15rem]'>Apply</button>
                    {token && <AiFillHeart size='2.5rem' className={`${data?.favorite ? 'fill-accent-color' : 'fill-white'} stroke-[20px] stroke-black bg-slate-200 p-2 rounded-md hover:fill-accent-color hover:cursor-pointer`}
                        onClick={() => handleFavoriteUpdate()} />}
                </div>
            </div>
            <p className='_right-height2 px-2 overflow-y-auto break-words capitalize'>{data?.description}</p>
        </div>
    )
}

export default SideJob;