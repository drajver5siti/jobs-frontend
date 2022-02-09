import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useUserContext } from "../context/auth";
import { useJobsContext } from "../context/jobs";
import { submitJob } from "../services/jobs";
import toastProperties from "../services/toastProperties";

const AddJob = () => {

    const { token } = useUserContext();
    const { setJob, jobs } = useJobsContext();
    const [formItems, setFormItems] = useState({});

    useEffect(() => {
        setFormItems({ ...formItems, 'type': 'Full time' })
        // default value form select
    }, [])

    const handleFormChange = (e) => {
        const name = e.target.name;
        const val = e.target.value;
        setFormItems({ ...formItems, [name]: val })
    }


    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const job = await submitJob(token, formItems)
            setJob(job);
            toast.success('Job addded', toastProperties)

        } catch (error) {
            toast.error(`${error.message}`, toastProperties);
        }
    }


    return (
        <div>
            <form onSubmit={submitForm} className='flex flex-col items-center gap-1'>
                <input type="text" name='title' value={formItems.title || ""} onChange={handleFormChange} placeholder='title' className='border-2 border-black' />
                <input type="text" name='company' value={formItems.company || ""} onChange={handleFormChange} placeholder='company' className='border-2 border-black' />
                <input type="text" name='location' value={formItems.location || ""} onChange={handleFormChange} placeholder='location' className='border-2 border-black' />
                <input type="text" maxLength='300' name="shortDesc" value={formItems.shortDesc || ""} onChange={handleFormChange} placeholder='Short description' className='border-2 border-black' />
                <input type="text" name='description' value={formItems.description || ""} onChange={handleFormChange} placeholder='description' className='border-2 border-black' />
                <select name='type' onChange={handleFormChange} defaultValue='Full time'>
                    <option value='Full time'>Full time</option>
                    <option value='Part time'>Part time</option>
                    <option value='Contract'>Contract</option>
                </select>
                <button type="submit">Add job</button>
            </form>
        </div>
    )
}

export default AddJob;