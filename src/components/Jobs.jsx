import { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { searchJobs } from '../services/search';
import { toast } from 'react-toastify';
import props from '../services/toastProperties';


const Jobs = () => {
    const locationX = useLocation();
    // if user is redirected from home with search query to Jobs
    // i can get that search query from location.state

    useEffect(async () => {
        const { keyword, location } = locationX.state;
        try {
            const res = await searchJobs(keyword, location)
            console.log(res);
            // i get the result
        } catch (error) {
            // i get the error message
            toast.error(`${error}`, props)
        }
    }, [])

    return (
        <div>
            Jobs
        </div>
    )
}

export default Jobs;