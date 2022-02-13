import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useUserContext } from "../context/auth";
import { submitJob } from "../services/jobs";
import toastProperties from "../services/toastProperties";

const AddJob = () => {

    const { token, userID } = useUserContext();
    const [formItems, setFormItems] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        setFormItems({ ...formItems, 'type': 'Full time', 'user': `${userID}` })
        // default value form select
    }, [])

    const handleFormChange = (e) => {
        const name = e.target.name;
        const val = e.target.value;
        console.log(name)
        setFormItems({ ...formItems, [name]: val })
    }


    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const job = await submitJob(token, formItems)
            toast.success('Job addded', toastProperties)
            navigate('/profile')

        } catch (error) {
            toast.error(`${error.message}`, toastProperties);
        }
    }

    const cancel = () => navigate('/');


    return (
        <div className='flex justify-center mb-10'>
            <form onSubmit={submitForm} className='flex flex-col items-start'>
                <div className='_form-div-style'>
                    <label htmlFor="title">Job title</label>
                    <input required type="text" name='title' value={formItems.title || ""} onChange={handleFormChange} className='_form-input-style' />
                </div>
                <div className='_form-div-style'>
                    <label htmlFor="company">Company name</label>
                    <input required type="text" name='company' value={formItems.company || ""} onChange={handleFormChange} className='_form-input-style' />
                </div>
                <div className='_form-div-style'>
                    <label htmlFor="location">Location</label>
                    <input requiredtype="text" name='location' value={formItems.location || ""} onChange={handleFormChange} className='_form-input-style' />
                </div>
                <div className='_form-div-style'>
                    <label htmlFor="shortDesc">Short description</label>
                    <textarea required name="shortDesc" id="" cols="50" rows="8" maxLength='350' className='focus:border-dark-color outline-none border-2 border-light-color px-2 rounded-md py-1' onChange={handleFormChange}>

                    </textarea>
                    {/* <input type="text" maxLength='300' name="shortDesc" value={formItems.shortDesc || ""} onChange={handleFormChange} className='_form-input-style' /> */}
                </div>
                <div className='_form-div-style'>
                    <label htmlFor="description">Full description</label>
                    <textarea required name="description" id="" cols="70" rows="15" className='focus:border-dark-color outline-none border-2 border-light-color px-2 rounded-md py-1' onChange={handleFormChange}>

                    </textarea>
                </div>
                <div className='flex gap-8 items-center mt-4'>
                    <label htmlFor="type">Type of job</label>
                    <select name='type' onChange={handleFormChange} defaultValue='Full time' className='bg-light-color h-8 w-28 text-center rounded-sm text-dark-color font-semibold '>
                        <option value='Full time'>Full time</option>
                        <option value='Part time'>Part time</option>
                        <option value='Contract'>Contract</option>
                    </select>
                </div>
                <div className='flex w-8/12 justify-around m-auto mt-6'>
                    <button type="submit" className='w-4/12 bg-light-color text-dark-color font-semibold font-mono h-8 rounded-md hover:text-white'>Submit</button>
                    <button className='block w-4/12 bg-light-color text-dark-color font-semibold font-mono  h-8 rounded-md hover:text-white' onClick={cancel}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default AddJob;