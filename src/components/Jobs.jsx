import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { searchJobs } from '../services/jobs';
import { toast } from 'react-toastify';
import Job from './Job'
import AddJob from './AddJob';
import props from '../services/toastProperties';
import { useUserContext } from "../context/auth";
import { useJobsContext } from "../context/jobs";
import { AiFillHeart } from 'react-icons/ai'
import { createSearchParams } from "react-router-dom";



const Jobs = () => {
    // if user is redirected from home with search query to Jobs
    // i can get that search query from location.state
    const { loggedIn } = useUserContext();
    const { jobs, displayJob, setJobs } = useJobsContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const [keywordData, setKeywordData] = useState('');
    const [locationData, setLocationData] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log("RERENDER")
        getJobs()
    }, [searchParams])

    const getJobs = async () => {
        try {
            const loc = searchParams.get('location');
            console.log('Get jobs with ' + loc)
            const res = await searchJobs(searchParams.get("keyword"), searchParams.get("location"));
            setJobs(res);
        } catch (error) {
            setJobs([]);
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        const search = `?${createSearchParams({ keyword: keywordData, location: locationData })}`
        navigate({
            pathname: '/jobs',
            search: search,
        })
    }

    useEffect(() => {
        getJobs()
    }, [])

    return (
        <div className='max-w-7xl m-auto min-w-[20rem] z-0'>
            {loggedIn && <AddJob />}
            <form className='grid grid-rows-3 gap-0 mt-4 items-center place-items-center' onSubmit={handleFormSubmit}>
                <input placeholder='Job or keyword' type="text" name="keyword" id=""
                    className='border-[1px] border-black w-11/12 h-14 py-4 px-4 focus:border-[#232528] rounded-md md:row-start-1 ' value={keywordData} onChange={(e) => setKeywordData(e.target.value)} />

                <input placeholder='Location' type="text" name="location" id=""
                    className='border-[1px] border-black w-11/12 h-14 py-4 px-4 focus:border-[#232528] rounded-md md:row-start-1' value={locationData} onChange={(e) => setLocationData(e.target.value)} />
                <button type='submit' className='max-w-md h-12 bg-accent-color w-10/12 rounded-lg text-white font-mono font-bold mt-4 md:col-span-2' >Search</button>

            </form>

            { jobs.length > 0 ? <div className=' md:flex md:flex-row md:justify-center relative '>
                <div className='flex flex-col gap-2 items-center mt-8 md:w-6/12 cursor-pointer md:cursor-default'>
                    {jobs.map(job => <Job data={job} key={job._id} />)}
                </div>

                <div className='_right-height hidden md:block w-6/12 md:sticky top-20 mt-8 mr-4 border-[1px] border-slate-400 rounded-md font-mono'>
                    <div className=' _custom-shadow pb-8 shadow-sm px-2'>
                        <h1 className='text-4xl font-semibold text-center'>{displayJob?.title}</h1>
                        <h2 className='text-3xl'> {displayJob?.company} </h2>
                        <p className='text-xl'>{displayJob?.location}</p>
                        <div className='flex w-full items-center gap-6'>
                            <button className='block px-4 py-2 bg-accent-color text-white font-semibold rounded-md w-9/12 hover:bg-accent-color-hover max-w-[15rem]'>Apply</button>
                            <AiFillHeart size='2.5rem' className='fill-white stroke-[25px] stroke-black bg-slate-200 p-2 rounded-md hover:fill-accent-color hover:cursor-pointer' />
                        </div>
                    </div>
                    <p className='_right-height2 px-2 overflow-y-auto'>{displayJob?.description}</p>
                </div>
            </div> : <p className='font-semibold text-3xl text-center'> No jobs found.</p>}
        </div>
    )
}

export default Jobs;