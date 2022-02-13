import axios from 'axios';

export const getJob = async (id) => {
    const PREFIX = '/api';

    try {
        const rawRes = await axios.get(`http://localhost:8080${PREFIX}/jobs?id=${id}`)
        return rawRes.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

export const searchJobs = async (keyword = '', location = '') => {
    const PREFIX = '/api';
    try {
        const rawRes = await axios.get(`http://localhost:8080${PREFIX}/jobs?location=${location}`);
        return rawRes.data;

    } catch (error) {
        throw new Error(error.response.data.message);
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
        throw new Error(error.response.data.message);
    }
}

export const updateJob = async (token, data) => {
    try {
        const rawRes = await axios({
            url: 'http://localhost:8080/api/jobs',
            method: 'PUT',
            data: data,
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        return rawRes.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}