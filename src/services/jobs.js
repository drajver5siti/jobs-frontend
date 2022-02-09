import axios from 'axios';

export const searchJobs = async (keyword = '', location = '') => {
    const PREFIX = '/api';
    console.log('Search jobs func ' + location)
    try {
        const rawRes = await axios.get(`http://localhost:8080${PREFIX}/jobs?location=${location}`);
        return rawRes.data;

    } catch (error) {
        throw new Error(error.response.data);
        // throw new Error()
    }
}

export const submitJob = async (token, data) => {
    try {
        const rawRes = await axios({
            url: 'http://localhost:8080/api/jobs',
            method: 'POST',
            data: data,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return rawRes.data;
    }
    catch (error) {
        throw new Error(error.response.data);
    }
}