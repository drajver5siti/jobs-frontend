import axios from 'axios';

export const searchJobs = async (keyword = '', location = '') => {
    const PREFIX = '/api';
    try {
        const rawRes = await axios.get(`http://localhost:8080${PREFIX}/jobs`, {
            params: {
                keyword,
                location
            }
        });
        return rawRes.data;

    } catch (error) {
        throw new Error(error.response.data);
        // throw new Error()
    }
}