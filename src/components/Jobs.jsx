import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { searchJobs, updateJob } from '../services/jobs';
import Job from './Job'
import SideJob from './SideJob';
import Filters from './Filters'
import { createSearchParams } from "react-router-dom";


const Jobs = () => {
    // if user is redirected from home with search query to Jobs
    // i can get that search query from location.state
    const [searchParams, setSearchParams] = useSearchParams();
    const [keywordData, setKeywordData] = useState('');
    const [locationData, setLocationData] = useState('');
    const [queryParams, setQueryParams] = useState({});
    const [jobs, setJobs] = useState([]);
    const [displayJob, setDisplayJob] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        async function getJobs() {
            try {
                const res = await searchJobs(searchParams.get("keyword"), searchParams.get("location"));
                setJobs([...res]);
                setDisplayJob(res[0]);
            } catch (error) {
                setJobs([]);
            }
        }
        getJobs()
    }, [searchParams])



    const handleFormSubmit = (e) => {

        /*
            Vo query params gi imam site filteri
        */

        e.preventDefault()
        const search = `?${createSearchParams({ keyword: keywordData, location: locationData })}`
        navigate({
            pathname: '/jobs',
            search: search,
        })
    }

    return (
        <div className='max-w-7xl m-auto min-w-[20rem] z-0'>
            <form className='grid grid-rows-2 gap-3 mt-4 items-center place-items-center' onSubmit={handleFormSubmit}>
                <input placeholder='Job or keyword' type="text" name="keyword" id=""
                    className='border-[1px] border-black w-11/12 h-14 py-4 px-4 focus:border-[#232528] rounded-md md:row-start-1 ' value={keywordData} onChange={(e) => setKeywordData(e.target.value)} autoFocus />

                <input placeholder='Location' type="text" name="location" id=""
                    className='border-[1px] border-black w-11/12 h-14 py-4 px-4 focus:border-[#232528] rounded-md md:row-start-1' value={locationData} onChange={(e) => setLocationData(e.target.value)} />
                <button type='submit' className='max-w-md h-12 bg-accent-color w-10/12 rounded-lg text-white font-mono font-bold mt-4 md:col-span-2 hover:bg-accent-color-hover' >Search</button>
            </form>
            <Filters queryParams={queryParams} setQueryParams={setQueryParams} />

            <p className='text-center mt-4'>Employers: <Link to='/profile/jobs' className='underline underline-offset-1 text-accent-color font-semibold hover:text-accent-color-hover' > Post a job </Link></p>

            <hr className='mt-4 mb-8 w-11/12 mx-auto' />

            { jobs.length > 0 ? <div className=' md:flex md:flex-row md:justify-center relative '>
                <div className='flex flex-col gap-2 items-center mt-8 md:w-6/12 cursor-pointer md:cursor-default'>
                    {jobs.map(job => <Job data={job} key={job._id} setDisplayJob={setDisplayJob} />)}
                </div>
                <SideJob data={displayJob} updateJob={updateJob} />

            </div> : <p className='font-semibold text-3xl text-center'> No jobs found.</p>}
        </div>
    )
}

export default Jobs;